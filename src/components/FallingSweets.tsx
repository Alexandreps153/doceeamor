import { useEffect, useState, type CSSProperties, type ReactElement } from "react";

/** Doces desenhados em SVG — caem lentamente, giram e ganham parallax. */

function Lollipop() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-full w-full">
      <path d="M32 38v22" stroke="var(--caramel)" strokeWidth="3" />
      <circle cx="32" cy="27" r="21" fill="var(--rose-deep)" />
      <path
        d="M20 22c8-10 21-8 25 1-7-4-13 8-23 8"
        fill="none"
        stroke="var(--cream)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.8"
      />
      <circle cx="25" cy="18" r="3" fill="white" opacity="0.8" />
    </svg>
  );
}

function Cupcake() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-full w-full">
      <path d="M18 30h28l-4 26H22L18 30Z" fill="var(--caramel)" />
      <path
        d="M32 6c8 0 13 5 13 11 0 5-3 8-3 12H22c0-4-3-7-3-12C19 11 24 6 32 6Z"
        fill="var(--rose)"
      />
      <circle cx="32" cy="7" r="4" fill="var(--rose-deep)" />
      <path d="M22 40h20" stroke="var(--cream)" strokeWidth="2" opacity="0.5" />
    </svg>
  );
}

function Brigadeiro() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-full w-full">
      <circle cx="32" cy="34" r="22" fill="var(--cocoa)" />
      <circle cx="24" cy="26" r="6" fill="var(--caramel)" opacity="0.45" />
      <g fill="var(--cream)" opacity="0.7">
        <circle cx="20" cy="40" r="2" />
        <circle cx="34" cy="46" r="2" />
        <circle cx="43" cy="30" r="2" />
        <circle cx="30" cy="20" r="1.6" />
      </g>
    </svg>
  );
}

function Bonbon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-full w-full">
      <path
        d="m8 25 10 7-10 7-4-5 6-2-6-2ZM56 25l-10 7 10 7 4-5-6-2 6-2Z"
        fill="var(--rose-deep)"
      />
      <rect x="13" y="19" width="38" height="26" rx="12" fill="var(--cocoa)" />
      <path
        d="M19 22c7 7 16 7 26 0"
        stroke="var(--caramel)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="25" cy="34" r="3" fill="var(--rose)" />
      <circle cx="39" cy="35" r="3" fill="var(--cream)" />
    </svg>
  );
}

function MiniCake() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-full w-full">
      <path d="M14 28h36l-4 27H18l-4-27Z" fill="var(--caramel)" />
      <path d="M12 29c1-11 9-17 20-17s19 6 20 17H12Z" fill="var(--rose)" />
      <path d="M20 38h24M22 47h20" stroke="var(--cream)" strokeWidth="2" opacity="0.7" />
      <circle cx="32" cy="11" r="4" fill="var(--strawberry)" />
    </svg>
  );
}

function SprinkleHeart() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-full w-full">
      <path
        d="M32 54C12 42 8 31 15 23c5-6 12-5 17 1 5-6 12-7 17-1 7 8 3 19-17 31Z"
        fill="var(--rose-deep)"
      />
      <g fill="var(--cream)">
        <rect x="21" y="28" width="3" height="8" rx="1.5" transform="rotate(-24 21 28)" />
        <rect x="31" y="35" width="3" height="8" rx="1.5" transform="rotate(22 31 35)" />
        <rect x="40" y="26" width="3" height="8" rx="1.5" transform="rotate(36 40 26)" />
      </g>
    </svg>
  );
}

function Strawberry() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-full w-full">
      <path
        d="M32 16c-10 0-20 7-18 18 2 13 12 23 18 25 6-2 16-12 18-25 2-11-8-18-18-18Z"
        fill="var(--strawberry)"
      />
      <path
        d="M32 18c-2-7-8-10-13-8 3 4 7 6 13 8ZM32 18c2-7 8-10 13-8-3 4-7 6-13 8Z"
        fill="var(--leaf)"
      />
      <g fill="var(--cream)" opacity="0.9">
        <circle cx="24" cy="28" r="1.7" />
        <circle cx="36" cy="27" r="1.7" />
        <circle cx="43" cy="35" r="1.7" />
        <circle cx="28" cy="42" r="1.7" />
        <circle cx="38" cy="47" r="1.7" />
      </g>
    </svg>
  );
}

