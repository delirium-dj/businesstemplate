import { component$ } from "@builder.io/qwik";
import { OUTCOMES } from "../../routes";

/** Outcomes table + closing CTA lives in Footer. */
export const Outcomes = component$(() => {
  return (
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
