// ---------------------------------------------------------------------------
// components/footer/footer.tsx — ACTION section: closing CTA + site footer.
//
// WHY THIS FILE EXISTS:
//   Final AIDA chapter ("Action"): a high-contrast light card (#f5f2ea on the
//   dark page — inverted to demand attention) with tel: + mailto: CTAs, then
//   the black site footer (brand, city, anchor links). Owns the SINGLE
//   id="contact" anchor — every "Book consultation" button site-wide points
//   here. Do NOT add a second id="contact" or anchor jumps become ambiguous.
//
// DESIGN NOTE (JUNIOR): style={{background:"#f5f2ea"}} inverts the dark theme
// deliberately (paper = final document). Text switches to slate-950/700 for
// contrast. .firm-glass still provides the border/blur structure underneath.
// tel: / mailto: hrefs are built from FIRM.phone/email so one edit rebrands.
// ---------------------------------------------------------------------------
import { component$ } from "@builder.io/qwik";
import { LogoMark } from "../logo/logo";
// JUNIOR: FIRM = name/suffix/phone/email/address from routes/index.tsx.
// Footer never hardcodes contact info — always reads from there.
import { FIRM } from "../../routes";

/** Closing CTA + footer. Owns the #contact anchor. */
export const Footer = component$(() => {
  return (
    <>
      {/* JUNIOR: fragment (<>) wraps TWO siblings (CTA div + <footer>) because
          a component must return one root. max-w-6xl keeps CTA aligned with
          sections above; scroll-mt-28 offsets the fixed nav on #contact jumps. */}
      <div class="mx-auto w-full max-w-6xl px-6">
        <div
          id="contact"
          class="firm-glass relative mt-16 scroll-mt-28 overflow-hidden rounded-3xl p-10 text-center md:mt-24 md:p-16"
          style={{ background: "#f5f2ea" }}
        >
        <h3 class="firm-display relative z-10 mx-auto w-full max-w-6xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
          Bring us the dispute or deal keeping you up
        </h3>
        <p class="relative z-10 mx-auto mt-4 max-w-xl text-base font-light text-slate-700">
          30-minute intake at {FIRM.address}. Call or email — a partner responds within one business day. Evening calls available for owners.
        </p>
        <div class="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href={`tel:${FIRM.phone}`} class="rounded-full bg-slate-950 px-8 py-4 text-sm font-semibold tracking-wide text-white transition hover:bg-slate-800">
            Call {FIRM.phone}
          </a>
          <a href={`mailto:${FIRM.email}`} class="rounded-full border border-slate-950/20 px-8 py-4 text-sm font-medium tracking-wide text-slate-950 transition hover:bg-slate-950/5">
            Email {FIRM.email}
          </a>
        </div>
        </div>
      </div>

      <footer class="mt-16 border-t border-white/10 bg-black/60 py-12 md:mt-24">
        <div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
          <div class="flex items-center gap-3 text-xs text-slate-400">
            <LogoMark size={22} class="shrink-0" />
            <span class="font-bold text-white">{FIRM.name} {FIRM.suffix}</span>
            <span>· Chicago, since 1998</span>
          </div>
          <div class="firm-mono flex items-center gap-6 text-xs text-slate-400">
            <a href="#practice" class="hover:text-white">Practice</a>
            <a href="#outcomes" class="hover:text-white">Outcomes</a>
            <a href="#top" class="hover:text-white">Back to top</a>
          </div>
        </div>
      </footer>
    </>
  );
});
