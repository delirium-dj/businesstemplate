// ---------------------------------------------------------------------------
// postcss.config.cjs — PostCSS pipeline (runs AFTER Tailwind, BEFORE Vite).
//
// WHY THIS FILE EXISTS:
//   Vite processes every .css file through PostCSS. This chain does two jobs:
//   1. `tailwindcss` — expands @tailwind/@apply directives into real CSS.
//   2. `autoprefixer` — adds vendor prefixes (-webkit-, -ms-) so flex/grid/
//      backdrop-filter work in older Safari/Edge without hand-writing them.
//   Delete this file and src/global.css + src/routes/styles.css stop compiling.
//
// WHY .cjs: same reason as tailwind.config.cjs — package.json is ESM
// ("type": "module"), so we need .cjs for module.exports to load correctly.
// ---------------------------------------------------------------------------
module.exports = {
  plugins: {
    // JUNIOR: order matters — tailwindcss FIRST (generate utilities),
    // autoprefixer SECOND (prefix the generated output).
    tailwindcss: {},
    autoprefixer: {},
  },
};
