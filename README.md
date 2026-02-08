# 📔 Diarium

Diarium is a Next.js app for logging daily work achievements with optional media uploads. It includes authentication, CRUD for entries, and a clean black/white/sky UI.

## ✨ Key Features

- Daily work entries (unlimited per day)
- Media uploads (images/videos) via Cloudinary
- Edit and delete entries
- JWT authentication with HTTP-only cookies
- Responsive UI

## 🛠️ Tech Stack

- Next.js (App Router)
- MongoDB + Mongoose
- JWT auth
- Cloudinary
- Tailwind CSS

## ✅ Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Environment variables

Create `.env.local` and add:

```env
MONGODB_URI=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
JWT_SECRET=
```

### 3) Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🧪 Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
