import React, { useState, useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SCHOOL } from "@/lib/school";
import { cn } from "@/lib/utils";

const TITLE = "Events & Activities | Shandilya Public School, Varanasi";
const DESC =
  "Explore events, celebrations, sports, exhibitions, educational visits and activities at Shandilya Public School, Varanasi.";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/events" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  component: EventsPage,
});

/* ---------------- Data Model ---------------- */

const EVENTS_DATA = [
  {
    id: "yoga-day",
    number: "01",
    title: "Yoga Day",
    description:
      "A day dedicated to movement, mindfulness and healthy habits, with students coming together to practise yoga and learn the value of well-being.",
    images: [
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1788826062/IMG-20260829-WA0009.jpg",
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1788826064/IMG-20260829-WA0011.jpg",
    ],
  },
  {
    id: "diwali-celebration",
    number: "02",
    title: "Diwali Celebration",
    description:
      "A festive celebration filled with creativity, togetherness and the spirit of sharing.",
    images: [
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1789117982/2a8b17ee-545e-4467-b37b-d23621e13e5e.jpg",
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1788826062/IMG-20260829-WA0012.jpg",
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1788826063/IMG-20260829-WA0015.jpg",
    ],
  },
  {
    id: "childrens-day",
    number: "03",
    title: "Children's Day Celebration & School Tour",
    description: "A special day celebrating the joy, curiosity and individuality of our students.",
    images: [
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1788824309/e743774b-9288-4d86-b7c9-0f49e2d3cc46.jpg",
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1788824303/1c987b60-0843-4729-9841-0ad1682eb926.jpg",
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1788824246/8f13d21e-9564-4114-8ec6-e3e2353e939d.jpg",
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1788824277/32e6f96b-8e32-40a6-b82b-b9a31280824c.jpg",
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1788824258/ead2e6dd-28dd-4229-8027-07ab2c47e714.jpg",
    ],
  },
  {
    id: "school-tour",
    number: "04",
    title: "Science Exhibitions", 
    description:
      "Students present models, experiments and ideas that encourage observation, curiosity and practical learning.",
    images: [
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1788824363/2c0c0ea5-8c6a-4e05-b616-4d4594e7de68.jpg",
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1788824413/27f1a810-6681-4aa1-94f1-a545cae82ede.jpg",
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1788824430/7d6b05a6-efee-414e-b110-4d132e17bd65.jpg",
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1788824426/e8b22ebc-68cf-4d9c-9c85-f5864bc3ece1.jpg",
    ],
  },
  {
    id: "teachers-training",
    number: "05",
    title: "Teachers Training",
    description:
      "Continuous professional learning helps educators strengthen their classroom practices and grow together.",
    images: [
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1789118180/f3b8bb11-66cd-4975-a243-3195d540e73d.jpg",
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1789118168/83a68f1a-9f83-4aed-97db-457e686bd1f6.jpg",
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1789118188/93583f15-6a81-4cc9-9b74-3eac757de1eb.jpg",
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1789118201/50f5c126-dba9-4ba3-9105-432bc04793e9.jpg",
    ],
  },
  {
    id: "plantation-day",
    number: "06",
    title: "Plantation Day",
    description:
      "Students and educators come together to encourage environmental responsibility and care for nature.",
    images: [
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1789118227/780fba2f-a166-405f-86a8-213c2e9e6ec3.jpg",
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1789118210/ec73f79e-5dc3-4232-925c-97275dc7a0a6.jpg",
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1789118232/7f729077-22e9-4b16-88e2-35cfda49b785.jpg",
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1789118266/c2aa7342-c194-4f98-a307-c7878faa066e.jpg",
    ],
  },
  {
    id: "sports-day",
    number: "07",
    title: "Sports Day",
    description:
      "Sports Day celebrates physical activity, teamwork and healthy competition. Students showcase their athletic talents, learn to work together and build sportsmanship.",
    images: [
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1788824486/f79ba866-40e1-4d5d-94cb-75c1146e1505.jpg",
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1788824535/0da29dd2-fcb9-41c9-9f7c-1846391ebd68.jpg",
    ],
  },
  {
    id: "sports",
    number: "08",
    title: "Physical Activities",
    description:
      "Physical Activities at SPS help students stay active, build fitness, and learn teamwork and sportsmanship.",
    images: [
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1788824550/0b165d87-86ab-47cd-80b1-a634da102bd1.jpg",
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1788824573/28b7163c-566e-4f1d-a940-3a80e3fa0b60.jpg",
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1788824712/05893804-80a9-4206-bdfc-4728cb174a64.jpg",
    ],
  },
  {
    id: "prize-distribution",
    number: "09",
    title: "Prize Distribution",
    description:
      "Celebrating student effort, participation and achievements across school activities.",
    images: [
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1788826064/IMG-20260829-WA0091.jpg",
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1788826063/IMG-20260829-WA0093.jpg",
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1788826065/IMG-20260829-WA0089.jpg",
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1789118285/a439d863-0736-4b3e-9863-0473fad91e7b.jpg",
    ],
  },
];

