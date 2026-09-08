# Shandilya Public School — Website (Phase 1)

An admissions-focused, mobile-first school website for Shandilya Public School, Varanasi. No ERP, no parent/student logins.

## One important note on the stack

This platform builds React apps on TanStack Start (React 19 + Vite + TypeScript), not Next.js. Everything you asked for still works the same way: file-based routing, server-side rendering, per-page SEO metadata, image optimization, Tailwind, Framer Motion, Lucide icons, and a Postgres database with file storage through Lovable Cloud (the built-in backend). Nothing in the feature list is lost — only the framework name differs.

## Photos

You'll upload real school photos next. Phase 1 builds every image slot with neutral, clearly-marked placeholders sized correctly, so dropping in real photographs later is a swap, not a redesign. No stock or AI-faked "school life" photos will be shipped as if real.

## Phase 1 scope (this build)

1. **Design system** — primary colour taken from the logo (deep crimson/maroon), a warm gold accent, off-white backgrounds, dark readable type, generous spacing, subtle borders, rounded corners. No gradient soup.
2. **Header** — transparent over hero, solid + blurred on scroll, full dropdown navigation as specified, prominent APPLY NOW, clean mobile drawer.
3. **Full-screen cinematic hero** — 100vw / 100vh layered image collage: staggered fade-ins, slow crossfades, differing drift speeds, subtle scale + parallax. No slider. Simplified single-layer treatment on mobile and under `prefers-reduced-motion`. Hero copy, both CTAs, scroll indicator.
4. **Homepage sections 2–14** — trust strip, Welcome split-screen, Why Shandilya (LEARN/EXPLORE/CREATE/PLAY/GROW), animated academic journey timeline, campus & facilities, Life at Shandilya horizontal scroll, Admissions Open conversion block, latest events, latest notices, achievements, testimonials placeholder, FAQ accordion, location & contact with map embed.
5. **Admission enquiry form** — all specified fields, validated, stored in the database, professional success state. Reachable from every APPLY NOW CTA.
6. **Contact page** — address, both numbers, email, map, form, Call / WhatsApp / Get Directions.
7. **Floating actions** — desktop floating Call / WhatsApp / Apply; mobile sticky bottom bar.
8. **Footer** — logo, intro, quick links, contact, social, copyright.
9. **SEO + accessibility + performance baseline** — per-page metadata, Open Graph/Twitter, canonical, robots.txt, sitemap, EducationalOrganization structured data with the Samne Ghat address, semantic HTML, alt text, keyboard focus states, lazy-loaded responsive images.

Contact details wired in: 8765261262 and 9336416244, shandilyaps@rediffmail.com, Gayatri Nagar Colony, Garhwaghat Road, Samne Ghat, Lanka, Varanasi.

## Later phases (not in this build)

- Phase 2: inner pages — About (Our School, Vision & Mission, Leadership, Principal's Message), Academics (Curriculum, Academic Journey, Senior Secondary streams, Syllabus by class, Academic Calendar), Admissions (Process, Documents, Fee Structure tabs, FAQs), Campus Life, Facilities, Gallery albums with lightbox, Events, Notice Board, Achievements, Safety & Well-being, Mandatory Public Disclosure.
- Phase 3: admin CMS at a protected `/admin` (email+password and Google sign-in) covering Dashboard, Admissions pipeline with NEW / CONTACTED / FOLLOW-UP / VISITED / CLOSED, Notices, Events, Gallery, Achievements, Syllabus, Fee Structure, Academic Calendar, Disclosure documents, Site settings.

## Content honesty rule

No invented fees, dates, results, staff names, awards, subject combinations, or certifications. Anything official-but-unknown ships as a clearly labelled placeholder driven by the database, so it can be filled in from the admin later.

## Technical notes

- Routing: file-based routes under `src/routes/`; homepage replaces the placeholder index.
- Backend: Lovable Cloud enabled in this phase; Phase 1 creates `admission_enquiries` with row-level security allowing public insert and admin-only read. Remaining tables (`notices`, `events`, `gallery_albums`, `gallery_images`, `achievements`, `syllabus_documents`, `fee_structures`, `academic_calendar`, `mandatory_disclosure_documents`, `leadership`, `site_settings`) are created in Phase 2/3 alongside the pages that use them, with timestamps and RLS.
- Logo becomes the favicon and header/footer mark.
- Animation via Framer Motion, gated on `prefers-reduced-motion` and simplified at mobile breakpoints; homepage sections below the fold are lazily mounted.
