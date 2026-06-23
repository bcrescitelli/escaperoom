export function BrandMark({ compact = false }) {
  return (
    <div className={`brandMark ${compact ? 'compact' : ''}`}>
      <span className="brandIcon" aria-hidden="true">
        <svg viewBox="0 0 48 32">
          <rect x="2" y="2" width="44" height="28" rx="8" />
          <circle cx="24" cy="16" r="5" />
          <path d="M7 16h7M34 16h7" />
        </svg>
      </span>
      <span>The Midnight Curio</span>
    </div>
  );
}

export function SceneBackdrop({ room }) {
  if (room.id === 'kitchen') return <KitchenBackdrop />;
  if (room.id === 'attic') return <AtticBackdrop />;
  return <ParlorBackdrop />;
}

export function ObjectAsset({ type }) {
  const components = {
    envelope: <EnvelopeSvg />,
    matchbox: <MatchboxSvg />,
    cabinet: <CabinetSvg />,
    portrait: <PortraitSvg />,
    clock: <ClockSvg />,
    umbrella: <UmbrellaSvg />,
    candles: <CandlesSvg />,
    teacups: <TeacupsSvg />,
    door: <DoorSvg />,
    recipe: <RecipeSvg />,
    shelf: <ShelfSvg />,
    pantry: <PantrySvg />,
    sink: <SinkSvg />,
    olives: <OlivesSvg />,
    fridge: <FridgeSvg />,
    mirrorWall: <MirrorWallSvg />,
    sticky: <StickySvg />,
    arcade: <ArcadeSvg />,
    ribbon: <RibbonSvg />,
    oddDoor: <OddDoorSvg />,
    toybox: <ToyboxSvg />,
    record: <RecordSvg />,
  };
  return <span className="assetWrap">{components[type] || <EnvelopeSvg />}</span>;
}

function ParlorBackdrop() {
  return (
    <div className="backdrop backdropParlor">
      <div className="wallpaper" />
      <div className="crownLine" />
      <div className="chairRail" />
      <div className="baseboard" />
      <div className="parlorFrame frameA" />
      <div className="parlorFrame frameB" />
      <div className="rug rugParlor" />
      <div className="plinth plinthLeft" />
      <div className="plinth plinthRight" />
      <div className="lightBloom bloomLeft" />
      <div className="lightBloom bloomRight" />
    </div>
  );
}

function KitchenBackdrop() {
  return (
    <div className="backdrop backdropKitchen">
      <div className="tileWall" />
      <div className="counterBand" />
      <div className="counterShadow" />
      <div className="shelfGhost" />
      <div className="shelfGhost ghostTwo" />
      <div className="rug rugKitchen" />
      <div className="lightBloom kitchenGlow" />
    </div>
  );
}

function AtticBackdrop() {
  return (
    <div className="backdrop backdropAttic">
      <div className="roofSlope roofLeft" />
      <div className="roofSlope roofRight" />
      <div className="atticBack" />
      <div className="neonLine neonOne" />
      <div className="neonLine neonTwo" />
      <div className="crate crateA" />
      <div className="crate crateB" />
      <div className="rug rugAttic" />
      <div className="lightBloom atticGlow" />
    </div>
  );
}

function EnvelopeSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 200 130" aria-hidden="true">
      <ellipse className="assetShadow" cx="100" cy="112" rx="74" ry="12" />
      <rect className="paperMain" x="24" y="24" width="152" height="84" rx="14" />
      <path className="paperFold" d="M24 36l76 44 76-44" />
      <path className="paperFold" d="M24 108l54-40M176 108l-54-40" />
      <path className="paperLining" d="M34 34h132l-66 38Z" />
      <circle className="sealMain" cx="100" cy="73" r="14" />
      <path className="sealMark" d="M94 73c3-4 9-4 12 0-2 4-8 6-12 0Z" />
    </svg>
  );
}

function MatchboxSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 200 110" aria-hidden="true">
      <ellipse className="assetShadow" cx="100" cy="92" rx="70" ry="11" />
      <rect className="matchOuter" x="24" y="26" width="152" height="58" rx="14" />
      <rect className="matchInner" x="35" y="35" width="130" height="40" rx="10" />
      <path className="matchLabel" d="M52 55h54" />
      <path className="matchLabel" d="M52 65h34" />
      <circle className="matchDot" cx="138" cy="55" r="8" />
      <path className="matchStriker" d="M40 85h120" />
    </svg>
  );
}

function CabinetSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 240 340" aria-hidden="true">
      <ellipse className="assetShadow" cx="120" cy="312" rx="82" ry="16" />
      <path className="cabinetTop" d="M58 34h124l10 18H48z" />
      <path className="cabinetBody" d="M48 52h144v236c0 12-10 22-22 22H70c-12 0-22-10-22-22z" />
      <rect className="cabinetInset" x="64" y="74" width="112" height="196" rx="20" />
      <path className="cabinetDoorLine" d="M120 78v188" />
      <rect className="cabinetPanel" x="78" y="92" width="84" height="72" rx="18" />
      <rect className="cabinetPanel" x="78" y="176" width="84" height="74" rx="18" />
      <circle className="brassMain" cx="120" cy="170" r="10" />
      <path className="brassSmallStroke" d="M93 170h54" />
      <path className="cabinetLeg" d="M72 306v12M168 306v12" />
    </svg>
  );
}

function PortraitSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 240 310" aria-hidden="true">
      <ellipse className="assetShadow" cx="120" cy="284" rx="70" ry="14" />
      <rect className="frameMain" x="36" y="26" width="168" height="230" rx="18" />
      <rect className="frameInner" x="52" y="42" width="136" height="198" rx="14" />
      <ellipse className="portraitFace" cx="120" cy="116" rx="34" ry="46" />
      <path className="portraitHair" d="M88 110c0-26 14-46 34-46 22 0 38 19 38 50-12-12-26-14-38-14-14 0-22 2-34 10Z" />
      <path className="portraitEye" d="M99 118c6 3 11 3 16 0" />
      <path className="portraitEye" d="M125 118c6 3 11 3 16 0" />
      <path className="portraitMouth" d="M108 144c8 7 16 7 24 0" />
      <path className="portraitCollar" d="M86 196c18-18 52-18 70 0" />
    </svg>
  );
}

function ClockSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 190 190" aria-hidden="true">
      <ellipse className="assetShadow" cx="95" cy="168" rx="48" ry="10" />
      <circle className="clockOuter" cx="95" cy="92" r="66" />
      <circle className="clockFace" cx="95" cy="92" r="52" />
      <path className="moonMain" d="M107 63a22 22 0 1 0 18 34 24 24 0 1 1-18-34Z" />
      <path className="clockTick" d="M95 48v10M95 126v10M51 92h10M129 92h10" />
      <path className="clockHand" d="M95 92V67M95 92l27 12" />
      <circle className="brassMain" cx="95" cy="92" r="5" />
    </svg>
  );
}

function UmbrellaSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 220 320" aria-hidden="true">
      <ellipse className="assetShadow" cx="110" cy="300" rx="58" ry="12" />
      <path className="umbrellaCanopyOne" d="M52 118c8-46 32-74 62-74 34 0 58 28 66 74H52Z" />
      <path className="umbrellaCanopyTwo" d="M96 104c6-36 26-58 52-58 28 0 48 22 54 58H96Z" />
      <path className="umbrellaStem" d="M114 118v126c0 12-16 14-16 0" />
      <path className="umbrellaStem" d="M148 104v104" />
      <path className="umbrellaStand" d="M76 256h84l-8 24H84z" />
    </svg>
  );
}

function CandlesSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 250 240" aria-hidden="true">
      <ellipse className="assetShadow" cx="124" cy="212" rx="86" ry="14" />
      <path className="candlePlate" d="M50 198h148" />
      {[64, 98, 132, 166].map((x, i) => (
        <g key={x}>
          <rect className="candleWax" x={x} y={84 - i * 10} width="22" height={114 + i * 10} rx="10" />
          <path className="candleWaxLine" d={`M${x + 15} ${94 - i * 10}v84`} />
          <path className="flameOuter" d={`M${x + 11} ${56 - i * 10}c10 10 14 20 14 27 0 9-6 15-14 15s-14-6-14-15c0-9 8-17 14-27Z`} />
          <path className="flameInner" d={`M${x + 11} ${66 - i * 10}c6 7 8 12 8 17 0 5-3 9-8 9s-8-4-8-9c0-6 5-10 8-17Z`} />
        </g>
      ))}
    </svg>
  );
}

function TeacupsSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 220 180" aria-hidden="true">
      <ellipse className="assetShadow" cx="110" cy="160" rx="70" ry="12" />
      <path className="cupSaucer" d="M44 138c14 12 118 12 132 0" />
      <path className="cupMain" d="M50 38h110c0 28-22 46-55 46S50 66 50 38Z" />
      <path className="cupHandle" d="M160 46c18 0 24 10 24 20s-8 18-18 18" />
      <path className="cupMain" d="M40 84h122c0 28-24 46-61 46S40 112 40 84Z" />
      <path className="cupHandle" d="M162 92c18 0 24 10 24 20s-8 18-18 18" />
      <path className="cupRim" d="M50 38h110M40 84h122" />
    </svg>
  );
}

function DoorSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 210 330" aria-hidden="true">
      <ellipse className="assetShadow" cx="104" cy="304" rx="70" ry="14" />
      <path className="doorMain" d="M44 22h122c10 0 18 8 18 18v248H44z" />
      <rect className="doorPanel" x="62" y="56" width="84" height="74" rx="14" />
      <rect className="doorPanel" x="62" y="150" width="84" height="94" rx="14" />
      <circle className="brassMain" cx="148" cy="154" r="7" />
      <path className="doorThreshold" d="M34 292h148" />
    </svg>
  );
}

function RecipeSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 200 150" aria-hidden="true">
      <ellipse className="assetShadow" cx="100" cy="132" rx="62" ry="10" />
      <path className="paperMain" d="M42 16h114v104H42z" />
      <path className="paperCorner" d="M126 16h30v28" />
      <path className="noteLine" d="M58 44h68M58 64h80M58 84h56" />
      <path className="recipeCheck" d="M130 48l10 10 18-20" />
      <circle className="brassMain" cx="54" cy="28" r="5" />
    </svg>
  );
}

function ShelfSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 380 200" aria-hidden="true">
      <ellipse className="assetShadow" cx="190" cy="176" rx="120" ry="12" />
      <path className="shelfWood" d="M24 52h332v18H24zM24 146h332v18H24z" />
      {[['SALT', '7', 68], ['SUGAR', '3', 148], ['CHERRY', '5', 232], ['OLIVE', '2', 312]].map(([label, number, x]) => (
        <g key={label}>
          <path className="jarMain" d={`M${x - 26} 74h52l-5 56h-42z`} />
          <path className="jarLid" d={`M${x - 24} 62h48v12h-48z`} />
          <text className="jarLabelText" x={x} y="96" textAnchor="middle">{label}</text>
          <text className="jarNumberText uvText" x={x} y="118" textAnchor="middle">{number}</text>
        </g>
      ))}
    </svg>
  );
}

function PantrySvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 230 330" aria-hidden="true">
      <ellipse className="assetShadow" cx="115" cy="306" rx="78" ry="14" />
      <path className="pantryMain" d="M34 18h162v270c0 14-12 24-24 24H58c-14 0-24-10-24-24z" />
      <rect className="pantryPanel" x="52" y="42" width="126" height="78" rx="12" />
      <rect className="pantryPanel" x="52" y="140" width="126" height="128" rx="12" />
      <rect className="pantryLock" x="86" y="148" width="44" height="42" rx="10" />
      <path className="pantryShackle" d="M96 148v-14c0-18 24-18 24 0v14" />
      <circle className="brassMain" cx="108" cy="168" r="5" />
    </svg>
  );
}

function SinkSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 240 170" aria-hidden="true">
      <ellipse className="assetShadow" cx="120" cy="150" rx="78" ry="12" />
      <path className="counterMain" d="M30 40h180v22H30z" />
      <path className="sinkMain" d="M60 54h120c0 48-22 74-60 74S60 102 60 54Z" />
      <path className="faucetMain" d="M110 40V20c0-16 34-16 34 0v10" />
      <path className="waterDrop" d="M146 48c8 10 10 20 10 26 0 10-6 18-12 18s-12-8-12-18c0-8 6-14 14-26Z" />
    </svg>
  );
}

function OlivesSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 190 170" aria-hidden="true">
      <ellipse className="assetShadow" cx="95" cy="148" rx="60" ry="10" />
      <ellipse className="bowlMain" cx="95" cy="112" rx="62" ry="26" />
      {[56, 80, 100, 122, 138].map((x, i) => (
        <g key={x}>
          <ellipse className="oliveMain" cx={x} cy={84 + (i % 2) * 10} rx="15" ry="14" />
          <circle className="olivePimento" cx={x + 3} cy={84 + (i % 2) * 10} r="4" />
        </g>
      ))}
      <path className="pickMain" d="M44 48l96 62" />
      <path className="flagMain" d="M48 48l34-14-2 26Z" />
    </svg>
  );
}

function FridgeSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 230 200" aria-hidden="true">
      <ellipse className="assetShadow" cx="112" cy="180" rx="68" ry="12" />
      <rect className="fridgeMain" x="38" y="18" width="140" height="150" rx="16" />
      <path className="fridgeSplit" d="M38 88h140" />
      <path className="fridgeHandle" d="M158 40v24M158 106v34" />
      <rect className="magnetMainA" x="62" y="104" width="34" height="24" rx="6" />
      <rect className="magnetMainB" x="104" y="48" width="44" height="24" rx="6" />
    </svg>
  );
}

function MirrorWallSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 240 290" aria-hidden="true">
      <ellipse className="assetShadow" cx="120" cy="264" rx="78" ry="14" />
      <path className="mirrorFrameMain" d="M64 20h112l24 58-24 178H64L40 78z" />
      <path className="mirrorGlass" d="M78 40h84l16 42-16 154H78L62 82z" />
      <path className="mirrorCrack" d="M122 42l-18 52 22 28-34 74M122 90l42-28M126 126l42 44" />
      <path className="mirrorScript uvInk" d="M88 118h64M92 146h58" />
    </svg>
  );
}

function StickySvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 180 160" aria-hidden="true">
      <ellipse className="assetShadow" cx="90" cy="140" rx="56" ry="10" />
      <path className="stickyMain" d="M34 22h112v94l-24 20H34z" />
      <path className="stickyFoldMain" d="M122 116v20l24-20z" />
      <path className="noteLine uvInk" d="M56 52h70M56 74h52M56 96h74" />
      <path className="stickyCross" d="M118 48l18 18M136 48l-18 18" />
    </svg>
  );
}

function ArcadeSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 260 350" aria-hidden="true">
      <ellipse className="assetShadow" cx="130" cy="328" rx="82" ry="14" />
      <path className="arcadeMain" d="M54 18h152l16 292H38z" />
      <rect className="arcadeScreen" x="74" y="48" width="112" height="82" rx="12" />
      <text className="arcadeScreenText" x="130" y="96" textAnchor="middle">PLAY?</text>
      <path className="arcadePanel" d="M72 162h116l-10 54H82z" />
      <circle className="arcadeBtnRed" cx="96" cy="188" r="12" />
      <circle className="arcadeBtnGold" cx="130" cy="188" r="12" />
      <circle className="arcadeBtnTeal" cx="164" cy="188" r="12" />
      <path className="arcadeCoin" d="M88 242h84" />
    </svg>
  );
}

function RibbonSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 190 120" aria-hidden="true">
      <ellipse className="assetShadow" cx="95" cy="100" rx="58" ry="10" />
      <path className="ribbonMain" d="M24 34h92v42H24l18-21z" />
      <path className="ribbonTail" d="M116 34h52l-18 21 18 21h-52z" />
      <circle className="brassMain" cx="116" cy="55" r="10" />
      <text className="ribbonText uvText" x="76" y="62" textAnchor="middle">B = 2</text>
    </svg>
  );
}

function OddDoorSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 220 330" aria-hidden="true">
      <ellipse className="assetShadow" cx="110" cy="306" rx="76" ry="14" />
      <path className="oddDoorMain" d="M48 22c44 16 80 16 124 0v270H48z" />
      <path className="oddDoorInset" d="M68 60c28 8 56 8 84 0v170H68z" />
      <rect className="keypadMain" x="128" y="134" width="34" height="64" rx="8" />
      <path className="keypadLines" d="M136 148h18M136 164h18M136 180h18" />
      <circle className="brassMain" cx="96" cy="164" r="7" />
    </svg>
  );
}

function ToyboxSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 240 180" aria-hidden="true">
      <ellipse className="assetShadow" cx="120" cy="156" rx="80" ry="12" />
      <path className="toyboxBody" d="M38 72h164v68H38z" />
      <path className="toyboxLid" d="M28 48h184v28H28z" />
      <path className="toySnake" d="M66 44c22-22 52 22 82 0 22-16 40 2 28 18" />
      <path className="toyboxLine" d="M56 100h128" />
    </svg>
  );
}

function RecordSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 260 170" aria-hidden="true">
      <ellipse className="assetShadow" cx="130" cy="148" rx="80" ry="12" />
      <rect className="recordBase" x="24" y="28" width="200" height="92" rx="18" />
      <circle className="recordDisc" cx="90" cy="74" r="38" />
      <circle className="brassMain" cx="90" cy="74" r="8" />
      <path className="recordArm" d="M156 42l40 24-28 28" />
      <circle className="recordNeedle" cx="166" cy="94" r="6" />
    </svg>
  );
}
