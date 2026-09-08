import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PhotoSlot } from "@/components/about/PhotoSlot";
import { SCHOOL } from "@/lib/school";
import { cn } from "@/lib/utils";



const TITLE = "About Shandilya Public School | Varanasi";
const DESC =
  "Learn about Shandilya Public School, Varanasi, its CBSE affiliation, academic journey, educational philosophy, facilities, activities and school community.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "School",
          name: SCHOOL.name,
          slogan: SCHOOL.motto,
          url: "/about",
          email: SCHOOL.email,
          telephone: SCHOOL.phones.map((p) => `+91${p}`),
          address: {
            "@type": "PostalAddress",
            streetAddress: "Gayatri Nagar Colony, Garhwaghat Road, Samne Ghat, Lanka",
            addressLocality: SCHOOL.locality,
            addressRegion: SCHOOL.region,
            addressCountry: SCHOOL.country,
          },
        }),
      },
    ],
  }),
  component: AboutPage,
});

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
};

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.3em] text-primary uppercase">
      <span aria-hidden="true" className="h-px w-8 bg-accent" />
      {children}
    </p>
  );
}

function AboutPage() {
  return (
    <SiteLayout>
      <AboutHero />
      <WhoWeAre />
      <Identity />
      <Philosophy />
      <Journey />
      <Facilities />
      <BeyondAcademics />
      <Events />
      <Achievements />
      <Leadership />
      <ManagerMessage />
      <Community />
      <Campus />
      <WhyShandilya />
      <AdmissionsCta />
    </SiteLayout>
  );
}

/* ---------------- Hero ---------------- */

function AboutHero() {
  return (
    <section className="relative flex h-[min(78vw,46vh)] items-center justify-center overflow-hidden sm:h-[min(46vw,50vh)] lg:h-[min(40vw,54vh)]">
      <motion.img
        src="https://res.cloudinary.com/zvlxacfu/image/upload/v1788824476/fcfb3fd3-c2fb-438f-9da1-c921451933bd.jpg"
        alt="Students of Shandilya Public School practising yoga on the school campus"
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 h-full w-full object-cover motion-reduce:scale-100"
        style={{ objectPosition: "center 30%" }}
      />
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.82),rgba(0,0,0,0.60),rgba(0,0,0,0.75))]"
      />
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        className="relative px-4 text-center font-serif text-[clamp(2.4rem,9vw,5.5rem)] leading-none font-semibold tracking-[0.04em] whitespace-nowrap text-[#FBF6EC] [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]"
      >
        About Us
      </motion.h1>
    </section>
  );
}

/* ---------------- Who we are ---------------- */

