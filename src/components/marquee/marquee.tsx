// ---------------------------------------------------------------------------
// components/marquee/marquee.tsx — scrolling services ribbon.
//
// WHY THIS FILE EXISTS:
//   Pinned to the hero bottom (see hero.tsx), this ribbon lists practice areas
//   + trust signals in an infinite CSS loop. Pure CSS animation (no JS timer),
//   so it costs ~0 JS bytes and runs on the compositor thread (no jank).
//   Content comes from MARQUEE in routes/index.tsx — edit strings there.
//
// HOW THE SEAMLESS LOOP WORKS (JUNIOR — read carefully):
//   [...MARQUEE, ...MARQUEE] renders the list TWICE side-by-side in a
//   width:max-content track. CSS animates translateX(0% -> -50%): when the
//   first copy scrolls fully out, the second copy is exactly where the first
//   started, so the loop restarts with no visible jump. Removing the duplication
//   breaks the loop (gap flash every 38s). Animation defined in styles.css
//   (.firm-marquee-track + @keyframes firmMarquee).
// ---------------------------------------------------------------------------
import { component$ } from "@builder.io/qwik";
// JUNIOR: MARQUEE = string[] from routes/index.tsx. Single source of truth —
// add/remove a service there and the ribbon updates (both copies) automatically.
import { MARQUEE } from "../../routes";

/** Scrolling services ribbon. Duplicated array for a seamless loop. */
export const Marquee = component$(() => {
  return (
    // JUNIOR: .firm-marquee-wrap:hover pauses the animation (see styles.css) so
    // users can read an item. border-y + bg-white/[0.02] = hairline ribbon look.
    <div class="firm-marquee-wrap overflow-hidden border-y border-white/10 bg-white/[0.02] py-4 backdrop-blur-sm">
      <div class="firm-marquee-track gap-10">
        {/* JUNIOR: key={i} is safe here (static list, never reordered). The gold
            "·" separator is decorative — text-[#d8b46a] uses the --firm-accent
            value inline; see styles.css tokens for theming. whitespace-nowrap
            keeps each phrase on one line so the track width stays stable. */}
        {[...MARQUEE, ...MARQUEE].map((item, i) => (
          <span key={i} class="firm-mono flex items-center gap-10 whitespace-nowrap text-xs uppercase tracking-widest text-slate-400">
            {item}
            <span class="text-[#d8b46a]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
});
