# Hale & Sterling LLP — Business Law Firm Site

Qwik City + Tailwind v3 marketing site for a Chicago business-litigation boutique.
Dark cinematic theme, glass panels, animated gallery, auto-rotating testimonials.

## Quick start

```bash
pnpm install
pnpm dev        # http://localhost:5173/
```

| Command            | What it does                              |
| ------------------ | ----------------------------------------- |
| `pnpm dev`         | SSR dev server with HMR                   |
| `pnpm build`       | Production client + SSR build into `dist/`|
| `pnpm preview`     | Serve the production build locally        |
| `pnpm build.types` | Typecheck (`tsc --noEmit`)                |

Requires Node `>=18.17.0`, pnpm `9.x`.

## Project structure

```
src/
  routes/
    index.tsx      Homepage — data (FIRM, MARQUEE, PRACTICES, GALLERY,
                   ASSURANCES, VOICES, OUTCOMES) + page composition
    layout.tsx     Root layout slot
    styles.css     Route stylesheet (tokens, glass, marquee, gallery,
                   sticky stack, voices crossfade)
  components/
    header/        Header (tel left, brand center, links right)
    header/        Menu (full-screen mobile overlay)
    hero/          Hero (full-screen intro, marquee pinned to bottom)
    marquee/       Marquee (scrolling services ribbon)
    practice/      Practice (12-col bento: 7+5 / 5+7) + PracticeCard
    gallery/       Gallery (scale-fade, matter-linked captions)
    assurance/     Assurance (sticky stacked cards)
    voices/        Voices (fixed-height crossfade, 8s auto-rotate)
    outcomes/      Outcomes (representative-matters table)
    footer/        Footer (closing CTA + site footer)
    router-head/   RouterHead (title, meta, links)
  root.tsx         App shell (QwikCityProvider + RouterOutlet)
  entry.dev.tsx    CSR dev entry
  entry.ssr.tsx    SSR entry
  global.css       Tailwind base + page background
```

## Editing content

All copy lives at the top of `src/routes/index.tsx`:

- `FIRM` — name, tagline, hero lines, phone, email, address
- `PRACTICES` — bento cards (`wide` toggles 7-col vs 5-col, `image` optional)
- `GALLERY` — `src` / `caption` / `alt` per photo
- `VOICES` — testimonial carousel (`initials` renders the monogram)
- `OUTCOMES` — matters table rows

Styling tokens (`--firm-*`) and section effects live in `src/routes/styles.css`.
Global Tailwind setup: `src/global.css`, `tailwind.config.cjs`, `postcss.config.cjs`.

## Notes

- Figures, matters, and testimonials are realistic illustrative copy —
  replace with the firm's verifiable record before publishing.
- `dist/` and `node_modules/` are git-ignored build artifacts.
