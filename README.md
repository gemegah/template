# Vals

Private Next.js story experience with an app-level password gate for free deployment on Vercel Hobby.

## Local setup

1. Install dependencies:
```bash
npm install
```
2. Create local env file from `.env.example`:
```bash
cp .env.example .env.local
```
3. Set a shared password in `.env.local`:
```bash
SITE_PASSWORD=your-shared-password
```
4. Run the app:
```bash
npm run dev
```

Unauthenticated users are redirected to `/unlock`.

## Password rotation

1. Change `SITE_PASSWORD` in `.env.local` (local) or Vercel project env settings (production).
2. Redeploy after changing production env values.
3. Existing auth cookies stop working because token validation uses the current password secret.

## Deploy to Vercel (free Hobby)

1. Push this repo to GitHub.
2. Import the repo in Vercel and keep the framework as Next.js.
3. Add `SITE_PASSWORD` in Vercel Project Settings -> Environment Variables.
4. Deploy.
5. After any password rotation, redeploy again to enforce the new secret.