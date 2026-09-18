import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV, SCHOOL } from "@/lib/school";
import { cn } from "@/lib/utils";
import { TopRibbon } from "./TopRibbon";
const logoUrl = "/favicon.png";

export function Header({ overHero = false }: { overHero?: boolean }) {
  void overHero;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <TopRibbon />

      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-black/10 bg-white shadow-[0_6px_24px_-12px_rgba(0,0,0,0.35)]"
            : "border-black/5 bg-white",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2.5 sm:px-6">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <img
              src={logoUrl}
              alt={`${SCHOOL.name} crest`}
              className="size-11 shrink-0 sm:size-12"
            />
            <span className="leading-tight">
              <span className="block font-serif text-[15px] font-semibold tracking-tight text-foreground sm:text-lg">
                Shandilya Public School
              </span>
              <span className="block text-[10px] tracking-[0.3em] text-primary/80 uppercase">
                Varanasi
              </span>
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {NAV.map((item) =>
              item.items ? (
                <div key={item.label} className="group relative">
                  <button className="flex items-center gap-1 rounded-md px-3 py-2 text-[12.5px] font-semibold tracking-[0.08em] text-foreground/80 uppercase transition duration-200 hover:text-primary">
                    {item.label}
                    <ChevronDown
                      className="size-3.5 opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100"
                      aria-hidden="true"
                    />
                  </button>
                  <div className="invisible absolute top-full left-0 w-60 translate-y-1 rounded-xl border border-border bg-popover p-2 opacity-0 shadow-xl transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.items.map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.to}
                        hash={sub.hash}
                        onClick={() => {
                          if (sub.hash && window.location.pathname === sub.to) {
                            const el = document.getElementById(sub.hash);
                            if (el) {
                              el.scrollIntoView({ behavior: "smooth" });
                            }
                          }
                        }}
                        className="block rounded-lg px-3 py-2 text-sm text-popover-foreground transition hover:bg-secondary"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : item.label === "Contact" ? (
                <Link
                  key={item.label}
                  to={item.to!}
                  className="ml-3 rounded-full bg-primary px-5 py-2.5 text-[12.5px] font-bold tracking-[0.1em] text-primary-foreground uppercase shadow-md transition duration-300 hover:scale-[1.04] hover:brightness-110"
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.label}
                  to={item.to!}
                  className="rounded-md px-3 py-2 text-[12.5px] font-semibold tracking-[0.08em] text-foreground/80 uppercase transition duration-200 hover:text-primary"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="ml-auto flex size-11 items-center justify-center rounded-md text-foreground hover:bg-black/5 lg:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="max-h-[calc(100dvh-8rem)] overflow-y-auto border-t border-border bg-background px-4 pt-2 pb-8 lg:hidden">
          {NAV.map((item) => (
            <div key={item.label} className={item.label === "Contact" ? "mt-5" : "border-b border-border/70 py-1"}>
              {item.to ? (
                item.label === "Contact" ? (
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-full bg-primary px-5 py-3.5 text-center text-sm font-bold tracking-wide text-primary-foreground uppercase"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block px-1 py-3 text-sm font-bold tracking-wide text-foreground uppercase"
                  >
                    {item.label}
                  </Link>
                )
              ) : (
                <details>
                  <summary className="cursor-pointer list-none px-1 py-3 text-sm font-bold tracking-wide text-foreground uppercase">
                    {item.label}
                  </summary>
                  <div className="pb-2">
                    {item.items!.map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.to}
                        hash={sub.hash}
                        onClick={() => {
                          setOpen(false);
                          if (sub.hash && window.location.pathname === sub.to) {
                            setTimeout(() => {
                              const el = document.getElementById(sub.hash);
                              if (el) {
                                el.scrollIntoView({ behavior: "smooth" });
                              }
                            }, 50);
                          }
                        }}
                        className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </details>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
