// ---------------------------------------------------------------------------
// components/voices/voices.tsx — DESIRE section: testimonial carousel.
//
// WHY THIS FILE EXISTS:
//   Social proof ("What working with us feels like"). Fixed-dimension crossfade
//   card: all quotes stay mounted, CSS toggles opacity via data-active, so
//   switching slides never changes card height (no layout blink/jump).
//
// STATE OWNERSHIP (JUNIOR — important Qwik pattern):
//   `carousel` (active index) and `paused` (hover/focus freeze) are Signals
//   OWNED by index.tsx, passed here as objects (not .value). Why lift state?
//   Because the 8s auto-rotate setInterval lives in index.tsx — if state lived
//   here, timer and buttons would desync. Rule: state lives with its timer.
//   onClick$ handlers mutate carousel.value directly (reactive = instant UI).
//   prev/next also set paused=true for 8s so manual nav isn't instantly
//   overridden by the timer. Dots use aria-current for screen-reader position.
// ---------------------------------------------------------------------------
import { component$, type Signal } from "@builder.io/qwik";
// JUNIOR: `type Signal` = type-only import (no JS emitted). Signal<number> =
// reactive box: read .value to render, write .value to update everywhere.
import { VOICES } from "../../routes";

interface VoicesProps {
  carousel: Signal<number>;
  paused: Signal<boolean>;
}

/**
 * Fixed-dimension testimonial card with blink-free crossfade.
 * Parent owns the 8s auto-rotate interval; hover/focus pauses it.
 */
export const Voices = component$<VoicesProps>(({ carousel, paused }) => {
  return (
    // JUNIOR: id="voices" = nav anchor. scroll-mt-28 = offset for fixed nav.
    <section id="voices" aria-label="Client voices" class="mx-auto max-w-6xl scroll-mt-28 px-6 py-8 md:py-12">
      <span class="firm-mono text-xs uppercase tracking-widest text-[#d8b46a]">Client voices</span>
      <h2 class="firm-display mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
        What working with us feels like
      </h2>
      <p class="mt-4 max-w-2xl text-base font-light text-slate-300">
        From owners and operators we counsel year after year. Names and companies shared with permission.
      </p>
      {/* JUNIOR: hover/focus pauses the 8s timer (paused.value=true) so users
          can read without the slide changing mid-sentence. onFocusIn/Out =
          keyboard equivalent of hover (a11y parity). Qwik's $ handlers are
          lazy-loaded — zero JS until first interaction. */}
      <div
        class="firm-glass mt-12 rounded-3xl p-8 md:p-12"
        onMouseEnter$={() => {
          paused.value = true;
        }}
        onMouseLeave$={() => {
          paused.value = false;
        }}
        onFocusIn$={() => {
          paused.value = true;
        }}
        onFocusOut$={() => {
          paused.value = false;
        }}
      >
        {/* JUNIOR: min-h reserves slide height (300px mobile / 240px desktop) so
            crossfading never collapses the card (no blink). Avatars highlight
            the active testimonial gold; inactive dim to opacity-70. */}
        <div class="flex min-h-[300px] flex-col gap-8 sm:min-h-[260px] md:min-h-[240px] md:flex-row md:items-center">
          <div class="flex shrink-0 -space-x-3">
            {VOICES.map((v, i) => (
              <span
                key={v.name}
                aria-hidden="true"
                class={`flex h-14 w-14 items-center justify-center rounded-full border-2 font-mono text-xs font-bold ${i === carousel.value % VOICES.length ? "border-[#d8b46a] bg-[#d8b46a] text-slate-950" : "border-black/60 bg-white/10 text-slate-200 opacity-70"}`}
              >
                {v.initials}
              </span>
            ))}
          </div>
          <div class="relative flex-1">
            {VOICES.map((v, i) => (
              <div
                key={v.name}
                data-active={i === carousel.value % VOICES.length ? "true" : "false"}
                aria-hidden={i === carousel.value % VOICES.length ? "false" : "true"}
                class="firm-voice-slide"
              >
                <blockquote class="firm-display text-xl font-bold leading-snug text-white md:text-3xl" style={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: "calc(1.375 * 4 * 1em)" }}>
                  "{v.quote}"
                </blockquote>
                <p class="firm-mono mt-4 text-xs uppercase tracking-widest text-slate-400">
                  {v.name} · {v.role}
                </p>
              </div>
            ))}
          </div>
          <div class="flex shrink-0 items-center gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick$={() => {
                carousel.value =
                  (carousel.value - 1 + VOICES.length) % VOICES.length;
                paused.value = true;
                setTimeout(() => {
                  paused.value = false;
                }, 8000);
              }}
              class="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-white/50 hover:bg-white/10"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick$={() => {
                carousel.value = (carousel.value + 1) % VOICES.length;
                paused.value = true;
                setTimeout(() => {
                  paused.value = false;
                }, 8000);
              }}
              class="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-white/50 hover:bg-white/10"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
        <div class="mt-8 flex items-center justify-center gap-2">
          {VOICES.map((v, i) => (
            <button
              key={v.name}
              type="button"
              aria-label={`Show testimonial from ${v.name}`}
              aria-current={i === carousel.value % VOICES.length ? "true" : "false"}
              onClick$={() => {
                carousel.value = i;
                paused.value = true;
                setTimeout(() => {
                  paused.value = false;
                }, 8000);
              }}
              class={`firm-dot h-2 rounded-full ${i === carousel.value % VOICES.length ? "w-8 bg-[#d8b46a]" : "w-2 bg-white/20 hover:bg-white/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
