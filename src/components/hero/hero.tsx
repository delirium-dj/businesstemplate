// ---------------------------------------------------------------------------
// components/hero/hero.tsx — full-screen ATTENTION section (first viewport).
//
// WHY THIS FILE EXISTS (AIDA marketing order):
//   This is the "Attention" chapter: cinematic courthouse photo + tagline +
//   two-line H1 + intro + exactly TWO CTAs. index.tsx renders it FIRST so LCP
//   (Largest Contentful Paint) is this H1 + bg image. Keep it under ~2 s LCP:
//   the bg URL uses w=1920&q=70 sizing — do not swap in an uncompressed file.
//
// LAYER STACK (top to bottom in markup = back to front visually):
//   1. bg photo div (absolute inset-0, opacity-40, grayscale) — mood, not content.
//   2. gradient overlay (from solid -> 78% -> solid) — guarantees white text
//      contrast at top (over nav) and bottom (over marquee), per WCAG.
//   3. centered content (z-10) + marquee pinned to bottom (z-20).
// ---------------------------------------------------------------------------
import { component$ } from "@builder.io/qwik";
// JUNIOR: FIRM.* below = hero copy from routes/index.tsx (tagline, heroLine1/2,
// intro). Edit copy THERE, not here — this file is layout only.
import { FIRM } from "../../routes";
// JUNIOR: Marquee pinned to hero bottom (absolute inset-x-0 bottom-0) so the
// ribbon reads as the hero's "floor" rather than a separate section.
import { Marquee } from "../marquee/marquee";

/** Cinematic hero — two-line H1 + exactly two CTAs + marquee pinned to bottom. */
export const Hero = component$(() => {
  return (
    // JUNIOR: id="top" = anchor target for "Back to top" links in footer/nav.
    // min-h-screen forces full-viewport height; flex-col lets the marquee sit
    // at the bottom while content centers (flex-1 + justify-center).
    <section id="top" aria-label="Introduction" class="relative flex min-h-screen flex-col overflow-hidden">
      {/* JUNIOR: bg photo uses role="img" + aria-label because CSS
          background-images are INVISIBLE to screen readers. This pair makes
          SRs announce "Neoclassical courthouse columns...". pb-40 reserves
          room so CTAs never overlap the pinned marquee. */}
      <div
        class="absolute inset-0 bg-cover bg-center opacity-40 grayscale contrast-125"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1920&q=70')",
        }}
        role="img"
        aria-label="Neoclassical courthouse columns in Chicago"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-[#08090c] via-[#08090c]/78 to-[#08090c]" />
      <div class="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 pb-40 pt-40 text-center md:pb-48 md:pt-48">
        <p class="firm-mono mb-6 text-xs uppercase tracking-[0.2em] text-[#d8b46a]">
          {FIRM.tagline}
        </p>
        <h1 class="firm-display firm-hero-h1 mx-auto w-full max-w-6xl font-black text-white">
          <span class="block">{FIRM.heroLine1}</span>
          <span class="block font-light italic text-slate-300">{FIRM.heroLine2}</span>
        </h1>
        <p class="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-slate-300 md:text-lg">
          {FIRM.intro}
        </p>
        {/* JUNIOR: exactly TWO CTAs by design (primary = high-commitment
            #contact, secondary = low-commitment #outcomes). Adding a third
            dilutes the AIDA "Action" focus — get approval before adding. */}
        <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#contact" class="firm-btn-primary rounded-full px-8 py-4 text-sm font-semibold tracking-wide">
            Book a 30-min consultation
          </a>
          <a href="#outcomes" class="firm-btn-secondary rounded-full px-8 py-4 text-sm font-medium tracking-wide">
            See representative matters
          </a>
        </div>
      </div>
      <div class="absolute inset-x-0 bottom-0 z-20">
        <Marquee />
      </div>
    </section>
  );
});
