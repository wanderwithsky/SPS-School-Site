import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

const TITLE = "Teachers & Faculty | Shandilya Public School, Varanasi";
const DESC = "Meet the teachers and educators of Shandilya Public School, Varanasi.";

export const Route = createFileRoute("/teachers")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/teachers" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/teachers" }],
  }),
  component: TeachersPage,
});

const TEACHERS = [
  {
    id: 1,
    name: "Teacher 01",
    designation: "Faculty Member",
    subject: "",
    department: "",
    description: "Helping students learn, explore and grow.",
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788925103/IMG-20260829-WA0070.jpg",
  },
  {
    id: 2,
    name: "Teacher 02",
    designation: "Faculty Member",
    subject: "",
    department: "",
    description: "Helping students learn, explore and grow.",
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788925103/null-20260830-WA0004.jpg",
  },
  {
    id: 3,
    name: "Teacher 03",
    designation: "Faculty Member",
    subject: "",
    department: "",
    description: "Helping students learn, explore and grow.",
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788925104/IMG-20260829-WA0067.jpg",
  },
  {
    id: 4,
    name: "Teacher 04",
    designation: "Faculty Member",
    subject: "",
    department: "",
    description: "Helping students learn, explore and grow.",
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788925104/null-20260804-WA0014.jpg",
  },
  {
    id: 5,
    name: "Teacher 05",
    designation: "Faculty Member",
    subject: "",
    department: "",
    description: "Helping students learn, explore and grow.",
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788925104/IMG-20260829-WA0064.jpg",
  },
  {
    id: 6,
    name: "Teacher 06",
    designation: "Faculty Member",
    subject: "",
    department: "",
    description: "Helping students learn, explore and grow.",
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788925104/IMG-20260829-WA0076.jpg",
  },
  {
    id: 7,
    name: "Teacher 07",
    designation: "Faculty Member",
    subject: "",
    department: "",
    description: "Helping students learn, explore and grow.",
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788925104/IMG-20260829-WA0074.jpg",
  },
  {
    id: 8,
    name: "Teacher 08",
    designation: "Faculty Member",
    subject: "",
    department: "",
    description: "Helping students learn, explore and grow.",
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788925105/IMG-20260829-WA0075.jpg",
  },
  {
    id: 9,
    name: "Teacher 09",
    designation: "Faculty Member",
    subject: "",
    department: "",
    description: "Helping students learn, explore and grow.",
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788925105/IMG-20260829-WA0073.jpg",
  },
  {
    id: 10,
    name: "Teacher 10",
    designation: "Faculty Member",
    subject: "",
    department: "",
    description: "Helping students learn, explore and grow.",
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788925105/IMG-20260829-WA0078.jpg",
  },
  {
    id: 11,
    name: "Teacher 11",
    designation: "Faculty Member",
    subject: "",
    department: "",
    description: "Helping students learn, explore and grow.",
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788925105/IMG-20260829-WA0066.jpg",
  },
  {
    id: 12,
    name: "Teacher 12",
    designation: "Faculty Member",
    subject: "",
    department: "",
    description: "Helping students learn, explore and grow.",
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788925106/null-20260830-WA0003.jpg",
  },
  {
    id: 13,
    name: "Teacher 13",
    designation: "Faculty Member",
    subject: "",
    department: "",
    description: "Helping students learn, explore and grow.",
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788925106/IMG-20260829-WA0115.jpg",
  },
  {
    id: 14,
    name: "Teacher 14",
    designation: "Faculty Member",
    subject: "",
    department: "",
    description: "Helping students learn, explore and grow.",
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788925106/IMG-20260829-WA0095.jpg",
  },
];

interface TeacherDisplayItem {
  id: string | number;
  name: string;
  designation: string;
  subject: string;
  department: string;
  description: string;
  image: string;
}

import { useTeachersCMS } from "@/hooks/useCMS";

