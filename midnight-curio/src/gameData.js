export const PLAYER_COLORS = [
  '#ff4d8d',
  '#55d6be',
  '#f7c948',
  '#8b5cf6',
  '#60a5fa',
  '#f97316',
];

export const inventoryCatalog = {
  brassKey: {
    id: 'brassKey',
    label: 'Brass Key',
    icon: 'key',
    description: 'Warm from the parlor cabinet. It has a tiny moon stamped into the handle.',
  },
  pantryCard: {
    id: 'pantryCard',
    label: 'Recipe Card',
    icon: 'card',
    description: 'A stained card with waxy ink that only behaves under the blacklight.',
  },
  mirrorShard: {
    id: 'mirrorShard',
    label: 'Mirror Shard',
    icon: 'mirror',
    description: 'A crescent of mirror. It reveals backwards writing when used in the attic.',
  },
  redToken: {
    id: 'redToken',
    label: 'Red Arcade Token',
    icon: 'token',
    description: 'A cherry-red token from the attic cabinet. It hums near the final door.',
  },
  velvetRibbon: {
    id: 'velvetRibbon',
    label: 'Velvet Ribbon',
    icon: 'ribbon',
    description: 'The ribbon ties the whole trail together. Its marked letter only appears under ultraviolet light.',
  },
};

export const puzzles = {
  parlorCabinet: {
    id: 'parlorCabinet',
    title: 'The Parlor Cabinet',
    prompt:
      'The cabinet wants three counts. The matchbox does not give numbers. It only gives the order of what to count.',
    blacklightPrompt:
      'Under blacklight, the matchbox symbols read: wick, crescent, hooked handle. Count those object types in the parlor and enter the three digits in that order.',
    placeholder: '3 digits',
    answer: ['412'],
    success: 'The cabinet latch clicks. Inside: a brass key and a note with the first final digit: 4.',
    hints: [
      'The matchbox is an ordering key, not the answer.',
      'One of the three symbols is easier to understand after the lights change.',
      'Do not count colors. Count object types.',
    ],
    grants: ['brassKey'],
    finalDigit: '4',
  },
  recipeLock: {
    id: 'recipeLock',
    title: 'The Pantry Lock',
    prompt:
      'The pantry lock wants the jars in the recipe card order. The card gives the order. The shelf gives the values.',
    blacklightPrompt:
      'The card says: coarse before sweet. red fruit before green bite. Use the jar values that appear under blacklight.',
    placeholder: '4 digits',
    answer: ['7352'],
    success: 'The pantry opens. You find a mirror shard and a second final digit: 7.',
    hints: [
      'The card is about order, not math.',
      'Some jar markings are not visible in normal light.',
      'Translate the card language back to the pantry labels before entering digits.',
    ],
    requires: ['brassKey', 'pantryCard'],
    grants: ['mirrorShard'],
    finalDigit: '7',
  },
  arcadeSequence: {
    id: 'arcadeSequence',
    title: 'The Cabinet Sequence',
    prompt:
      'The cabinet accepts numbers, but the note gives symbols. Find the translator before you guess.',
    blacklightPrompt:
      'Follow the pointing-hands note, then translate each symbol using the marked mirror legend.',
    placeholder: '4 digits',
    answer: ['9216'],
    success: 'The arcade cabinet coughs out a red token. A third final digit glows: 9.',
    hints: [
      'The screen is not showing a code anymore. It is showing what kind of answer it wants.',
      'The mirror has the translator, but only when the room is seen differently.',
      'The sticky note gives the sequence. The mirror gives the values.',
    ],
    requires: ['mirrorShard'],
    grants: ['redToken'],
    finalDigit: '9',
  },
  finalDoor: {
    id: 'finalDoor',
    title: 'The Odd Door',
    prompt:
      'The final lock wants the three earned room digits in order, then the ribbon mark converted into a number.',
    blacklightPrompt:
      'The ribbon mark is only visible under blacklight. Convert the marked letter into its alphabet position.',
    placeholder: 'Final code',
    answer: ['4792'],
    success:
      'The wallpaper peels open like a curtain. You escaped The Midnight Curio.',
    hints: [
      'The first three characters were awarded by solved locks, not random room objects.',
      'The ribbon supplies the last character, but not as a letter.',
      'Use the rooms in order.',
    ],
    requires: ['brassKey', 'mirrorShard', 'redToken', 'velvetRibbon'],
    ending: true,
  },
};

