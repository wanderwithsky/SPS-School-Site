# Hero: real school photos as a fading slideshow

Replace the placeholder collage hero with a full-screen slideshow built from the 8 photos in your zip, auto-advancing with a slow fade every 3 seconds, plus left/right arrows for manual control.

## The 8 images

1. Prize-giving group on stage (students + staff with medals/trophies)
2. Certificate ceremony with school banner
3. Topper poster — XII Commerce, Shresth Pathak 97%
4. Toppers poster — XII Commerce full list (9 students)
5. Topper poster — School Topper XII, blue/gold design
6. Toppers poster — XII Science (Prakriti Verma 94% + 5 more)
7. Admission Open 2026-27 poster with topper
8. Yoga day in the school courtyard

## How the hero behaves

- One image fills the screen at a time; the next one cross-fades in over ~1.2s and holds for 3s.
- Photographs fill the frame edge-to-edge. The topper/admission posters are text-heavy, so they are shown fully (no cropping) over a soft blurred version of the same image as backdrop — nothing important gets cut off on mobile.
- Left and right arrow buttons on both sides (visible on desktop, thumb-reachable on mobile) step back and forward; wraps around at both ends.
- Small dot indicators under the hero copy show position and are clickable.
- Auto-advance pauses on hover/touch and after a manual arrow click resumes shortly after.
- Keyboard: arrow keys move slides when the hero has focus; buttons carry aria-labels.
- Reduced motion: no drift/scale, plain fade at a gentler pace.

## Text readability

Existing hero heading, sub-copy and the two CTAs stay exactly as they are, sitting above a dark gradient scrim so they remain legible over the bright poster slides.

## Technical notes

- Images uploaded to the Lovable CDN via the assets pipeline (pointer JSON in `src/assets/`), not committed as binaries; loaded with the first slide eager and the rest lazy.
- `src/components/home/Hero.tsx` rewritten: the 10-layer parallax collage is removed; a single `AnimatePresence` crossfade stack + arrow controls + index state replaces it.
- Alt text describes each slide (e.g. "CBSE Class XII Science toppers 2025-26").
- No changes to other homepage sections, routing, or backend.
