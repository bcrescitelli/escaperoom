# The Midnight Curio

A 30-minute collaborative browser escape room for 4 to 5 remote players.

## What it does

- Shared room code
- Live cursors with player names/colors
- Shared player list
- Shared inventory
- Shared puzzle solves, final digits, and victory state
- Local clue modals so players can click around without hijacking everyone else's screen
- No login, no built-in chat, no host panel
- Built for laptop play while everyone talks on FaceTime/Zoom/Discord

## Tech stack

- Vite
- React
- Firebase Realtime Database
- Vercel hosting

## File structure

```txt
midnight-curio/
  index.html
  package.json
  vite.config.js
  firebase.rules.json
  .env.example
  README.md
  src/
    App.jsx
    firebase.js
    gameData.js
    main.jsx
    styles.css
    useEscapeRoom.js
```

## Firebase setup

1. Create a Firebase project.
2. Add a Web App inside that project.
3. Copy the Firebase config values.
4. Enable Realtime Database.
5. Start in test mode for tonight, or paste the contents of `firebase.rules.json` into Realtime Database Rules.
6. Copy your values into Vercel as environment variables.

Use these exact variable names:

```txt
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_DATABASE_URL
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

## GitHub and Vercel setup without Terminal

1. Create a new GitHub repository.
2. Upload all files and folders from this project.
3. In Vercel, import the GitHub repo.
4. Framework preset should be Vite.
5. Build command should be `npm run build`.
6. Output directory should be `dist`.
7. Add the Firebase environment variables in Vercel Project Settings.
8. Deploy.
9. Send everyone the deployed URL with the same room code, for example `?room=MIDNIGHT`.

## Game answer key

Do not send this section to players.

### Room 1: The Velvet Parlor

Puzzle: The Parlor Cabinet

Clue order: CANDLES / MOONS / UMBRELLAS

Counts:

- Candles = 4
- Moons = 1
- Umbrellas = 2

Answer: `412`

Reward: Brass Key. Final digit 4.

### Room 2: The Whisper Kitchen

Puzzle: The Pantry Lock

Recipe order: SALT / SUGAR / CHERRY / OLIVE

Labels:

- Salt = 7
- Sugar = 3
- Cherry = 5
- Olive = 2

Answer: `7352`

Reward: Mirror Shard. Final digit 7.

### Room 3: The Attic Arcade

Puzzle: The Cabinet Sequence

Order: STAR / EYE / SNAKE / MOON

Labels:

- Star = 9
- Eye = 2
- Snake = 1
- Moon = 6

Answer: `9216`

Reward: Red Arcade Token. Final digit 9.

### Final Door

First three digits: 4, 7, 9

Ribbon says B. B = 2.

Answer: `4792`

## Facilitator notes

- Tell everyone to use a laptop.
- Tell everyone to join the same room code.
- Keep FaceTime open for discussion.
- Tell players they can click independently. Object popups are local, but inventory and solved progress are shared.
- If something goes wrong, use Reset Room in the right panel.
- For a one-night game, open rules are fine. After the event, delete the Firebase project or tighten rules.

## Customization

Most game content lives in `src/gameData.js`.

You can change:

- Room names
- Puzzle copy
- Hotspot positions
- Answers
- Inventory items
- Hints
- Final code

Most visual design lives in `src/styles.css`.
