/*
 * src/entry.dev.tsx — DEVELOPMENT-ONLY entry (client-side rendering, no SSR).
 *
 * WHY THIS FILE EXISTS:
 *   `vite --mode ssr` (pnpm dev) uses this entry. It mounts <Root/> directly
 *   into document with no pre-rendered HTML, which gives the fastest HMR loop.
 *   NEVER use this in production — crawlers would see an empty page and the
 *   first paint would be slower. Production uses entry.ssr.tsx instead.
 */
import type { RenderOptions } from "@builder.io/qwik";
import { render } from "@builder.io/qwik";
import Root from "./root";

export default function (opts: RenderOptions) {
  // JUNIOR: render(document, <Root/>) = "attach Qwik to the whole page".
  // opts carries the dev-mode flags (e.g. CSR-only, debug) from the CLI.
  return render(document, <Root />, opts);
}
