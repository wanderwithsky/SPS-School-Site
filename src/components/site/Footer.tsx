const logoUrl = "/favicon.png";
import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { SCHOOL, telHref, waHref } from "@/lib/school";

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground pb-24 text-background/80 md:pb-10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt={`${SCHOOL.name} crest`} className="size-12" />
            <span className="font-serif text-lg font-semibold text-background">
              Shandilya Public School
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            A CBSE-affiliated co-educational school in Varanasi offering education from Pre-Primary
            through Class XII.
          </p>
          <p className="mt-4 font-serif text-sm text-background/90 italic">“{SCHOOL.motto}”</p>
        </div>

        <div>
          <h2 className="text-xs font-bold tracking-[0.2em] text-background uppercase">
            Quick links
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link to="/" className="hover:text-background">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" hash="welcome" className="hover:text-background">
                About the school
              </Link>
            </li>
            <li>
              <Link to="/" hash="journey" className="hover:text-background">
                Academics
              </Link>
            </li>
            <li>
              <Link to="/admissions/apply" className="hover:text-background">
                Admissions
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-background">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold tracking-[0.2em] text-background uppercase">
            Information
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="hover:text-background">
                Curriculum &amp; syllabus
              </a>
            </li>
            <li>
              <Link to="/fee-structure" className="hover:text-background">
                Fee structure
              </Link>
            </li>
            <li>
              <Link to="/events" target="_blank" rel="noopener noreferrer" className="hover:text-background">
                Events &amp; Activities
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold tracking-[0.2em] text-background uppercase">Reach us</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{SCHOOL.addressLines.join(", ")}</span>
            </li>
            {SCHOOL.phones.map((p) => (
              <li key={p} className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                <a href={telHref(p)} className="hover:text-background">
                  +91 {p}
                </a>
              </li>
            ))}
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <a href={`mailto:${SCHOOL.email}`} className="break-all hover:text-background">
                {SCHOOL.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/15">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs sm:px-6">
          © {new Date().getFullYear()} {SCHOOL.name}, Varanasi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