function Candy() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-full w-full">
      <path d="m12 24 9 8-9 8-5-5 6-3-6-3Z" fill="var(--rose-deep)" />
      <path d="m52 24-9 8 9 8 5-5-6-3 6-3Z" fill="var(--rose)" />
      <rect x="15" y="20" width="34" height="24" rx="10" fill="var(--cream)" />
      <path
        d="M22 22v20M31 21v22M40 22v20"
        stroke="var(--strawberry)"
        strokeWidth="4"
        opacity="0.75"
      />
    </svg>
  );
}

function TruffleCone() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-full w-full">
      <path d="m17 27 30 0-7 31H24l-7-31Z" fill="var(--caramel)" />
      <path d="m21 32 22 0M23 39h18M26 47h12" stroke="var(--cocoa)" strokeWidth="2" opacity="0.4" />
      <path d="M14 28c0-14 8-21 18-21s18 7 18 21c-7 6-29 6-36 0Z" fill="var(--cocoa)" />
      <circle cx="26" cy="16" r="3" fill="var(--rose)" />
      <circle cx="39" cy="13" r="3" fill="var(--rose-deep)" />
    </svg>
  );
}

function Donut() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-full w-full">
      <ellipse cx="32" cy="34" rx="23" ry="18" fill="var(--caramel)" />
      <ellipse cx="32" cy="32" rx="12" ry="7" fill="var(--cream)" />
      <path d="M12 29c7-12 35-15 43 1-8-5-31-5-43 1Z" fill="var(--rose-deep)" opacity="0.9" />
      <path
        d="m23 24 3-4m8 3 2-5m7 8 4-3"
        stroke="var(--strawberry)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Macaron() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-full w-full">
      <ellipse cx="32" cy="25" rx="18" ry="10" fill="var(--rose-deep)" />
      <path d="M14 25c1 10 8 15 18 15s17-5 18-15c-10 5-26 5-36 0Z" fill="var(--rose)" />
      <ellipse cx="32" cy="40" rx="18" ry="9" fill="var(--rose-deep)" />
      <path d="M18 29h28M19 36h26" stroke="var(--cream)" strokeWidth="2" opacity="0.7" />
    </svg>
  );
}

function ChocolateBar() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-full w-full">
      <rect
        x="12"
        y="13"
        width="40"
        height="40"
        rx="6"
        fill="var(--cocoa)"
        transform="rotate(-9 32 32)"
      />
      <path
        d="M25 13v39M39 12v39M13 27h39M15 40h37"
        stroke="var(--caramel)"
        strokeWidth="2"
        opacity="0.55"
      />
    </svg>
  );
}

const shapes = [
  Lollipop,
  Cupcake,
  Brigadeiro,
  Bonbon,
  Strawberry,
  Candy,
  MiniCake,
  SprinkleHeart,
  Donut,
  Macaron,
  ChocolateBar,
];

type Sweet = {
  Shape: () => ReactElement;
  style: CSSProperties;
};

function buildSweets(count: number): Sweet[] {
  const sizes = [24, 30, 38, 46];
  const opacities = [0.2, 0.3, 0.4, 0.48];
  return Array.from({ length: count }, (_, i) => {
    const layer = i % 4;
    const size = (sizes[layer] ?? 34) + (i % 5) * 3;
    return {
      Shape: shapes[i % shapes.length] ?? Lollipop,
      style: {
        left: `${(i * 97) % 100}%`,
        width: size,
        height: size,
        opacity: opacities[layer] ?? 0.24,

        animationDuration: `${30 + (i % 9) * 3 - layer * 2}s`,
        animationDelay: `${-(i * 2.35).toFixed(1)}s`,
        ["--drift" as string]: `${((i % 7) - 3) * 5}vw`,
        ["--spin" as string]: `${(i % 2 === 0 ? 1 : -1) * (180 + (i % 4) * 90)}deg`,
        ["--depth" as string]: `${0.76 + layer * 0.12}`,
      } as CSSProperties,
    };
  });
}

export function FallingSweets() {
  const [sweets, setSweets] = useState<Sweet[]>([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compactLayout = window.matchMedia("(max-width: 640px)").matches;
    setSweets(buildSweets(reducedMotion ? 0 : compactLayout ? 6 : 10));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="sweet-field pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {sweets.map((sweet, i) => (
        <span key={i} className="sweet" style={sweet.style}>
          <sweet.Shape />
        </span>
      ))}
      <span className="sugar-dust sugar-dust-one" />
      <span className="sugar-dust sugar-dust-two" />
      <span className="floating-heart heart-one">♥</span>
      <span className="floating-heart heart-two">♥</span>
    </div>
  );
}
