# Quickguide presentation

## Architecture

Standalone React entry at `/resources/open-source-quickguide/slides/`; the reading
guide and all other routes remain static HTML. Vite handles JSX without a whole
site migration. `public/decks/open-source-quickguide/deck.json` defines order,
titles and HTML fragment paths. Edit the fragment files to change slide content.
No scripts, stylesheets, embeds or event handlers belong in slide fragments.

## Bridge Deck reference

Studied https://github.com/blackmath88/bridge-deck before implementation:
README, SLIDE_CONTRACT, Stage, SlideIsland, Overview, PrintView, house.css,
print.css and App keyboard navigation. This implementation adapts their ideas:

- 1280 × 720 logical canvas with viewport scaling.
- Shared slide renderer for stage, overview thumbnails and print pages.
- Static manifest plus HTML fragments, reusable house classes and brand tokens.
- Explicit overview and print modes; final print page has no forced break.

The code here is a small implementation, not a copy of the application.
No database, Worker API, admin keys, editor, control centre, authentication,
second presenter window or LLM calls were ported. Namespaced CSS suffices because
this is a separate route with trusted repository-owned fragments; no Shadow DOM
editing infrastructure is needed.

## Controls

- Right arrow / Space / PageDown: next; Left arrow / PageUp: previous.
- Home / End: first / last.
- O: overview; select any thumbnail to navigate.
- P: print view. Its button invokes the browser print dialog.
- F: fullscreen; Esc: leave overview/print/fullscreen.
- Cmd/Ctrl+P keeps native behaviour and prints the complete loaded deck.
- `#slide-3` selects a slide. `?print=1` opens the print view directly.

## Print contract

`@page { size: 1280px 720px; margin: 0; }` gives exact 16:9 landscape pages
(338.67 × 190.5 mm). Each of the 10 slides prints once. Print uses the logical
canvas directly, without browser fit-to-page or CSS transforms. Backgrounds
are preserved with print-color-adjust. Controls and browser headers/footers
should be absent; use Save as PDF with browser headers/footers disabled.

The deck waits for every fragment before offering print controls. Load failures
show a readable error and a link to the static web guide. Native printing also
uses the same already-loaded full slide list.
