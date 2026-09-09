import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Phone, MessageCircle, GraduationCap, ChevronUp } from "lucide-react";
import { SCHOOL, telHref, waHref } from "@/lib/school";

export function FloatingActions() {
  const [expanded, setExpanded] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!expanded) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setExpanded(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [expanded]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <>
      {/* Desktop floating action menu */}
      <div
        ref={wrapperRef}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onFocus={() => setExpanded(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setExpanded(false);
        }}
        className="fixed right-5 bottom-6 z-40 hidden flex-col items-end gap-2 md:flex"
      >
        <motion.button
          layout
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-label={expanded ? "Hide contact actions" : "Show contact actions"}
          transition={{ duration: 0.45, ease }}
          className="mr-3 flex size-8 items-center justify-center rounded-full border border-border bg-card text-primary shadow-md transition hover:bg-secondary"
        >
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.35, ease }}
            className="flex"
          >
            <ChevronUp className="size-4" aria-hidden="true" />
          </motion.span>
        </motion.button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="contact-actions"
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease }}
              className="flex flex-col items-end gap-2 overflow-hidden"
            >
              <motion.a
                href={telHref(SCHOOL.phones[0])}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.96 }}
                transition={{ duration: 0.45, ease, delay: 0.06 }}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground shadow-lg transition hover:bg-secondary"
              >
                <Phone className="size-4 text-primary" aria-hidden="true" />
                Call us
              </motion.a>
              <motion.a
                href={waHref}
                target="_blank"
                rel="noreferrer noopener"
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.96 }}
                transition={{ duration: 0.45, ease }}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground shadow-lg transition hover:bg-secondary"
              >
                <MessageCircle className="size-4 text-primary" aria-hidden="true" />
                WhatsApp
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        <Link
          to="/admissions/apply"
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-xl transition hover:bg-primary/90"
        >
          <GraduationCap className="size-4" aria-hidden="true" />
          Apply now
        </Link>
      </div>

      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-card/95 backdrop-blur md:hidden">
        <a
          href={telHref(SCHOOL.phones[0])}
          className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-foreground"
        >
          <Phone className="size-5 text-primary" aria-hidden="true" />
          Call
        </a>
        <a
          href={waHref}
          target="_blank"
          rel="noreferrer noopener"
          className="flex min-h-14 flex-col items-center justify-center gap-0.5 border-x border-border text-xs font-semibold text-foreground"
        >
          <MessageCircle className="size-5 text-primary" aria-hidden="true" />
          WhatsApp
        </a>
        <Link
          to="/admissions/apply"
          className="flex min-h-14 flex-col items-center justify-center gap-0.5 bg-primary text-xs font-semibold text-primary-foreground"
        >
          <GraduationCap className="size-5" aria-hidden="true" />
          Apply
        </Link>
      </div>
    </>
  );
}
