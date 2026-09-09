import { useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import welcomePhoto from "@/assets/welcome/chairman.png";
import { motion, useScroll, useTransform, MotionValue, AnimatePresence } from "motion/react";
import {
  BookOpen,
  FlaskConical,
  Palette,
  Trophy,
  Sprout,
  MonitorSmartphone,
  Cpu,
  Sigma,
  Library,
  Music4,
  Brush,
  Bus,
  ShieldCheck,
  CalendarDays,
  FileText,
  Award,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Navigation,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SCHOOL, telHref, waHref, directionsHref, mapEmbedSrc } from "@/lib/school";
import { useSiteSettings, usePageSection, useNoticesCMS, useAchievementsCMS } from "@/hooks/useCMS";
import {
  DEFAULT_WELCOME_CONTENT,
  DEFAULT_WHY_US_ITEMS,
  DEFAULT_FAQS,
  DEFAULT_TESTIMONIALS,
} from "@/lib/cms-types";

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
};

function SectionHeading({
  eyebrow,
  title,
  intro,
  light = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  light?: boolean;
}) {
  return (
    <motion.div {...fadeUp} className="max-w-2xl">
      <p
        className={`text-[11px] font-semibold tracking-[0.3em] uppercase ${
          light ? "text-accent" : "text-primary"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-4 font-serif text-3xl leading-tight font-semibold sm:text-4xl ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            light ? "text-white/75" : "text-muted-foreground"
          }`}
        >
          {intro}
        </p>
      )}
    </motion.div>
  );
}

/* ---------------- Section 2: trust strip ---------------- */

