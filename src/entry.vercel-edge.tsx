// ---------------------------------------------------------------------------
// src/entry.vercel-edge.tsx — CURRENTLY UNUSED (kept for a future edge move).
//
// WHY THIS FILE EXISTS (and why it is idle):
//   This is the entry the vercelEdgeAdapter() needs: it wraps the SSR render
//   in Vercel's edge-middleware signature. We switched to staticAdapter()
//   (see adapters/vercel-edge/vite.config.ts) because the site has no
//   server$/loaders, so this file is NOT referenced by any build script.
//   DO NOT DELETE yet — if you add form actions/auth and switch adapters back
//   to edge, add "src/entry.vercel-edge.tsx" to the adapter's rollup input.
// ---------------------------------------------------------------------------
import { createQwikCity } from "@builder.io/qwik-city/middleware/vercel-edge";
// JUNIOR: "@qwik-city-plan" is a build-time virtual module (route manifest).
// It does not exist on disk — qwikCity() generates it during `qwik build`.
import qwikCityPlan from "@qwik-city-plan";
import render from "./entry.ssr";

/** Vercel Edge entry — renders Qwik City on the edge runtime. */
export default createQwikCity({ render, qwikCityPlan });
