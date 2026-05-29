# UIC HR System

Recruitment / ATS system — Next.js 14 + Prisma + Supabase + Render.

## Render Deploy Settings

| Setting | Value |
|---|---|
| Language | **Node** |
| Branch | main |
| Build Command | `npm install && npm run build` |
| Start Command | `npm start` |
| Instance | Free |

## Environment Variables (Render)

```
DATABASE_URL=postgresql://postgres.YOUR_PROJECT:PASSWORD@aws-0-ap-south-1.pooler.supabase.com:6543/postgres
AUTH_SECRET=random-32-character-string
NEXTAUTH_URL=https://hr-system-uic.onrender.com
```

## Database Setup (one-time)

Local mein PowerShell ya terminal kholo, project folder mein jao, phir:

```bash
npx prisma db push
```

Ye Supabase mein tables bana dega.

## Pages

- `/signup` — naya account
- `/login` — login
- `/dashboard` — home
- `/jobs` — jobs list
- `/jobs/new` — naya job
- `/jobs/[id]` — job + pipeline
- `/candidates` — candidates list
- `/candidates/new` — naya candidate
