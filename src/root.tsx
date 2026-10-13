// ---------------------------------------------------------------------------
// src/root.tsx — application SHELL. The first component Qwik renders.
//
// WHY THIS FILE EXISTS:
//   Every entry point (dev, SSR, adapters) renders <Root/>. It owns the
//   <html>/<head>/<body> skeleton so routes only provide page CONTENT.
//   Delete this and nothing renders — entries import it directly.
// ---------------------------------------------------------------------------
import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider, // JUNIOR: provides router context (URL, params, navigation).
  RouterOutlet, // JUNIOR: placeholder where the matched route renders.
  ServiceWorkerRegister, // JUNIOR: registers the PWA service worker (offline cache).
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

// JUNIOR: global.css is imported HERE (not per-route) so Tailwind base +
// resets load once for the whole app.
import "./global.css";

export default component$(() => {
  return (
    // AI NOTE: QwikCityProvider must wrap everything — RouterOutlet and
    // useLocation()/useDocumentHead() throw outside of it.
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        {/* RouterHead injects <title> + per-route meta from each page's `head`. */}
        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      {/* lang="en" matters for screen readers + SEO language detection. */}
      <body lang="en">
        {/* The current route (src/routes/index.tsx for "/") renders here. */}
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