function WhoWeAre() {
  return (
    <section id="who-we-are" className="scroll-mt-28 bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <motion.div {...fadeUp} className="relative">
          {/* Subtle editorial accent */}
          <div aria-hidden="true" className="absolute -left-3 -top-3 size-20 rounded-full bg-accent/5 blur-2xl" />
          <div className="group overflow-hidden rounded-[24px] border border-border/40 shadow-sm bg-secondary relative z-10">
            <img
              src="https://res.cloudinary.com/zvlxacfu/image/upload/v1788824363/2c0c0ea5-8c6a-4e05-b616-4d4594e7de68.jpg"
              alt="Students participating in an outdoor school project display"
              loading="lazy"
              className="w-full aspect-[16/9] object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          </div>
        </motion.div>
        <motion.div {...fadeUp}>
          <Eyebrow>Who we are</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl leading-tight font-semibold text-foreground sm:text-4xl lg:text-[2.75rem]">
            An Education That
            <br />
            Looks Beyond the Classroom
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Shandilya Public School presents an environment in which every student is encouraged to
            discover and realise their potential. The school's approach goes beyond academic
            instruction, with attention to creativity, physical development, values, responsibility
            and confidence.
          </p>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            With a strong academic foundation and opportunities across sports, cultural activities,
            practical learning and co-curricular experiences, the school aims to help students
            become confident, curious and responsible individuals.
          </p>
          <p className="mt-8 border-l-2 border-primary pl-5 font-serif text-lg text-foreground italic sm:text-xl">
            <span className="text-accent">“</span>
            {SCHOOL.motto}
            <span className="text-accent">”</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Identity ---------------- */

const IDENTITY = [
  { value: "CBSE", caption: "Affiliated" },
  { value: "Pre-Primary – XII", caption: "Classes offered" },
  { value: "2131271", caption: "Affiliation no." },
  { value: "71349", caption: "School code" },
  { value: "Science · Commerce · Humanities", caption: "Senior secondary streams" },
  { value: "Varanasi", caption: "Uttar Pradesh" },
];

function Identity() {
  return (
    <section className="border-y border-border bg-secondary py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Eyebrow>Our identity</Eyebrow>
        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-3">
          {IDENTITY.map((item, i) => (
            <motion.div
              key={item.caption}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
            >
              <dt className="font-serif text-xl leading-tight font-semibold text-foreground sm:text-2xl">
                {item.value}
              </dt>
              <dd className="mt-2 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                {item.caption}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------------- Philosophy ---------------- */

const PILLARS = [
  { key: "Learn", text: "Strong academic foundations built on competency-based learning." },
  { key: "Explore", text: "Curiosity and practical learning across labs and classrooms." },
  { key: "Create", text: "Art, music, culture and creativity as everyday expression." },
  { key: "Grow", text: "Confidence, discipline, values and character over the years." },
];

function Philosophy() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div {...fadeUp} className="max-w-2xl">
          <Eyebrow>Our philosophy</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl leading-tight font-semibold text-foreground sm:text-4xl lg:text-[2.75rem]">
            Learning. Character.
            <br />
            Confidence.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Education at Shandilya is intended to be joyful and holistic — an academic foundation
            supported by practical learning, creativity, physical development and a steady sense of
            values and responsibility.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.key}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className="bg-background p-8 transition-colors duration-300 hover:bg-secondary"
            >
              <span className="text-[11px] font-semibold tracking-[0.28em] text-accent-foreground/60 uppercase">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-serif text-2xl font-semibold text-primary">{p.key}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Journey ---------------- */

const STAGES = [
  {
    name: "Pre-Primary",
    text: "First steps into school life, with play, language and early number sense in a warm, secure setting.",
  },
  {
    name: "Primary",
    text: "Foundational literacy and numeracy, supported by activity-based learning and creative expression.",
  },
  {
    name: "Middle School",
    text: "Broader subject learning, practical work in the labs and steadily growing independence.",
  },
  {
    name: "Secondary",
    text: "Focused preparation for the CBSE Class X examination alongside sports and co-curricular life.",
  },
  {
    name: "Senior Secondary",
    text: "Stream-based study in Science, Commerce or Humanities, leading towards higher education pathways.",
  },
];

function Journey() {
  return (
    <section className="border-y border-border bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div {...fadeUp} className="max-w-2xl">
          <Eyebrow>Academic journey</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl leading-tight font-semibold text-foreground sm:text-4xl lg:text-[2.75rem]">
            From First Steps
            <br />
            to Future Pathways
          </h2>
        </motion.div>

        <ol className="mt-14 space-y-0 border-l border-border pl-6 sm:pl-10">
          {STAGES.map((s, i) => (
            <motion.li
              key={s.name}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="relative pb-12 last:pb-0"
            >
              <span
                aria-hidden="true"
                className="absolute top-2 -left-[1.9rem] size-3 rounded-full border-2 border-primary bg-background sm:-left-[2.9rem]"
              />
              <h3 className="font-serif text-2xl font-semibold text-foreground">{s.name}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {s.text}
              </p>
              {i === STAGES.length - 1 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Science", "Commerce", "Humanities"].map((st) => (
                    <span
                      key={st}
                      className="rounded-full border border-primary/30 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-primary uppercase"
                    >
                      {st}
                    </span>
                  ))}
                </div>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Facilities ---------------- */

const FACILITIES = [
  {
    title: "Smart Classrooms",
    label: "Smart classroom image",
    text: "Classrooms supported by smart-class audio and video teaching aids.",
  },
  {
    title: "Laboratories",
    label: "Laboratory image",
    text: "Computer, Science and Mathematics laboratories for hands-on learning.",
  },
  {
    title: "Library",
    label: "Library image",
    text: "A well-stocked library that encourages reading and independent study.",
  },
  {
    title: "Sports & Physical Education",
    label: "Sports image",
    text: "Indoor and outdoor games with health and physical education for all classes.",
  },
];

function Facilities() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div {...fadeUp} className="max-w-2xl">
          <Eyebrow>Learning here</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl leading-tight font-semibold text-foreground sm:text-4xl">
            What Learning Looks Like Here
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          {FACILITIES.map((f, i) => (
            <motion.article key={f.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.07 }}>
              <PhotoSlot label={f.label} ratio="aspect-[16/10]" />
              <h3 className="mt-5 font-serif text-2xl font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Beyond academics ---------------- */

const LIFE = [
  { title: "Sports", text: "Indoor and outdoor games through the school year." },
  { title: "Music & Dance", text: "Rhythm, performance and confidence on stage." },
  { title: "Art & Craft", text: "Making, drawing and hands-on creative work." },
  { title: "Cultural Activities", text: "Expression rooted in our shared traditions." },
  { title: "Co-curricular Activities", text: "Learning that continues past the timetable." },
  { title: "Celebrations", text: "Days the whole school shares together." },
];

function BeyondAcademics() {
  return (
    <section className="bg-ink py-20 text-ink-foreground sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div {...fadeUp} className="max-w-2xl">
          <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.3em] text-accent uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            Beyond academics
          </p>
          <h2 className="mt-5 font-serif text-3xl leading-tight font-semibold sm:text-4xl lg:text-[2.75rem]">
            A School Life Full of
            <br />
            Ideas, Energy & Expression
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {LIFE.map((l, i) => (
            <motion.article
              key={l.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
            >
              <PhotoSlot
                label={`${l.title} image`}
                ratio="aspect-[4/3]"
                className="border-ink-foreground/15 bg-ink-foreground/5"
              />
              <h3 className="mt-4 text-[12.5px] font-bold tracking-[0.18em] uppercase">
                {l.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-foreground/70">{l.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Events ---------------- */

const culturalEvents = [
  {
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788824476/fcfb3fd3-c2fb-438f-9da1-c921451933bd.jpg",
    title: "Cultural Events",
  },
  {
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788824426/e8b22ebc-68cf-4d9c-9c85-f5864bc3ece1.jpg",
    title: "Cultural Events",
  },
  {
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788824430/7d6b05a6-efee-414e-b110-4d132e17bd65.jpg",
    title: "Cultural Events",
  },
  {
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788824418/225a03c9-f103-4362-bf13-8fc2f91cc655.jpg",
    title: "Cultural Events",
  },
  {
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788824365/56019fb1-2b5c-44ed-9419-cf2e625a4ebe.jpg",
    title: "Cultural Events",
  },
  {
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788824449/bd24c7da-d14f-4ff0-8256-52a54fd1ba57.jpg",
    title: "Cultural Events",
  },
];

function GalleryCard({ item, className, ratio }: { item: (typeof culturalEvents)[number]; className?: string; ratio: string }) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        ratio,
        className,
      )}
    >
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="absolute inset-0 size-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
      />

      {/* Bottom gradient — visible on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[450ms] ease-out group-hover:opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.40) 30%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Hover text */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center px-5 pb-6 sm:pb-8">
        <p
          className="font-serif text-base italic text-white opacity-0 transition-all duration-[450ms] ease-out translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 sm:text-lg"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
        >
          {item.title}
        </p>
      </div>
    </div>
  );
}

function Events() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div {...fadeUp} className="max-w-2xl">
          <Eyebrow>Celebrating together</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl leading-tight font-semibold text-foreground sm:text-4xl">
            Moments That Become Memories
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Annual functions, cultural celebrations, sports activities, competitions and student
            presentations give every child a stage — and give our families reasons to come together
            as a community.
          </p>
        </motion.div>

        {/* ---- Top row: 1 large featured + 2 stacked — height-locked on desktop ---- */}
        <div className="mt-14 grid gap-4 sm:gap-5 lg:grid-cols-[1.6fr_1fr] lg:h-[520px]">
          <motion.div {...fadeUp} className="relative min-h-0">
            <GalleryCard item={culturalEvents[0]} ratio="aspect-[16/10] lg:aspect-auto" className="lg:absolute lg:inset-0" />
          </motion.div>
          <div className="grid grid-rows-2 gap-4 sm:gap-5">
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }} className="relative min-h-0">
              <GalleryCard item={culturalEvents[1]} ratio="aspect-[16/10] lg:aspect-auto" className="lg:absolute lg:inset-0" />
            </motion.div>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="relative min-h-0">
              <GalleryCard item={culturalEvents[2]} ratio="aspect-[16/10] lg:aspect-auto" className="lg:absolute lg:inset-0" />
            </motion.div>
          </div>
        </div>

        {/* ---- Bottom row: 3 equal landscape images ---- */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-5 sm:grid-cols-3 sm:gap-5">
          {culturalEvents.slice(3).map((item, i) => (
            <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 + i * 0.05 }}>
              <GalleryCard item={item} ratio="aspect-[4/3]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Achievements ---------------- */

const RESULTS_2023 = [
  { klass: "Class X", registered: 164, passed: 142, pct: "86.58%" },
  { klass: "Class XII", registered: 148, passed: 115, pct: "77.70%" },
];

function Achievements() {
  return (
    <section className="border-y border-border bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div {...fadeUp} className="max-w-2xl">
          <Eyebrow>Achievement & excellence</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl leading-tight font-semibold text-foreground sm:text-4xl">
            Celebrating Every Milestone
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <motion.div {...fadeUp}>
            <p className="text-[11px] font-semibold tracking-[0.24em] text-primary uppercase">
              2023 Board Result Data
            </p>
            <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">
                  Published CBSE board results for 2023 at Shandilya Public School
                </caption>
                <thead className="bg-secondary text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Class
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Registered
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Passed
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Pass %
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {RESULTS_2023.map((r) => (
                    <tr key={r.klass} className="border-t border-border">
                      <th scope="row" className="px-4 py-4 font-serif text-base font-semibold text-foreground">
                        {r.klass}
                      </th>
                      <td className="px-4 py-4 text-muted-foreground">{r.registered}</td>
                      <td className="px-4 py-4 text-muted-foreground">{r.passed}</td>
                      <td className="px-4 py-4 font-semibold text-primary">{r.pct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Figures as published in the school's mandatory public disclosure for 2023. Newer
              result data will be added as it is released.
            </p>
          </motion.div>

          <motion.ul {...fadeUp} className="grid content-start gap-px overflow-hidden rounded-2xl bg-border">
            {[
              { t: "Academic Excellence", d: "Consistent focus on classroom achievement." },
              { t: "Board Results", d: "CBSE Class X and XII outcomes, published each year." },
              { t: "Student Achievements", d: "Recognition for effort across the school." },
              { t: "Sports", d: "Participation in indoor and outdoor games." },
              { t: "Competitions", d: "Inter-class and inter-school participation." },
            ].map((c) => (
              <li key={c.t} className="bg-background px-6 py-5">
                <h3 className="text-[12px] font-bold tracking-[0.18em] text-foreground uppercase">
                  {c.t}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{c.d}</p>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Leadership ---------------- */

const LEADERSHIP = [
  {
    name: "Er. Arvind Kr. Tiwari",
    role: "Manager",
    note: "Guides the school's direction and long-term development.",
    photo: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788823593/915c7797-7788-4c3f-8708-a47a47eed5f9.jpg",
  },
  {
    name: "Ms. Nutan Tiwari",
    role: "Administrative Director",
    note: "Oversees school administration and operations.",
    photo: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788823626/8993cc89-14bc-4059-b66b-cf84a006bd89.jpg",
  },
  {
    name: "Mr. Suryansh Tiwari",
    role: "Administrative Officer",
    note: "Supports administrative functions across the campus.",
    photo: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788823641/92e32fc1-34b8-4e71-b8c2-d476240e36f6.jpg",
  },
  {
    name: "Ms. Reena Singh",
    role: "Academic Coordinator",
    note: "Coordinates curriculum delivery and classroom planning.",
    photo: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788823644/3ac54d0a-6d4a-4a91-b3e3-46ca8b45139f.jpg",
  },
  {
    name: "Ms. Gita Srivastava",
    role: "Office Incharge — Accountant",
    note: "Manages the school office and accounts.",
    photo: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788823652/ffbb8f15-c287-4264-ba4c-d411ca1fcda0.jpg",
  },
];

function Leadership() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div {...fadeUp} className="max-w-2xl">
          <Eyebrow>Our leadership</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl leading-tight font-semibold text-foreground sm:text-4xl lg:text-[2.75rem]">
            The People Behind
            <br />
            the Vision
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          {LEADERSHIP.map((p, i) => (
            <motion.article
              key={p.name}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className={cn("lg:col-span-2", i === 3 ? "lg:col-start-2" : "")}
            >
              <LeaderPhoto person={p} />
              <h3 className="mt-5 font-serif text-xl font-semibold text-foreground">{p.name}</h3>
              <p className="mt-1 text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
                {p.role}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeaderPhoto({ person }: { person: (typeof LEADERSHIP)[number] }) {
  const [active, setActive] = useState(false);

  if (!person.photo) return <PhotoSlot label="Leadership portrait" ratio="aspect-[4/5]" />;

  return (
    <div
      role="group"
      tabIndex={0}
      aria-label={`${person.name}, ${person.role}. ${person.note}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onClick={() => setActive((v) => !v)}
      className="relative aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl border border-border bg-secondary outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
    >
      <img
        src={person.photo}
        alt={`${person.name}, ${person.role} of Shandilya Public School`}
        loading="lazy"
        style={{ transform: active ? "scale(1.02)" : "scale(1)" }}
        className="h-full w-full object-cover object-top transition-transform duration-500 ease-out motion-reduce:transform-none"
      />
      <div
        aria-hidden="true"
        style={{
          opacity: active ? 1 : 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 25%, rgba(0,0,0,0.28) 50%, rgba(0,0,0,0.08) 72%, rgba(0,0,0,0) 100%)",
        }}
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out"
      />
      <div
        aria-hidden="true"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? "translateY(0)" : "translateY(12px)",
        }}
        className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-8 transition-[opacity,transform] duration-[450ms] ease-out motion-reduce:transform-none motion-reduce:transition-opacity"
      >
        <span className="mb-3 block h-px w-10 bg-[#D6A84F]" />
        <p className="max-w-[22ch] text-center font-serif text-[0.95rem] leading-relaxed text-white italic [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
          <span className="text-[#D6A84F]">&ldquo;</span>
          {person.note}
          <span className="text-[#D6A84F]">&rdquo;</span>
        </p>
      </div>
    </div>
  );
}


/* ---------------- Manager's message ---------------- */

function ManagerMessage() {
  return (
    <section className="border-y border-border bg-secondary py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
        <motion.div {...fadeUp}>
          <PhotoSlot label="Manager portrait" ratio="aspect-[4/5]" />
        </motion.div>
        <motion.div {...fadeUp}>
          <Eyebrow>Manager's message</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl leading-tight font-semibold text-foreground sm:text-4xl lg:text-[2.75rem]">
            A Shared Commitment
            <br />
            to Every Child
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Every child has the potential to learn, grow and realise their abilities in an
            environment built around education, development and confidence. Our work as a school is
            to create that environment, consistently, for every student who joins us.
          </p>
          <p className="mt-8 font-serif text-xl font-semibold text-foreground">
            Er. Arvind Kr. Tiwari
          </p>
          <p className="mt-1 text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
            Manager
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Community ---------------- */

function Community() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div {...fadeUp} className="max-w-2xl">
          <Eyebrow>School community</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl leading-tight font-semibold text-foreground sm:text-4xl">
            Growing Together
          </h2>
        </motion.div>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {[
            {
              t: "Students",
              d: "Encouraged to be curious, disciplined and responsible for their own learning.",
            },
            {
              t: "Teachers",
              d: "Qualified educators who guide, mentor and stay closely involved with each class.",
            },
            {
              t: "Parents",
              d: "Partners in the process, with open communication between home and school.",
            },
          ].map((c, i) => (
            <motion.div
              key={c.t}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className="border-t-2 border-accent pt-5"
            >
              <h3 className="font-serif text-2xl font-semibold text-foreground">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Campus ---------------- */

const INFRA = [
  { v: "9,825 sq. m", c: "Campus area" },
  { v: "50", c: "Classrooms" },
  { v: "6", c: "Laboratories incl. computer labs" },
  { v: "Yes", c: "Internet facility" },
  { v: "15", c: "Girls' toilets" },
  { v: "15", c: "Boys' toilets" },
];

function Campus() {
  return (
    <section className="border-y border-border bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div {...fadeUp}>
          <Eyebrow>Campus & infrastructure</Eyebrow>
        </motion.div>
        <motion.div {...fadeUp} className="mt-8">
          <PhotoSlot label="Campus & infrastructure image" ratio="aspect-[16/9]" />
        </motion.div>
        <p className="mt-6 text-[11px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
          Officially published infrastructure information
        </p>
        <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-8 lg:grid-cols-3">
          {INFRA.map((item, i) => (
            <motion.div
              key={item.c}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
            >
              <dt className="font-serif text-2xl font-semibold text-primary sm:text-3xl">
                {item.v}
              </dt>
              <dd className="mt-1.5 text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                {item.c}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------------- Why Shandilya ---------------- */

const WHY = [
  "CBSE education",
  "Academic foundation",
  "Smart learning",
  "Laboratories",
  "Library",
  "Sports",
  "Arts and cultural activities",
  "Health and physical education",
  "Transport",
  "CCTV coverage",
  "Qualified teachers",
  "Holistic development",
];

function WhyShandilya() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div {...fadeUp} className="max-w-2xl">
          <Eyebrow>Why Shandilya</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl leading-tight font-semibold text-foreground sm:text-4xl lg:text-[2.75rem]">
            Why Families Choose
            <br />
            Shandilya
          </h2>
        </motion.div>
        <ul className="mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w, i) => (
            <motion.li
              key={w}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.03 }}
              className="flex items-center gap-3 border-b border-border pb-4 text-sm font-medium text-foreground"
            >
              <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
              {w}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Admissions CTA ---------------- */

function AdmissionsCta() {
  return (
    <section className="bg-primary py-20 text-primary-foreground sm:py-24">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-6">
        <motion.h2
          {...fadeUp}
          className="font-serif text-3xl leading-tight font-semibold sm:text-4xl lg:text-[2.75rem]"
        >
          Ready to Begin
          <br />
          Your Child's Journey?
        </motion.h2>
        <motion.p {...fadeUp} className="mt-5 text-base leading-relaxed text-primary-foreground/85">
          Explore admissions and discover how your child can become a part of the Shandilya
          community.
        </motion.p>
        <motion.div
          {...fadeUp}
          className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center"
        >
          <Link
            to="/admissions/apply"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[12.5px] font-bold tracking-[0.12em] text-accent-foreground uppercase transition-all duration-300 hover:scale-[1.03] hover:brightness-110"
          >
            Apply for admission
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full border border-primary-foreground/50 px-7 py-3.5 text-[12.5px] font-bold tracking-[0.12em] uppercase transition-all duration-300 hover:bg-primary-foreground/10"
          >
            Contact the school
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
