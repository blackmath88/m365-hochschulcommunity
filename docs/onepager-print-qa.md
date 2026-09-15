# Onepager print QA

Latest validation: 2026-09-15, after the site-wide navigation and visual QA.
See [site-qa.md](site-qa.md) for the complete current results and routes.

Both pages export to exactly one A4 portrait PDF page at 100% scale, without
clipping, overflow or a second blank page. Body text is 8.5 pt; small metadata
and source labels are smaller. The Open Source PDF retains all four external
source links. Both use the v2 mark, thin rules, and the canonical icon sprite.

The fixed A4 surface retains its grid on narrow screens and in print. On phones,
the paper preview scrolls horizontally while toolbar controls wrap. Responsive
web-page rules must not collapse columns inside the fixed-size paper surface.

## Recheck after edits

1. Run `npm install` and `npm run build`, then start `npm run preview`.
2. Open both `/materials/` routes; inspect desktop and narrow-screen previews.
3. Export PDFs with CSS A4 sizing, scale 100%, backgrounds enabled and browser
   headers/footers disabled.
4. Count pages and verify footer text, source links, logos and icons.
5. Inspect rasterized PDF pages; geometry checks alone cannot establish quality.

The original canonical-content integration was checked against both supplied
Markdown files in commit 98e2454. Later editorial changes are represented by the
current HTML. The final QA pass preserves that prose and changes presentation
and navigation only.
