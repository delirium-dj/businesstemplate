// ---------------------------------------------------------------------------
// components/header/header.tsx — floating glass pill nav.
//
// LAYOUT CONTRACT: telephone LEFT, brand CENTER, links/hamburger RIGHT.
// The brand is absolutely centered (left-1/2 -translate-x-1/2) so it stays
// centered even though left/right slots have different widths. max-w-[46vw]
// + truncate keeps it from colliding with the side slots on tiny screens.
// Nav state (menuOpen) lives in the parent page; this component is stateless
// and receives it via props + QRL callbacks (the $ suffix = lazy-loaded).
// ---------------------------------------------------------------------------
import { component$ } from "@builder.io/qwik";
import { LogoMark } from "../logo/logo";
// JUNIOR: FIRM comes from src/routes/index.tsx — one source of truth for
// name/phone so header, footer, and hero can never disagree.
import { FIRM } from "../../routes";

interface HeaderProps {
  menuOpen: boolean;
  // AI NOTE: QRL props MUST end in `$` (onToggleMenu$) or Qwik's optimizer
  // cannot serialize them. A plain `onToggleMenu` prop would break the build.
  onToggleMenu$: () => void;
  onCloseMenu$: () => void;
}

/**
 * Floating glass pill navigation — tel left, brand center, links right.
 */
export const Header = component$<HeaderProps>(
  ({ menuOpen, onToggleMenu$, onCloseMenu$ }) => {
    return (
      <>
        <header class="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6 sm:px-6">
          <nav
            aria-label="Firm navigation"
            class="firm-nav-pill relative w-full max-w-6xl rounded-full px-4 py-2.5 text-base font-medium tracking-wide text-slate-300 sm:px-5 md:px-7 md:py-3 lg:text-lg"
          >
            <div class="flex items-center justify-between gap-3">
              <div class="flex shrink-0 items-center">
                <a
                  href={`tel:${FIRM.phone}`}
                  class="hidden rounded-full border border-white/20 bg-white/5 px-3 py-1.5 font-mono text-[11px] text-slate-300 transition hover:border-white/50 hover:text-white md:inline-block lg:px-4 lg:py-2 lg:text-xs"
                >
                  {FIRM.phone}
                </a>
                <a
                  href={`tel:${FIRM.phone}`}
                  aria-label={`Call ${FIRM.name} at ${FIRM.phone}`}
                  class="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-slate-200 transition hover:border-white/50 hover:text-white md:hidden"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </a>
              </div>
              <div class="absolute left-1/2 top-1/2 flex max-w-[46vw] -translate-x-1/2 -translate-y-1/2 items-center gap-2.5">
                <LogoMark size={28} class="shrink-0" />
                <a href="#top" class="firm-display truncate font-bold tracking-tight text-white lg:text-xl">
                  {FIRM.name}
                </a>
                <span class="firm-mono hidden text-xs text-slate-400 sm:inline">{FIRM.suffix}</span>
              </div>
              <div class="flex shrink-0 items-center gap-2">
                <div class="hidden items-center gap-6 md:flex lg:gap-8">
                  <a href="#practice" class="text-slate-400 transition hover:text-white">Practice</a>
                  <a href="#voices" class="text-slate-400 transition hover:text-white">Clients</a>
                  <a href="#outcomes" class="text-slate-400 transition hover:text-white">Outcomes</a>
                </div>
                <button
                  type="button"
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={menuOpen}
                  aria-controls="firm-mobile-menu"
                  onClick$={onToggleMenu$}
                  class="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-white/50 hover:bg-white/10 md:hidden"
                >
                  {menuOpen ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                      <path d="M4 7h16M4 12h16M4 17h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </nav>
        </header>
      </>
    );
  },
);
