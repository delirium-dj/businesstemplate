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

import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { Header } from "../components/header/header";
import { Menu } from "../components/header/menu";
import { Hero } from "../components/hero/hero";
import { Practice } from "../components/practice/practice";
import { Gallery } from "../components/gallery/gallery";
import { Assurance } from "../components/assurance/assurance";
import { Voices } from "../components/voices/voices";
import { Outcomes } from "../components/outcomes/outcomes";
import { Footer } from "../components/footer/footer";
import "./styles.css";

/* Shared firm data — single source of truth for all section components. */
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

export interface Practice {
  kicker: string;
  stat: string;
  title: string;
  body: string;
  wide: boolean;
  image: string;
}

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

export interface GalleryItem {
  src: string;
  caption: string;
  alt: string;
}

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

export interface Assurance {
  title: string;
  body: string;
}

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

export interface Voice {
  name: string;
  role: string;
  quote: string;
  initials: string;
}

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

export interface Outcome {
  matter: string;
  result: string;
  note: string;
}

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
  const carousel = useSignal(0);
  const stacked = useSignal(0);
  const menuOpen = useSignal(false);
  const paused = useSignal(false);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!reduceMotion) {
      const id = setInterval(() => {
        if (!paused.value && !document.hidden) {
          carousel.value = (carousel.value + 1) % VOICES.length;
        }
      }, 8000);
      cleanup(() => clearInterval(id));
    }
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".firm-zoom-frame").forEach((el) => {
        el.setAttribute("data-visible", "true");
      });
      return;
    }
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
    cleanup(() => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    });
  });

  return (
    <main class="firm-page w-full max-w-full overflow-x-hidden">
      <div class="firm-ambient" aria-hidden="true" />
      <div class="firm-ambient-b" aria-hidden="true" />

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
