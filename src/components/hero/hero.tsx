import { component$ } from "@builder.io/qwik";
import { FIRM } from "../../routes";
import { Marquee } from "../marquee/marquee";

/** Cinematic hero — two-line H1 + exactly two CTAs + marquee pinned to bottom. */
export const Hero = component$(() => {
  return (
    <section id="top" aria-label="Introduction" class="relative flex min-h-screen flex-col overflow-hidden">
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
