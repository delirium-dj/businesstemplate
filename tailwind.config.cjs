// ---------------------------------------------------------------------------
// tailwind.config.cjs — Tailwind CSS configuration (CommonJS).
//
// WHY THIS FILE EXISTS:
//   Tailwind scans your source files for class names (e.g. "flex", "md:p-10")
//   and generates ONLY the CSS you actually use. Without the `content` globs
//   below, Tailwind would not know where to look and your utility classes
//   would render as unstyled HTML.
//
// WHY .cjs (not .js):
//   package.json sets `"type": "module"`, so plain .js files are treated as
//   ESM. Tailwind's config loader still uses require() here, so we use .cjs
//   to force CommonJS (module.exports) and avoid an import/export crash.
// ---------------------------------------------------------------------------

/** @type {import('tailwindcss').Config} */
// JUNIOR: this JSDoc comment gives VS Code autocomplete for Tailwind options
// even though the file is plain JavaScript, not TypeScript.
module.exports = {
  // JUNIOR: `content` = "scan these files for class names".
  // - "./src/**/*.{js,ts,jsx,tsx}" covers every Qwik component + route.
  // - If you add a new folder with Tailwind classes (e.g. ./lib/), add it here
  //   or those classes will silently have no CSS in production builds.
  // AI NOTE: Tailwind purges unused classes based on this list. A missing glob
  // is the #1 cause of "works in dev, unstyled in build" bugs.
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // JUNIOR: `extend: {}` means "keep Tailwind defaults, add ours on top".
    // Put custom colors/fonts here (e.g. extend.colors.firm) instead of
    // replacing `theme` outright, which would delete all default utilities.
    extend: {},
  },
  // JUNIOR: `plugins` = extra Tailwind plugins (forms, typography, etc.).
  // Empty now — add e.g. require('@tailwindcss/forms') when you need it.
  plugins: [],
};
