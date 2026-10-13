// ---------------------------------------------------------------------------
// src/routes/index.tsx — HOMEPAGE route (URL "/").
//
// WHY THIS FILE EXISTS (QwikCity file-based routing):
//   Any file named src/routes/<name>/index.tsx becomes the page at /<name>/.
//   So this file IS the "/" page. src/routes/layout.tsx wraps it in <Slot/>.
//   To add a page (e.g. /contact), create src/routes/contact/index.tsx.
//
// ARCHITECTURE OF THIS FILE (read top-to-bottom):
//   1. Imports — Qwik primitives + section components + route stylesheet.
//   2. Data constants (FIRM, MARQUEE, PRACTICES, ...) — ALL editable copy
//      lives here as the single source of truth. Components below only READ
//      these; they never hardcode firm names/phones. To re-skin for another
//      client, edit ONLY this section.
//   3. Default component$ — owns shared UI state (carousel index, mobile
//      menu, scroll stack) and composes <Header/><Hero/>...<Footer/> in AIDA
//      marketing order (Attention -> Interest -> Desire -> Action).
//   4. `head` export — SEO title + meta. router-head.tsx renders it.
//
// FOR AI AGENTS: when asked to "change the phone number" or "add a practice
// area", edit the data constants here — do NOT edit header.tsx/footer.tsx
// directly, they import from here. When asked to "add a section", create a
// new component under src/components/<name>/ and mount it in the <main> below.
// ---------------------------------------------------------------------------

/**
 * Law-firm template page (Qwik City route).
 * Install: create src/routes/<name>/ in any Qwik City app, copy this index.tsx
 * plus study.css into it, then open /<name>/.
 * Standalone: zero imports from other project code. All copy, figures,
 * outcomes, and testimonials below are clearly marked placeholders — replace
 * them with the firm's real content before publishing.
 *
 * Layout (same AIDA architecture as the source study):
 * Navigation (floating glass pill) / Attention (centered cinematic hero,
 * max-w-6xl H1 in 2 lines, exactly 2 CTAs) / Interest (gapless 12-col bento:
 * row 1 is 7 + 5, row 2 is 5 + 7) / Desire (scale-fade gallery, stacked
 * assurance cards, client-voice carousel) / Action (selected outcomes plus a
 * massive closing CTA and footer). Chapters breathe at py-32 md:py-48.
 */

// JUNIOR: component$ = Qwik's lazy-loadable component. Code after `$` is split
// into a separate chunk and only downloaded when the component renders.
// useSignal = reactive value (like useState). useVisibleTask$ = client-only
// side effect (runs in browser after render — used here for timers/scroll).
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
// JUNIOR: DocumentHead types the `head` export so typos in meta names are
// caught by `pnpm build.types` (tsc --noEmit).
import { type DocumentHead } from "@builder.io/qwik-city";
// JUNIOR: section components are dumb/presentational — they receive data via
// props or via the FIRM/... imports. Page-level state lives HERE, not in them.
import { Header } from "../components/header/header";
import { Menu } from "../components/header/menu";
import { Hero } from "../components/hero/hero";
import { Practice } from "../components/practice/practice";
import { Gallery } from "../components/gallery/gallery";
import { Assurance } from "../components/assurance/assurance";
import { Voices } from "../components/voices/voices";
import { Outcomes } from "../components/outcomes/outcomes";
import { Footer } from "../components/footer/footer";
// JUNIOR: side-effect CSS import — loads src/routes/styles.css for THIS route
// only. Design tokens (--firm-*) and effects (.firm-glass, .firm-marquee...)
// used by all sections below are defined there.
import "./styles.css";

