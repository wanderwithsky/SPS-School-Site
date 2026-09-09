import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { cn } from "@/lib/utils";

const TITLE = "Achievements | Shandilya Public School, Varanasi";
const DESC = "Explore the academic achievements, toppers and student accomplishments of Shandilya Public School, Varanasi.";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/achievements" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/achievements" }],
  }),
  component: AchievementsPage,
});

const ACHIEVERS = [
  {
    id: 1,
    name: "Shresth Pathak",
    class: "Class XII (Commerce)",
    achievement: "Academic Achievement",
    result: "97%",
    description: "A Student to Remember",
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788927450/Shandilya-Public-School-HeroSection4.jpg",
    featured: true,
  },
  {
    id: 2,
    name: "Congratulations! 🎉",
    class: "Class XII",
    achievement: "Academic Achievement",
    result: "Board Excellence",
    description: "A Student to Remember",
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788927450/Shandilya-Public-School-HeroSection6.jpg",
  },
  {
    id: 3,
    name: "Prakriti Verma",
    class: "Class XII (Science)",
    achievement: "Academic Achievement",
    result: "94%",
    description: "A Student to Remember",
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788927450/Shandilya-Public-School-HeroSection5.jpg",
  },
  {
    id: 4,
    name: "Student Name",
    class: "Class XII",
    achievement: "Academic Achievement",
    result: "Board Excellence",
    description: "A Student to Remember",
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788927450/Shandilya-Public-School-HeroSection3.jpg",
  },
  {
    id: 5,
    name: "Student Name",
    class: "Class XII",
    achievement: "Academic Achievement",
    result: "Board Excellence",
    description: "A Student to Remember",
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788927450/Shandilya-Public-School-HeroSection2.jpg",
  },
];

const STATS = [
  { label: "Board Results", value: "A Legacy of Excellence" },
  { label: "Toppers", value: "Students Who Made Us Proud" },
  { label: "Academic Achievements", value: "Years of Academic Dedication" },
  { label: "Student Success", value: "Countless Inspiring Journeys" },
];

const TIMELINE = [
  { year: "2023", title: "Board Excellence", desc: "A remarkable year of academic achievements." },
  { year: "2024", title: "Academic Milestones", desc: "Setting new benchmarks in student success." },
  { year: "2025", title: "Student Achievements", desc: "Continuing the tradition of excellence." },
  { year: "2026", title: "New Milestones", desc: "Our journey of educational brilliance continues." },
];

