// ---------------------------------------------------------------------------
// components/header/menu.tsx — full-screen MOBILE menu overlay.
//
// WHY THIS FILE EXISTS (split from header.tsx):
//   Header is the always-visible pill; Menu is the md:hidden overlay it opens.
//   Separated so the overlay (heavy blur + 5 links) is its own lazy chunk and
//   so responsive concerns don't tangle: header.tsx = desktop pill layout,
//   menu.tsx = mobile takeover. Both share `menuOpen` state lifted to index.tsx.
//
// ACCESSIBILITY CONTRACT:
//   - aria-hidden={!menuOpen} hides the closed overlay from screen readers.
//   - tabIndex={menuOpen ? 0 : -1} removes closed links from keyboard Tab order.
//   - aria-controls="firm-mobile-menu" on the hamburger points here (id match).
//   Break any of these and keyboard/SR users get trapped on invisible links.
// ---------------------------------------------------------------------------
import { component$ } from "@builder.io/qwik";
// JUNIOR: FIRM import = single source of truth (see routes/index.tsx). The
// "or call {phone}" line reads FIRM.phone so rebranding needs one edit.
import { FIRM } from "../../routes";

interface MenuProps {
  menuOpen: boolean;
  // AI NOTE: QRL callback — name MUST end in `$`. Qwik serializes the caller's
  // closure; a non-$ prop would fail the optimizer with "cannot serialize".
  onCloseMenu$: () => void;
}

/** Full-screen mobile menu — links centered, extends to bottom. */
export const Menu = component$<MenuProps>(
  ({ menuOpen, onCloseMenu$ }) => {
    return (
      // JUNIOR: opacity + pointer-events pattern (not display:none): keeps the
      // fade transition working. pointer-events-none when closed = clicks pass
      // through to the page; opacity-0 = invisible. md:hidden = never render
      // on desktop (the pill shows inline links instead).
      <div
        id="firm-mobile-menu"
        aria-hidden={!menuOpen}
        class={`fixed inset-0 z-40 flex flex-col bg-[#08090c]/95 backdrop-blur-xl transition-opacity duration-300 md:hidden ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        {/* JUNIOR: each link calls onCloseMenu$ so tapping a section closes the
            overlay before anchor-scrolling. Without this the overlay would
            cover the target section. tabIndex -1 when closed = skip in Tab. */}
        <nav aria-label="Mobile" class="flex flex-1 flex-col items-center justify-center gap-2 px-8 text-center">
          <a href="#practice" onClick$={onCloseMenu$} tabIndex={menuOpen ? 0 : -1} class="firm-display w-full max-w-sm rounded-2xl px-6 py-4 text-3xl font-extrabold tracking-tight text-white transition hover:bg-white/10">
            Practice
          </a>
          <a href="#voices" onClick$={onCloseMenu$} tabIndex={menuOpen ? 0 : -1} class="firm-display w-full max-w-sm rounded-2xl px-6 py-4 text-3xl font-extrabold tracking-tight text-white transition hover:bg-white/10">
            Clients
          </a>
          <a href="#outcomes" onClick$={onCloseMenu$} tabIndex={menuOpen ? 0 : -1} class="firm-display w-full max-w-sm rounded-2xl px-6 py-4 text-3xl font-extrabold tracking-tight text-white transition hover:bg-white/10">
            Outcomes
          </a>
          <a href="#contact" onClick$={onCloseMenu$} tabIndex={menuOpen ? 0 : -1} class="mt-4 w-full max-w-sm rounded-full bg-white px-8 py-4 text-sm font-semibold tracking-wide text-slate-950 transition hover:bg-[#f3e7cb]">
            Book a 30-min consultation
          </a>
          <a href={`tel:${FIRM.phone}`} tabIndex={menuOpen ? 0 : -1} class="firm-mono mt-2 text-xs text-slate-400 transition hover:text-white">
            or call {FIRM.phone}
          </a>
        </nav>
      </div>
    );
  },
);