export const rooms = [
  {
    id: 'parlor',
    name: 'The Velvet Parlor',
    kicker: 'Room 1 of 3',
    mood: 'A search-and-find parlor where several clues hide better when the room looks normal.',
    objective: 'Use the blacklight, identify the matchbox order, and open the curio cabinet.',
    palette: 'parlor',
    nextRequirement: 'Solve the Parlor Cabinet to unlock the Kitchen.',
    hotspots: [
      {
        id: 'invitation',
        label: 'Wax-Sealed Envelope',
        x: 16,
        y: 78,
        w: 9,
        h: 9,
        shape: 'envelope',
        hiddenUntilBlacklight: true,
        title: 'The Invitation',
        body:
          'It looks like an old envelope, but the seal is too dark to read in normal light.',
        blacklightBody:
          'The seal blooms under blacklight: “The first lock begins with three things you can count. The box tells the order.”',
      },
      {
        id: 'matchbox',
        label: 'Red Matchbox',
        x: 43,
        y: 73,
        w: 8,
        h: 6,
        shape: 'matchbox',
        hiddenUntilBlacklight: true,
        title: 'Red Matchbox',
        body:
          'The matchbox label is almost rubbed away. You can make out three empty circles but not what they mean.',
        blacklightBody:
          'Three small symbols appear on the matchbox: a wick, a crescent, and a hooked handle.',
      },
      {
        id: 'cabinet',
        label: 'Locked Curio Cabinet',
        x: 63,
        y: 44,
        w: 18,
        h: 32,
        shape: 'cabinet',
        title: 'Locked Curio Cabinet',
        body:
          'A three-digit brass lock hangs from the cabinet. A tiny label reads: “Count the room. Trust the small red box.”',
        blacklightBody:
          'The brass lock has faint ultraviolet smudges around three tumblers, like someone entered the same three-count code many times.',
        puzzle: 'parlorCabinet',
      },
      {
        id: 'portrait',
        label: 'Blinking Portrait',
        x: 31,
        y: 21,
        w: 18,
        h: 23,
        shape: 'portrait',
        title: 'Blinking Portrait',
        body:
          'The painted eyes seem to follow the cabinet, but the frame gives you nothing useful. Rude.',
        blacklightBody:
          'Under blacklight, the portrait is covered in old fingerprints. None of them form a number. Suspicious, but not helpful.',
      },
      {
        id: 'clock',
        label: 'Moon Clock',
        x: 53,
        y: 18,
        w: 9,
        h: 12,
        shape: 'clock',
        title: 'Moon Clock',
        body:
          'The clock has one crescent moon on its face. It is stuck at 12:04, which feels accusatory.',
        blacklightBody:
          'The moon mark glows once, then fades. This feels countable, not readable.',
      },
      {
        id: 'umbrella1',
        label: 'Umbrella Stand',
        x: 81,
        y: 64,
        w: 10,
        h: 25,
        shape: 'umbrella',
        title: 'Umbrella Stand',
        body: 'Two umbrellas lean together. One has teeth painted on the handle.',
        blacklightBody:
          'The hooked handles glow faintly. There are two of them.',
      },
      {
        id: 'candleCluster',
        label: 'Candle Cluster',
        x: 10,
        y: 46,
        w: 18,
        h: 22,
        shape: 'candles',
        title: 'Mantel Candles',
        body: 'Four candles burn low. One flame bends toward the cabinet, even though there is no breeze.',
        blacklightBody:
          'The wax around the candle bases glows in four separate rings.',
      },
      {
        id: 'teacups',
        label: 'Stacked Teacups',
        x: 48,
        y: 55,
        w: 12,
        h: 14,
        shape: 'teacups',
        title: 'Stacked Teacups',
        body:
          'The cups are arranged from largest to smallest. You hear a tiny clink from inside, but nothing moves.',
        blacklightBody:
          'A few old tea stains glow, but not in any useful pattern.',
      },
    ],
  },
  {
    id: 'kitchen',
    name: 'The Whisper Kitchen',
    kicker: 'Room 2 of 3',
    mood: 'A midnight kitchen full of mislabeled jars, coded recipes, and aggressively suspicious olives.',
    objective: 'Find the hidden recipe card, reveal the jar values, and open the pantry.',
    palette: 'kitchen',
    nextRequirement: 'Solve the Pantry Lock to unlock the Attic Arcade.',
    lockedUntil: 'parlorCabinet',
    hotspots: [
      {
        id: 'kitchenDoor',
        label: 'Kitchen Door',
        x: 8,
        y: 24,
        w: 14,
        h: 48,
        shape: 'door',
        title: 'Kitchen Door',
        body:
          'The brass key fits. The next room smells like lemon peel, old wood, and someone’s bad decisions.',
        requires: ['brassKey'],
      },
      {
        id: 'recipeCard',
        label: 'Hidden Recipe Card',
        x: 43,
        y: 64,
        w: 12,
        h: 10,
        shape: 'recipe',
        hiddenUntilBlacklight: true,
        title: 'Recipe Card',
        body:
          'A waxy card is tucked partly under the counter lip. The writing looks blank in normal light.',
        blacklightBody:
          'The card reads: “coarse before sweet. red fruit before green bite.”',
        grants: ['pantryCard'],
      },
      {
        id: 'ingredientShelf',
        label: 'Ingredient Shelf',
        x: 26,
        y: 19,
        w: 42,
        h: 23,
        shape: 'shelf',
        title: 'Ingredient Shelf',
        body:
          'The jars are labeled SALT, SUGAR, CHERRY, and OLIVE, but the numbers have been scrubbed away.',
        blacklightBody:
          'Under blacklight, tiny marks appear on the jar bottoms: SALT 7, SUGAR 3, CHERRY 5, OLIVE 2.',
      },
      {
        id: 'pantry',
        label: 'Locked Pantry',
        x: 72,
        y: 24,
        w: 18,
        h: 53,
        shape: 'pantry',
        title: 'Locked Pantry',
        body:
          'A four-digit lock blocks the pantry. Someone scratched “read the card, not the room” into the paint.',
        blacklightBody:
          'The lock buttons are worn in four places. The order still needs to come from the card.',
        puzzle: 'recipeLock',
        requires: ['brassKey', 'pantryCard'],
      },
      {
        id: 'sink',
        label: 'Deep Sink',
        x: 30,
        y: 58,
        w: 17,
        h: 15,
        shape: 'sink',
        title: 'Deep Sink',
        body:
          'The faucet drips once every seven seconds. Dramatic, but not currently useful.',
        blacklightBody:
          'The water glows slightly. Still dramatic. Still not the answer.',
      },
      {
        id: 'oliveBowl',
        label: 'Olive Bowl',
        x: 58,
        y: 57,
        w: 11,
        h: 12,
        shape: 'olives',
        title: 'Olive Bowl',
        body:
          'An unreasonable number of olives. A toothpick flag is too stained to read.',
        blacklightBody:
          'The toothpick flag glows green around the word OLIVE.',
      },
      {
        id: 'fridge',
        label: 'Humming Fridge',
        x: 11,
        y: 75,
        w: 20,
        h: 15,
        shape: 'fridge',
        title: 'Fridge Magnet Poem',
        body:
          'The magnets spell “DON’T PANIC.” Then, very slowly, they spell “PANIC LATER.”',
        blacklightBody:
          'A hidden magnet says “not every message is a clue.” Rude but useful.',
      },
    ],
  },
  {
    id: 'attic',
    name: 'The Attic Arcade',
    kicker: 'Room 3 of 3',
    mood: 'A neon attic where symbols matter more than the machine wants to admit.',
    objective: 'Reveal the symbol sequence, translate it, collect the ribbon, and open the Odd Door.',
    palette: 'attic',
    nextRequirement: 'Solve the Cabinet Sequence, collect the ribbon, then open the Odd Door.',
    lockedUntil: 'recipeLock',
    hotspots: [
      {
        id: 'atticMirror',
        label: 'Cracked Mirror',
        x: 8,
        y: 17,
        w: 21,
        h: 31,
        shape: 'mirrorWall',
        title: 'Cracked Mirror',
        body:
          'The mirror shard catches the cracks, but the chalk marks are unreadable in normal light.',
        blacklightBody:
          'Under blacklight, the mirror reveals a legend: STAR = 9, EYE = 2, SNAKE = 1, MOON = 6.',
        requires: ['mirrorShard'],
      },
      {
        id: 'stickyNote',
        label: 'Hidden Pointing Note',
        x: 38,
        y: 18,
        w: 14,
        h: 11,
        shape: 'sticky',
        hiddenUntilBlacklight: true,
        title: 'Pointing Hands Note',
        body:
          'A square of old adhesive is almost invisible on the wall.',
        blacklightBody:
          'The note appears under blacklight: “The hands point in order: STAR → EYE → SNAKE → MOON.”',
      },
      {
        id: 'arcade',
        label: 'Hungry Arcade Cabinet',
        x: 58,
        y: 25,
        w: 22,
        h: 50,
        shape: 'arcade',
        title: 'Hungry Arcade Cabinet',
        body:
          'The screen flashes symbols, not numbers. It refuses to explain itself.',
        blacklightBody:
          'The cabinet edges glow around four symbol buttons. The machine is asking for a translated sequence, not the symbols themselves.',
        puzzle: 'arcadeSequence',
        requires: ['mirrorShard'],
      },
      {
        id: 'velvetRibbon',
        label: 'Hidden Velvet Ribbon',
        x: 83,
        y: 80,
        w: 10,
        h: 8,
        shape: 'ribbon',
        hiddenUntilBlacklight: true,
        title: 'Velvet Ribbon',
        body:
          'A dark ribbon lies against the dark floor. In normal light it nearly disappears.',
        blacklightBody:
          'The ribbon tag glows: “B.” Convert the letter if the final door asks for a number.',
        grants: ['velvetRibbon'],
      },
      {
        id: 'oddDoor',
        label: 'The Odd Door',
        x: 35,
        y: 39,
        w: 18,
        h: 43,
        shape: 'oddDoor',
        title: 'The Odd Door',
        body:
          'The final door has a four-character keypad. It is waiting for earned progress, not a clue you can simply spot.',
        blacklightBody:
          'A thin sentence glows on the keypad: “three trophies, then the ribbon.”',
        puzzle: 'finalDoor',
        requires: ['brassKey', 'mirrorShard', 'redToken', 'velvetRibbon'],
      },
      {
        id: 'toybox',
        label: 'Toybox',
        x: 15,
        y: 63,
        w: 18,
        h: 16,
        shape: 'toybox',
        title: 'Toybox',
        body:
          'Inside: a wooden snake, a plastic moon, and a note that just says “not everything is a clue.” Annoying but fair.',
        blacklightBody:
          'The wooden snake glows, but it is only confirming a symbol you have seen elsewhere.',
      },
      {
        id: 'recordPlayer',
        label: 'Dusty Record Player',
        x: 47,
        y: 77,
        w: 22,
        h: 12,
        shape: 'record',
        title: 'Dusty Record Player',
        body:
          'The record skips in three places. It seems to be echoing solved rooms, not giving away an answer.',
        blacklightBody:
          'A faint note on the sleeve says: “earned digits keep their room order.”',
      },
    ],
  },
];

export const initialGameState = {
  roomIndex: 0,
  inventory: {},
  solved: {},
  finalDigits: {},
  ending: false,
  startedAt: null,
};

export const normalizeAnswer = (value) =>
  value.toString().toLowerCase().replace(/[^a-z0-9]/g, '').trim();
