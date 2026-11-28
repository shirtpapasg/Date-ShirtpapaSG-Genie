import json, os, sys, urllib.request, urllib.parse, urllib.error
HERE='/home/user/Date-ShirtpapaSG-Genie/production/youtube'; TF=HERE+'/.yt_token.json'
CLIENT="780560926873-2jum0brhcjavtrm6f3ksab5tdk3fv0et.apps.googleusercontent.com"
t=json.load(open(TF)); b=urllib.parse.urlencode({"client_id":CLIENT,"refresh_token":t['refresh_token'],"grant_type":"refresh_token"}).encode()
TOK=json.load(urllib.request.urlopen(urllib.request.Request("https://oauth2.googleapis.com/token",data=b)))['access_token']
API,UP="https://www.googleapis.com/youtube/v3","https://www.googleapis.com/upload/youtube/v3"
def call(method,url,params=None,body=None,raw=None,ctype="application/json"):
    if params: url+="?"+urllib.parse.urlencode(params)
    data=raw if raw is not None else (json.dumps(body).encode() if body is not None else None)
    r=urllib.request.Request(url,data=data,method=method,headers={"Authorization":"Bearer "+TOK,"Content-Type":ctype})
    try:
        with urllib.request.urlopen(r) as resp:
            s=resp.read(); return json.loads(s) if s else {}
    except urllib.error.HTTPError as e:
        return {"ERROR":e.code,"body":e.read()[:300].decode('utf8','ignore')}
