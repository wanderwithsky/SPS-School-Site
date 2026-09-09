import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { SCHOOL, telHref } from "@/lib/school";
import { useSiteSettings } from "@/hooks/useCMS";

const logoUrl = "/favicon.png";

export function Footer() {
  const { data: settings } = useSiteSettings();
  const schoolName = settings?.school_name || SCHOOL.name;
  const schoolMotto = settings?.motto || SCHOOL.motto;
  const email = settings?.email || SCHOOL.email;
  const phones = settings?.phones?.length ? settings.phones : SCHOOL.phones;
  const address = settings?.address_line1
    ? `${settings.address_line1}, ${settings.address_line2 || ""}, ${settings.city || ""}, ${settings.state || ""}`
    : SCHOOL.addressLines.join(", ");

  return (
    <footer className="border-t border-border bg-foreground pb-24 text-background/80 md:pb-10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt={`${schoolName} crest`} className="size-12" />
            <span className="font-serif text-lg font-semibold text-background">{schoolName}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            A CBSE-affiliated co-educational school in Varanasi offering education from Pre-Primary
            through Class XII.
          </p>
          <p className="mt-4 font-serif text-sm text-background/90 italic">“{schoolMotto}”</p>
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
              <Link to="/about" className="hover:text-background">
                About the school
              </Link>
            </li>
            <li>
              <Link to="/teachers" className="hover:text-background">
                Faculty &amp; Teachers
              </Link>
            </li>
            <li>
              <Link to="/achievements" className="hover:text-background">
                Achievements &amp; Toppers
              </Link>
            </li>
            <li>
              <Link to="/fee-structure" className="hover:text-background">
                Fee Structure
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
              <Link to="/about" className="hover:text-background">
                Curriculum &amp; Syllabus
              </Link>
            </li>
            <li>
              <Link to="/fee-structure" className="hover:text-background">
                Fees &amp; Scholarships
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                className="hover:text-background flex items-center gap-1.5 text-emerald-400 font-semibold"
              >
                <ShieldCheck className="size-3.5" />
                Staff / Admin CMS
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold tracking-[0.2em] text-background uppercase">Reach us</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{address}</span>
            </li>
            {phones.map((p) => (
              <li key={p} className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                <a href={telHref(p)} className="hover:text-background">
                  +91 {p}
                </a>
              </li>
            ))}
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <a href={`mailto:${email}`} className="break-all hover:text-background">
                {email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/15">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-5 text-xs sm:px-6">
          <span>
            © {new Date().getFullYear()} {schoolName}, Varanasi. All rights reserved.
          </span>
          <Link
            to="/admin"
            className="text-background/60 hover:text-emerald-400 transition-colors flex items-center gap-1"
          >
            <ShieldCheck className="size-3" />
            Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
