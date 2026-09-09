import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { X, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { EnquiryForm } from "@/components/EnquiryForm";

export function AdmissionPopup() {
  const pathname = useLocation({ select: (location) => location.pathname });
  const [open, setOpen] = useState(false);

  // Only run the timer if we are exactly on the homepage and not in admin
  useEffect(() => {
    if (pathname !== "/" && !pathname.startsWith("/admissions")) return;

    const timer = setTimeout(() => setOpen(true), 2000);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Handle custom event from the TopRibbon
  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("open-admission-popup", handleOpen);
    return () => window.removeEventListener("open-admission-popup", handleOpen);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="flex max-h-[92vh] w-[min(94vw,720px)] max-w-none flex-col gap-0 overflow-hidden rounded-2xl p-0 border-border bg-card shadow-2xl"
        aria-describedby="admission-popup-desc"
      >
        {/* ---- Header ---- */}
        <DialogHeader className="relative shrink-0 border-b border-border px-6 py-5 bg-card/95 backdrop-blur z-10 text-left">
          <div className="pr-12">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Session 2026-27</span>
            </div>
            <DialogTitle className="mt-1 font-serif text-xl font-semibold text-foreground sm:text-2xl">
              Online Admission Enquiry
            </DialogTitle>
            <DialogDescription
              id="admission-popup-desc"
              className="mt-1 text-sm text-muted-foreground"
            >
              Fill out this quick form and our admissions counselor will connect with you.
            </DialogDescription>
          </div>

          <DialogClose className="absolute right-4 top-4 sm:right-5 sm:top-5 flex h-[38px] w-[38px] items-center justify-center rounded-full border border-border bg-background shadow-sm transition-all duration-200 hover:scale-105 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary z-50">
            <X className="h-5 w-5 text-foreground/80" />
            <span className="sr-only">Close popup</span>
          </DialogClose>
        </DialogHeader>

        {/* ---- Form Container ---- */}
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden p-6 sm:p-8 bg-background/50"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <EnquiryForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
