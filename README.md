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
