# UIC HR System

Recruitment & ATS (Applicant Tracking System) — Next.js 15 + Supabase + Render.

## 🚀 Quick Start (Local Setup)

### Step 1: Node.js Install Karo
Agar tumhare paas Node.js nahi hai, [nodejs.org](https://nodejs.org) se v20+ download karo.

Check karne ke liye:
```bash
node -v   # v20 ya zyada hona chahiye
npm -v
```

### Step 2: Project Open Karo
```bash
cd uic-ats
npm install
```

(`npm install` mein 2-3 minute lagega — chai pi lo)

### Step 3: `.env.local` File Banao

Project ke root mein `.env.local` naam ki file banao aur ye paste karo:

```env
DATABASE_URL="postgresql://postgres.YOUR_PROJECT:YOUR_PASSWORD@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"
AUTH_SECRET="koi-bhi-random-32-character-string"
NEXTAUTH_URL="http://localhost:3000"
ANTHROPIC_API_KEY="sk-ant-..."
```

- `DATABASE_URL` — Supabase ka **Pooler** connection string (IPv4 compatible). Apna password fill karo.
- `AUTH_SECRET` — koi bhi random string. Generate karne ke liye terminal mein: `openssl rand -base64 32`
- `NEXTAUTH_URL` — local mein `http://localhost:3000`, production mein Render URL
- `ANTHROPIC_API_KEY` — abhi optional, AI features ke liye

### Step 4: Database Setup Karo

```bash
npx prisma db push
```

Ye Supabase mein saari tables bana dega (Users, Jobs, Candidates, etc.)

### Step 5: App Chalao

```bash
npm run dev
```

Browser mein khol: **http://localhost:3000**

Pehle `/signup` par jao → company aur admin account banao → phir login karo.

---

## 📦 Project Structure

```
uic-ats/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── (app)/             # Protected pages (login required)
│   │   │   ├── layout.tsx     # Sidebar wrapper
│   │   │   ├── dashboard/     # Home page
│   │   │   ├── jobs/          # Jobs CRUD
│   │   │   └── candidates/    # Candidates CRUD
│   │   ├── api/auth/          # NextAuth routes
│   │   ├── login/             # Login page
│   │   ├── signup/            # Signup page
│   │   └── page.tsx           # Redirects to login/dashboard
│   ├── components/
│   │   └── sidebar.tsx
│   └── lib/
│       ├── db.ts              # Prisma client
│       ├── auth.ts            # NextAuth config
│       └── actions/           # Server actions = your API
│           ├── auth.ts
│           ├── candidate.ts
│           └── job.ts
├── .env.example
├── package.json
└── README.md
```

---

## 🌐 Render Par Deploy Karna

### Step 1: GitHub Par Push Karo

```bash
git init
git add .
git commit -m "Initial UIC HR System"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/HR-System-UIC.git
git push -u origin main
```

⚠️ **`.env.local` GitHub par NAHI jayegi** — `.gitignore` mein already ignored hai. Safe!

### Step 2: Render Par New Web Service Banao

1. [render.com](https://render.com) → Dashboard → **New +** → **Web Service**
2. GitHub connect karo → `HR-System-UIC` repo select karo
3. Ye settings bharo:

| Setting | Value |
|---------|-------|
| **Name** | uic-hr-system |
| **Region** | Singapore |
| **Branch** | main |
| **Runtime** | Node |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Plan** | Free |

### Step 3: Environment Variables Add Karo

Render dashboard → Environment → ye 4 variables add karo:

```
DATABASE_URL = (Supabase pooler string)
AUTH_SECRET = (same as local)
NEXTAUTH_URL = https://uic-hr-system.onrender.com
ANTHROPIC_API_KEY = (your key)
```

### Step 4: Deploy!

"Create Web Service" click karo → 5 minute mein live ho jayega.

URL: `https://uic-hr-system.onrender.com`

---

## 🔄 Future Updates

Jab bhi code change karna ho:

```bash
git add .
git commit -m "feature: kuch naya add kiya"
git push
```

Render automatically redeploy kar dega! 🚀

---

## ⚠️ Important Notes

1. **Free Tier Limits:**
   - Render free: 750 hours/month, app 15 minutes idle ke baad sleep ho jata hai (first request slow)
   - Supabase free: 500MB database, 50k MAU
   
2. **Security:**
   - `.env.local` kabhi git par push mat karna
   - `AUTH_SECRET` strong rakhna (32+ characters)
   - Passwords bcrypt se hash hote hain — plaintext kahin store nahi

3. **Database Reset (zarurat ho toh):**
   ```bash
   npx prisma db push --force-reset
   ```
   ⚠️ Ye saara data delete kar dega!

---

## 🐛 Common Issues

**Build fail on Render:**
- `DATABASE_URL` Pooler version use kar rahe ho? (port 6543, not 5432)

**Login nahi ho raha:**
- `NEXTAUTH_URL` sahi hai? Production mein Render URL, local mein `localhost:3000`
- `AUTH_SECRET` set hai?

**Database connect nahi ho raha:**
- Pooler connection string use karo, IPv4 wala
- Password mein special characters URL-encoded hone chahiye

---

## 📞 Help?

Code samajh nahi aaya toh Claude se pucho — pura context yahan diya hai.
