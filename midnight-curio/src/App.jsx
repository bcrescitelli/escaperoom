import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BadgeCheck,
  ChevronRight,
  Copy,
  DoorOpen,
  Eye,
  Flame,
  HelpCircle,
  KeyRound,
  MousePointer2,
  RotateCcw,
  Sparkles,
  Timer,
  Users,
  X,
} from 'lucide-react';
import { useEscapeRoom } from './useEscapeRoom';
import { inventoryCatalog, normalizeAnswer, puzzles, rooms } from './gameData';
import { BrandMark, ObjectAsset, SceneBackdrop } from './ObjectAssets';

const ROOM_QUERY_KEY = 'room';

function getInitialRoomCode() {
  const params = new URLSearchParams(window.location.search);
  return params.get(ROOM_QUERY_KEY) || localStorage.getItem('midnight-curio-room') || 'MIDNIGHT';
}

function getInitialName() {
  return localStorage.getItem('midnight-curio-name') || '';
}

export default function App() {
  const [name, setName] = useState(getInitialName);
  const [roomCode, setRoomCode] = useState(getInitialRoomCode);
  const [joined, setJoined] = useState(Boolean(getInitialName()));

  const join = () => {
    const cleanName = name.trim();
    const cleanRoom = (roomCode || 'MIDNIGHT').trim().toUpperCase().replace(/[^A-Z0-9-]/g, '');
    if (!cleanName) return;
    localStorage.setItem('midnight-curio-name', cleanName);
    localStorage.setItem('midnight-curio-room', cleanRoom);
    const url = new URL(window.location.href);
    url.searchParams.set(ROOM_QUERY_KEY, cleanRoom);
    window.history.replaceState({}, '', url.toString());
    setRoomCode(cleanRoom);
    setJoined(true);
  };

  if (!joined) {
    return (
      <JoinScreen
        name={name}
        roomCode={roomCode}
        setName={setName}
        setRoomCode={setRoomCode}
        join={join}
      />
    );
  }

  return <GameExperience playerName={name} roomCode={roomCode} leave={() => setJoined(false)} />;
}

function JoinScreen({ name, roomCode, setName, setRoomCode, join }) {
  return (
    <main className="joinShell">
      <div className="paperNoise" />
      <section className="joinCard">
        <div className="joinHeader">
          <BrandMark />
          <div className="joinStatus">live multiplayer room</div>
        </div>

        <div className="joinHero">
          <p className="kicker">A 30-minute collaborative escape room</p>
          <h1>The Midnight Curio</h1>
          <p className="joinLead">
            Search a strange apartment together, collect shared clues, and crack the final lock while everyone’s cursor moves through the same room.
          </p>
        </div>

        <div className="joinForm">
          <label>
            Your name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && join()}
              placeholder="Brandon"
              maxLength={24}
            />
          </label>
          <label>
            Room code
            <input
              value={roomCode}
              onChange={(event) => setRoomCode(event.target.value.toUpperCase())}
              onKeyDown={(event) => event.key === 'Enter' && join()}
              placeholder="MIDNIGHT"
              maxLength={18}
            />
          </label>
          <button className="primaryButton" onClick={join}>
            Enter room <ChevronRight size={18} />
          </button>
        </div>

        <div className="joinNotes">
          <span>Best on laptop</span>
          <span>Use FaceTime for audio</span>
          <span>Shared inventory</span>
          <span>Live cursors</span>
        </div>
      </section>
    </main>
  );
}

