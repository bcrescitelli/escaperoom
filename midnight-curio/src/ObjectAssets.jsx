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
  return (
    <>
      <div className="backWall">
        <span className="wallLine lineOne" />
        <span className="wallLine lineTwo" />
      </div>
      <div className="floorPlane" />
      {room.id === 'parlor' && (
        <>
          <div className="sceneTrim parlorTrim" />
          <div className="wallSconce leftGlow" />
          <div className="wallSconce rightGlow" />
        </>
      )}
      {room.id === 'kitchen' && (
        <>
          <div className="tileStrip" />
          <div className="counterLine" />
        </>
      )}
      {room.id === 'attic' && (
        <>
          <div className="neonWire wireOne" />
          <div className="neonWire wireTwo" />
        </>
      )}
    </>
  );
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

function EnvelopeSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 180 120" aria-hidden="true">
      <path className="paperShadow" d="M18 22h144v76H18z" />
      <path className="paperFill" d="M16 18h148v78H16z" />
      <path className="inkStroke" d="M16 18l74 48 74-48M16 96l54-44M164 96l-54-44" />
      <circle className="waxSeal" cx="90" cy="65" r="12" />
    </svg>
  );
}

function MatchboxSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 180 90" aria-hidden="true">
      <rect className="redFill" x="18" y="20" width="144" height="50" rx="10" />
      <rect className="lightStroke noFill" x="28" y="28" width="124" height="34" rx="6" />
      <path className="goldStroke" d="M46 45h76" />
      <circle className="goldFill" cx="136" cy="45" r="5" />
    </svg>
  );
}

function CabinetSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 220 300" aria-hidden="true">
      <rect className="objectShadow" x="28" y="20" width="164" height="260" rx="20" />
      <rect className="woodFill" x="22" y="14" width="176" height="268" rx="22" />
      <rect className="woodDark" x="38" y="32" width="144" height="232" rx="12" />
      <path className="woodHighlight" d="M110 46v190" />
      <circle className="goldFill" cx="110" cy="148" r="9" />
      <path className="goldStroke" d="M78 112h64M78 184h64" />
      <rect className="lightStroke noFill" x="52" y="54" width="116" height="176" rx="16" />
      <path className="inkStroke" d="M110 36v220" />
    </svg>
  );
}

function PortraitSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 220 260" aria-hidden="true">
      <rect className="goldFrame" x="28" y="18" width="164" height="220" rx="10" />
      <rect className="portraitFill" x="44" y="34" width="132" height="188" rx="6" />
      <ellipse className="moonFill" cx="110" cy="110" rx="38" ry="48" />
      <path className="inkStroke" d="M90 104c7 8 14 8 21 0M132 104c-7 8-14 8-21 0" />
      <path className="lightStroke" d="M74 174c22-18 50-18 72 0" />
    </svg>
  );
}

function ClockSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 180 180" aria-hidden="true">
      <circle className="objectShadow" cx="93" cy="93" r="72" />
      <circle className="clockRim" cx="90" cy="86" r="70" />
      <circle className="clockFace" cx="90" cy="86" r="52" />
      <path className="inkFill" d="M104 61a23 23 0 1 0 20 35 25 25 0 1 1-20-35Z" />
      <path className="goldStroke" d="M90 86V50M90 86h32" />
      <circle className="goldFill" cx="90" cy="86" r="5" />
    </svg>
  );
}

function UmbrellaSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 200 260" aria-hidden="true">
      <path className="magentaFill" d="M44 116c0-52 28-84 63-84 30 0 50 28 50 84H44Z" />
      <path className="yellowFill" d="M88 116c0-42 24-70 54-70 25 0 42 25 42 70H88Z" />
      <path className="inkStroke" d="M109 116v104c0 13-18 13-18 0" />
      <path className="lightStroke" d="M44 116h113M88 116h96" />
    </svg>
  );
}

function CandlesSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 240 230" aria-hidden="true">
      {[56, 92, 130, 168].map((x, i) => (
        <g key={x}>
          <rect className="candleWax" x={x} y={80 - i * 10} width="24" height={118 + i * 10} rx="8" />
          <path className="candleShade" d={`M${x + 18} ${95 - i * 10}v92`} />
          <path className="flameOuter" d={`M${x + 12} ${52 - i * 10}c14 18 4 30-12 30-12 0-20-11-9-27 4-7 8-13 9-22 2 8 7 13 12 19Z`} />
          <path className="flameInner" d={`M${x + 12} ${62 - i * 10}c7 10 1 18-8 18-7 0-11-7-5-15 2-3 4-7 5-12 1 4 4 7 8 9Z`} />
        </g>
      ))}
      <path className="goldStroke" d="M42 198h152" />
    </svg>
  );
}

function TeacupsSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 220 160" aria-hidden="true">
      <path className="cupFill" d="M48 34h112c0 30-20 50-56 50S48 64 48 34Z" />
      <path className="inkStroke" d="M160 42c30-2 30 36 2 34" />
      <path className="cupFill" d="M42 74h122c0 30-22 50-61 50S42 104 42 74Z" />
      <path className="inkStroke" d="M164 82c32-2 34 38 2 36" />
      <path className="cupFill" d="M52 112h98c0 22-18 36-49 36s-49-14-49-36Z" />
      <path className="goldStroke" d="M42 34h118M42 74h122M52 112h98" />
    </svg>
  );
}

function DoorSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 190 300" aria-hidden="true">
      <rect className="objectShadow" x="34" y="18" width="122" height="266" rx="14" />
      <path className="doorFill" d="M42 20h106v260H42z" />
      <path className="lightStroke" d="M58 42h74v84H58zM58 150h74v96H58z" />
      <circle className="goldFill" cx="128" cy="142" r="7" />
      <path className="goldStroke" d="M138 281H30" />
    </svg>
  );
}

function RecipeSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 190 140" aria-hidden="true">
      <path className="paperShadow" d="M34 20h126v92H34z" />
      <path className="paperFill" d="M28 14h126v92H28z" />
      <path className="inkStroke" d="M48 42h72M48 62h88M48 82h52" />
      <path className="redStroke" d="M126 30l10 10 22-24" />
      <circle className="goldFill" cx="40" cy="28" r="5" />
    </svg>
  );
}

function ShelfSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 360 190" aria-hidden="true">
      <path className="woodFill" d="M24 144h312v18H24zM36 40h288v18H36z" />
      {[
        ['SALT', '7', 70, 'jarA'],
        ['SUGAR', '3', 140, 'jarB'],
        ['CHERRY', '5', 215, 'jarC'],
        ['OLIVE', '2', 285, 'jarD'],
      ].map(([label, number, x, cls]) => (
        <g key={label} className={cls}>
          <path className="jarGlass" d={`M${x - 24} 64h48l-6 74h-36z`} />
          <path className="goldFill" d={`M${x - 22} 52h44v14h-44z`} />
          <text className="svgLabel" x={x} y="100" textAnchor="middle">{label}</text>
          <text className="svgNumber" x={x} y="124" textAnchor="middle">{number}</text>
        </g>
      ))}
    </svg>
  );
}

function PantrySvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 220 320" aria-hidden="true">
      <rect className="objectShadow" x="30" y="16" width="160" height="284" rx="18" />
      <rect className="pantryFill" x="24" y="12" width="170" height="288" rx="18" />
      <path className="lightStroke" d="M46 44h126v72H46zM46 140h126v100H46z" />
      <rect className="lockBody" x="86" y="140" width="48" height="44" rx="10" />
      <path className="lockShackle" d="M98 140v-14c0-20 24-20 24 0v14" />
      <circle className="goldFill" cx="110" cy="162" r="5" />
    </svg>
  );
}

function SinkSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 230 150" aria-hidden="true">
      <path className="counterFill" d="M24 40h182v20H24z" />
      <path className="sinkFill" d="M54 54h118c0 42-20 70-59 70S54 96 54 54Z" />
      <path className="inkStroke" d="M115 40V20c0-16 30-16 30 0v8" />
      <path className="aquaStroke" d="M145 34c12 14 12 28 0 42" />
    </svg>
  );
}

function OlivesSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 180 160" aria-hidden="true">
      <ellipse className="bowlFill" cx="90" cy="106" rx="70" ry="34" />
      {[62, 86, 108, 124, 78].map((x, i) => (
        <g key={x}>
          <circle className="oliveFill" cx={x} cy={70 + (i % 2) * 10} r="18" />
          <circle className="redFill" cx={x + 4} cy={70 + (i % 2) * 10} r="5" />
        </g>
      ))}
      <path className="toothpick" d="M38 44l110 66" />
      <path className="flagFill" d="M45 47l38-16-2 28z" />
    </svg>
  );
}

function FridgeSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 240 190" aria-hidden="true">
      <rect className="fridgeFill" x="26" y="22" width="158" height="146" rx="14" />
      <path className="inkStroke" d="M26 82h158M164 42v26M164 104v38" />
      <rect className="magnetA" x="58" y="102" width="34" height="26" rx="6" />
      <rect className="magnetB" x="104" y="52" width="42" height="24" rx="6" />
    </svg>
  );
}

function MirrorWallSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 240 260" aria-hidden="true">
      <path className="mirrorFrame" d="M60 18h120l28 58-28 166H60L32 76z" />
      <path className="mirrorFill" d="M72 38h96l18 46-18 138H72L54 84z" />
      <path className="crackStroke" d="M120 40l-18 54 26 30-38 86M120 94l42-32M128 124l46 48" />
      <path className="ghostText" d="M82 118h78M86 148h62" />
    </svg>
  );
}

function StickySvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 180 140" aria-hidden="true">
      <path className="stickyFill" d="M30 20h120v92l-28 16H30z" />
      <path className="stickyFold" d="M122 112v16l28-16z" />
      <path className="inkStroke" d="M52 48h70M52 68h54M52 88h78" />
      <path className="redStroke" d="M132 42l-14 14M118 42l14 14" />
    </svg>
  );
}

function ArcadeSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 260 340" aria-hidden="true">
      <path className="objectShadow" d="M48 18h164l18 292H30z" />
      <path className="arcadeFill" d="M44 12h172l14 294H30z" />
      <rect className="screenFill" x="66" y="46" width="128" height="88" rx="12" />
      <text className="arcadeText" x="130" y="86" textAnchor="middle">9 2 1 6</text>
      <rect className="panelFill" x="64" y="164" width="132" height="62" rx="10" />
      <circle className="redFill" cx="92" cy="196" r="13" />
      <circle className="goldFill" cx="128" cy="196" r="13" />
      <circle className="aquaFill" cx="164" cy="196" r="13" />
      <path className="inkStroke" d="M64 256h132" />
      <path className="goldStroke" d="M86 24h88" />
    </svg>
  );
}

function RibbonSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 190 120" aria-hidden="true">
      <path className="ribbonFill" d="M20 38h98v42H20l20-21z" />
      <path className="ribbonDark" d="M118 38h52l-18 21 18 21h-52z" />
      <circle className="goldFill" cx="118" cy="59" r="10" />
      <text className="svgNumber" x="80" y="66" textAnchor="middle">B = 2</text>
    </svg>
  );
}

function OddDoorSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 220 320" aria-hidden="true">
      <path className="oddDoorFill" d="M48 18c46 18 78 18 124 0v282H48z" />
      <path className="lightStroke" d="M68 54c28 10 56 10 84 0v178H68z" />
      <rect className="keypadFill" x="128" y="132" width="36" height="62" rx="8" />
      <path className="goldStroke" d="M136 146h20M136 162h20M136 178h20" />
      <circle className="goldFill" cx="96" cy="158" r="7" />
    </svg>
  );
}

function ToyboxSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 240 160" aria-hidden="true">
      <path className="toyboxFill" d="M32 64h176v72H32z" />
      <path className="woodFill" d="M24 46h192v28H24z" />
      <path className="goldStroke" d="M52 88h136" />
      <path className="snakeFill" d="M66 40c26-28 58 24 84-4 24-24 46 8 30 24" />
      <circle className="inkFill" cx="176" cy="54" r="4" />
    </svg>
  );
}

function RecordSvg() {
  return (
    <svg className="assetSvg" viewBox="0 0 260 150" aria-hidden="true">
      <rect className="recordBase" x="24" y="24" width="210" height="100" rx="18" />
      <circle className="recordFill" cx="88" cy="74" r="42" />
      <circle className="goldFill" cx="88" cy="74" r="8" />
      <path className="armStroke" d="M158 40l42 28-30 26" />
      <circle className="needleFill" cx="170" cy="94" r="6" />
    </svg>
  );
}
