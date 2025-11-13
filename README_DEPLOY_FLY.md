Deploying this Express + SQLite app to Fly.io (Windows PowerShell)

Prerequisites:
- Install Docker (recommended) or let Fly build the image remotely.
- Install `flyctl` CLI: on Windows use `winget install flyctl` or see https://fly.io/docs/hands-on/installing/
- Have your GitHub repo available locally (this folder).

Steps (PowerShell):

1) Login to Fly and create an app

```powershell
flyctl auth login
cd C:\Users\javie\OneDrive\Desktop\Trabajos_Universidad(3)\IPO\AFCs_ISO
flyctl launch --name my-afcs-iso --region ord # replace name and region as needed
```

This will create a `fly.toml`. If prompted to deploy now you can cancel and follow the volume steps first.

2) Create a persistent volume for the SQLite DB

```powershell
# create a 1 GB volume called 'db' attached to the app
flyctl volumes create db 1 --app my-afcs-iso
```

3) Ensure `fly.toml` has a mount section like:

```toml
[[mounts]]
  source = "db"
  destination = "/app/db"
```

4) Deploy to Fly

```powershell
flyctl deploy --app my-afcs-iso
```

5) Get the public URL

```powershell
flyctl info --app my-afcs-iso
# or open the app URL shown after deploy, usually https://my-afcs-iso.fly.dev
```

6) (Optional) Update `vercel.json` in this repo: replace `<YOUR-FLY-APP>` with your app name (e.g. `my-afcs-iso`) so Vercel frontend can proxy `/api` requests to the Fly backend.

7) Share the URL with testers: `https://my-afcs-iso.fly.dev`

Notes & tips:
- If you have trouble with native `flyctl` on Windows, use WSL or deploy via GitHub Actions (Fly supports GitHub integration).
- Keep `db/` mounted to the volume so the SQLite file persists across deploys.
- For easier scaling and reliability consider migrating to Postgres (Supabase/Railway) in the future.
