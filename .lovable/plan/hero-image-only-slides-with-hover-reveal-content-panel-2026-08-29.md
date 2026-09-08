# Hero: image-only slides with hover-reveal content panel

Rework `src/components/home/Hero.tsx` so the hero shows a clean, text-free slideshow by default, and reveals a compact content panel on hover. Nothing outside the hero changes (ribbon, navbar, social rail, floating buttons, images, slide order, timing all stay).

## Behavior

- **Default state:** full-screen image only — no heading, eyebrow, description, or CTAs. Images keep their natural look; the large side-to-side scrim gradient is removed, leaving at most a minimal bottom-only gradient for text readability while hovering.
- **Timing:** the slideshow keeps its existing timing and order; hovering does NOT pause auto-advance (the current hover-to-pause handler is removed).
- **Hover (desktop):** moving the cursor anywhere over the hero reveals a compact panel near the bottom (slightly above the scroll indicator) — translateY + opacity, ~500ms ease-out. Moving out fades it back away.
- **Mobile/touch:** since there is no hover, the compact panel stays visible on touch devices, kept small so it doesn't cover key parts of the image (or tap on hero toggles it — will use always-visible-on-touch).
- **Sync:** the panel content is bound to the current slide index, so when the slide changes mid-hover the text swaps to match the new image.

## Hover panel content (per slide, from existing slide data)

Compact block, bottom-left, small type — eyebrow (uppercase, letter-spaced, accent color), short heading, one-line description, then two compact buttons:

- **Explore our school** — solid crimson, white text, rounded-full
- **Apply now** — transparent with white border, white text

Both with subtle hover scale/brightness transitions. Slide copy trimmed to short headings/descriptions; topper/achievement slides keep achievement-specific text without inventing names or stats. The slide counter/progress bar and prev/next arrows stay as they are.

## Scroll indicator

- Bottom-center of hero, independent of the hover panel: "SCROLL FOR MORE" in small uppercase letter-spaced white/grey text with a gently bobbing down-arrow below it. Reduced-motion users get a static indicator.

## Image presentation

- All slides centered consistently (`object-position: center` for cover slides; contain slides stay centered in frame rather than pushed right on desktop).
- Hero height stays `calc(100dvh - 97px)`.

## Accessibility

- `prefers-reduced-motion`: fade-only transitions, no bobbing arrow, no slide drift.
- Buttons remain keyboard focusable; the panel also appears on focus-within so keyboard users can reach it.

## Technical notes

- Single file change: `src/components/home/Hero.tsx` (copy edits inline in the existing `SLIDES` array). No routing, backend, or other-component changes.
