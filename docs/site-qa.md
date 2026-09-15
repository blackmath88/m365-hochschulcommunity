# Final site QA

Validated 2026-09-15 using Google Chrome on macOS against the Vite production
preview, with desktop (1280 × 900) and phone (390 × 844) viewports.

## Routes and navigation

- `/` — Community
- `/use-case/` — Governance Experiment (existing URL retained)
- `/resources/` — Resources 01–03
- `/materials/open-source/` — Resource 01, Open Source bewusst nutzen
- `/materials/m365-governance/` — Resource 02, M365 Governance-Tool
- `/resources/open-source-quickguide/` — Resource 03, reading guide
- `/resources/open-source-quickguide/slides/` — presentation and overview
- `/resources/open-source-quickguide/slides/?print=1` — slide print preview

Top-level navigation uses Community / Governance Experiment / Resources.
Onepagers link back to Resources and Community. The guide, presentation and print
preview link to each other and back to Resources. Main navigation remains visible
on phones. All internal links and section anchors passed; no missing images,
missing SVG symbols, failed local asset requests or JavaScript exceptions found.
Active page and stylesheet references use the v2 brand assets and icon sprite.
Legacy asset files remain available for historical references but are not used
by these active pages.

## Print and slides

| Output | Pages | Paper | Result |
| --- | --- | --- | --- |
| Open Source onepager | 1 | A4 portrait | No overflow; 4 source link annotations |
| Governance onepager | 1 | A4 portrait | No overflow; clear shared/local and decision sections |
| Quickguide slide PDF | 10 | 16:9 landscape, 960 × 540 PDF points | One slide per page; 10 guide link annotations |

All exports used CSS page size, scale 1, backgrounds enabled and browser
headers/footers disabled. Page counts, nonempty page text and link annotations
were checked with pypdf; PDFs were rasterized for visual inspection. No blank
pages, toolbar text or clipped logos/SVGs were found. Both onepagers use 8.5 pt
body text. Small metadata and citations retain their smaller editorial sizing.

Every slide was inspected at 1280 × 720 and checked for content bounds.
Main slide body text is 22–24 px or larger; caveats use 18–19 px. The operating
model diagram was adjusted to keep its final note clear of the footer.

Verified: arrows, Space, Home, End, overview toggle, thumbnail selection,
print mode, Esc and fullscreen. Native printing renders all loaded slides.
Presentation scales on phones; the web version is the reading alternative.

## Fixes during the final pass

- Removed responsive column collapse from the fixed A4 Governance layout.
- Raised its smallest body and step text to 8.5 pt.
- Separated homepage step icons from sequence numbers.
- Moved the shared-core band below tenant labels so it no longer obscures them.
- Wrapped onepager toolbar controls on narrow screens.
- Contained the scaled slide stage to prevent horizontal page overflow on phones.
- Formatted new static HTML for easier direct editing.

## Build and scope

`npm install` and `npm run build` passed without warnings. No `npm test` script or
existing test suite is configured; functional checks used browser automation.

The second and third attached implementation prompts were identical. The three
commits correspond to resources/web guide, presentation runtime, and the final
site-wide QA requested in the message. Existing onepager prose was not rewritten
during this final pass. No backend, editing system or additional product concepts
were introduced.

No known remaining defects in the tested environment. Other browser engines,
physical printers and operating-system font substitutions were not tested.