function GameExperience({ playerName, roomCode, leave }) {
  const {
    playerId,
    players,
    game,
    connected,
    orderedEvents,
    updateCursor,
    collectItem,
    solvePuzzle,
    resetGame,
  } = useEscapeRoom(roomCode, playerName);

  const maxUnlockedRoom = game.roomIndex || 0;
  const [activeRoomIndex, setActiveRoomIndex] = useState(maxUnlockedRoom);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [showReset, setShowReset] = useState(false);
  const [copied, setCopied] = useState(false);
  const stageRef = useRef(null);

  useEffect(() => {
    setActiveRoomIndex((current) => Math.min(Math.max(current, maxUnlockedRoom), rooms.length - 1));
  }, [maxUnlockedRoom]);

  useEffect(() => {
    if (game.ending) setSelectedHotspot(null);
  }, [game.ending]);

  const activeRoom = rooms[activeRoomIndex];
  const inventoryItems = Object.values(game.inventory || {});
  const playerList = Object.values(players || {});

  const shareUrl = useMemo(() => {
    const url = new URL(window.location.href);
    url.searchParams.set(ROOM_QUERY_KEY, roomCode);
    return url.toString();
  }, [roomCode]);

  const handleMouseMove = (event) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    updateCursor(Math.max(0, Math.min(100, x)), Math.max(0, Math.min(100, y)));
  };

  const copyRoom = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  if (game.ending) {
    return (
      <main className="victoryShell">
        <div className="confettiField">
          {Array.from({ length: 44 }).map((_, index) => (
            <span key={index} style={{ '--i': index }} />
          ))}
        </div>
        <section className="victoryCard">
          <BrandMark />
          <p className="kicker">Final lock solved</p>
          <h1>You escaped.</h1>
          <p>
            The Odd Door sighs open. Behind it: a perfectly ordinary hallway, which is somehow more unsettling. Take a victory screenshot and go enjoy the night.
          </p>
          <div className="victoryStats">
            <span><Users size={16} /> {playerList.length} players survived</span>
            <span><BadgeCheck size={16} /> {Object.keys(game.solved || {}).length} locks solved</span>
            <span><KeyRound size={16} /> {inventoryItems.length} objects collected</span>
          </div>
          <div className="victoryActions">
            <button className="secondaryButton dangerText" onClick={() => setShowReset(true)}>
              <RotateCcw size={16} /> Reset room
            </button>
            <button className="secondaryButton" onClick={leave}>
              <DoorOpen size={16} /> Leave room
            </button>
          </div>
        </section>
        {showReset && <ResetModal resetGame={resetGame} close={() => setShowReset(false)} />}
      </main>
    );
  }

  return (
    <main className="gameShell">
      <aside className="sidePanel leftPanel">
        <div className="brandBlock">
          <BrandMark compact />
          <p>A strange apartment. Three rooms. One extremely nosy group.</p>
        </div>

        <section className="panelSection">
          <div className="sectionTitle"><Users size={16} /> Players</div>
          <div className="playerList">
            {playerList.map((player) => (
              <div className="playerPill" key={player.id || player.name}>
                <span className="playerDot" style={{ background: player.color }} />
                <span>{player.name}</span>
              </div>
            ))}
          </div>
          <div className={`connection ${connected ? 'online' : 'offline'}`}>
            {connected ? 'Connected live' : 'Reconnecting'}
          </div>
        </section>

        <section className="panelSection">
          <div className="sectionTitle"><KeyRound size={16} /> Shared Inventory</div>
          <div className="inventoryGrid">
            {Object.keys(inventoryCatalog).map((itemId) => {
              const item = game.inventory?.[itemId];
              return (
                <div className={`inventorySlot ${item ? 'filled' : ''}`} key={itemId}>
                  <InventoryIcon type={inventoryCatalog[itemId].icon} />
                  <div>
                    <strong>{item ? item.label : 'Hidden item'}</strong>
                    <span>{item ? `Found by ${item.by || 'the group'}` : 'Not discovered yet'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </aside>

      <section className="centerStage">
        <header className="topBar">
          <div className="roomMeta">
            <span className="eyebrow">Shared room</span>
            <button className="roomCodeButton" onClick={copyRoom}>
              {roomCode} <Copy size={14} />
            </button>
            {copied && <span className="copiedToast">Link copied</span>}
          </div>

          <ProgressClock startedAt={game.startedAt} />

          <div className="topActions">
            <button className="topActionButton resetAction" onClick={() => setShowReset(true)}>
              <RotateCcw size={15} /> Reset room
            </button>
            <button className="topActionButton" onClick={leave}>
              <DoorOpen size={15} /> Leave room
            </button>
          </div>
        </header>

        <nav className="roomTabs" aria-label="Rooms">
          {rooms.map((room, index) => {
            const locked = index > maxUnlockedRoom;
            return (
              <button
                key={room.id}
                className={`roomTab ${activeRoomIndex === index ? 'active' : ''}`}
                disabled={locked}
                onClick={() => setActiveRoomIndex(index)}
              >
                <span className="roomNumber">{index + 1}</span>
                <span className="roomTabText">
                  <strong>{room.name}</strong>
                  <em>{locked ? 'Locked' : activeRoomIndex === index ? 'Active' : 'Unlocked'}</em>
                </span>
              </button>
            );
          })}
        </nav>

        <div className={`roomStage ${activeRoom.palette}`} ref={stageRef} onMouseMove={handleMouseMove}>
          <RoomArt room={activeRoom} game={game} openHotspot={setSelectedHotspot} />

          {playerList
            .filter((player) => player.id !== playerId && player.cursor)
            .map((player) => (
              <LiveCursor key={player.id} player={player} />
            ))}
        </div>
      </section>

      <aside className="sidePanel rightPanel">
        <section className="panelSection currentObjective">
          <div className="sectionTitle"><Eye size={16} /> Current Trail</div>
          <h3>{activeRoom.name}</h3>
          <p>{activeRoom.mood}</p>
          <div className="trailBox">
            <span>Next</span>
            {activeRoom.nextRequirement}
          </div>
        </section>

        <section className="panelSection">
          <div className="sectionTitle"><Sparkles size={16} /> Solve Feed</div>
          <div className="eventFeed">
            {orderedEvents.length === 0 && <p className="muted">Solved moments will appear here.</p>}
            {orderedEvents.map((event) => (
              <div className="eventItem" key={event.id}>
                <span style={{ background: event.color }} />
                <p>{event.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="panelSection finalDigits">
          <div className="sectionTitle"><Flame size={16} /> Final Digits</div>
          <div className="digitRow">
            {['parlorCabinet', 'recipeLock', 'arcadeSequence'].map((id) => (
              <span key={id} className={game.finalDigits?.[id] ? 'lit' : ''}>
                {game.finalDigits?.[id] || '•'}
              </span>
            ))}
            <span className={game.inventory?.velvetRibbon ? 'lit' : ''}>{game.inventory?.velvetRibbon ? 'B=2' : '•'}</span>
          </div>
        </section>
      </aside>

      {selectedHotspot && (
        <HotspotModal
          hotspot={selectedHotspot}
          game={game}
          close={() => setSelectedHotspot(null)}
          collectItem={collectItem}
          solvePuzzle={solvePuzzle}
        />
      )}
      {showReset && <ResetModal resetGame={resetGame} close={() => setShowReset(false)} />}
    </main>
  );
}

function RoomArt({ room, game, openHotspot }) {
  return (
    <div className={`tableau tableau-${room.id}`}>
      <SceneBackdrop room={room} />
      <div className="roomTitlePlate">
        <span>{room.kicker}</span>
        <h2>{room.name}</h2>
        <p>{room.objective}</p>
      </div>

      {room.hotspots.map((hotspot) => {
        const solved = hotspot.puzzle && game.solved?.[hotspot.puzzle];
        const collected = hotspot.grants?.every((id) => game.inventory?.[id]);
        return (
          <button
            key={hotspot.id}
            className={`hotspot asset-${hotspot.shape} ${solved ? 'solved' : ''} ${collected ? 'collected' : ''}`}
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%`, width: `${hotspot.w}%`, height: `${hotspot.h}%` }}
            onClick={() => openHotspot(hotspot)}
            aria-label={hotspot.label}
          >
            <ObjectAsset type={hotspot.shape} />
            <span className="hotspotLabel">{hotspot.label}</span>
            {(solved || collected) && <span className="objectStatus">{solved ? 'Solved' : 'Found'}</span>}
          </button>
        );
      })}
    </div>
  );
}

function HotspotModal({ hotspot, game, close, collectItem, solvePuzzle }) {
  const puzzle = hotspot.puzzle ? puzzles[hotspot.puzzle] : null;
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [hintIndex, setHintIndex] = useState(-1);
  const solved = puzzle && game.solved?.[puzzle.id];

  const requirements = hotspot.requires || puzzle?.requires || [];
  const missing = requirements.filter((itemId) => !game.inventory?.[itemId]);
  const collectibleIds = (hotspot.grants || []).filter((itemId) => !game.inventory?.[itemId]);

  const submitAnswer = async () => {
    if (!puzzle) return;
    if (missing.length) {
      setError(`You still need: ${missing.map((id) => inventoryCatalog[id]?.label || id).join(', ')}`);
      return;
    }
    const normalized = normalizeAnswer(answer);
    if (puzzle.answer.map(normalizeAnswer).includes(normalized)) {
      await solvePuzzle(puzzle);
      setError('');
    } else {
      setError('Not quite. Re-check the clue order and try again.');
    }
  };

  const takeItems = async () => {
    for (const itemId of collectibleIds) {
      await collectItem(itemId);
    }
  };

  return (
    <div className="modalScrim" onMouseDown={close}>
      <section className="modalCard" onMouseDown={(event) => event.stopPropagation()}>
        <button className="closeButton" onClick={close} aria-label="Close"><X size={18} /></button>
        <span className="modalEyebrow">Object inspected</span>
        <h2>{hotspot.title}</h2>
        <p>{hotspot.body}</p>

        {missing.length > 0 && (
          <div className="lockedNotice">
            <KeyRound size={16} /> Needs {missing.map((id) => inventoryCatalog[id]?.label || id).join(', ')}
          </div>
        )}

        {collectibleIds.length > 0 && missing.length === 0 && (
          <button className="primaryButton" onClick={takeItems}>
            Add to shared inventory
          </button>
        )}

        {puzzle && (
          <div className="puzzleBox">
            <h3>{puzzle.title}</h3>
            {solved ? (
              <div className="solvedBox">
                <BadgeCheck size={18} />
                <span>{puzzle.success}</span>
              </div>
            ) : (
              <>
                <p>{puzzle.prompt}</p>
                <div className="answerRow">
                  <input
                    value={answer}
                    onChange={(event) => setAnswer(event.target.value)}
                    onKeyDown={(event) => event.key === 'Enter' && submitAnswer()}
                    placeholder={puzzle.placeholder}
                    disabled={missing.length > 0}
                  />
                  <button onClick={submitAnswer} disabled={missing.length > 0}>Try</button>
                </div>
                {error && <div className="errorText">{error}</div>}
                <button className="hintButton" onClick={() => setHintIndex((current) => Math.min(current + 1, (puzzle.hints?.length || 1) - 1))}>
                  <HelpCircle size={15} /> Need a hint
                </button>
                {hintIndex >= 0 && puzzle.hints?.[hintIndex] && (
                  <div className="hintBox">{puzzle.hints[hintIndex]}</div>
                )}
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

function InventoryIcon({ type }) {
  return <span className={`inventoryIcon icon-${type}`} />;
}

function LiveCursor({ player }) {
  const stale = Date.now() - (player.cursor?.t || 0) > 10000;
  return (
    <div
      className={`liveCursor ${stale ? 'stale' : ''}`}
      style={{ left: `${player.cursor.x}%`, top: `${player.cursor.y}%`, '--cursor': player.color }}
    >
      <MousePointer2 size={18} fill="currentColor" />
      <span>{player.name}</span>
    </div>
  );
}

function ProgressClock({ startedAt }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);
  const elapsed = Math.max(0, Math.floor((now - (startedAt || now)) / 1000));
  const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const seconds = String(elapsed % 60).padStart(2, '0');
  const target = elapsed <= 1800 ? '30 min target' : 'overtime';
  return (
    <div className="clockPill">
      <Timer size={16} /> {minutes}:{seconds} <span>{target}</span>
    </div>
  );
}

function ResetModal({ resetGame, close }) {
  const [confirming, setConfirming] = useState(false);
  const doReset = async () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    await resetGame();
    close();
  };
  return (
    <div className="modalScrim" onMouseDown={close}>
      <section className="modalCard compact" onMouseDown={(event) => event.stopPropagation()}>
        <button className="closeButton" onClick={close} aria-label="Close"><X size={18} /></button>
        <span className="modalEyebrow">Shared action</span>
        <h2>Reset this room?</h2>
        <p>This clears shared inventory, solved locks, final progress, and the solve feed for everyone in this room code.</p>
        <button className="primaryButton danger" onClick={doReset}>
          {confirming ? 'Yes, reset it' : 'Reset game'}
        </button>
      </section>
    </div>
  );
}
