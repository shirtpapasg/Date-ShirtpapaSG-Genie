"""One-time YouTube login for the cloud session (Google device-code flow).

Step 1  python3 yt_device_login.py start
        Prints a short code and a Google link. Open the link, enter the code,
        pick the channel account, and allow "TheOneApp Publisher".
Step 2  python3 yt_device_login.py wait
        Polls Google until the approval arrives and stores the tokens in
        YT_TOKEN_FILE (default: .yt_token.json next to this script, mode 600).
Later   python3 yt_device_login.py refresh
        Gets a fresh access token from the stored refresh token.

The session proxy adds the OAuth client's credentials to every request to
https://oauth2.googleapis.com/token, so no client secret is needed here.
Tokens are never printed.
"""
import json, os, sys, time, urllib.request, urllib.parse, urllib.error

HERE = os.path.dirname(os.path.abspath(__file__))
TOKEN_FILE = os.environ.get("YT_TOKEN_FILE", os.path.join(HERE, ".yt_token.json"))
STATE_FILE = os.path.join(HERE, ".yt_device.json")
SCOPE = "https://www.googleapis.com/auth/youtube"
CLIENT_ID = os.environ.get("YT_CLIENT_ID", "")   # optional; the proxy normally supplies it


def post(url, body):
    data = urllib.parse.urlencode(body).encode()
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/x-www-form-urlencoded"})
    try:
        with urllib.request.urlopen(req) as r:
            return r.status, json.loads(r.read())
    except urllib.error.HTTPError as e:
        try:
            return e.code, json.loads(e.read())
        except Exception:
            return e.code, {"error": "http_error"}


def save_tokens(resp, old=None):
    tok = dict(old or {})
    tok.update({k: v for k, v in resp.items() if k in ("access_token", "refresh_token", "scope", "token_type")})
    tok["expires_at"] = time.time() + int(resp.get("expires_in", 3600)) - 60
    fd = os.open(TOKEN_FILE, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
    with os.fdopen(fd, "w") as f:
        json.dump(tok, f)
    print(f"Tokens stored in {TOKEN_FILE} (refresh token: {'yes' if tok.get('refresh_token') else 'no'})")


def start():
    body = {"scope": SCOPE}
    if CLIENT_ID:
        body["client_id"] = CLIENT_ID
    code, d = post("https://oauth2.googleapis.com/device/code", body)
    if code != 200 or "device_code" not in d:
        sys.exit(f"Could not start the login ({code}): {d.get('error')} {d.get('error_description', '')}")
    with open(STATE_FILE, "w") as f:
        json.dump(d, f)
    print("Open this link in your browser:  " + d.get("verification_url", "https://www.google.com/device"))
    print("Enter this code:                 " + d["user_code"])
    print(f"The code is valid for {int(d.get('expires_in', 1800)) // 60} minutes. Then run:  python3 yt_device_login.py wait")


def wait():
    d = json.load(open(STATE_FILE))
    interval = int(d.get("interval", 5))
    deadline = time.time() + int(d.get("expires_in", 1800))
    print("Waiting for your approval in the browser…")
    while time.time() < deadline:
        body = {"grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": d["device_code"]}
        if CLIENT_ID:
            body["client_id"] = CLIENT_ID
        code, r = post("https://oauth2.googleapis.com/token", body)
        err = r.get("error")
        if code == 200 and r.get("access_token"):
            save_tokens(r)
            os.remove(STATE_FILE)
            return
        if err == "authorization_pending":
            time.sleep(interval)
        elif err == "slow_down":
            interval += 2
            time.sleep(interval)
        elif err == "access_denied":
            sys.exit("You declined the request in the browser.")
        else:
            sys.exit(f"Login failed ({code}): {err} {r.get('error_description', '')}")
    sys.exit("The code expired. Run 'start' again.")


def refresh():
    tok = json.load(open(TOKEN_FILE))
    body = {"grant_type": "refresh_token", "refresh_token": tok["refresh_token"]}
    if CLIENT_ID:
        body["client_id"] = CLIENT_ID
    code, r = post("https://oauth2.googleapis.com/token", body)
    if code != 200 or not r.get("access_token"):
        sys.exit(f"Refresh failed ({code}): {r.get('error')} {r.get('error_description', '')}")
    save_tokens(r, tok)


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "start"
    {"start": start, "wait": wait, "refresh": refresh}.get(cmd, lambda: sys.exit("use: start | wait | refresh"))()
