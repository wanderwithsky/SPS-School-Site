import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { SocialRail } from "./SocialRail";

import slide0 from "@/assets/hero/Shandilya-Public-School-HeroSection.jpeg";
import slide1 from "@/assets/hero/Shandilya-Public-School-HeroSection1.jpeg";
import slide2 from "@/assets/hero/Shandilya-Public-School-HeroSection2.jpeg";
import slide3 from "@/assets/hero/Shandilya-Public-School-HeroSection3.jpeg";
import slide4 from "@/assets/hero/Shandilya-Public-School-HeroSection4.jpeg";
import slide5 from "@/assets/hero/Shandilya-Public-School-HeroSection5.jpeg";
import slide6 from "@/assets/hero/Shandilya-Public-School-HeroSection6.jpeg";
import slide7 from "@/assets/hero/Shandilya-Public-School-HeroSection7.jpeg";

type Slide = {
  image: string;
  alt: string;
  fit: "cover" | "contain";
  eyebrow: string;
  title: string;
  description: string;
  cta: { label: string; hash?: string; to?: string };
};

const SLIDES: Slide[] = [
  {
    image: slide0,
    alt: "Students and teachers of Shandilya Public School with medals and trophies at a prize ceremony",
    fit: "cover",
    eyebrow: "Welcome to Shandilya",
    title: "A place to learn and grow.",
    description: "An environment where curiosity and confidence grow together.",
    cta: { label: "Explore our school", hash: "welcome" },
  },
  {
    image: slide1,
    alt: "Students receiving certificates in front of the Shandilya Public School banner",
    fit: "cover",
    eyebrow: "Learning that inspires",
    title: "Every child discovers their potential.",
    description: "Meaningful learning experiences for a brighter future.",
    cta: { label: "Explore academics", hash: "journey" },
  },
  {
    image: slide7,
    alt: "Students practising yoga together in the Shandilya Public School courtyard",
    fit: "cover",
    eyebrow: "Play. Perform. Grow.",
    title: "Building confidence beyond the classroom.",
    description: "Sports, yoga and activities that shape character.",
    cta: { label: "Campus life", hash: "life" },
  },
  {
    image: slide2,
    alt: "CBSE Class XII Commerce school topper Shresth Pathak, session 2025-26",
    fit: "contain",
    eyebrow: "Proud achievement",
    title: "Our Toppers. Our Pride.",
    description: "Celebrating the dedication and achievements of our Class XII Commerce students.",
    cta: { label: "See achievements", hash: "achievements" },
  },
  {
    image: slide3,
    alt: "CBSE Class XII Commerce toppers list for the 2025-26 session",
    fit: "contain",
    eyebrow: "Class XII Commerce",
    title: "Results that reflect effort.",
    description: "Our Commerce students of 2025-26, celebrated for their board results.",
    cta: { label: "See achievements", hash: "achievements" },
  },
  {
    image: slide4,
    alt: "School topper Class XII 2025-26 congratulations poster",
    fit: "contain",
    eyebrow: "School topper",
    title: "Excellence, year after year.",
    description: "Congratulating our Class XII school topper for the 2025-26 board examinations.",
    cta: { label: "See achievements", hash: "achievements" },
  },
  {
    image: slide5,
    alt: "CBSE Class XII Science toppers of 2025-26 led by Prakriti Verma",
    fit: "contain",
    eyebrow: "Class XII Science",
    title: "Curiosity, rewarded.",
    description: "Our Science stream achievers of the 2025-26 CBSE board examinations.",
    cta: { label: "See achievements", hash: "achievements" },
  },
  {
    image: slide6,
    alt: "Admissions open for 2026-27 at Shandilya Public School, Playgroup to Class IX and XI",
    fit: "contain",
    eyebrow: "Admissions open 2026-27",
    title: "Begin your child's journey with us.",
    description: "Playgroup to Class IX and XI — limited seats, enquire today.",
    cta: { label: "Apply now", to: "/admissions/apply" },
  },
];

const HOLD_MS = 3000;