/* Shared firm data — single source of truth for all section components. */
// JUNIOR: edit THIS object to rebrand the template. Every <Header/>, <Hero/>,
// <Footer/> reads from here so they can never disagree on name/phone.
// AI NOTE: keep phone in `tel:`-safe format "+1 (312) ..." — header/footer
// build `href={tel:...}` from it directly.
export const FIRM = {
  name: "Hale & Sterling",
  suffix: "LLP",
  tagline: "Trial-tested counsel for Chicago businesses and their owners",
  heroLine1: "Business disputes resolved.",
  heroLine2: "Deals structured to hold.",
  intro:
    "We are a 14-lawyer Chicago boutique for middle-market companies, founders, and commercial landlords. Partner-led on every file — litigation, transactions, and employment — focused on ending disputes quickly and documenting deals so they don't become disputes.",
  phone: "+1 (312) 555-0148",
  email: "intake@halesterlinglaw.com",
  address: "71 S Wacker Drive, Suite 1500, Chicago, IL 60606",
};

// JUNIOR: MARQUEE = items in the scrolling ribbon under the hero.
// Rendered by marquee.tsx, which duplicates the array ([...MARQUEE, ...MARQUEE])
// so the CSS loop (translateX 0% -> -50%) wraps seamlessly with no gap.
// To add an item, just push a string here — no component edit needed.
export const MARQUEE = [
  "Commercial litigation",
  "M&A and owner buyouts",
  "Employment defense & counsel",
  "Commercial leasing disputes",
  "Founded 1998 · Chicago",
  "Partner-led, always",
  "Flat-fee intake review",
  "Cook County · DuPage · N.D. Ill.",
];

// JUNIOR: Practice = TypeScript interface (shape) for one bento card.
// - `wide: true` -> spans 7 of 12 grid cols; false -> spans 5. Row pattern is
//   7+5 then 5+7 (see practice.tsx for the md:col-span-7/5 mapping).
// - `image: ""` (empty) means "no background photo" — PracticeCard skips the
//   <div> when falsy. Only wide cards currently use images.
// AI NOTE: keep `key={p.title}` unique — duplicate titles break Qwik's list diff.
export interface Practice {
  kicker: string;
  stat: string;
  title: string;
  body: string;
  wide: boolean;
  image: string;
}

// JUNIOR: PRACTICES = the 4 bento tiles. Order = display order.
// Images are hotlinked Unsplash URLs (w=1200, q=70 = sized/compressed).
// Replace with the firm's own CDN paths before launch; keep `?w=1200` style
// sizing params or hero-adjacent LCP weight will balloon.
export const PRACTICES: Practice[] = [
  {
    kicker: "Most-called",
    stat: "300+ disputes closed",
    title: "Commercial litigation that ends the distraction",
    body: "Breach of contract, partner breakups, business fraud, and collections in Cook County courts and AAA arbitration. We push early mediation where it pays and try the case where it doesn't — with a weekly status email so you always know spend and next step.",
    wide: true,
    image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1200&q=70",
  },
  {
    kicker: "Deals desk",
    stat: "$400M+ deal value",
    title: "M&A and owner agreements",
    body: "Stock and asset purchases, founder buyouts, operating agreements, and SBA and bank financings. Plain-English term sheets, clean cap tables, and Illinois-enforceable non-competes.",
    wide: false,
    image: "",
  },
  {
    kicker: "Workplace",
    stat: "48-hr response",
    title: "Employment counsel for Illinois employers",
    body: "Handbooks, BIPA and paid-leave compliance, terminations, and IDHR / EEOC responses. We defuse HR fires before they become lawsuits — typically within two business days.",
    wide: false,
    image: "",
  },
  {
    kicker: "Property",
    stat: "90% settled pre-trial",
    title: "Commercial leasing and development disputes",
    body: "Lease defaults, CAM charges, construction delays, and title issues for landlords and developers. Mediation first to keep rent flowing; eviction, lien, or specific-performance action when it won't.",
    wide: true,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=70",
  },
];

// JUNIOR: GalleryItem = one photo in the scale-fade gallery.
// - `src`: full-size image URL. `caption`: matter-tied overlay text (this is
//   what makes stock photos feel like real cases). `alt`: accessibility text
//   read by screen readers — describe the IMAGE, not the case outcome.
export interface GalleryItem {
  src: string;
  caption: string;
  alt: string;
}

