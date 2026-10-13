/*
 * WHAT IS THIS FILE?
 *
 * For SSR, pre-render the application on the server, stream the HTML, then resume on client.
 * This file is used by Vite SSR dev (npm run dev) and by `qwik build` production.
 */
import { renderToString, type RenderToStringOptions } from "@builder.io/qwik/server";
import Root from "./root";

export default function (opts: RenderToStringOptions) {
  return renderToString(<Root />, opts);
}