export function Hero() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);
  }, []);

  const hold = useCallback(() => {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 7000);
  }, []);

  const manual = useCallback(
    (dir: number) => {
      go(dir);
      hold();
    },
    [go, hold],
  );

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => go(1), HOLD_MS);
    return () => clearTimeout(id);
  }, [index, paused, go]);

  useEffect(
    () => () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    },
    [],
  );

  const slide = SLIDES[index]!;
  const panelVisible = hovered || isTouch;

  return (
    <section
      className="group relative isolate mt-[93px] w-full overflow-hidden bg-scrim sm:mt-[97px]"
      style={{ minHeight: "calc(100dvh - 97px)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") manual(1);
        if (e.key === "ArrowLeft") manual(-1);
      }}
      tabIndex={-1}
      aria-roledescription="carousel"
      aria-label="Shandilya Public School highlights"
    >
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.35 : 0.9, ease: "easeInOut" }}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
              className={`absolute inset-0 size-full ${
                slide.fit === "contain"
                  ? "object-contain object-center p-3 sm:p-6"
                  : "object-cover object-center"
              }`}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hover-only cinematic darkening — concentrated toward the bottom where
          the text/buttons appear. Transparent at top, progressively darker below.
          Fades in/out smoothly on hover enter/leave. No effect on the normal state. */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-[450ms] ease-out"
        style={{
          opacity: panelVisible ? 1 : 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.66) 0%, rgba(0,0,0,0.58) 22%, rgba(0,0,0,0.34) 45%, rgba(0,0,0,0.14) 68%, rgba(0,0,0,0) 88%)",
        }}
        aria-hidden="true"
      />

      {/* Left social rail (unchanged) */}
      <SocialRail />

      {/* Hover-reveal content panel */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex px-5 pb-32 sm:px-14 lg:px-24">
        <AnimatePresence mode="wait">
          {panelVisible && (
            <motion.div
              key={index}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{ duration: reduced ? 0.3 : 0.5, ease: "easeOut" }}
              className="pointer-events-auto max-w-md text-left"
            >
              <p className="flex items-center gap-3 text-[10px] font-semibold tracking-[0.35em] text-accent uppercase sm:text-[10.5px]">
                <span className="h-px w-6 bg-accent/70" aria-hidden="true" />
                {slide.eyebrow}
              </p>
              <h1 className="mt-3 font-serif text-xl font-semibold text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.5)] sm:text-2xl">
                <span className="sr-only">
                  Shandilya Public School, CBSE co-educational school in Samne Ghat, Lanka,
                  Varanasi.{" "}
                </span>
                {slide.title}
              </h1>
              <p className="mt-2 text-[13px] leading-relaxed text-white/80 sm:text-sm">
                {slide.description}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                {slide.cta.to ? (
                  <Link
                    to={slide.cta.to}
                    className="group inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-[10px] font-bold tracking-[0.16em] text-primary-foreground uppercase shadow-[0_14px_30px_-14px_rgba(0,0,0,0.9)] transition duration-300 hover:scale-[1.03] hover:bg-primary/90"
                  >
                    {slide.cta.label}
                    <ArrowRight
                      className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                ) : (
                  <a
                    href={`#${slide.cta.hash}`}
                    className="group inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-[10px] font-bold tracking-[0.16em] text-primary-foreground uppercase shadow-[0_14px_30px_-14px_rgba(0,0,0,0.9)] transition duration-300 hover:scale-[1.03] hover:bg-primary/90"
                  >
                    {slide.cta.label}
                    <ArrowRight
                      className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                )}
                <Link
                  to="/admissions/apply"
                  className="inline-flex items-center rounded-full border border-white/40 px-5 py-2.5 text-[10px] font-bold tracking-[0.16em] text-white uppercase backdrop-blur-sm transition duration-300 hover:scale-[1.03] hover:border-white/70 hover:bg-white/10"
                >
                  Apply now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll for more indicator */}
      <a
        href="#welcome"
        className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5 text-white/70 transition-colors hover:text-white"
        aria-label="Scroll for more"
      >
        <span className="text-[9px] font-semibold tracking-[0.35em] uppercase">
          Scroll for more
        </span>
        <motion.span
          animate={reduced ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-4" aria-hidden="true" />
        </motion.span>
      </a>

      {/* Controls bar (unchanged) */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-6 sm:px-14 sm:pr-44 lg:px-24 lg:pr-56">
        <div className="flex items-center justify-between gap-6 border-t border-white/15 pt-5">
          <span className="font-serif text-sm text-white/80 tabular-nums">
            <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
            <span className="mx-1.5 text-white/35">/</span>
            {String(SLIDES.length).padStart(2, "0")}
          </span>

          <div className="flex flex-1 items-center justify-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.image}
                type="button"
                onClick={() => {
                  setIndex(i);
                  hold();
                }}
                aria-label={`Show slide ${i + 1}`}
                aria-current={i === index}
                className={`h-[3px] rounded-full transition-all duration-500 ${
                  i === index ? "w-10 bg-accent" : "w-4 bg-white/35 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => manual(-1)}
              aria-label="Previous slide"
              className="flex size-11 items-center justify-center rounded-full border border-white/25 text-white/90 backdrop-blur-sm transition duration-300 hover:border-accent/70 hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => manual(1)}
              aria-label="Next slide"
              className="flex size-11 items-center justify-center rounded-full border border-white/25 text-white/90 backdrop-blur-sm transition duration-300 hover:border-accent/70 hover:bg-white/10 hover:text-white"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
