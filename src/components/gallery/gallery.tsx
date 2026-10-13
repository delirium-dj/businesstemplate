import { component$ } from "@builder.io/qwik";
import { GALLERY } from "../../routes";

/** Scale-fade gallery — each caption ties the photo to a real matter. */
export const Gallery = component$(() => {
  return (
    <section aria-label="Firm depth" class="mx-auto max-w-6xl px-6 py-8 md:py-12">
      <div class="grid gap-6 md:grid-cols-3">
        {GALLERY.map((g) => (
          <figure
            key={g.src}
            class="firm-zoom-frame group relative overflow-hidden rounded-3xl border border-white/10"
            data-visible="false"
            data-dim="false"
          >
            <img
              src={g.src}
              alt={g.alt}
              loading="lazy"
              class="h-80 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 md:h-96"
            />
            <figcaption class="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/15 bg-black/65 px-4 py-2 text-left font-mono text-[11px] leading-relaxed text-slate-200 backdrop-blur-md">
              {g.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
});
