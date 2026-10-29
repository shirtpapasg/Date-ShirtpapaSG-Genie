# Let Claude upload to YouTube again

Use this when Claude says the YouTube login has expired and asks for the **Client ID**.

## 1. Find the Client ID

- Open https://console.cloud.google.com/apis/credentials
- Sign in with the **Google account that owns the YouTube channel**.
- Go to the section **OAuth 2.0 Client IDs**.
- Click the **copy icon** next to the client.
- Paste it into the chat with Claude.

## 2. Check what you copied

- It ends in **`.apps.googleusercontent.com`**.
- It looks like `123456789-abc….apps.googleusercontent.com`.
- Send **only the ID**.
- **Never send the client secret.**

## 3. What Claude does next

- Replies straight away with a **Google sign-in link** and a **short code**.
- You open the link, enter the code, pick the channel's account, and press **Allow**.
- Claude then:
  - uploads the video, with its title, description, tags and thumbnail,
  - adds it to the **TheOneApp, Explained** playlist,
  - deletes the old video, if you asked for that,
  - updates the video's link in TheOneApp.

## If the list of OAuth 2.0 Client IDs is empty

- The login app has been deleted, and setting up a new one is a bigger job.
- The quicker way is to upload the video yourself at https://studio.youtube.com
- Then send Claude the new video's link, and Claude updates the app.

## Good to know

- A video uploaded by Claude may stay locked as **Private** until Google approves the login app.
  - If that happens, upload the file in YouTube Studio instead.
  - Claude can still do the rest.
