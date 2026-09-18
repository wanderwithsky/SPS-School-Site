import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import welcomePhoto from "@/assets/welcome/chairman.png";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  AnimatePresence,
  useMotionValueEvent,
} from "motion/react";
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
  return (
    <section id="welcome" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <ManagerPhoto />
        <motion.div {...fadeUp} className="order-2">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            <p className="text-[11px] font-semibold tracking-[0.3em] text-primary uppercase">
              Welcome to Shandilya Public School
            </p>
          </div>
          <h2 className="mt-5 font-serif font-semibold leading-[1.08] text-foreground text-[34px] sm:text-[48px] lg:text-[58px]">
            Education Beyond
            <br />
            the Classroom
          </h2>
          <p className="mt-6 max-w-xl text-[16px] leading-[1.8] text-muted-foreground sm:text-[17px]">
            Learning at Shandilya Public School goes beyond textbooks. Alongside a strong academic
            foundation, children grow through creative expression, sport, conversation and everyday
            responsibility.
          </p>
          <p className="mt-4 max-w-xl text-[16px] leading-[1.8] text-muted-foreground sm:text-[17px]">
            Our aim is simple: that every child leaves school confident in what they know, curious
            about what they do not, and kind in how they treat others.
          </p>
          <p className="mt-7 font-serif text-lg italic text-foreground sm:text-xl">
            <span className="text-accent">“</span>
            {SCHOOL.motto}
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
  {
    id: "classroom",
    title: "Classroom Activities",
    description: "Academic excellence",
    label: "CAMPUS LIFE",
    img: "https://res.cloudinary.com/zvlxacfu/image/upload/v1789105859/20dcd32c-8f60-48c2-aae8-ee6bfbf831d7.jpg",
  },
  {
    id: "science",
    title: "Advanced Computer Labs",
    description: "Practical learning & laboratories",
    label: "CAMPUS LIFE",
    img: "https://res.cloudinary.com/zvlxacfu/image/upload/v1789105905/d1395539-30a1-4dee-b02f-dfb6e1381ffd.jpg",
  },
  {
    id: "cultural",
    title: "Cultural Activities",
    description: "Art, music & culture",
    label: "CAMPUS LIFE",
    img: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788824413/27f1a810-6681-4aa1-94f1-a545cae82ede.jpg",
  },
  {
    id: "sports",
    title: "Sports",
    description: "Sports & physical education",
    label: "CAMPUS LIFE",
    img: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788824566/42afd21d-a37d-4f20-8164-42be4d6025d1.jpg",
  },
  {
    id: "learning",
    title: "Students Learning",
    description: "Holistic development",
    label: "CAMPUS LIFE",
    img: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788824430/7d6b05a6-efee-414e-b110-4d132e17bd65.jpg",
  },
  {
    id: "school-life",
    title: "School Life",
    description: "Learning, exploring and growing together.",
    label: "CAMPUS LIFE",
    img: "https://res.cloudinary.com/zvlxacfu/image/upload/v1789105693/57768339-d530-4d5d-803a-2e091890988a.jpg",
  },
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
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-[16px] sm:rounded-[20px] overflow-hidden shadow-md border border-black/5">
          {PILLARS.map((p, idx) => (
            <motion.article
              key={p.id}
              {...fadeUp}
              transition={{ duration: 0.7, ease: "easeOut", delay: idx * 0.1 }}
              className="group relative overflow-hidden bg-muted/20 w-full aspect-video"
            >
              <img
                src={p.img}
                alt={p.title}
                loading={idx < 2 ? "eager" : "lazy"}
                style={{ objectPosition: (p as any).position || "center" }}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />

              {/* Default State - Always show title lightly at bottom for mobile/accessibility unless hovered */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 group-hover:opacity-0">
                <h3 className="font-serif text-lg sm:text-xl font-medium text-white drop-shadow-md">
                  {p.title}
                </h3>
              </div>

              {/* Hover Overlay - Premium Bottom to Top Reveal */}
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 p-6 sm:p-8 z-10">
                <div className="translate-y-4 transition-transform duration-500 ease-out group-hover:translate-y-0">
                  <span className="mb-2 block text-[10px] sm:text-xs font-semibold tracking-widest text-[#D4A94F] uppercase italic">
                    {p.label}
                  </span>
                  <h3 className="font-serif text-xl sm:text-3xl font-medium text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-white/80 leading-relaxed font-light">
                    {p.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section 5: academic journey ---------------- */

const ACADEMIC_JOURNEY = [
  {
    id: "foundation",
    title: "FOUNDATIONAL YEARS",
    classes: "Nursery • LKG • UKG",
    desc: "Play, explore and build early confidence.",
    img: "https://res.cloudinary.com/zvlxacfu/image/upload/v1789105758/73472a20-36ae-4179-b1f5-62df0e67c9e4.jpg",
  },
  {
    id: "primary",
    title: "PRIMARY SCHOOL",
    classes: "Classes I–V",
    desc: "Build strong foundations through curiosity and learning.",
    img: "https://res.cloudinary.com/zvlxacfu/image/upload/v1789105752/c2ee772f-0efe-42ea-a043-95496cbdbc98.jpg",
  },
  {
    id: "middle",
    title: "MIDDLE SCHOOL",
    classes: "Classes VI–VIII",
    desc: "Discover interests, skills and new ways of thinking.",
    img: "https://res.cloudinary.com/zvlxacfu/image/upload/v1789105798/4447360d-d180-4aca-abf4-fa2556e493e5.jpg",
  },
  {
    id: "secondary",
    title: "SECONDARY",
    classes: "Classes IX–X",
    desc: "Strengthen subject understanding and prepare for the next step.",
    img: "https://res.cloudinary.com/zvlxacfu/image/upload/v1789105826/b006f5eb-7680-4d70-856b-8810f077ccad.jpg",
  },
  {
    id: "senior-secondary",
    title: "SENIOR SECONDARY",
    classes: "Classes XI–XII",
    desc: "Choose a pathway aligned with your interests and aspirations.",
    img: "https://res.cloudinary.com/zvlxacfu/image/upload/v1789105873/560f6fa1-9c05-4a4c-8494-5f1d38012751.jpg",
    streams: [
      {
        id: "science",
        name: "SCIENCE",
        options: ["PCM", "PCB"],
        desc: "A pathway for science and technology studies.",
        img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200",
      },
      {
        id: "commerce",
        name: "COMMERCE",
        options: [],
        desc: "A pathway for business, economics and commerce-oriented studies.",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
      },
      {
        id: "humanities",
        name: "HUMANITIES",
        options: [],
        desc: "A pathway for social sciences, humanities and creative inquiry.",
        img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1200",
      },
    ],
  },
];

export function Journey() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [showStreams, setShowStreams] = useState(false);
  const [direction, setDirection] = useState(1);
  const prevIndex = useRef(0);

  // Map the 300vh scroll distance to the 5 active stages
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 0.00 to 0.20: Intro entrance/exit
    // 0.20 to 0.90: 5 Stages (0.70 / 5 = 0.14 per stage)
    // 0.90 to 1.00: Streams view
    const stageProgress = Math.max(0, (latest - 0.2) / 0.7);
    const sections = ACADEMIC_JOURNEY.length;
    let idx = Math.floor(stageProgress * sections);
    if (idx >= sections) idx = sections - 1;

    if (idx !== prevIndex.current) {
      setDirection(idx > prevIndex.current ? 1 : -1);
      prevIndex.current = idx;
    }

    setActiveIndex(idx);
    setShowStreams(latest > 0.9);
  });

  // 0.00 to 0.08: Header fully visible
  // 0.08 to 0.18: Header fades out and moves up
  const headerOpacity = useTransform(scrollYProgress, [0, 0.08, 0.18], [1, 1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.08, 0.18], ["0px", "0px", "-40px"]);

  // 0.12 to 0.22: Roadmap slides in from below
  const roadmapY = useTransform(scrollYProgress, [0.12, 0.22], ["40px", "0px"]);

  const activeStage = ACADEMIC_JOURNEY[activeIndex];

  return (
    <section
      ref={containerRef}
      id="journey"
      className="relative bg-foreground h-[300vh] w-full max-w-full overflow-x-clip"
    >
      {/* DESKTOP LAYOUT (Hidden on mobile) */}
      <div className="hidden md:block sticky top-[100px] h-[calc(100vh-100px)] lg:h-[84vh] w-full py-8 lg:py-12">
        <div className="h-full w-full flex flex-col">
          {/* Zone 1: Intro Header */}
          <motion.div
            style={{ opacity: headerOpacity, y: headerY }}
            className="w-full max-w-7xl mx-auto px-5 text-center sm:px-6 lg:px-8 lg:text-left shrink-0 pointer-events-none"
          >
            <SectionHeading
              light
              eyebrow="Academic journey"
              title="From first steps to Class XII"
              intro="A continuous path through school, with the right emphasis at every stage."
            />
          </motion.div>

          {/* Zone 2: Roadmap Interface */}
          <motion.div
            style={{ y: roadmapY }}
            className="flex-1 w-full max-w-7xl mx-auto flex flex-col lg:flex-row px-5 sm:px-6 lg:px-8 gap-8 sm:gap-12 lg:gap-20 mt-6 lg:mt-8"
          >
            {/* Left Side: Progress Roadmap */}
            <div className="relative flex flex-col w-full lg:w-1/3 justify-center border-l-2 border-white/10 pl-5 sm:pl-8 py-2 shrink-0">
              {/* The active glow bar moving down */}
              <div
                className="absolute left-[-2px] top-0 w-[2px] bg-gradient-to-b from-[#D4A94F] to-transparent transition-all duration-700 ease-out"
                style={{ height: `${((activeIndex + 1) / ACADEMIC_JOURNEY.length) * 100}%` }}
              />

              <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12">
                {ACADEMIC_JOURNEY.map((stage, idx) => {
                  const isActive = idx === activeIndex;
                  const dist = Math.abs(idx - activeIndex);

                  return (
                    <div key={stage.id} className="relative py-1">
                      {/* Node Dot */}
                      <div
                        className={`absolute -left-[26px] sm:-left-[39px] top-1/2 -translate-y-1/2 size-2.5 sm:size-3.5 rounded-full border-2 transition-all duration-500 ${
                          isActive
                            ? "border-[#D4A94F] bg-[#D4A94F] scale-[1.3] shadow-[0_0_12px_rgba(212,169,79,0.5)]"
                            : "border-white/20 bg-foreground"
                        }`}
                      />

                      <h3
                        className="font-serif text-lg sm:text-xl lg:text-2xl text-[#fdfdfd] transition-all duration-500 origin-left"
                        style={{
                          transform: isActive
                            ? "scale(1)"
                            : dist === 1
                              ? "scale(0.92)"
                              : "scale(0.86)",
                          opacity: 1,
                        }}
                      >
                        {stage.title}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side: Active Content & Image */}
            <div className="w-full lg:flex-1 flex flex-col justify-center items-start shrink-0">
              <AnimatePresence mode="wait">
                {!showStreams ? (
                  <motion.div
                    key={activeStage.id}
                    initial={{ scale: 0.96, y: 12 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.96, y: -12 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex flex-col gap-5 sm:gap-6 w-full max-w-xl"
                  >
                    <div className="flex flex-col">
                      <span className="text-[11px] sm:text-sm font-semibold tracking-widest text-[#D4A94F] uppercase mb-1 drop-shadow-sm">
                        {activeStage.classes}
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white mb-2 sm:mb-3">
                        {activeStage.title}
                      </h2>
                      <p className="text-sm sm:text-base text-white leading-relaxed">
                        {activeStage.desc}
                      </p>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="relative mt-2 overflow-hidden rounded-[18px] sm:rounded-[22px] shadow-xl border border-white/10 w-full max-w-[560px] aspect-[4/3] sm:aspect-[3/2] lg:h-[340px]"
                    >
                      <img
                        src={activeStage.img}
                        alt={activeStage.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.3)] pointer-events-none" />
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="streams"
                    initial={{ scale: 0.96, y: 12 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.96, y: -12 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex flex-col gap-6 sm:gap-8 w-full max-w-xl"
                  >
                    <div className="flex flex-col">
                      <span className="text-[11px] sm:text-sm font-semibold tracking-widest text-[#D4A94F] uppercase mb-1 drop-shadow-sm">
                        CHOOSE YOUR PATH
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white mb-2 sm:mb-3">
                        Senior Secondary Streams
                      </h2>
                      <p className="text-sm sm:text-base text-white leading-relaxed">
                        Specialized pathways designed to build deep expertise and prepare students for
                        their career goals.
                      </p>
                    </div>

                    <div className="flex flex-col gap-4">
                      {activeStage.streams?.map((stream) => (
                        <div
                          key={stream.id}
                          className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/5"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <h4 className="font-serif text-lg sm:text-xl text-[#D4A94F]">
                              {stream.name}
                            </h4>
                            {stream.options.length > 0 && (
                              <div className="flex gap-2 text-xs sm:text-sm text-white">
                                {stream.options.map((opt) => (
                                  <span key={opt} className="px-2 py-1 bg-white/10 rounded-md">
                                    {opt}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <p className="mt-2 text-sm text-white">{stream.desc}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* MOBILE LAYOUT (Hidden on desktop) */}
      <div className="md:hidden sticky top-0 h-[100svh] w-full flex flex-col px-4 pt-[80px] pb-[80px] overflow-hidden pointer-events-none">
        {/* Intro Header */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="absolute top-[80px] inset-x-4 text-center z-10"
        >
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#D4A94F]">
            Academic journey
          </p>
          <h2 className="mt-2.5 font-serif text-[26px] leading-[1.15] font-semibold text-white">
            From first steps to Class XII
          </h2>
          <p className="mt-2.5 text-[14px] leading-relaxed text-white/75">
            A continuous path through school, with the right emphasis at every stage.
          </p>
        </motion.div>

        {/* Content Slides */}
        <div className="relative w-full h-full flex flex-col justify-center items-center pointer-events-auto">
          <AnimatePresence mode="wait" custom={direction}>
             <motion.div
               key={activeIndex}
               custom={direction}
               variants={{
                 enter: (dir: number) => ({
                   y: dir > 0 ? 50 : -50,
                   opacity: 0,
                 }),
                 center: {
                   y: 0,
                   opacity: 1,
                 },
                 exit: (dir: number) => ({
                   y: dir > 0 ? -50 : 50,
                   opacity: 0,
                 }),
               }}
               initial="enter"
               animate="center"
               exit="exit"
               transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
               className="absolute inset-0 flex flex-col justify-center items-center text-center"
             >
                <span className="block text-[11px] font-semibold tracking-widest text-[#D4A94F] uppercase mb-1.5">
                  {activeStage.classes}
                </span>
                <h3 className="font-serif text-[26px] leading-tight text-white mb-2.5">
                  {activeStage.title}
                </h3>
                <p className="text-[14px] text-white/90 leading-relaxed mb-4 px-2">
                  {activeStage.desc}
                </p>
                
                <div className="w-[calc(100vw-32px)] max-w-[380px] overflow-hidden rounded-[14px] shrink-0">
                  <img 
                    src={activeStage.img}
                    alt={activeStage.title}
                    className="w-full aspect-[16/9] object-cover"
                    loading="lazy"
                  />
                </div>
                
                {/* Streams for Senior Secondary */}
                {activeStage.streams && (
                  <div className="mt-3 flex flex-col gap-2 text-left w-[calc(100vw-32px)] max-w-[380px]">
                    {activeStage.streams.map((stream) => (
                      <div key={stream.id} className="px-3 py-2 rounded-[10px] border border-white/10 bg-white/5 flex justify-between items-center">
                        <h5 className="font-serif text-[14px] text-[#D4A94F] leading-none">{stream.name}</h5>
                        {stream.options.length > 0 && (
                          <div className="flex gap-1 text-[9px] text-white">
                            {stream.options.map((opt) => (
                              <span key={opt} className="px-1.5 py-0.5 bg-white/10 rounded-sm">
                                {opt}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
             </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section 6: facilities ---------------- */

const FACILITIES = [
  { t: "Smart Classrooms", i: MonitorSmartphone, desc: "Technology and digital learning", img: "https://res.cloudinary.com/zvlxacfu/image/upload/v1789721874/46350052-cf5a-4f97-9418-63ffba3e0a82.jpg" },
  { t: "Computer Lab", i: Cpu, desc: "Technology and digital learning", img: "https://res.cloudinary.com/zvlxacfu/image/upload/v1789721749/b27b094a-574e-400c-8e5a-a82e72e2659a.jpg" },
  { t: "Science Lab", i: FlaskConical, desc: "Explore. Experiment. Discover.", img: "https://res.cloudinary.com/zvlxacfu/image/upload/v1789721650/018f985b-e388-4d7a-960d-5f86cbc654ba.jpg" },
  { t: "Mathematics Lab", i: Sigma, desc: "Building logical thinking", img: "https://res.cloudinary.com/zvlxacfu/image/upload/v1789721660/0760c2d0-3b22-4d8b-9344-81fd69cdb0ca.jpg" },
  { t: "Library", i: Library, desc: "Read. Explore. Imagine.", img: "https://res.cloudinary.com/zvlxacfu/image/upload/v1789721628/beb66231-f5a0-4b29-b015-50b4d21ad472.jpg" },
  { t: "Sports", i: Trophy, desc: "Play. Perform. Grow.", img: "https://res.cloudinary.com/zvlxacfu/image/upload/v1789721589/0cc0ebc7-fccd-40f8-a725-056b18cf22f1.jpg" },
  { t: "Music & Dance", i: Music4, desc: "Create. Express. Perform.", img: "https://res.cloudinary.com/zvlxacfu/image/upload/v1789721383/a480af31-55a2-4156-8aec-980312b407d4.jpg" },
  { t: "Art & Craft", i: Brush, desc: "Imagine. Create. Express.", img: "https://res.cloudinary.com/zvlxacfu/image/upload/v1789721355/4d483dff-c47f-4f00-ab1c-ba5481ca4086.jpg" },
  { t: "Transport", i: Bus, desc: "Safe and comfortable travel", img: "https://res.cloudinary.com/zvlxacfu/image/upload/v1789721348/f13286f8-0c33-4d83-9e1e-3b992a373981.jpg" },
];

export function Facilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const activeFacility = FACILITIES[activeIndex];

  // Auto-progression logic
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FACILITIES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const imageVariants = {
    enter: { opacity: 0, scale: 1.04 },
    center: {
      opacity: 1,
      scale: [1.04, 1.0, 1.035],
      transition: {
        opacity: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        scale: { times: [0, 0.16, 1], duration: 5, ease: ["easeOut", "linear"] },
      },
    },
    exit: { opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: "easeOut" } },
  };

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

        {/* DESKTOP TWO-COLUMN LAYOUT */}
        <div 
          className="mt-16 hidden lg:flex gap-12 lg:gap-16"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Campus Image (Left) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.1 }}
            className="w-[58%] relative"
          >
            <div className="relative overflow-hidden rounded-[24px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] aspect-[4/3] bg-muted/30">
              <AnimatePresence mode="sync">
                <motion.img
                  key={activeFacility.img}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  src={activeFacility.img}
                  alt={activeFacility.t}
                  className="absolute inset-0 size-full object-cover"
                />
              </AnimatePresence>

              {/* Premium Contextual Overlay Card */}
              <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFacility.t}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="inline-flex flex-col rounded-[16px] bg-[#3a1c1d]/85 backdrop-blur-md border border-white/10 px-6 py-4 shadow-xl"
                  >
                    <span className="text-[10px] font-bold tracking-widest text-[#D4A94F] uppercase mb-1">
                      {activeFacility.t}
                    </span>
                    <span className="text-[14px] text-white/95 font-medium">{activeFacility.desc}</span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Interactive Navigation List (Right) */}
          <div className="w-[42%] flex flex-col justify-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } },
              }}
              className="relative flex flex-col gap-1.5"
            >
              {/* Vertical connecting line */}
              <div className="absolute left-[38px] top-6 bottom-6 w-[1px] bg-border/60 -z-10" />

              {FACILITIES.map((f, idx) => {
                const isActive = activeIndex === idx;
                const num = String(idx + 1).padStart(2, "0");

                return (
                  <motion.button
                    key={f.t}
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      show: { opacity: 1, x: 0 },
                    }}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => setActiveIndex(idx)}
                    onFocus={() => setActiveIndex(idx)}
                    className="group relative flex w-full items-center rounded-xl px-4 py-3.5 text-left transition-all duration-300 focus:outline-none cursor-pointer"
                  >
                    {/* Active State Background/Border */}
                    <div
                      className={`absolute inset-0 rounded-[14px] border transition-all duration-500 ${
                        isActive
                          ? "border-[#D4A94F]/40 bg-[#fbf9f6] shadow-[0_4px_20px_-10px_rgba(212,169,79,0.2)]"
                          : "border-transparent hover:bg-muted/40"
                      }`}
                    />

                    {/* Active Edge Accent Line */}
                    <div
                      className={`absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-[3px] rounded-r-full bg-[#D4A94F] transition-all duration-500 origin-center ${
                        isActive ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                      }`}
                    />

                    {/* Active Progress Bar (Timer) */}
                    {isActive && !isHovered && (
                      <motion.div
                        className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-[#D4A94F]/20 overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <motion.div 
                          className="h-full bg-[#D4A94F]"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 4.5, ease: "linear" }}
                          key={`progress-${activeIndex}`}
                        />
                      </motion.div>
                    )}

                    {/* Number & Icon */}
                    <div
                      className={`relative z-10 flex shrink-0 items-center gap-5 transition-colors duration-400 ${
                        isActive
                          ? "text-[#D4A94F]"
                          : "text-foreground/40 group-hover:text-foreground/70"
                      }`}
                    >
                      <span className="w-6 text-[13px] font-semibold tracking-wider font-mono">
                        {num}
                      </span>
                      <motion.div
                         animate={isActive ? { scale: 1.1, rotate: [0, -5, 5, 0] } : { scale: 1, rotate: 0 }}
                         transition={{ duration: 0.5 }}
                      >
                        <f.i className="size-[22px]" strokeWidth={isActive ? 2.5 : 2} />
                      </motion.div>
                    </div>

                    {/* Text */}
                    <span
                      className={`relative z-10 ml-5 text-[15px] font-semibold transition-all duration-400 ${
                        isActive
                          ? "translate-x-1 text-foreground"
                          : "text-foreground/70 group-hover:translate-x-1"
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

        {/* MOBILE LAYOUT */}
        <div 
          className="mt-12 flex flex-col lg:hidden"
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          {/* Main Campus Image (Mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full relative overflow-hidden rounded-[20px] shadow-md aspect-square sm:aspect-[4/3] bg-muted/30"
          >
            <AnimatePresence mode="sync">
              <motion.img
                key={activeFacility.img}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                src={activeFacility.img}
                alt={activeFacility.t}
                className="absolute inset-0 size-full object-cover"
              />
            </AnimatePresence>
          </motion.div>

          {/* Active Facility Information (Below Image) */}
          <div className="mt-6 flex flex-col items-center text-center px-4 h-[80px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFacility.t}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                <div className="flex items-center gap-2 text-[#D4A94F] mb-2">
                   <activeFacility.i className="size-4" />
                   <h3 className="font-serif text-[18px] font-semibold">{activeFacility.t}</h3>
                </div>
                <p className="text-[14px] text-foreground/80 leading-relaxed max-w-[280px]">
                  {activeFacility.desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Horizontal Swipeable Chips */}
          <div className="mt-4 -mx-5 px-5 overflow-x-auto snap-x snap-mandatory hide-scrollbar">
            <div className="flex gap-3 pb-4 min-w-max">
              {FACILITIES.map((f, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={f.t}
                    onClick={() => setActiveIndex(idx)}
                    className={`snap-center shrink-0 rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all duration-300 border shadow-sm ${
                      isActive 
                        ? "bg-[#D4A94F] border-[#D4A94F] text-white shadow-md scale-105" 
                        : "bg-white border-border text-foreground/70 active:scale-95"
                    }`}
                  >
                    {f.t}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Custom style to hide scrollbar but keep functionality */}
          <style dangerouslySetInnerHTML={{__html: `
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}} />
        </div>

      </div>
    </section>
  );
}

/* ---------------- Section 7: life at shandilya ---------------- */

const LIFE = [
  { t: "Academics", img: "https://res.cloudinary.com/zvlxacfu/image/upload/v1789105848/42f3dff5-dc9c-4092-9535-143d4e15eed5.jpg" },
  { t: "Sports", img: "https://res.cloudinary.com/zvlxacfu/image/upload/v1789105935/6432e491-a18a-42b3-a7e2-f0b440ea6df3.jpg" },
  { t: "Cultural activities", img: "https://res.cloudinary.com/zvlxacfu/image/upload/v1789117982/2a8b17ee-545e-4467-b37b-d23621e13e5e.jpg" },
  { t: "Celebrations", img: "https://res.cloudinary.com/zvlxacfu/image/upload/v1789105800/1055f444-f565-4569-b45c-907990a2186c.jpg" },
  { t: "Competitions", img: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788826063/IMG-20260829-WA0016.jpg" },
  { t: "Student activities", img: "https://res.cloudinary.com/zvlxacfu/image/upload/v1789105885/960da428-d040-42f7-b010-a19bbbad6e81.jpg" },
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
    <section className="relative isolate overflow-hidden min-h-[auto] md:min-h-[480px] flex flex-col justify-center py-[55px] sm:py-[70px]">
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
      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-6 w-full">
        <motion.h2
          {...fadeUp}
          className="font-serif text-3xl leading-tight font-semibold text-primary-foreground sm:text-5xl"
        >
          Begin your child's journey with us
        </motion.h2>
        <motion.p {...fadeUp} className="mt-4 text-base leading-relaxed text-primary-foreground/80">
          Submit an admission enquiry and our admissions team will contact you to answer your
          questions, explain the process and arrange a visit to the school.
        </motion.p>
        <motion.div {...fadeUp} className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
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
  return (
    <section id="notices" className="scroll-mt-20 bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Notice board"
          title="Latest notices"
          intro="Circulars and notices issued by the school office will be listed here, with PDF attachments where applicable."
        />
        <ul className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-dashed border-border bg-card">
          {[1, 2, 3].map((i) => (
            <li key={i} className="flex items-center gap-4 p-5">
              <FileText className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold text-foreground">No notices published yet</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Notices will be posted here as they are issued.
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Achievements() {
  const cats = ["Academics", "Sports", "Cultural", "Board results"];
  return (
    <section id="achievements" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Achievements"
          title="Celebrating our students"
          intro="Verified achievements and board results are published by the school. Figures are added only once confirmed by the school office."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cats.map((c) => (
            <div key={c} className="rounded-2xl border border-dashed border-border bg-card p-6">
              <Award className="size-5 text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-serif text-lg font-semibold text-foreground">{c}</h3>
              <p className="mt-2 text-sm text-muted-foreground">To be published by the school.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-6">
        <SectionHeading eyebrow="Testimonials" title="In the words of our families" />
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
          We publish only genuine messages shared by parents and students. If you are part of the
          Shandilya family and would like to share your experience, we would love to hear from you.
        </p>
        <a
          href="https://jsdl.in/DT-60EIEUM6MY2"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full border border-foreground/20 px-7 py-3.5 text-sm font-bold tracking-[0.12em] text-foreground uppercase transition hover:bg-card"
        >
          Share your experience
        </a>
      </div>
    </section>
  );
}

/* ---------------- Section 13: FAQ ---------------- */

const FAQS = [
  {
    q: "Which classes are open for admission?",
    a: "Admissions are considered from Pre-Primary through Class XII, subject to seat availability in each class. Please submit an enquiry and the school office will confirm current availability.",
  },
  {
    q: "How can I apply?",
    a: "Submit the admission enquiry form on this website, or call the school office. Our admissions team will contact you and guide you through the next steps.",
  },
  {
    q: "What documents are required?",
    a: "Typically the birth certificate, transfer certificate from the previous school, the last report card, photographs and address proof. The school office will confirm the exact list for your child's class.",
  },
  {
    q: "Is the school affiliated with CBSE?",
    a: "Yes, Shandilya Public School is a CBSE-affiliated co-educational school.",
  },
  {
    q: "Does the school provide transport?",
    a: "School transport is available. Routes and charges are confirmed by the school office at the time of admission.",
  },
  {
    q: "Which streams are available in Class XI?",
    a: "Science, Commerce and Humanities. Exact subject combinations are confirmed by the school office.",
  },
  {
    q: "Where can I find the fee structure?",
    a: "The fee structure for the current academic session is shared by the school office. Please call us or submit an enquiry and we will send you the details.",
  },
  {
    q: "How can I visit the school campus?",
    a: "Call or WhatsApp the school office to arrange a convenient time for a campus visit.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <SectionHeading eyebrow="Questions" title="Frequently asked questions" />
        <Accordion type="single" collapsible className="mt-10">
          {FAQS.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
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
