import { component$ } from "@builder.io/qwik";
import { MARQUEE } from "../../routes";

/** Scrolling services ribbon. Duplicated array for a seamless loop. */
export const Marquee = component$(() => {
  return (
    <div class="firm-marquee-wrap overflow-hidden border-y border-white/10 bg-white/[0.02] py-4 backdrop-blur-sm">
      <div class="firm-marquee-track gap-10">
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
