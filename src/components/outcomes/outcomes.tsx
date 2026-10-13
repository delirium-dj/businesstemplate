// ---------------------------------------------------------------------------
// components/outcomes/outcomes.tsx — ACTION support: representative matters.
//
// WHY THIS FILE EXISTS:
//   Proof before the pitch: a 3-column table (Matter / Outcome / Note) of
//   recent work. Placed right before the Footer CTA so proof -> action flows
//   in one scroll. Data (OUTCOMES) lives in routes/index.tsx; this file maps
//   rows. The closing CTA itself lives in footer.tsx (owns #contact), NOT here,
//   so there is exactly one contact anchor on the page (no duplicate ids).
//
// TABLE A11Y (JUNIOR): <th scope="col"> tells screen readers each header
// labels its COLUMN. key={o.matter} requires unique matter strings.
// min-w-[640px] + overflow-x-auto = horizontal scroll on phones instead of
// crushed columns. The ethics disclaimer paragraph ("prior results don't... ")
// is legally required in many states — do NOT remove it when editing copy.
// ---------------------------------------------------------------------------
import { component$ } from "@builder.io/qwik";
// JUNIOR: OUTCOMES = {matter, result, note}[] from routes/index.tsx. Edit rows
// there — this file only decides table markup/styling.
import { OUTCOMES } from "../../routes";

/** Outcomes table + closing CTA lives in Footer. */
export const Outcomes = component$(() => {
  return (
    // JUNIOR: id="outcomes" = nav anchor (header "Outcomes" link). Same
    // scroll-mt-28 offset pattern as #practice/#voices for the fixed nav.
    <section id="outcomes" aria-label="Outcomes" class="mx-auto max-w-6xl scroll-mt-28 px-6 py-8 md:py-12">
      <span class="firm-mono text-xs uppercase tracking-widest text-[#d8b46a]">Representative matters</span>
      <h2 class="firm-display mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Recent work, in plain numbers</h2>
      <p class="mt-4 max-w-2xl text-base font-light text-slate-300">
        A sample of business matters closed in the last 24 months. Every case turns on its facts — prior results don't predict future outcomes.
      </p>
      <div class="mt-12 overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.02] p-2 backdrop-blur-xl">
        <table class="w-full min-w-[640px] text-left text-sm text-slate-300">
          <thead class="firm-mono border-b border-white/10 text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th scope="col" class="px-6 py-4">Matter</th>
              <th scope="col" class="px-6 py-4">Outcome</th>
              <th scope="col" class="px-6 py-4">Note</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5 font-mono">
            {OUTCOMES.map((o) => (
              <tr key={o.matter} class="transition hover:bg-white/[0.03]">
                <td class="px-6 py-4 font-sans font-medium text-white">{o.matter}</td>
                <td class="px-6 py-4 font-bold text-[#d8b46a]">{o.result}</td>
                <td class="px-6 py-4 text-xs text-slate-400">{o.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
});