// JUNIOR: GALLERY = 3 photos rendered in a md:grid-cols-3 row.
// gallery.tsx drives the zoom via IntersectionObserver (see second
// useVisibleTask$ below) toggling data-visible/data-dim attributes.
export const GALLERY: GalleryItem[] = [
  {
    src: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=900&q=80",
    caption: "Counsel table — $1.8M supply dispute, settled week 11",
    alt: "Litigation binders and exhibits prepared on a counsel table for a commercial trial",
  },
  {
    src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80",
    caption: "Closing table — three-owner buyout, 34 days",
    alt: "Two business partners shaking hands over signed acquisition documents",
  },
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    caption: "Anchor property — $240K arrears restructured, tenant kept",
    alt: "Downtown Chicago commercial building representing a landlord leasing matter",
  },
];

// JUNIOR: Assurance = one sticky "why us" card (numbered 01/02/03).
// assurance.tsx stacks them with position:sticky + zIndex so each new card
// overlaps the last as you scroll. Add a 4th entry here and stacking adapts.
export interface Assurance {
  title: string;
  body: string;
}

// JUNIOR: ASSURANCES = Desire-section trust builders. Keep bodies to ~2
// sentences — the sticky cards have fixed padding and long text overflows on
// mobile (min-h grows but the stack overlap looks broken past ~400 chars).
export const ASSURANCES: Assurance[] = [
  {
    title: "The partner you meet stays on your matter",
    body: "No handoff to strangers after the pitch. A named partner runs strategy, appears in court, and signs every substantive filing. Associates handle research under partner review — billed at their rate, never the partner's.",
  },
  {
    title: "A fee letter before any billable work",
    body: "After a 30-minute intake you get a one-page engagement letter: scope, rate or cap, and timeline. Litigation budgets reforecast quarterly. $750 flat-fee contract review to start if you just need a second set of eyes.",
  },
  {
    title: "Built for settlement, ready for trial",
    body: "Document hold on day one, depositions scoped tight, motion practice aimed at leverage — not churn. That preparation is why most of our disputes settle on terms clients accept, and why we're credible when they don't.",
  },
];

// JUNIOR: Voice = one testimonial. `initials` renders the avatar monogram
// circle (DW, MO...). `role` should stay "Title, Company, City" — voices.tsx
// renders it verbatim in the mono byline under the quote.
export interface Voice {
  name: string;
  role: string;
  quote: string;
  initials: string;
}

// JUNIOR: VOICES = carousel slides. PLACEHOLDER content — replace names,
// companies, and quotes with consented client testimonials before publishing.
// Length drives modulo math ((i+1) % VOICES.length) in voices.tsx, so any
// count works, but 4-6 keeps the dot row from wrapping on mobile.
export const VOICES: Voice[] = [
  {
    name: "Dana Whitfield",
    role: "COO, Meridian Logistics, Chicago",
    quote:
      "A $1.8M freight-contract fight settled in eleven weeks without stopping a single route. Weekly updates, no jargon, no surprises on fees.",
    initials: "DW",
  },
  {
    name: "Marcus Oyelaran",
    role: "CEO, Northgate Foods",
    quote:
      "They rewrote our supplier contracts and handbook in a month. Two agency charges dismissed since — operations never missed a beat.",
    initials: "MO",
  },
  {
    name: "Priya Raman",
    role: "Founder, Ledgerline",
    quote:
      "Bought out my co-founder cleanly in 34 days. Cap table, tax elections, non-compete — all handled in one room.",
    initials: "PR",
  },
  {
    name: "Tom Beckett",
    role: "Principal, Beckett Properties",
    quote:
      "Recovered $240K in back rent and kept the anchor tenant with a restructured lease. Exactly what a landlord needs from counsel.",
    initials: "TB",
  },
  {
    name: "Elena Marsh",
    role: "HR Director, Copperfield Clinics",
    quote:
      "A termination we expected to blow up went nowhere because the documentation was right. Calm advice inside 48 hours.",
    initials: "EM",
  },
];

