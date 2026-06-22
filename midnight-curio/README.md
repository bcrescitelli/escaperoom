# The Midnight Curio

A 30-minute collaborative browser escape room for 4 to 5 remote players.

## What changed in Pass 1

This version updates the UI direction to a cleaner, crisper mystery interface:

- New join screen layout
- Cleaner typography and hierarchy
- More readable side panels
- Cleaner room tabs and top bar
- Better contrast and spacing
- Tighter modal styling
- Refined object presentation and hover states

## Firebase / Vercel

Add these environment variables in Vercel:

```txt
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_DATABASE_URL
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

The app expects Firebase Realtime Database rules that allow the room state to read/write for the game session.

## Local commands

```bash
npm install
npm run dev
npm run build
```
