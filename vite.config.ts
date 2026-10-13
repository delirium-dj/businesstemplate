// ---------------------------------------------------------------------------
// vite.config.ts — client (browser) build configuration.
//
// WHY THIS FILE EXISTS:
//   Vite needs to know how to build a Qwik + QwikCity app. Without these two
//   plugins, `vite build` / `vite dev` would treat the project as a plain
//   static site and Qwik's $ resumability + file-based routing would not work.
//   This config produces the BROWSER bundle only (dist/build/*). The server /
//   pre-render bundle uses adapters/vercel-edge/vite.config.ts instead.
// ---------------------------------------------------------------------------
import { defineConfig } from "vite";
// JUNIOR NOTE: qwikVite() is the Qwik optimizer plugin. It understands the `$`
// suffix (component$, useSignal, onClick$...) and splits code into lazy chunks.
import { qwikVite } from "@builder.io/qwik/optimizer";
// JUNIOR NOTE: qwikCity() enables file-based routing: src/routes/index.tsx
// becomes "/". It also generates the @qwik-city-plan manifest at build time.
import { qwikCity } from "@builder.io/qwik-city/vite";

export default defineConfig(() => {
  return {
    // PLUGIN ORDER MATTERS: qwikCity() first (resolves routes/plan),
    // then qwikVite() (optimizes components into chunks).
    plugins: [qwikCity(), qwikVite()],
    server: {
      // Local dev URL is http://localhost:5173/ — matches README + package.json.
      port: 5173,
      // strictPort:false lets Vite pick 5174+ if 5173 is busy instead of crashing.
      strictPort: false,
    },
    preview: {
      headers: {
        // `vite preview` serves dist/ locally; this header mimics a CDN cache
        // policy so preview behaves closer to production. See Qwik docs on
        // cache headers for the production values to set on your host.
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
