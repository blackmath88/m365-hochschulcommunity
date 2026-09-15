# Canonical onepager print QA

Validated on 2026-09-15 with desktop Google Chrome on macOS.

## Results

| Check | Open Source (01) | M365 Governance (02) |
| --- | --- | --- |
| PDF pages | 1 | 1 |
| CSS paper size | 210 × 297 mm | 210 × 297 mm |
| Print scale | 100% | 100% |
| Content outside paper bounds | None | None |
| Body text | 8.5 pt | 8.5 pt |
| Main heading | 27 pt | 25 pt |
| Sprite icons | 3 | 4 |
| Source link annotations in PDF | All 4 retained | No external sources in canonical text |

`npm install` and `npm run build` passed. Desktop screenshots and rasterized
PDF pages were visually inspected: logo and icons render correctly, background
colours print, the toolbar is absent from PDFs, and no text is clipped.

The PDFs were generated with Chromium's `preferCSSPageSize: true`,
`printBackground: true`, `scale: 1`, and `displayHeaderFooter: false`.
Page counts and link annotations were checked with pypdf. DOM element bounds
were checked against the A4 surface with print media active. QA PDFs and images
are temporary verification artifacts, not repository source files.

## Content handling

Both supplied canonical Markdown files were checked block by block against the
HTML after normalizing markup, numbering, whitespace and punctuation. Every
content block is retained, including all caveats, questions and source labels.

Only presentation changed: section numbering is omitted, shared/local inventories
are inline lists, short paragraphs are joined visually, sources are grouped at
the bottom, and concluding explanations precede the final decision questions.
No substantive text was shortened or removed.

## Rechecking after edits

1. Run `npm install` and `npm run build`.
2. Open each `/materials/` page in the local preview.
3. Print to PDF at 100%, using CSS A4 sizing and background graphics.
4. Check that each PDF has exactly one page and all footer text remains visible.
5. Inspect both rendered PDF pages, including the source links on material 01.

The layout uses normal flow with visible overflow so future content additions
are detectable rather than silently clipped. These checks cover Chrome on macOS;
other browser engines and operating-system font substitutions were not tested.
