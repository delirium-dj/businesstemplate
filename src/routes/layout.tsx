// ---------------------------------------------------------------------------
// src/routes/layout.tsx — ROOT LAYOUT. QwikCity renders EVERY route inside it.
//
// WHY THIS FILE EXISTS:
//   File-based routing rule: layout.tsx wraps all sibling + child routes.
//   <Slot/> is the outlet — the matched page renders where <Slot/> sits.
//   Today it is a pass-through (no shared chrome) because Header/Footer are
//   composed per-page in index.tsx. Add site-wide banners or providers here
//   if a second route ever needs them too.
// ---------------------------------------------------------------------------
import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  // JUNIOR: <Slot/> = "render the child route here", like {children} in React.
  return <Slot />;
});
