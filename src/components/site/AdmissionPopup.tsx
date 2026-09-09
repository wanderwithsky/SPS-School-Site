import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScdgCyh-CpRv49Fa5oQOR2o0sStGroto1cOihXdgfGwumoMcA/viewform?embedded=true";

export function AdmissionPopup() {
  const pathname = useLocation({ select: (location) => location.pathname });
  const [open, setOpen] = useState(false);

  // Only run the timer if we are exactly on the homepage
  useEffect(() => {
    if (pathname !== "/") return;
    
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
        className="flex max-h-[90vh] w-[min(90vw,820px)] max-w-none flex-col gap-0 overflow-hidden rounded-2xl p-0"
        aria-describedby="admission-popup-desc"
      >
        {/* ---- Header ---- */}
        <DialogHeader className="relative shrink-0 border-b border-border px-6 py-5 bg-card z-10 text-left">
          <div className="pr-12">
            <DialogTitle className="font-serif text-xl font-semibold text-foreground sm:text-2xl">
              Admissions Open 2026-27
            </DialogTitle>
            <DialogDescription id="admission-popup-desc" className="mt-1 text-sm text-muted-foreground">
              Start your child's journey with Shandilya Public School.
            </DialogDescription>
          </div>
          
          <DialogClose className="absolute right-4 top-4 sm:right-5 sm:top-5 flex h-[38px] w-[38px] sm:h-[40px] sm:w-[40px] items-center justify-center rounded-full border border-border/60 bg-background shadow-sm transition-all duration-300 hover:scale-105 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary z-50">
            <X className="h-5 w-5 text-foreground/80" />
            <span className="sr-only">Close popup</span>
          </DialogClose>
        </DialogHeader>

        {/* ---- Single Scrollable Form Container ---- */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-background" style={{ WebkitOverflowScrolling: "touch" }}>
          <iframe
            src={GOOGLE_FORM_URL}
            title="Shandilya Public School Online Admission Form"
            width="100%"
            height="2430"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            style={{ border: "none", display: "block" }}
          >
            Loading…
          </iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
}
