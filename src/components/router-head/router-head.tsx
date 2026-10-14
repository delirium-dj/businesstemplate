// ---------------------------------------------------------------------------
// components/router-head/router-head.tsx — renders <head> tags per route.
//
// WHY THIS FILE EXISTS:
//   root.tsx owns the <head> skeleton, but each PAGE decides its <title> and
//   <meta> via `export const head`. This component reads that per-route data
//   (useDocumentHead) and emits the actual tags. Edit page SEO in
//   src/routes/index.tsx `head` — not here.
// ---------------------------------------------------------------------------
import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  // JUNIOR: useDocumentHead() returns whatever the current route exported as
  // `head` (title + meta/links arrays). Changes automatically on navigation.
  const head = useDocumentHead();
  // JUNIOR: useLocation().url is the current URL — used for the canonical link.
  const loc = useLocation();

  return (
    <>
      <title>{head.title}</title>

      {/* AI NOTE: canonical must be absolute; loc.url.href is resolved per
          request, so previews and production each self-reference correctly. */}
      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#08090c" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/favicon.svg" />

      {/* Route-provided tags below — keys let Qwik diff them on navigation. */}
      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        // JUNIOR: `dangerouslySetInnerHTML` is passed via SPREAD (not as an
        // explicit JSX prop) on purpose. Writing
        // `<style {...s.props} dangerouslySetInnerHTML={s.style} />` makes the
        // Qwik optimizer emit the key twice (original + signal-wrapped), and
        // esbuild warns `Duplicate key "dangerouslySetInnerHTML"` on every
        // server build. A single conditional spread keeps exactly one key, so
        // `vite build -c adapters/...` stays warning-free. Same pattern below
        // for <script>. AI NOTE: do NOT "simplify" these back to explicit props
        // or the Vercel log warnings return (harmless, but noisy).
        <style
          key={s.key}
          {...s.props}
          {...(s.style ? { dangerouslySetInnerHTML: s.style } : {})}
        />
      ))}

      {head.scripts.map((s) => (
        <script
          key={s.key}
          {...s.props}
          {...(s.script ? { dangerouslySetInnerHTML: s.script } : {})}
        />
      ))}
    </>
  );
});
