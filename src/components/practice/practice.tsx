import { component$ } from "@builder.io/qwik";
import { PRACTICES, type Practice as PracticeData } from "../../routes";

/** Single bento tile — wide spans 7 cols, narrow spans 5. */
export const PracticeCard = component$<{ practice: PracticeData }>(
  ({ practice: p }) => {
    return (
      <article
        class={`firm-glass group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl p-8 md:p-10 ${p.wide ? "md:col-span-7" : "md:col-span-5"}`}
      >
        {p.image && (
          <div
            class="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-luminosity transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              backgroundImage: `url('${p.image}')`,
            }}
            aria-hidden="true"
          />
        )}
        <div class="relative z-10">
          <div class="flex items-center justify-between">
            <span class="firm-mono text-xs uppercase tracking-widest text-slate-400">
              {p.kicker}
            </span>
            <span class="firm-mono rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] text-[#d8b46a]">
              {p.stat}
            </span>
          </div>
          <h3 class="firm-display mt-6 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            {p.title}
          </h3>
        </div>
        <p class="relative z-10 mt-4 max-w-prose text-sm font-light leading-relaxed text-slate-300 md:text-base">
          {p.body}
        </p>
      </article>
    );
  },
);

/** 12-col bento: row 1 is 7+5, row 2 is 5+7. 24px gap on all screens. */
export const Practice = component$(() => {
  return (
    <section
      id="practice"
      aria-label="Practice areas"
      class="mx-auto max-w-6xl scroll-mt-28 px-6 pb-8 md:pb-12 pt-32 md:pt-48"
    >
      <h2 class="firm-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
        Seasoned Chicago counsel, across four practices
      </h2>
      <p class="mt-6 max-w-2xl text-base font-light text-slate-300 md:text-lg">
        From demand letter to closing binder — one team that knows how Illinois
        courts, agencies, and lenders actually work.
      </p>
      <div class="mt-12 grid gap-6 md:grid-cols-12 md:gap-6">
        {PRACTICES.map((p) => (
          <PracticeCard key={p.title} practice={p} />
        ))}
      </div>
    </section>
  );
});
