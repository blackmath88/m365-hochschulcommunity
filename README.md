# M365 Hochschulcommunity

A small, print-first website for the M365 Hochschulcommunity.

The site serves three purposes:

1. a lightweight public landing page for the community,
2. a project page for the current M365 governance / Teams lifecycle experiment,
3. printable A4 HTML one-pagers that can be edited in the repo and exported to PDF from the browser.

## Design direction

Working identity: **Open Layers**.

The visual system is intentionally provisional: professional enough for real communication, but not presented as an official institutional brand. The core motif is a modular chevron made from independent overlapping parts — autonomous institutions, shared direction.

## Structure

- `/` — community landing page
- `/use-case/` — M365 governance / Teams lifecycle use case
- `/materials/open-source/` — print-first A4 one-pager: *Open Source bewusst nutzen*
- `/materials/m365-governance/` — print-first A4 one-pager: *Warum ein gemeinsames M365-Governance-Tool?*

## Local development

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Print / PDF

The material pages are designed at exact A4 dimensions with dedicated `@media print` styles. In the browser, use **Print → Save as PDF**, enable background graphics, and keep scale at 100%.

## Working governance

Coordination — Kai Boschung · Lysann Deutschmann · Achim Imboden

This is a working identity, not an official brand or formally constituted organisation.

## Resources and presentation

Navigation: **Community · Governance Experiment · Resources**.

- `/resources/` — publication series 01–03
- `/resources/open-source-quickguide/` — static web guide
- `/resources/open-source-quickguide/slides/` — ten-slide presentation
- `/resources/open-source-quickguide/slides/?print=1` — 16:9 PDF preview

The deck is a standalone React entry. Edit its JSON manifest and HTML fragments
under `public/decks/open-source-quickguide/`; the rest of the site remains static.
Use arrow keys / Space, Home / End, O for overview, P for print, F for fullscreen
and Esc to return. See [presentation mechanics](docs/quickguide-slides.md) and
[final QA results](docs/site-qa.md).
