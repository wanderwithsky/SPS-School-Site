import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, MessageCircle, Navigation } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { EnquiryForm } from "@/components/EnquiryForm";
import { SCHOOL, telHref, waHref, directionsHref, mapEmbedSrc } from "@/lib/school";
import { useSiteSettings } from "@/hooks/useCMS";

const TITLE = "Contact — Shandilya Public School, Samne Ghat, Varanasi";
const DESC =
  "Address, phone numbers, email and directions for Shandilya Public School, Gayatri Nagar Colony, Garhwaghat Road, Samne Ghat, Lanka, Varanasi.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { data: settings } = useSiteSettings();
  const phones = settings?.phones?.length ? settings.phones : SCHOOL.phones;
  const email = settings?.email || SCHOOL.email;
  const addressLines = settings?.address_line1
    ? [
        settings.address_line1,
        settings.address_line2,
        `${settings.city || "Varanasi"}, ${settings.state || "Uttar Pradesh"} - ${settings.pincode || ""}`,
      ].filter(Boolean)
    : SCHOOL.addressLines;

  return (
    <SiteLayout>
      <section className="bg-secondary pt-28 pb-14 sm:pt-32">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-primary uppercase">
            Get in touch
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight font-semibold text-foreground sm:text-5xl">
            Contact the school
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            We are happy to answer your questions about admissions, academics or campus visits.
          </p>
        </div>
      </section>

      <section className="bg-background py-14">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-2">
          <div>
            <ul className="space-y-5">
              <li className="flex gap-4">
                <MapPin className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h2 className="text-sm font-bold text-foreground">Address</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {addressLines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h2 className="text-sm font-bold text-foreground">Phone</h2>
                  {phones.map((p) => (
                    <a
                      key={p}
                      href={telHref(p)}
                      className="mt-1 block text-sm text-muted-foreground hover:text-foreground"
                    >
                      +91 {p}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h2 className="text-sm font-bold text-foreground">Email</h2>
                  <a
                    href={`mailto:${email}`}
                    className="mt-1 block break-all text-sm text-muted-foreground hover:text-foreground"
                  >
                    {email}
                  </a>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={telHref(phones[0])}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                <Phone className="size-4" aria-hidden="true" /> Call
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground"
              >
                <MessageCircle className="size-4 text-primary" aria-hidden="true" /> WhatsApp
              </a>
              <a
                href={directionsHref}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground"
              >
                <Navigation className="size-4 text-primary" aria-hidden="true" /> Get directions
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Map showing the location of Shandilya Public School"
              src={mapEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[380px] w-full"
            />
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            Send us an enquiry
          </h2>
          <div className="mt-7 rounded-3xl border border-border bg-card p-6 sm:p-9">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
