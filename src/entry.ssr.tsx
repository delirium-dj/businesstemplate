/*
 * src/entry.ssr.tsx — PRODUCTION server entry (SSR + static pre-render).
 *
 * WHY THIS FILE EXISTS:
 *   `qwik build` -> build.server compiles THIS file into server/entry.ssr.js.
 *   The static adapter calls it once per route at BUILD time to emit
 *   dist/index.html; a Node/edge adapter would call it per REQUEST instead.
 *   This is also what `vite --mode ssr` uses for dev-time SSR.
 */
import { renderToString, type RenderToStringOptions } from "@builder.io/qwik/server";
import Root from "./root";

export default function (opts: RenderToStringOptions) {
  // JUNIOR: renderToString(<Root/>) returns { html, ... } — HTML string plus
  // the Qwik loader state the browser needs to RESUME (not re-run) the app.
  return renderToString(<Root />, opts);
}
