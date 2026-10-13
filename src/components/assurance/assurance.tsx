// ---------------------------------------------------------------------------
// components/assurance/assurance.tsx — DESIRE section: sticky stacked cards.
//
// WHY THIS FILE EXISTS:
//   "Why owners stay" trust builders (partner continuity, fee letter, trial
//   readiness). Sticky stacking (each card pins while the next slides over)
//   creates a physical "pile of commitments" feeling. Data (ASSURANCES) lives
//   in routes/index.tsx; scroll position (`stacked`) is owned by index.tsx and
//   passed as a plain number prop (one-way: page -> card, no callbacks needed).
//
// HOW STACKING WORKS (JUNIOR):
//   .firm-stack-card { position:sticky; top:110px } (styles.css) pins each card
//   110px below viewport top (clears the fixed nav). style={{zIndex: i+1}}
//   layers later cards ABOVE earlier ones. transform scale(1-(stacked-i)*0.02)
//   shrinks buried cards 2% per level = depth cue. data-active/data-dim let
//   future CSS dim buried cards without JS changes.
// ---------------------------------------------------------------------------
import { component$ } from "@builder.io/qwik";
// JUNIOR: ASSURANCES = 3 trust-builder objects from routes/index.tsx. Add a 4th
// there and this map renders a 4th sticky card with correct numbering (0{i+1}).
import { ASSURANCES } from "../../routes";

/** Sticky stacked assurance cards. Index drives elevation + dim. */
export const Assurance = component$<{ stacked: number }>(({ stacked }) => {
  return (
    // JUNIOR: `stacked` prop = count of cards scrolled past (computed in
    // index.tsx onScroll). i <= stacked = "reached", i < stacked = "buried".
    <section aria-label="Why clients stay" class="mx-auto max-w-6xl px-6 py-8 md:py-12">
      <span class="firm-mono text-xs uppercase tracking-widest text-[#d8b46a]">Why owners stay</span>
      <h2 class="firm-display mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
        Built for the middle of the fight
      </h2>
      <div class="mt-12 flex flex-col gap-6">
        {ASSURANCES.map((a, i) => (
          <div
            key={a.title}
            data-stack-index={i}
            data-active={i <= stacked ? "true" : "false"}
            data-dim={i < stacked ? "true" : "false"}
            class="firm-stack-card firm-glass rounded-3xl p-8 md:p-10"
            style={{ zIndex: i + 1, transform: `scale(${1 - (stacked - i) * 0.02})` }}
          >
            <div class="flex items-center gap-4">
              <span class="firm-mono text-xs text-[#d8b46a]">0{i + 1}</span>
              <h3 class="firm-display text-xl font-extrabold text-white md:text-2xl">{a.title}</h3>
            </div>
            <p class="mt-3 max-w-2xl text-sm font-light leading-relaxed text-slate-300 md:text-base">{a.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
});