/* ---------------- Context & Types ---------------- */

type LightboxState = {
  isOpen: boolean;
  eventId: string | null;
  imageIndex: number;
  originRect: DOMRect | null;
};

/* ---------------- Main Page ---------------- */

function EventsPage() {
  const [activeSection, setActiveSection] = useState<string>(EVENTS_DATA[0].id);
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    eventId: null,
    imageIndex: 0,
    originRect: null,
  });

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (lightbox.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [lightbox.isOpen]);

  const openLightbox = (
    eventId: string,
    imageIndex: number,
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLightbox({ isOpen: true, eventId, imageIndex, originRect: rect });
  };

  const closeLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  const nextImage = () => {
    if (!lightbox.eventId) return;
    const event = EVENTS_DATA.find((e) => e.id === lightbox.eventId);
    if (!event) return;
    setLightbox((prev) => ({
      ...prev,
      imageIndex: (prev.imageIndex + 1) % event.images.length,
    }));
  };

  const prevImage = () => {
    if (!lightbox.eventId) return;
    const event = EVENTS_DATA.find((e) => e.id === lightbox.eventId);
    if (!event) return;
    setLightbox((prev) => ({
      ...prev,
      imageIndex: (prev.imageIndex - 1 + event.images.length) % event.images.length,
    }));
  };

  // Progress Tracker
  const activeIndex = EVENTS_DATA.findIndex((e) => e.id === activeSection);
  const progressText = `${String(activeIndex !== -1 ? activeIndex + 1 : 1).padStart(2, "0")} / 09`;

  return (
    <SiteLayout>
      <EventsHero />
      <EventNavigation activeSection={activeSection} />

      <main className="relative pb-24 sm:pb-32 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {EVENTS_DATA.map((event, index) => (
            <EventSection
              key={event.id}
              event={event}
              index={index}
              ref={(el) => (sectionRefs.current[index] = el)}
              openLightbox={openLightbox}
            />
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="fixed bottom-6 right-6 z-40 hidden lg:flex items-center justify-center rounded-full bg-background/80 backdrop-blur border border-border shadow-sm px-4 py-2 font-serif text-sm text-muted-foreground pointer-events-none">
          {progressText}
        </div>
      </main>

      <FooterSection />

      <Lightbox state={lightbox} onClose={closeLightbox} onNext={nextImage} onPrev={prevImage} />
    </SiteLayout>
  );
}

/* ---------------- Hero ---------------- */

function EventsHero() {
  const heroImage = EVENTS_DATA[0].images[0]; // Using Image 01 from Yoga Day

  return (
    <section className="relative flex h-[65vh] items-center justify-center overflow-hidden">
      <motion.img
        src={heroImage}
        alt="Students at Shandilya Public School participating in Yoga Day"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "center 30%" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.5),rgba(0,0,0,0.7))]" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-px w-12 bg-primary mb-4"
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[11px] font-semibold tracking-[0.3em] text-primary uppercase mb-3"
        >
          Events & Activities
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.4 }}
          className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-tight text-white font-semibold"
        >
          Life Beyond the Classroom.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.5 }}
          className="mt-6 text-base sm:text-lg text-white/80 max-w-2xl font-light"
        >
          At {SCHOOL.name}, learning comes alive through celebrations, exploration, teamwork,
          discovery and the moments students share together.
        </motion.p>
      </div>
    </section>
  );
}

/* ---------------- Navigation ---------------- */

