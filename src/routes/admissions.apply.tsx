import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { EnquiryForm } from "@/components/EnquiryForm";
import { SCHOOL, telHref, waHref } from "@/lib/school";
import { Phone, MessageCircle } from "lucide-react";

const TITLE = "Admission Enquiry — Shandilya Public School, Varanasi";
const DESC =
  "Submit an admission enquiry for Shandilya Public School, a CBSE-affiliated school in Samne Ghat, Lanka, Varanasi offering Pre-Primary to Class XII.";

export const Route = createFileRoute("/admissions/apply")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/admissions/apply" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/admissions/apply" }],
  }),
  component: ApplyPage,
});

const STEPS = [
  { n: "01", t: "Submit enquiry", d: "Share your child's details through the form on this page." },
  {
    n: "02",
    t: "School team contacts you",
    d: "Our admissions team calls you to answer questions.",
  },
  {
    n: "03",
    t: "Registration / interaction",
    d: "A friendly interaction with the child and parents.",
  },
  { n: "04", t: "Document verification", d: "Submit the required documents at the school office." },
  { n: "05", t: "Admission confirmation", d: "Complete the formalities and confirm the seat." },
];

const DOCUMENTS = [
  "Birth certificate of the student",
  "Transfer certificate from the previous school (Class II onwards)",
  "Report card / progress report of the last class attended",
  "Passport-size photographs of the student",
  "Aadhaar card of the student and parents",
  "Address proof",
];

function ApplyPage() {
  return (
    <SiteLayout>
      <section className="bg-secondary pt-28 pb-14 sm:pt-32">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-primary uppercase">
            Admissions
          </p>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-tight font-semibold text-foreground sm:text-5xl">
            Begin your child's journey with us
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Share a few details about your child and our admissions team will get in touch to guide
            you through the process, answer your questions and arrange a school visit.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={telHref(SCHOOL.phones[0])}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground"
            >
              <Phone className="size-4 text-primary" aria-hidden="true" /> +91 {SCHOOL.phones[0]}
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground"
            >
              <MessageCircle className="size-4 text-primary" aria-hidden="true" /> WhatsApp us
            </a>
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            The admission process
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s) => (
              <li key={s.n} className="rounded-2xl border border-border bg-card p-5">
                <span className="font-serif text-2xl text-accent">{s.n}</span>
                <h3 className="mt-2 text-sm font-bold text-foreground">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="enquiry" className="bg-secondary py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-9">
            <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
              Admission enquiry form
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Submitting this form does not confirm admission; it starts the conversation.
            </p>
            <div className="mt-7">
              <EnquiryForm />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xs font-bold tracking-[0.2em] text-foreground uppercase">
                Documents required
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {DOCUMENTS.map((d) => (
                  <li key={d} className="flex gap-2.5">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                The school office will confirm the exact list applicable to your child's class.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xs font-bold tracking-[0.2em] text-foreground uppercase">
                Fee structure
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                The fee structure for the current academic session is shared by the school office.
                Please call us or submit an enquiry and we will send you the details.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
