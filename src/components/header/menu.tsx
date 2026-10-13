import { component$ } from "@builder.io/qwik";
import { FIRM } from "../../routes";

interface MenuProps {
  menuOpen: boolean;
  onCloseMenu$: () => void;
}

/** Full-screen mobile menu — links centered, extends to bottom. */
export const Menu = component$<MenuProps>(
  ({ menuOpen, onCloseMenu$ }) => {
    return (
      <div
        id="firm-mobile-menu"
        aria-hidden={!menuOpen}
        class={`fixed inset-0 z-40 flex flex-col bg-[#08090c]/95 backdrop-blur-xl transition-opacity duration-300 md:hidden ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
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