function EventNavigation({ activeSection }: { activeSection: string }) {
  const scrollContainerRef = useRef<HTMLElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scrollByAmount = (amount: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-[100px] z-40 bg-background/95 backdrop-blur-md border-b border-border w-full shadow-sm">
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-12">
        {canScrollLeft && (
          <button
            onClick={() => scrollByAmount(-300)}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-background/90 backdrop-blur-md border border-border shadow-sm rounded-full text-foreground/70 hover:text-foreground hidden sm:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        <nav
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex items-center gap-8 overflow-x-auto overflow-y-hidden py-4 sm:py-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {EVENTS_DATA.map((event) => (
            <button
              key={event.id}
              onClick={() => {
                document.getElementById(event.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={cn(
                "group relative whitespace-nowrap text-[11px] lg:text-[12px] font-bold tracking-[0.08em] lg:tracking-[0.05em] uppercase transition-colors duration-300",
                activeSection === event.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {event.title}
              <span
                className={cn(
                  "absolute -bottom-[20px] left-0 h-[2px] bg-primary transition-all duration-300",
                  activeSection === event.id ? "w-full" : "w-0 group-hover:w-full opacity-50",
                )}
              />
            </button>
          ))}
        </nav>

        {canScrollRight && (
          <button
            onClick={() => scrollByAmount(300)}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-background/90 backdrop-blur-md border border-border shadow-sm rounded-full text-foreground/70 hover:text-foreground hidden sm:flex"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------------- Event Section ---------------- */

const fadeUpParams = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

type EventType = (typeof EVENTS_DATA)[0];

const EventSection = React.forwardRef<
  HTMLElement,
  {
    event: EventType;
    index: number;
    openLightbox: (id: string, idx: number, e: React.MouseEvent<HTMLDivElement>) => void;
  }
>(({ event, index, openLightbox }, ref) => {
  // Determine layout type based on index to create alternating compositions
  const isEven = index % 2 === 0;
  const imageCount = event.images.length;

  return (
    <section id={event.id} ref={ref} className="pt-24 sm:pt-32 scroll-mt-24">
      <div className="max-w-3xl mb-12">
        <motion.p
          {...fadeUpParams}
          className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-3 flex items-center gap-3"
        >
          <span className="w-6 h-px bg-primary/50" />
          EVENT {event.number}
        </motion.p>
        <motion.h2
          {...fadeUpParams}
          transition={{ ...fadeUpParams.transition, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-6"
        >
          {event.title}
        </motion.h2>
        <motion.p
          {...fadeUpParams}
          transition={{ ...fadeUpParams.transition, delay: 0.2 }}
          className="text-base text-muted-foreground leading-relaxed max-w-2xl"
        >
          {event.description}
        </motion.p>
      </div>

      <div className="w-full">
        {imageCount === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-4 sm:gap-6">
            <ImageCard
              src={event.images[0]}
              eventTitle={event.title}
              onClick={(e) => openLightbox(event.id, 0, e)}
              className="aspect-[4/3] md:aspect-auto md:h-[500px]"
            />
            <ImageCard
              src={event.images[1]}
              eventTitle={event.title}
              onClick={(e) => openLightbox(event.id, 1, e)}
              className="aspect-[4/3] md:aspect-auto md:h-[500px]"
            />
          </div>
        )}

        {imageCount === 3 && (
          <div
            className={cn(
              "grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4 sm:gap-6",
              isEven ? "md:grid-cols-[1.5fr_1fr]" : "",
            )}
          >
            <ImageCard
              src={event.images[0]}
              eventTitle={event.title}
              onClick={(e) => openLightbox(event.id, 0, e)}
              className={cn(
                "aspect-[16/9] md:aspect-auto",
                isEven ? "md:h-[600px] md:row-span-2" : "md:h-[290px]",
              )}
            />
            <ImageCard
              src={event.images[1]}
              eventTitle={event.title}
              onClick={(e) => openLightbox(event.id, 1, e)}
              className={cn(
                "aspect-[16/9] md:aspect-auto",
                !isEven ? "md:h-[600px] md:row-span-2" : "md:h-[290px]",
              )}
            />
            <ImageCard
              src={event.images[2]}
              eventTitle={event.title}
              onClick={(e) => openLightbox(event.id, 2, e)}
              className="aspect-[16/9] md:aspect-auto md:h-[290px]"
            />
          </div>
        )}

        {imageCount === 4 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <ImageCard
              src={event.images[0]}
              eventTitle={event.title}
              onClick={(e) => openLightbox(event.id, 0, e)}
              className="md:col-span-3 aspect-[16/9] md:aspect-[21/9]"
            />
            <ImageCard
              src={event.images[1]}
              eventTitle={event.title}
              onClick={(e) => openLightbox(event.id, 1, e)}
              className="aspect-[4/3]"
            />
            <ImageCard
              src={event.images[2]}
              eventTitle={event.title}
              onClick={(e) => openLightbox(event.id, 2, e)}
              className="aspect-[4/3]"
            />
            <ImageCard
              src={event.images[3]}
              eventTitle={event.title}
              onClick={(e) => openLightbox(event.id, 3, e)}
              className="aspect-[4/3]"
            />
          </div>
        )}

        {imageCount === 5 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <ImageCard
              src={event.images[0]}
              eventTitle={event.title}
              onClick={(e) => openLightbox(event.id, 0, e)}
              className="col-span-2 row-span-2 aspect-square md:aspect-[4/3]"
            />
            <ImageCard
              src={event.images[1]}
              eventTitle={event.title}
              onClick={(e) => openLightbox(event.id, 1, e)}
              className="col-span-1 aspect-[4/3]"
            />
            <ImageCard
              src={event.images[2]}
              eventTitle={event.title}
              onClick={(e) => openLightbox(event.id, 2, e)}
              className="col-span-1 aspect-[4/3]"
            />
            <ImageCard
              src={event.images[3]}
              eventTitle={event.title}
              onClick={(e) => openLightbox(event.id, 3, e)}
              className="col-span-1 aspect-[4/3]"
            />
            <ImageCard
              src={event.images[4]}
              eventTitle={event.title}
              onClick={(e) => openLightbox(event.id, 4, e)}
              className="col-span-1 aspect-[4/3]"
            />
          </div>
        )}
      </div>
    </section>
  );
});
EventSection.displayName = "EventSection";

/* ---------------- Image Card ---------------- */

function ImageCard({
  src,
  eventTitle,
  onClick,
  className,
}: {
  src: string;
  eventTitle: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border/50 shadow-sm cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      <img
        src={src}
        alt={`Photograph from ${eventTitle}`}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 p-5 translate-y-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
        <p className="text-[10px] font-semibold tracking-widest text-white/90 uppercase">
          {eventTitle}
        </p>
      </div>
    </motion.div>
  );
}

/* ---------------- 3D Lightbox Viewer ---------------- */

function Lightbox({
  state,
  onClose,
  onNext,
  onPrev,
}: {
  state: LightboxState;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  if (!state.isOpen || !state.eventId) return null;

  const event = EVENTS_DATA.find((e) => e.id === state.eventId);
  if (!event) return null;

  const currentImage = event.images[state.imageIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
        style={{ perspective: "1500px" }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-[110] p-3 text-white/70 hover:text-white transition-colors"
          aria-label="Close viewer"
        >
          <X className="w-8 h-8" />
        </button>

        <button
          onClick={onPrev}
          className="absolute left-4 sm:left-10 z-[110] p-4 text-white/50 hover:text-white transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-10 h-10" />
        </button>

        <button
          onClick={onNext}
          className="absolute right-4 sm:right-10 z-[110] p-4 text-white/50 hover:text-white transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-10 h-10" />
        </button>

        <motion.div
          key={currentImage}
          initial={{ opacity: 0, rotateY: -180, scale: 0.8, z: -500 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1, z: 0 }}
          exit={{ opacity: 0, rotateY: 180, scale: 0.8, z: -500 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-5xl max-h-[85vh] w-full px-12 sm:px-24 flex flex-col items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          <img
            src={currentImage}
            alt={`${event.title} photograph ${state.imageIndex + 1}`}
            className="max-h-[75vh] w-auto max-w-full rounded-md shadow-2xl object-contain"
          />
          <div className="mt-6 flex items-center justify-center text-white/60 font-serif text-sm tracking-wide">
            <span>{event.title}</span>
            <span className="mx-3 text-white/30">•</span>
            <span>
              Image {String(state.imageIndex + 1).padStart(2, "0")} /{" "}
              {String(event.images.length).padStart(2, "0")}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ---------------- Footer Section ---------------- */

function FooterSection() {
  return (
    <section className="bg-secondary border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center flex flex-col items-center">
        <motion.h2
          {...fadeUpParams}
          className="font-serif text-3xl sm:text-5xl font-semibold text-foreground mb-6"
        >
          Moments Become Memories.
        </motion.h2>
        <motion.p
          {...fadeUpParams}
          transition={{ ...fadeUpParams.transition, delay: 0.1 }}
          className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10"
        >
          From the classroom to the field, from discovery to celebration, every experience adds
          another chapter to the {SCHOOL.shortName} journey.
        </motion.p>
        <motion.div
          {...fadeUpParams}
          transition={{ ...fadeUpParams.transition, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link
            to="/about"
            className="flex items-center justify-center gap-2 rounded-full border border-border bg-background px-8 py-3.5 text-[12px] font-bold tracking-[0.1em] text-foreground uppercase shadow-sm transition hover:bg-secondary hover:text-primary"
          >
            Explore Our School
          </Link>
          <Link
            to="/admissions/apply"
            className="group flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-[12px] font-bold tracking-[0.1em] text-primary-foreground uppercase shadow-md transition hover:scale-[1.02] hover:brightness-110"
          >
            Apply For Admission
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