function TeachersPage() {
  const { teachers } = useTeachersCMS();
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherDisplayItem | null>(null);

  // Map CMS teachers or fallback
  const activeTeachers = teachers.filter((t) => t.is_active);
  const displayList: TeacherDisplayItem[] =
    activeTeachers.length > 0
      ? activeTeachers.map((t, idx) => ({
          id: t.id,
          name: t.name,
          designation: t.role,
          subject: t.qualification || "",
          department: t.department,
          description:
            t.bio ||
            `${t.experience ? `Experience: ${t.experience} • ` : ""}Dedicated educator at Shandilya Public School.`,
          image:
            t.image_url ||
            TEACHERS[idx % TEACHERS.length]?.image ||
            "https://res.cloudinary.com/zvlxacfu/image/upload/v1788925103/IMG-20260829-WA0070.jpg",
        }))
      : TEACHERS;

  return (
    <SiteLayout>
      <main className="flex flex-col bg-background">
        {/* HERO SECTION */}
        <section className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden bg-ink px-4 pt-32 pb-20 text-center text-ink-foreground lg:min-h-[55vh]">
          {/* Subtle noise/texture overlay for a premium feel */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-10"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
            }}
          ></div>

          <div className="relative z-10 flex max-w-3xl flex-col items-center space-y-5">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-xs font-bold tracking-[0.2em] text-[#D4A94F] uppercase sm:text-[13px]"
            >
              Our Educators
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="font-serif text-4xl leading-[1.1] sm:text-5xl md:text-6xl"
            >
              The People Who <br className="hidden sm:block" />
              <span className="italic text-white/95">Shape Young Minds</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="max-w-xl text-base font-light leading-relaxed text-ink-foreground/80 sm:text-lg"
            >
              Meet the educators who contribute to the learning, growth and everyday experiences of
              students at Shandilya Public School.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="absolute bottom-8 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-semibold tracking-[0.2em] text-ink-foreground/40 uppercase">
              Meet the Team
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-ink-foreground/40"
            >
              ↓
            </motion.div>
          </motion.div>
        </section>

        {/* FACULTY INTRO */}
        <section className="bg-background px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-4 block text-[11px] font-bold tracking-[0.15em] text-primary/70 uppercase sm:text-xs">
              Our Faculty
            </span>
            <h2 className="mb-6 font-serif text-3xl text-foreground sm:text-4xl">
              Experience, Care & Guidance
            </h2>
            <p className="mx-auto text-base leading-relaxed text-muted-foreground sm:text-lg">
              Behind every classroom is a teacher who helps students ask better questions, discover
              their strengths and move forward with confidence.
            </p>
          </div>
        </section>

        {/* GALLERY SECTION (Masonry) */}
        <section className="mx-auto w-full max-w-[1600px] px-4 pb-24 sm:px-6 lg:px-8">
          <div className="columns-1 gap-4 sm:columns-2 md:gap-5 lg:columns-3 xl:columns-4">
            {displayList.map((teacher, index) => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
                index={index}
                onClick={() => setSelectedTeacher(teacher)}
              />
            ))}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="bg-secondary/40 px-4 py-24 text-center sm:px-6 lg:px-8 border-t border-black/5">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-4 font-serif text-3xl text-foreground sm:text-4xl">
              Great Learning Begins <br className="hidden sm:block" />
              <span className="italic text-primary">With Great Guidance.</span>
            </h2>
            <p className="mx-auto mb-8 max-w-md text-sm text-muted-foreground sm:text-base">
              Shandilya Public School is dedicated to providing quality education in Varanasi.
              Connect with our faculty, understand our approach, and see how we help students learn
              and grow.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/about"
                className="w-full rounded-full border border-black/10 bg-white px-8 py-3.5 text-[13px] font-bold tracking-[0.08em] text-foreground uppercase shadow-sm transition hover:bg-black/5 sm:w-auto"
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
        {selectedTeacher && (
          <Lightbox teacher={selectedTeacher} onClose={() => setSelectedTeacher(null)} />
        )}
      </AnimatePresence>
    </SiteLayout>
  );
}

function TeacherCard({
  teacher,
  index,
  onClick,
}: {
  teacher: TeacherDisplayItem;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
        delay: (index % 4) * 0.1, // Subtle stagger
      }}
      className="group relative mb-4 flex break-inside-avoid flex-col overflow-hidden rounded-[14px] border border-black/5 bg-white shadow-sm transition-all hover:shadow-md md:mb-5 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden bg-muted/20">
        <img
          src={teacher.image}
          alt={`${teacher.name}, ${teacher.designation}`}
          className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
          loading={index < 6 ? "eager" : "lazy"}
        />

        {/* Hover Overlay - Premium Bottom to Top Reveal */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-400 ease-out group-hover:opacity-100 p-6 z-10">
          <div className="translate-y-4 transition-transform duration-400 ease-out group-hover:translate-y-0">
            <h3 className="font-serif text-xl font-medium text-[#D4A94F] drop-shadow-[0_0_12px_rgba(212,169,79,0.3)]">
              {teacher.name}
            </h3>
            <p className="mt-1 text-sm text-white">{teacher.designation}</p>
            {teacher.description && (
              <p className="mt-3 text-xs italic text-white/80 opacity-0 transition-opacity duration-500 delay-[50ms] group-hover:opacity-100 leading-relaxed">
                "{teacher.description}"
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Default State Information - Fades slightly out on hover so focus goes to the image */}
      <div className="p-4 sm:p-5 transition-opacity duration-300 group-hover:opacity-40">
        <h3 className="font-serif text-lg text-foreground">{teacher.name}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{teacher.designation}</p>
      </div>
    </motion.div>
  );
}

function Lightbox({ teacher, onClose }: { teacher: TeacherDisplayItem; onClose: () => void }) {
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
        className="relative z-10 flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:flex-row cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full bg-black/10 text-black backdrop-blur-md transition-colors hover:bg-black/20 md:right-5 md:top-5"
          aria-label="Close dialog"
        >
          <X className="size-4" />
        </button>

        <div className="relative flex w-full shrink-0 items-center justify-center bg-muted/30 p-4 md:w-1/2 lg:w-3/5 md:p-8">
          <img
            src={teacher.image}
            alt={teacher.name}
            className="max-h-[50vh] w-auto max-w-full rounded-lg object-contain shadow-sm md:max-h-[75vh]"
          />
        </div>

        <div className="flex flex-col justify-center p-6 md:w-1/2 md:p-10 lg:w-2/5">
          <span className="mb-2 block text-[10px] font-bold tracking-widest text-[#D4A94F] uppercase">
            {teacher.department || "Faculty Department"}
          </span>
          <h2 className="mb-1.5 font-serif text-3xl text-foreground sm:text-4xl">{teacher.name}</h2>
          <p className="mb-6 text-base text-muted-foreground sm:text-lg">{teacher.designation}</p>
          <div className="h-px w-10 bg-border mb-6"></div>
          <p className="text-sm font-light italic leading-relaxed text-foreground/80 sm:text-base">
            "{teacher.description}"
          </p>
          {teacher.subject && (
            <p className="mt-6 text-sm text-muted-foreground">
              <strong className="font-medium text-foreground">Subject Specialization:</strong>{" "}
              {teacher.subject}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