export function TrustStrip() {
  const items = [
    "CBSE Affiliated",
    "Pre-Primary to Class XII",
    "Science • Commerce • Humanities",
    "Varanasi",
  ];
  const sequence = [...items, ...items, ...items];
  return (
    <section
      aria-label="School highlights"
      className="group relative w-full overflow-hidden border-y border-border bg-card py-5"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-card to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-card to-transparent sm:w-32" />
      <div className="marquee-track flex w-max items-center group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {sequence.map((item, idx) => (
              <div key={`${copy}-${idx}`} className="flex items-center">
                <span className="px-6 font-serif text-[13px] font-semibold tracking-[0.22em] whitespace-nowrap text-foreground italic uppercase sm:px-10 sm:text-sm">
                  {item}
                </span>
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Section 3: welcome ---------------- */

function ManagerPhoto() {
  const [revealed, setRevealed] = useState(false);
  return (
    <motion.div
      {...fadeUp}
      className="group order-1 relative overflow-hidden rounded-3xl border border-border bg-card"
      onMouseEnter={() => setRevealed(true)}
      onMouseLeave={() => setRevealed(false)}
      onClick={() => setRevealed((v) => !v)}
      role="group"
      aria-label="Er. Arvind Kr. Tiwari, Manager — hover or tap to reveal"
    >
      <img
        src={welcomePhoto}
        alt="Er. Arvind Kr. Tiwari, Manager of Shandilya Public School"
        loading="lazy"
        className="block aspect-[924/1100] w-full object-cover"
      />
      {/* Cinematic bottom fade — full width, blends into photo, no box/border/radius */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 transition-opacity duration-[450ms] ease-out"
        style={{
          opacity: revealed ? 1 : 0,
          height: "24%",
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.50) 65%, rgba(0,0,0,0.65) 100%)",
        }}
      />
      {/* Name + designation sitting over the bottom fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center px-5 pb-8 text-center transition-all duration-[450ms] ease-out"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(16px)",
        }}
      >
        <p
          className="font-serif text-[22px] font-semibold leading-tight whitespace-nowrap sm:text-[28px]"
          style={{
            color: "#D6A84F",
            textShadow: "0 2px 8px rgba(0,0,0,0.45)",
          }}
        >
          Er. Arvind Kr. Tiwari
        </p>
        <p
          className="mt-1.5 text-[12px] font-medium tracking-[0.24em] uppercase sm:text-[14px]"
          style={{ color: "#FFFFFF", textShadow: "0 2px 8px rgba(0,0,0,0.45)" }}
        >
          (Manager)
        </p>
      </div>
    </motion.div>
  );
}

export function Welcome() {
  const { data: welcomeData } = usePageSection("home", "welcome", DEFAULT_WELCOME_CONTENT);
  const { data: settings } = useSiteSettings();
  const motto = settings?.motto || SCHOOL.motto;
  const schoolName = settings?.school_name || SCHOOL.name;

  return (
    <section id="welcome" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <ManagerPhoto />
        <motion.div {...fadeUp} className="order-2">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            <p className="text-[11px] font-semibold tracking-[0.3em] text-primary uppercase">
              {welcomeData.eyebrow || `Welcome to ${schoolName}`}
            </p>
          </div>
          <h2 className="mt-5 font-serif font-semibold leading-[1.08] text-foreground text-[34px] sm:text-[48px] lg:text-[58px]">
            {welcomeData.title || "Education Beyond the Classroom"}
          </h2>
          <p className="mt-6 max-w-xl text-[16px] leading-[1.8] text-muted-foreground sm:text-[17px]">
            {welcomeData.quote ||
              "Learning at Shandilya Public School goes beyond textbooks. Alongside a strong academic foundation, children grow through creative expression, sport, conversation and everyday responsibility."}
          </p>
          <p className="mt-7 font-serif text-lg italic text-foreground sm:text-xl">
            <span className="text-accent">“</span>
            {motto}
            <span className="text-accent">”</span>
          </p>
          <Link
            to="/about"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-[13px] font-bold tracking-[0.12em] text-primary-foreground uppercase transition-all duration-200 ease-out hover:scale-[1.04] hover:brightness-110"
          >
            Know Our Story
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Section 4: why shandilya ---------------- */

const PILLARS = [
  { k: "Learn", t: "Academic excellence", i: BookOpen, img: "/placeholders/classroom.svg" },
  {
    k: "Explore",
    t: "Practical learning & laboratories",
    i: FlaskConical,
    img: "/placeholders/science-lab.svg",
  },
  { k: "Create", t: "Art, music & culture", i: Palette, img: "/placeholders/cultural.svg" },
  { k: "Play", t: "Sports & physical education", i: Trophy, img: "/placeholders/sports.svg" },
  { k: "Grow", t: "Holistic development", i: Sprout, img: "/placeholders/students-learning.svg" },
];

export function WhyShandilya() {
  return (
    <section id="why" className="scroll-mt-20 bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Why Shandilya"
          title="Five ways children grow with us"
          intro="A rounded school experience, shaped around what children need at each age."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, idx) => (
            <motion.article
              key={p.k}
              {...fadeUp}
              transition={{ duration: 0.6, delay: idx * 0.06 }}
              className={`group relative overflow-hidden rounded-3xl border border-border bg-card ${
                idx === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <img
                src={p.img}
                alt=""
                loading="lazy"
                className="h-56 w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <p.i className="size-5 text-primary" aria-hidden="true" />
                  <span className="text-[11px] font-bold tracking-[0.24em] text-primary uppercase">
                    {p.k}
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-xl font-semibold text-foreground">{p.t}</h3>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section 5: academic journey ---------------- */

const JOURNEY = [
  {
    s: "Pre-Primary",
    d: "Play • Explore • Learn",
    img: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=1200",
  },
  {
    s: "Primary",
    d: "Build strong foundations",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200",
  },
  {
    s: "Middle School",
    d: "Discover interests",
    img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=1200",
  },
  {
    s: "Secondary",
    d: "Prepare for possibilities",
    img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1200",
  },
  {
    s: "Senior Secondary",
    d: "Choose your path — Science, Commerce, Humanities",
    img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200",
  },
];

function JourneyItem({
  j,
  idx,
  progress,
  total,
}: {
  j: (typeof JOURNEY)[number];
  idx: number;
  progress: MotionValue<number>;
  total: number;
}) {
  const focalPoint = 0.2 + (idx / Math.max(1, total - 1)) * 0.8;
  const buffer = 0.2;

  const y = useTransform(progress, (v) => {
    const p = (v - focalPoint) / buffer;
    return `${-p * 150}%`;
  });

  const scale = useTransform(progress, (v) => {
    const p = Math.abs(v - focalPoint) / buffer;
    // Scale drops from 1.0 to 0.85 when moving out of focus
    return Math.max(0.85, 1 - p * 0.15);
  });

  const opacity = useTransform(progress, (v) => {
    const p = Math.abs(v - focalPoint) / buffer;
    // Opacity drops from 1.0 to 0.3 when moving out of focus
    return Math.max(0.3, 1 - p * 0.7);
  });

  return (
    <motion.div
      style={{ y, scale, opacity }}
      className="absolute inset-0 flex flex-col justify-center pointer-events-none px-5 sm:px-6 lg:px-8"
    >
      <div className="group relative mx-auto w-full max-w-7xl grid grid-cols-1 gap-8 items-center lg:grid-cols-2 lg:gap-16 pointer-events-auto">
        <div className="order-2 lg:order-1 relative pl-8 sm:pl-12 lg:pl-16">
          <span className="absolute left-[0px] top-[14px] size-3.5 rounded-full border-[2.5px] border-white/20 bg-foreground transition-all duration-300 group-hover:scale-[1.4] group-hover:border-[#D4A94F] group-hover:bg-[#D4A94F] group-hover:shadow-[0_0_14px_rgba(212,169,79,0.5)] sm:left-[2px] sm:top-[20px]" />

          <h3 className="font-serif text-3xl font-bold text-white transition-all duration-300 group-hover:text-[#D4A94F] group-hover:translate-x-1 group-hover:[text-shadow:0_0_14px_rgba(212,169,79,0.30)] sm:text-5xl">
            {j.s}
          </h3>
          <p className="mt-3 text-base text-white/60 transition-all duration-300 group-hover:text-white/95 group-hover:translate-x-1 sm:text-lg">
            {j.d}
          </p>
        </div>

        <div className="order-1 lg:order-2 overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-all duration-300 group-hover:scale-[1.02] group-hover:border-white/20 group-hover:shadow-[#D4A94F]/10">
          <img
            src={j.img}
            alt={j.s}
            loading="lazy"
            className="w-full aspect-[4/3] sm:aspect-video object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}

export function Journey() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.12], ["0px", "-40px"]);
  const headerScale = useTransform(scrollYProgress, [0, 0.12], [1, 0.97]);

  return (
    <section ref={containerRef} id="journey" className="relative bg-foreground h-[600vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden py-16 sm:py-24">
        <motion.div
          style={{ opacity: headerOpacity, y: headerY, scale: headerScale }}
          className="absolute inset-x-0 top-24 sm:top-32 z-10 mx-auto w-full max-w-7xl px-5 text-center sm:px-6 lg:px-8 lg:text-left"
        >
          <SectionHeading
            light
            eyebrow="Academic journey"
            title="From first steps to Class XII"
            intro="A continuous path through school, with the right emphasis at every stage."
          />
        </motion.div>

        <div className="relative mt-8 flex-1 w-full max-w-7xl mx-auto flex items-center lg:mt-0">
          <div className="absolute left-[20px] top-[10%] bottom-[10%] w-[1.5px] bg-white/10 rounded-full sm:left-[26px] lg:left-[32px]" />

          {JOURNEY.map((j, idx) => (
            <JourneyItem
              key={j.s}
              j={j}
              idx={idx}
              progress={scrollYProgress}
              total={JOURNEY.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section 6: facilities ---------------- */

const FACILITIES = [
  { t: "Smart classrooms", i: MonitorSmartphone, desc: "Technology and digital learning" },
  { t: "Computer lab", i: Cpu, desc: "Technology and digital learning" },
  { t: "Science lab", i: FlaskConical, desc: "Explore. Experiment. Discover." },
  { t: "Mathematics lab", i: Sigma, desc: "Building logical thinking" },
  { t: "Library", i: Library, desc: "Read. Explore. Imagine." },
  { t: "Sports", i: Trophy, desc: "Play. Perform. Grow." },
  { t: "Music & dance", i: Music4, desc: "Create. Express. Perform." },
  { t: "Art & craft", i: Brush, desc: "Imagine. Create. Express." },
  { t: "Transport", i: Bus, desc: "Safe and comfortable travel" },
  { t: "CCTV safety", i: ShieldCheck, desc: "Safety and supervision" },
];

export function Facilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFacility = FACILITIES[activeIndex] ?? FACILITIES[0]!;

  return (
    <section id="facilities" className="scroll-mt-20 bg-background py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        {/* Scroll Reveal for Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionHeading
            eyebrow="Our campus"
            title="Spaces that make learning real"
            intro="Classrooms, laboratories and open spaces designed for children to work, move and create."
          />
        </motion.div>

        <div className="mt-16 flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Main Campus Image (Left/Center) */}
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 12% 0 0)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-[55%] relative"
          >
            <div className="relative overflow-hidden rounded-[24px] border border-border shadow-lg group">
              <motion.img
                key={`campus-img-${activeIndex}`} // Trigger re-render ping
                initial={{ scale: 1.0 }}
                animate={{ scale: [1.02, 1.0] }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                src="https://res.cloudinary.com/zvlxacfu/image/upload/v1788824309/e743774b-9288-4d86-b7c9-0f49e2d3cc46.jpg"
                alt="Shandilya Public School Campus"
                className="aspect-video lg:aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              />

              {/* Contextual Overlay Label */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFacility.t}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex flex-col rounded-xl bg-black/60 backdrop-blur-md border border-white/10 px-5 py-3 shadow-xl"
                  >
                    <span className="text-xs font-bold tracking-wider text-[#D4A94F] uppercase">
                      {activeFacility.t}
                    </span>
                    <span className="mt-1 text-sm text-white/90">{activeFacility.desc}</span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Interactive Navigation List (Right) */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.5 } },
              }}
              className="relative flex flex-col gap-1"
            >
              {/* Optional Progress Line */}
              <div className="absolute left-6 top-4 bottom-4 w-[1px] bg-border hidden sm:block" />

              {FACILITIES.map((f, idx) => {
                const isActive = activeIndex === idx;
                const num = String(idx + 1).padStart(2, "0");

                return (
                  <motion.button
                    key={f.t}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      show: { opacity: 1, x: 0 },
                    }}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onFocus={() => setActiveIndex(idx)}
                    className="group relative flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition-all duration-300 focus:outline-none"
                  >
                    {/* Active State Background/Border */}
                    <div
                      className={`absolute inset-0 rounded-xl border transition-all duration-300 ${
                        isActive
                          ? "border-[#D4A94F]/30 bg-[#D4A94F]/5 shadow-[0_0_15px_rgba(212,169,79,0.05)]"
                          : "border-transparent hover:bg-muted/50"
                      }`}
                    />

                    {/* Active Line Indicator */}
                    <div
                      className={`absolute left-0 h-1/2 w-1 rounded-r-full bg-[#D4A94F] transition-all duration-300 ${
                        isActive ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                      }`}
                    />

                    {/* Number & Icon */}
                    <div
                      className={`relative z-10 flex shrink-0 items-center gap-4 transition-colors duration-300 ${
                        isActive
                          ? "text-[#D4A94F]"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      <span className="w-5 text-sm font-medium opacity-60 font-mono hidden sm:block">
                        {num}
                      </span>
                      <f.i className="size-5" strokeWidth={isActive ? 2.5 : 2} />
                    </div>

                    {/* Text */}
                    <span
                      className={`relative z-10 text-base font-medium transition-all duration-300 ${
                        isActive
                          ? "translate-x-2 text-[#D4A94F]"
                          : "text-foreground group-hover:translate-x-1"
                      }`}
                    >
                      {f.t}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section 7: life at shandilya ---------------- */

const LIFE = [
  { t: "Academics", img: "/placeholders/classroom.svg" },
  { t: "Sports", img: "/placeholders/sports.svg" },
  { t: "Cultural activities", img: "/placeholders/cultural.svg" },
  { t: "Celebrations", img: "/placeholders/events.svg" },
  { t: "Competitions", img: "/placeholders/assembly.svg" },
  { t: "Student activities", img: "/placeholders/art.svg" },
];

export function LifeAtSchool() {
  return (
    <section id="life" className="scroll-mt-20 bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading eyebrow="Life at Shandilya" title="A school day is more than lessons" />
      </div>
      <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 sm:px-6">
        {LIFE.map((l) => (
          <article
            key={l.t}
            className="w-[74vw] shrink-0 snap-start overflow-hidden rounded-3xl border border-border bg-card sm:w-[38vw] lg:w-[26vw]"
          >
            <img src={l.img} alt={l.t} loading="lazy" className="aspect-3/4 w-full object-cover" />
            <h3 className="p-5 font-serif text-lg font-semibold text-foreground">{l.t}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Section 8: admissions ---------------- */

export function AdmissionsCta() {
  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-28">
      {/* Looping Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 -z-20 size-full object-cover"
      >
        <source
          src="https://res.cloudinary.com/zvlxacfu/video/upload/f_auto,q_auto/VID-20260829-WA0086.mp4"
          type="video/mp4"
        />
      </video>

      {/* Crimson Overlay */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-primary/85" />

      {/* Existing Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6">
        <motion.h2
          {...fadeUp}
          className="font-serif text-3xl leading-tight font-semibold text-primary-foreground sm:text-5xl"
        >
          Begin your child's journey with us
        </motion.h2>
        <motion.p {...fadeUp} className="mt-6 text-base leading-relaxed text-primary-foreground/80">
          Submit an admission enquiry and our admissions team will contact you to answer your
          questions, explain the process and arrange a visit to the school.
        </motion.p>
        <motion.div {...fadeUp} className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/admissions/apply"
            className="rounded-full bg-background px-8 py-4 text-sm font-bold tracking-[0.12em] text-foreground uppercase transition hover:bg-background/90"
          >
            Apply for admission
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full border border-primary-foreground/40 px-8 py-4 text-sm font-bold tracking-[0.12em] text-primary-foreground uppercase transition hover:bg-primary-foreground/10"
          >
            Book a school visit
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Sections 9-12: events, notices, achievements, testimonials ---------------- */

export function Events() {
  return (
    <section id="events" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Latest events"
          title="What's happening at school"
          intro="Event listings are published by the school office. This section will fill up as events are added."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-3xl border border-dashed border-border bg-card"
            >
              <div className="flex aspect-video items-center justify-center bg-secondary">
                <CalendarDays className="size-8 text-muted-foreground" aria-hidden="true" />
              </div>
              <div className="p-6">
                <p className="text-xs tracking-wide text-muted-foreground uppercase">
                  Date to be announced
                </p>
                <h3 className="mt-2 font-serif text-lg font-semibold text-foreground">
                  Event coming soon
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Details of upcoming school events will appear here.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Notices() {
  const { notices } = useNoticesCMS();
  const activeNotices = notices.filter((n) => n.is_active);

  return (
    <section id="notices" className="scroll-mt-20 bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Notice board"
          title="Latest notices & circulars"
          intro="Circulars and notices issued by the school administration, updated in real time."
        />
        <ul className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {activeNotices.length === 0 ? (
            <li className="flex items-center gap-4 p-5">
              <FileText className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold text-foreground">No notices published yet</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Notices will be posted here as they are issued by the school office.
                </p>
              </div>
            </li>
          ) : (
            activeNotices.map((n) => (
              <li
                key={n.id}
                className="flex items-start justify-between gap-4 p-5 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                    <FileText className="size-4 shrink-0" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-accent uppercase tracking-wider">
                        {n.category}
                      </span>
                      <span className="text-[11px] text-muted-foreground">• {n.publish_date}</span>
                    </div>
                    <h3 className="mt-0.5 text-sm font-semibold text-foreground sm:text-base">
                      {n.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm leading-relaxed">
                      {n.description}
                    </p>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}

export function Achievements() {
  const { achievements } = useAchievementsCMS();
  const featured = achievements.filter((a) => a.is_featured);

  return (
    <section id="achievements" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Achievements"
            title="Celebrating our students"
            intro="Verified achievements and board results published by the school administration."
          />
          <Link
            to="/achievements"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-accent transition-colors"
          >
            View All Achievements <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((a) => (
            <div
              key={a.id}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <Award className="size-5 text-primary" aria-hidden="true" />
                <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                  {a.year}
                </span>
              </div>
              <h3 className="mt-3 font-serif text-lg font-semibold text-foreground">{a.title}</h3>
              {a.badge && <p className="mt-1 text-xs font-semibold text-primary">{a.badge}</p>}
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{a.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const { data: testimonials } = usePageSection("home", "testimonials", DEFAULT_TESTIMONIALS);

  return (
    <section className="bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 text-center">
        <SectionHeading eyebrow="Testimonials" title="In the words of our families" />
        <div className="mt-12 grid gap-6 sm:grid-cols-3 text-left">
          {testimonials.map((t) => (
            <div
              key={t.id || t.author}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between"
            >
              <p className="text-sm italic leading-relaxed text-muted-foreground">“{t.quote}”</p>
              <div className="mt-6 border-t border-border/80 pt-4">
                <p className="font-serif text-base font-semibold text-foreground">{t.author}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link
            to="/admissions/apply"
            className="inline-block rounded-full bg-primary px-7 py-3.5 text-sm font-bold tracking-[0.12em] text-primary-foreground uppercase transition hover:scale-105"
          >
            Join the Shandilya Family
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const { data: faqs } = usePageSection("home", "faqs", DEFAULT_FAQS);

  return (
    <section id="faq" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <SectionHeading eyebrow="Questions" title="Frequently asked questions" />
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f) => (
            <AccordionItem key={f.id || f.q} value={f.q}>
              <AccordionTrigger className="text-left font-serif text-base font-semibold text-foreground sm:text-lg">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ---------------- Section 14: location & contact ---------------- */

export function LocationContact() {
  return (
    <section id="contact" className="scroll-mt-20 bg-secondary py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Visit us" title="Find the school" />
          <ul className="mt-8 space-y-5">
            <li className="flex gap-4">
              <MapPin className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                {SCHOOL.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </p>
            </li>
            <li className="flex gap-4">
              <Phone className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
              <span className="text-sm text-muted-foreground">
                {SCHOOL.phones.map((p) => (
                  <a key={p} href={telHref(p)} className="block hover:text-foreground">
                    +91 {p}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-4">
              <Mail className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
              <a
                href={`mailto:${SCHOOL.email}`}
                className="text-sm break-all text-muted-foreground hover:text-foreground"
              >
                {SCHOOL.email}
              </a>
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={telHref(SCHOOL.phones[0])}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              <Phone className="size-4" aria-hidden="true" /> Call
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground"
            >
              <MessageCircle className="size-4 text-primary" aria-hidden="true" /> WhatsApp
            </a>
            <a
              href={directionsHref}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground"
            >
              <Navigation className="size-4 text-primary" aria-hidden="true" /> Get directions
            </a>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-border">
          <iframe
            title="Map showing the location of Shandilya Public School"
            src={mapEmbedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[420px] w-full"
          />
        </div>
      </div>
    </section>
  );
}
