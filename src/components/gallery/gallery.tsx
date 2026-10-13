// ---------------------------------------------------------------------------
// components/gallery/gallery.tsx — INTEREST support: scale-fade photo row.
//
// WHY THIS FILE EXISTS:
//   Three matter-linked photos that zoom/fade via scroll (see styles.css
//   .firm-zoom-frame + index.tsx IntersectionObserver). Each caption ties the
//   stock photo to a REAL matter ("$1.8M supply dispute, settled week 11") —
//   that caption is what converts decoration into credibility. Without it,
//   these are just pretty pictures.
//
// PERFORMANCE (JUNIOR): loading="lazy" defers offscreen images until scrolled
// to (faster LCP). h-80/md:h-96 + object-cover = uniform row height with
// cropping (no layout shift). group-hover:scale-105 = subtle zoom on hover.
// The SCROLL zoom is separate (data-visible attributes set by index.tsx).
// ---------------------------------------------------------------------------
import { component$ } from "@builder.io/qwik";
// JUNIOR: GALLERY = {src, caption, alt}[] from routes/index.tsx. key={g.src}
// assumes unique image URLs — if two items share a src, switch key to caption.
import { GALLERY } from "../../routes";

/** Scale-fade gallery — each caption ties the photo to a real matter. */
export const Gallery = component$(() => {
  return (
    // JUNIOR: aria-label="Firm depth" (not "Gallery") = SR-friendly purpose
    // description. md:grid-cols-3 = 3-up on desktop, stacked on mobile.
    <section aria-label="Firm depth" class="mx-auto max-w-6xl px-6 py-8 md:py-12">
      <div class="grid gap-6 md:grid-cols-3">
        {/* JUNIOR: data-visible/data-dim start false/false ("waiting" state).
            index.tsx observer flips them on scroll; styles.css transitions
            scale/opacity/filter. figcaption is an overlay pill (absolute
            bottom-4) with backdrop-blur so text stays readable over photos. */}
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
