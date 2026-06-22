import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  get,
  onDisconnect,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';
import { db } from './firebase';
import { initialGameState, inventoryCatalog, PLAYER_COLORS } from './gameData';

const PLAYER_ID_KEY = 'midnight-curio-player-id';
const PLAYER_COLOR_KEY = 'midnight-curio-player-color';

function getOrCreatePlayerId() {
  let id = localStorage.getItem(PLAYER_ID_KEY);
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() : `p-${Date.now()}-${Math.random()}`;
    localStorage.setItem(PLAYER_ID_KEY, id);
  }
  return id;
}

function getOrCreateColor() {
  let color = localStorage.getItem(PLAYER_COLOR_KEY);
  if (!color) {
    color = PLAYER_COLORS[Math.floor(Math.random() * PLAYER_COLORS.length)];
    localStorage.setItem(PLAYER_COLOR_KEY, color);
  }
  return color;
}

export function useEscapeRoom(roomCode, playerName) {
  const [players, setPlayers] = useState({});
  const [game, setGame] = useState(initialGameState);
  const [events, setEvents] = useState({});
  const [connected, setConnected] = useState(false);

  const playerId = useMemo(getOrCreatePlayerId, []);
  const playerColor = useMemo(getOrCreateColor, []);
  const normalizedRoom = useMemo(() => (roomCode || '').trim().toUpperCase(), [roomCode]);
  const cursorThrottle = useRef(0);

  const roomPath = normalizedRoom ? `rooms/${normalizedRoom}` : null;

  useEffect(() => {
    if (!roomPath || !playerName) return undefined;

    const roomRef = ref(db, roomPath);
    const playerRef = ref(db, `${roomPath}/players/${playerId}`);
    const gameRef = ref(db, `${roomPath}/game`);
    const eventsRef = ref(db, `${roomPath}/events`);
    const connectedRef = ref(db, '.info/connected');

    get(gameRef).then((snapshot) => {
      if (!snapshot.exists()) {
        set(gameRef, {
          ...initialGameState,
          startedAt: Date.now(),
        });
      }
    });

    const playerPayload = {
      id: playerId,
      name: playerName.trim().slice(0, 24) || 'Guest',
      color: playerColor,
      online: true,
      joinedAt: Date.now(),
      cursor: { x: 50, y: 50, t: Date.now() },
    };

    set(playerRef, playerPayload);
    onDisconnect(playerRef).remove();

    const unsubConnection = onValue(connectedRef, (snap) => {
      setConnected(Boolean(snap.val()));
      if (snap.val() === true) {
        set(playerRef, { ...playerPayload, online: true, reconnectedAt: Date.now() });
        onDisconnect(playerRef).remove();
      }
    });

    const unsubPlayers = onValue(ref(db, `${roomPath}/players`), (snapshot) => {
      setPlayers(snapshot.val() || {});
    });

    const unsubGame = onValue(gameRef, (snapshot) => {
      setGame({ ...initialGameState, ...(snapshot.val() || {}) });
    });

    const unsubEvents = onValue(eventsRef, (snapshot) => {
      setEvents(snapshot.val() || {});
    });

    return () => {
      unsubConnection();
      unsubPlayers();
      unsubGame();
      unsubEvents();
      remove(playerRef);
    };
  }, [roomPath, playerId, playerName, playerColor]);

  const logEvent = useCallback(
    (text) => {
      if (!roomPath) return;
      push(ref(db, `${roomPath}/events`), {
        text,
        player: playerName,
        color: playerColor,
        at: Date.now(),
      });
    },
    [roomPath, playerColor, playerName]
  );

  const updateCursor = useCallback(
    (x, y) => {
      if (!roomPath) return;
      const now = Date.now();
      if (now - cursorThrottle.current < 42) return;
      cursorThrottle.current = now;
      set(ref(db, `${roomPath}/players/${playerId}/cursor`), { x, y, t: now });
    },
    [roomPath, playerId]
  );

  const collectItem = useCallback(
    async (itemId) => {
      if (!roomPath || !inventoryCatalog[itemId]) return;
      if (game.inventory?.[itemId]) return;
      const item = inventoryCatalog[itemId];
      await update(ref(db, roomPath), {
        [`game/inventory/${itemId}`]: {
          ...item,
          by: playerName,
          at: Date.now(),
        },
      });
      logEvent(`${playerName} found ${item.label}.`);
    },
    [roomPath, game.inventory, playerName, logEvent]
  );

  const solvePuzzle = useCallback(
    async (puzzle) => {
      if (!roomPath || !puzzle || game.solved?.[puzzle.id]) return;
      const updates = {
        [`game/solved/${puzzle.id}`]: {
          by: playerName,
          at: Date.now(),
        },
      };

      if (puzzle.grants) {
        puzzle.grants.forEach((itemId) => {
          updates[`game/inventory/${itemId}`] = {
            ...inventoryCatalog[itemId],
            by: playerName,
            at: Date.now(),
          };
        });
      }

      if (puzzle.finalDigit) {
        updates[`game/finalDigits/${puzzle.id}`] = puzzle.finalDigit;
      }

      if (puzzle.id === 'parlorCabinet') {
        updates['game/roomIndex'] = Math.max(game.roomIndex || 0, 1);
      }

      if (puzzle.id === 'recipeLock') {
        updates['game/roomIndex'] = Math.max(game.roomIndex || 0, 2);
      }

      if (puzzle.ending) {
        updates['game/ending'] = true;
        updates['game/escapedAt'] = Date.now();
      }

      await update(ref(db, roomPath), updates);
      logEvent(`${playerName} solved ${puzzle.title}.`);
    },
    [roomPath, game.solved, game.roomIndex, playerName, logEvent]
  );

  const goToRoom = useCallback(
    (index) => {
      if (!roomPath) return;
      update(ref(db, `${roomPath}/game`), {
        roomIndex: index,
      });
    },
    [roomPath]
  );

  const resetGame = useCallback(async () => {
    if (!roomPath) return;
    await set(ref(db, `${roomPath}/game`), {
      ...initialGameState,
      startedAt: Date.now(),
    });
    await remove(ref(db, `${roomPath}/events`));
  }, [roomPath]);

  const orderedEvents = useMemo(() => {
    return Object.entries(events || {})
      .map(([id, event]) => ({ id, ...event }))
      .sort((a, b) => (b.at || 0) - (a.at || 0))
      .slice(0, 6);
  }, [events]);

  return {
    playerId,
    playerColor,
    players,
    game,
    connected,
    orderedEvents,
    updateCursor,
    collectItem,
    solvePuzzle,
    goToRoom,
    resetGame,
  };
}