function AchievementsPage() {
  const [selectedAchiever, setSelectedAchiever] = useState<typeof ACHIEVERS[0] | null>(null);

  return (
    <SiteLayout>
      <main className="flex flex-col bg-background">
        
        {/* HERO SECTION */}
        <section className="relative flex min-h-[55vh] flex-col items-center justify-center overflow-hidden bg-ink px-4 pt-32 pb-20 text-center text-ink-foreground lg:min-h-[65vh]">
          {/* Subtle background image from the featured achiever */}
          <div className="absolute inset-0">
            <img 
              src={ACHIEVERS[0].image} 
              alt="Achievement Background" 
              className="h-full w-full object-cover opacity-15 transition-transform duration-[10s] ease-out hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/95 via-ink/85 to-ink"></div>
            {/* Subtle noise/texture overlay */}
            <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
          </div>
          
          <div className="relative z-10 flex max-w-3xl flex-col items-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-2 h-px w-12 bg-[#D4A94F]"
            />
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-xs font-bold tracking-[0.2em] text-[#D4A94F] uppercase sm:text-[13px]"
            >
              Achievements
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="font-serif text-5xl leading-[1.05] sm:text-6xl md:text-7xl lg:text-[5rem]"
            >
              Brilliant Minds.<br />
              <span className="italic text-white/95">Proud Moments.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="max-w-xl text-base font-light leading-relaxed text-ink-foreground/80 sm:text-lg"
            >
              Celebrating the students whose dedication, discipline and determination continue to make Shandilya Public School proud.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-semibold tracking-[0.2em] text-ink-foreground/50 uppercase">Discover Our Achievers</span>
            <motion.div 
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-[#D4A94F]"
            >
              ↓
            </motion.div>
          </motion.div>
        </section>

        {/* INTRODUCTION SECTION */}
        <section className="bg-background px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:gap-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex-1 space-y-6 text-center lg:text-left"
            >
              <span className="block text-[11px] font-bold tracking-[0.15em] text-primary/70 uppercase sm:text-xs">
                More Than A Result
              </span>
              <h2 className="font-serif text-4xl text-foreground sm:text-5xl">
                Hard Work Leaves <br className="hidden lg:block" />
                <span className="italic">A Mark.</span>
              </h2>
              <p className="mx-auto max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
                Every achievement reflects countless hours of preparation, perseverance and belief. At Shandilya, every milestone is celebrated as a reflection of the student's journey and dedication.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative flex-1"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted/20 shadow-xl">
                <img 
                  src={ACHIEVERS[1].image} 
                  alt="Students of Shandilya Public School" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden h-32 w-32 rounded-xl bg-primary/5 lg:block"></div>
            </motion.div>
          </div>
        </section>

        {/* ACHIEVEMENT STATISTICS */}
        <section className="bg-secondary/30 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                  className="flex flex-col items-center text-center lg:items-start lg:text-left"
                >
                  <span className="mb-3 block text-sm font-bold tracking-widest text-primary uppercase">
                    {stat.label}
                  </span>
                  <span className="font-serif text-2xl text-foreground sm:text-3xl">
                    {stat.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TOPPERS SHOWCASE (BESPOKE GRID) */}
        <section className="bg-background px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-serif text-4xl text-foreground sm:text-5xl lg:text-6xl">
                Our Toppers.<br />
                <span className="italic text-primary">Our Pride.</span>
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Sharp minds. Strong determination. Remarkable results.
              </p>
            </div>

            {/* Bespoke Grid Layout */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
              {/* Row 1 */}
              <div className="relative md:col-span-2">
                <AchieverCard achiever={ACHIEVERS[0]} featured onClick={() => setSelectedAchiever(ACHIEVERS[0])} />
              </div>
              <div className="flex flex-col gap-4 md:gap-6">
                <AchieverCard achiever={ACHIEVERS[1]} onClick={() => setSelectedAchiever(ACHIEVERS[1])} />
                <AchieverCard achiever={ACHIEVERS[2]} onClick={() => setSelectedAchiever(ACHIEVERS[2])} />
              </div>
              
              {/* Row 2 */}
              <div className="grid grid-cols-1 gap-4 md:col-span-3 md:grid-cols-2 md:gap-6 mt-2 md:mt-0">
                <AchieverCard achiever={ACHIEVERS[3]} featured onClick={() => setSelectedAchiever(ACHIEVERS[3])} />
                <AchieverCard achiever={ACHIEVERS[4]} featured onClick={() => setSelectedAchiever(ACHIEVERS[4])} />
              </div>
            </div>
          </div>
        </section>

        {/* SHARP MINDS SECTION */}
        <section className="relative overflow-hidden bg-ink px-4 py-28 text-center sm:px-6 lg:px-8 lg:py-40">
          <div className="pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
          <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-primary/20 opacity-50"></div>
          
          <div className="relative z-10 mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mx-auto mb-8 flex size-12 items-center justify-center rounded-full border border-[#D4A94F]/30 bg-[#D4A94F]/10"
            >
              <div className="size-2 rounded-full bg-[#D4A94F]"></div>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="mb-8 font-serif text-4xl text-white sm:text-5xl lg:text-6xl"
            >
              Sharp Minds.<br />
              <span className="italic text-[#D4A94F]">Strong Futures.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg font-light leading-relaxed text-white/80 sm:text-xl"
            >
              At Shandilya Public School, academic achievement is not only about marks. It is about curiosity, discipline, perseverance and the confidence to aim higher.
            </motion.p>
          </div>
        </section>

        {/* FROM CLASSROOM TO NEW POSSIBILITIES */}
        <section className="bg-background px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="mb-16 font-serif text-3xl text-foreground sm:text-4xl lg:text-5xl">
              From Classroom <br className="hidden sm:block" />
              <span className="italic text-primary">to New Possibilities</span>
            </h2>
            
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-4">
              {['LEARN', 'PERSIST', 'ACHIEVE', 'GROW', 'MOVE FORWARD'].map((step, i, arr) => (
                <div key={step} className="flex w-full flex-col items-center md:flex-row md:justify-center">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                    className="flex size-32 flex-col items-center justify-center rounded-full border border-border bg-card shadow-sm transition-colors hover:border-primary/50 hover:bg-secondary/30"
                  >
                    <span className="text-xs font-bold tracking-widest text-foreground uppercase">{step}</span>
                  </motion.div>
                  
                  {i < arr.length - 1 && (
                    <motion.div 
                      initial={{ opacity: 0, scaleX: 0 }}
                      whileInView={{ opacity: 1, scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.15 + 0.3 }}
                      className="my-4 h-8 w-px bg-border md:mx-4 md:my-0 md:h-px md:w-8 lg:w-16 origin-left"
                    ></motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BOARD EXCELLENCE & TIMELINE */}
        <section className="bg-secondary/20 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
              
              {/* Board Results Architecture */}
              <div>
                <h2 className="mb-10 font-serif text-3xl text-foreground sm:text-4xl">
                  Excellence, <br />
                  <span className="italic text-primary">Year After Year.</span>
                </h2>
                
                <div className="space-y-8">
                  {['CLASS X', 'CLASS XII'].map((cls) => (
                    <div key={cls} className="rounded-2xl border border-border bg-white p-8 shadow-sm">
                      <h3 className="mb-6 border-b border-border pb-4 text-lg font-bold tracking-widest text-foreground uppercase">{cls}</h3>
                      <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-4">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Academic Year</p>
                          <p className="font-serif text-xl font-medium">----</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Appeared</p>
                          <p className="font-serif text-xl font-medium">----</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Passed</p>
                          <p className="font-serif text-xl font-medium">----</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Pass %</p>
                          <p className="font-serif text-xl font-medium text-primary">----</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievement Timeline */}
              <div className="relative">
                <div className="absolute bottom-0 left-[23px] top-0 w-px bg-border sm:left-[27px]"></div>
                <div className="space-y-12">
                  {TIMELINE.map((item, i) => (
                    <motion.div 
                      key={item.year}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                      className="relative pl-14 sm:pl-16"
                    >
                      <div className="absolute left-4 top-1 size-3 sm:left-5 rounded-full border-[3px] border-white bg-primary shadow-sm"></div>
                      <span className="mb-1 block text-sm font-bold tracking-widest text-[#D4A94F]">{item.year}</span>
                      <h4 className="mb-2 font-serif text-2xl text-foreground">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* STUDENT LIFE + ACHIEVEMENT */}
        <section className="bg-background px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 font-serif text-3xl text-foreground sm:text-4xl">
              Achievement is <span className="italic text-primary">Multidimensional</span>
            </h2>
            <p className="mb-12 text-lg text-muted-foreground">
              Excellence at Shandilya extends beyond the classroom.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {['ACADEMICS', 'SPORTS', 'CULTURAL ACTIVITIES', 'COMPETITIONS', 'CREATIVE EXPRESSION'].map((category) => (
                <span key={category} className="rounded-full border border-border bg-card px-6 py-3 text-xs font-bold tracking-widest text-foreground/80 uppercase shadow-sm transition-colors hover:border-primary/30 hover:text-primary">
                  {category}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="bg-secondary/40 px-4 py-24 text-center sm:px-6 lg:px-8 border-t border-black/5">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-4 font-serif text-3xl text-foreground sm:text-4xl lg:text-5xl">
              Every Journey <br className="hidden sm:block" />
              <span className="italic text-primary">Begins With A Chance.</span>
            </h2>
            <p className="mb-10 text-base text-muted-foreground sm:text-lg">
              Discover the learning environment that helps students grow with confidence.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/about"
                className="w-full rounded-full border border-border bg-white px-8 py-3.5 text-[13px] font-bold tracking-[0.08em] text-foreground uppercase transition-colors hover:bg-black/5 sm:w-auto"
              >
                Explore Our School
              </Link>
              <Link
                to="/admissions/apply"
                className="w-full rounded-full bg-primary px-8 py-3.5 text-[13px] font-bold tracking-[0.08em] text-primary-foreground uppercase shadow-md transition duration-300 hover:scale-[1.02] hover:brightness-110 sm:w-auto"
              >
                Apply for Admission
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedAchiever && (
          <Lightbox 
            achiever={selectedAchiever} 
            onClose={() => setSelectedAchiever(null)} 
          />
        )}
      </AnimatePresence>
    </SiteLayout>
  );
}

function AchieverCard({ 
  achiever, 
  featured = false,
  onClick 
}: { 
  achiever: typeof ACHIEVERS[0]; 
  featured?: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={cn(
        "group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-[14px] border border-black/5 bg-white shadow-sm transition-all hover:shadow-lg",
        featured ? "h-[350px] sm:h-[450px] md:h-full min-h-[400px]" : "h-[300px] sm:h-[400px] md:h-[350px]"
      )}
      onClick={onClick}
      role="button"
      aria-label={`View details for ${achiever.name}`}
    >
      <div className="absolute inset-0 bg-muted/20">
        <img
          src={achiever.image}
          alt={`Achievement by ${achiever.name}`}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
        
        {/* Hover Overlay - Subtle Premium Reveal */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-400 ease-out group-hover:opacity-100 p-6 z-10">
          <div className="translate-y-3 transition-transform duration-400 ease-out group-hover:translate-y-0">
            <span className="mb-1 block text-[10px] font-bold tracking-widest text-[#D4A94F] uppercase drop-shadow-md">
              {achiever.achievement}
            </span>
            <h3 className="font-serif text-2xl font-medium text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]">
              {achiever.name}
            </h3>
            <p className="mt-1 text-sm font-light italic text-white/90 drop-shadow-md">
              "{achiever.description}"
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Lightbox({ achiever, onClose }: { achiever: typeof ACHIEVERS[0]; onClose: () => void }) {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-ink/90 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.4, type: "spring", bounce: 0 }}
        className="relative z-10 flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl lg:flex-row cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex size-10 items-center justify-center rounded-full bg-black/10 text-white backdrop-blur-md transition-colors hover:bg-black/30 lg:right-5 lg:top-5"
          aria-label="Close dialog"
        >
          <X className="size-5" />
        </button>

        <div className="relative flex w-full shrink-0 items-center justify-center bg-black/5 lg:w-[65%]">
          <img 
            src={achiever.image} 
            alt={achiever.name} 
            className="max-h-[60vh] w-auto max-w-full object-contain shadow-sm lg:max-h-[85vh] p-4 lg:p-0"
          />
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:w-[35%] lg:p-12 overflow-y-auto">
          <span className="mb-2 block text-[10px] font-bold tracking-widest text-[#D4A94F] uppercase">
            {achiever.achievement}
          </span>
          <h2 className="mb-1.5 font-serif text-3xl text-foreground sm:text-4xl">
            {achiever.name}
          </h2>
          <p className="mb-6 text-base text-muted-foreground sm:text-lg">
            {achiever.class} — {achiever.result}
          </p>
          <div className="mb-6 h-px w-12 bg-border"></div>
          <p className="text-sm font-light italic leading-relaxed text-foreground/80 sm:text-base">
            "{achiever.description}"
          </p>
        </div>
      </motion.div>
    </div>
  );
}
