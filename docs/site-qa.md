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

## Visual cleanup pass — 2026-09-15

Re-validated with headless Chrome against the production preview: seven routes at
1440 / 900 / 390 px, a continuous width sweep from 360 px to 1920 px, and fresh
PDF exports. No console errors, failed requests, broken internal links, dead
anchors or missing images remain.

### Defects fixed

- Landing headline overflowed its grid column at most desktop widths. `Gemeinsam`
  rendered 83 px wider than the column at 1440 px and was cut by the hero figure.
  The clamp was capped so the line fits at every width from 360 px to 1920 px.
- The experiment path kept its two-column gutter padding after the grid collapsed,
  indenting steps 02–04 against step 01 on phones. The collapsed layouts now reset
  padding, and the two-column layout gained its missing row divider.
- The use-case hero sweep and the slide cover sweep were hard-edged rectangles
  cropped out of a 16:9 artwork; both sat across the headline. They now bleed off
  the layout edge and fade out.
- Those fades use stacked background gradients rather than `mask-image`, which
  Chrome silently drops when rasterising to PDF. Verified the slide PDF matches
  the screen rendering.
- The Resources footer linked to the page it was on.

### Landing hero visual

The right-hand panel showed `shared-layer-hero.svg`, a small labelled diagram,
composited over a tonal sweep with `mix-blend-mode: multiply` and a saturation
filter. At panel size its labels were unreadable and the two layers fought each
other. It was replaced with the repository's own background artwork,
`brand/v2/bg-sweep-16x9-tonal.svg`, as a single clean field cropped at
`85% center` so the facet crossing is the focal point and the lavender wedge
survives as the one warm accent.

The panel now bleeds to the viewport edge. The negative margin is derived from
`100vw` and `--max`, and `.landing-hero` clips it, so a scrollbar-inflated
`100vw` cannot overflow the page. Verified flush to the edge at 1000-1920 px,
contained below 900 px, zero overflow at every width from 360 px to 1920 px.

`brand/shared-layer-hero.svg` is now unused; it was left in place with the rest
of the brand asset set.

### Consistency

- All four site pages now carry `.site-shell`, a `status-note` and the same
  footer. `.site-shell` became a real flex column, so footers no longer float on
  tall viewports.
- The use-case page had an inline `<style>` block whose `ol-icon` class rendered
  shared components differently from the landing page. It now uses the shared
  `principle__icon` / `process__icon` vocabulary; the remainder moved to
  `polish.css`. The `ol-` prefix is again exclusive to the deck.
- Added `meta description` to the five pages that lacked one.
- Dropped an `!important` from `.guide-callout` by matching selector specificity.

### Removed

- `src/brand-v2.css` — referenced by no page.
- `public/brand-v2/` — byte-identical duplicates of `public/brand/v2/`, reachable
  only through that stylesheet.

### Unchanged, flagged for a decision

- `public/brand/` still holds twelve unused v1 chevron and lockup files. They are
  a brand asset set rather than dead site code, so they were left in place.
- Three type systems coexist: Manrope on the web pages, Helvetica on the A4
  onepagers, Arial in the deck. Defensible as a print/presentation split, but it
  is the most visible inconsistency left.
- `dist/` is listed in `.gitignore` yet tracked, so every build dirties the tree.

### Print

| Output | Pages | Result |
| --- | --- | --- |
| Open Source onepager | 1 | A4, zero content overflow |
| Governance onepager | 1 | A4, zero content overflow |
| Quickguide slide PDF | 10 | 16:9, no slide content out of bounds |
