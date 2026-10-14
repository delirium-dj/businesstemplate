// ---------------------------------------------------------------------------
// components/logo/logo.tsx — professional firm mark (shield + HS monogram).
//
// WHY THIS FILE EXISTS:
//   The header, footer, and favicon must share ONE mark or the brand looks
//   amateur. This component is the single source of truth for the on-page
//   mark; public/favicon.svg is the same geometry on a dark rounded square
//   for browser tabs. Edit here to rebrand — header/footer pick it up.
//
// GEOMETRY (viewBox 0 0 64 64, transparent bg so it sits on any surface):
//   - Outer shield stroke #d8b46a (firm accent), hairline inner shield.
//   - "HS" serif monogram in #f5f2ea (readable at 20-32px in nav/footer).
//   - Gold rule + rotated-square diamond below the monogram.
// ---------------------------------------------------------------------------
import { component$ } from "@builder.io/qwik";

interface LogoMarkProps {
  size?: number;
  class?: string;
}

/** Shield + HS monogram. Transparent background — parent provides surface. */
export const LogoMark = component$<LogoMarkProps>(({ size = 28, class: cls }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label="Hale and Sterling LLP logo"
      class={cls}
    >
      <path
        d="M32 7 L50 14.5 V32.5 C50 43 42.5 51 32 55 C21.5 51 14 43 14 32.5 V14.5 Z"
        fill="rgba(216,180,106,0.10)"
        stroke="#d8b46a"
        stroke-width="3"
        stroke-linejoin="round"
      />
      <path
        d="M32 11.5 L46 17.5 V32.5 C46 40.5 40.5 46.8 32 50 C23.5 46.8 18 40.5 18 32.5 V17.5 Z"
        fill="none"
        stroke="#d8b46a"
        stroke-opacity="0.35"
        stroke-width="1.2"
      />
      <text
        x="32"
        y="36.5"
        text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="17"
        font-weight="700"
        letter-spacing="0.5"
        fill="#f5f2ea"
      >
        HS
      </text>
      <line x1="23" y1="41" x2="41" y2="41" stroke="#d8b46a" stroke-width="1.6" stroke-linecap="round" />
      <rect x="30.5" y="39.5" width="3" height="3" transform="rotate(45 32 41)" fill="#d8b46a" />
    </svg>
  );
});