// JUNIOR: Outcome = one table row (matter / result / note).
// The disclaimer under the <h2> ("prior results don't predict...") is an
// attorney-advertising ethics requirement in many states — do NOT delete it
// when editing rows. Keep `matter` unique: it is the React/Qwik list `key`.
export interface Outcome {
  matter: string;
  result: string;
  note: string;
}

// JUNIOR: OUTCOMES = representative-matters table. Same ethics note as above:
// these are ILLUSTRATIVE figures. Swap in the firm's verifiable matters.
export const OUTCOMES: Outcome[] = [
  {
    matter: "Breach of supply agreement",
    result: "$1.8M settlement in 11 weeks",
    note: "Cook County, mediated before discovery cutoff",
  },
  {
    matter: "Three-owner buyout",
    result: "Closed in 34 days, no suit filed",
    note: "Asset + equity restructure, Illinois",
  },
  {
    matter: "IDHR wrongful-termination charge",
    result: "Dismissed, no payment",
    note: "Documented file, single position statement",
  },
  {
    matter: "Anchor-tenant arrears ($240K)",
    result: "Repayment plan + 5-yr extension",
    note: "Mediation, tenant retained",
  },
];

export default component$(() => {
  // JUNIOR: page-level state lives here so siblings can share it:
  // - `carousel` (number) = active testimonial index. Owned HERE (not in
  //   Voices) so the 8s timer below and the Voices buttons/dots stay in sync.
  //   Passed as a Signal object (not .value) so children stay reactive.
  // - `stacked` (number) = how many assurance cards have been scrolled past.
  //   Updated by the scroll listener below, read by <Assurance stacked={...}/>.
  // - `menuOpen` (boolean) = mobile overlay visibility. Shared by <Header/>
  //   (hamburger button) and <Menu/> (overlay) — lifting it here keeps them synced.
  // - `paused` (boolean) = "stop auto-rotating testimonials" (hover/focus).
  const carousel = useSignal(0);
  const stacked = useSignal(0);
  const menuOpen = useSignal(false);
  const paused = useSignal(false);

  // JUNIOR: useVisibleTask$ = "run this ONLY in the browser, after render".
  // Qwik serializes SSR HTML; this never runs on the server, so `window` /
  // `document` access here is safe (it would crash at the top level of SSR).
  // This FIRST task owns the testimonial auto-rotate timer.
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    // JUNIOR: respect OS reduced-motion: if the user asked for less animation,
    // skip the timer entirely (static first testimonial).
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!reduceMotion) {
      const id = setInterval(() => {
        // JUNIOR: `!document.hidden` pauses rotation in background tabs (saves
        // battery + avoids skipping 3 slides while the user was away).
        // `% VOICES.length` wraps 4->0 so the carousel loops forever.
        if (!paused.value && !document.hidden) {
          carousel.value = (carousel.value + 1) % VOICES.length;
        }
      }, 8000);
      // JUNIOR: cleanup() runs when the component unmounts (route change) —
      // without clearInterval the timer would leak and keep firing.
      cleanup(() => clearInterval(id));
    }
  });

  // JUNIOR: SECOND task owns scroll-driven effects (gallery zoom + card stack).
  // Separated from the timer task so each has one job (easier to debug).
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    // JUNIOR: reduced-motion path — mark all gallery frames visible at once,
    // no IntersectionObserver, so photos render final-state with no animation.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".firm-zoom-frame").forEach((el) => {
        el.setAttribute("data-visible", "true");
      });
      return;
    }
    // JUNIOR: IntersectionObserver watches each .firm-zoom-frame and flips
    // data-visible/data-dim attributes; styles.css transitions scale/opacity
    // based on those attributes. thresholds 0.25/0.6 = fire at 25% + 60% visible.
    const frames = Array.from(document.querySelectorAll(".firm-zoom-frame"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) {
            el.setAttribute("data-visible", "true");
            el.setAttribute("data-dim", "false");
          } else if (e.boundingClientRect.top < 0) {
            el.setAttribute("data-dim", "true");
          } else {
            el.setAttribute("data-visible", "false");
          }
        }
      },
      { threshold: [0.25, 0.6] },
    );
    frames.forEach((f) => io.observe(f));
    // JUNIOR: onScroll computes which assurance card is "current" (top above
    // 60% viewport height) and writes it to `stacked`, which re-renders
    // <Assurance/> with new scale/dim. { passive:true } tells the browser
    // this listener never calls preventDefault(), so scrolling stays smooth.
    const onScroll = () => {
      const cards = Array.from(document.querySelectorAll("[data-stack-index]"));
      let current = 0;
      for (const c of cards) {
        const r = (c as HTMLElement).getBoundingClientRect();
        if (r.top < window.innerHeight * 0.6)
          current = Number((c as HTMLElement).dataset.stackIndex);
      }
      stacked.value = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    // JUNIOR: cleanup disconnects the observer + listener on unmount. Without
    // this, navigating away and back would register DUPLICATE listeners and
    // `stacked` would update twice per scroll (wasted renders).
    cleanup(() => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    });
  });

  return (
    // JUNIOR: .firm-page (styles.css) provides dark bg + font tokens for the
    // whole page. overflow-x-hidden clips the 1500px ambient glow (which is
    // wider than mobile viewports) so no horizontal scrollbar appears.
    <main class="firm-page w-full max-w-full overflow-x-hidden">
      {/* JUNIOR: ambient glows are pure decoration — aria-hidden hides them
          from screen readers so they don't announce empty divs. */}
      <div class="firm-ambient" aria-hidden="true" />
      <div class="firm-ambient-b" aria-hidden="true" />

      {/* JUNIOR: Header/Menu share menuOpen. The `$` callbacks (onToggleMenu$)
          are QRLs — Qwik lazy-loads their bodies on click, keeping initial JS
          near zero. FORGETTING the `$` breaks the optimizer build. */}
      <Header
        menuOpen={menuOpen.value}
        onToggleMenu$={() => {
          menuOpen.value = !menuOpen.value;
        }}
        onCloseMenu$={() => {
          menuOpen.value = false;
        }}
      />
      <Menu
        menuOpen={menuOpen.value}
        onCloseMenu$={() => {
          menuOpen.value = false;
        }}
      />

      {/* JUNIOR: page composition in AIDA marketing order — Attention (Hero),
          Interest (Practice+Gallery), Desire (Assurance+Voices), Action
          (Outcomes+Footer CTA). To reorder sections, move these lines.
          AI NOTE: <Voices> receives Signal OBJECTS (carousel, paused), while
          <Assurance> receives a plain number (stacked.value) — signals for
          two-way shared state, values for one-way reads. */}
      <Hero />
      <Practice />
      <Gallery />
      <Assurance stacked={stacked.value} />
      <Voices carousel={carousel} paused={paused} />
      <Outcomes />
      <Footer />
    </main>
  );
});
// JUNIOR: `head` = per-route SEO. RouterHead (router-head.tsx) reads this via
// useDocumentHead() and emits <title>/<meta>. Edit title/description here for
// search + social previews — NOT in router-head.tsx (that file is generic).
// AI NOTE: keep title <60 chars and description 120-160 chars for SERP display.
export const head: DocumentHead = {
  title:
    "Hale & Sterling LLP — Chicago Business Litigation, M&A & Employment Counsel",
  meta: [
    {
      name: "description",
      content:
        "Chicago boutique for business disputes, M&A and owner buyouts, Illinois employment counsel, and commercial leasing. Partner-led, fee letter up front.",
    },
  ],
};
