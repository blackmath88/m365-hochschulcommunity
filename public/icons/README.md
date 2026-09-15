# Open Layers Icons · v0.2

Icon set for the M365 Hochschulcommunity working identity (Open Layers).

## Style
- viewBox `0 0 24 24`, live area 3–21
- stroke 1.25, round caps/joins, square corners, 90° chevron arrowheads
- one mint layer plane per icon (`#88BDA7`, 60%), drawn under the line
- stroke default Deep Green `#0F4D3B`

## Files
- `open-layers-icons-sprite.svg` – symbols `ol-<name>`, colour via `currentColor`
- `icons.json` – name → German label (for LLM content generation)

## Use
```html
<svg class="ol-icon" aria-hidden="true"><use href="/icons/open-layers-icons-sprite.svg#ol-community"/></svg>
<svg class="ol-icon ol-icon--line" aria-hidden="true"><use href="/icons/open-layers-icons-sprite.svg#ol-policy"/></svg>
```

```css
.ol-icon {
  width: 32px;
  height: 32px;
  color: #0F4D3B;
  fill: none;
  stroke: currentColor;
  stroke-width: var(--ol-icon-stroke, 1.25);
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ol-icon--line { --ol-accent-opacity: 0; }
.ol-icon--inverse { color: #fff; --ol-accent-opacity: .45; }
```

Below 20px set `--ol-icon-stroke: 1.5`.
