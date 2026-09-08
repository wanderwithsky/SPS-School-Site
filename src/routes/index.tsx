import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/home/Hero";
import {
  TrustStrip,
  Welcome,
  WhyShandilya,
  Journey,
  Facilities,
  LifeAtSchool,
  AdmissionsCta,
  Events,
  Notices,
  Achievements,
  Testimonials,
  Faq,
  LocationContact,
} from "@/components/home/Sections";
import { SCHOOL } from "@/lib/school";

const TITLE = "Shandilya Public School — CBSE School in Samne Ghat, Varanasi";
const DESC =
  "Shandilya Public School, Varanasi: a CBSE-affiliated co-educational school from Pre-Primary to Class XII with Science, Commerce and Humanities streams. Admission enquiries open.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: SCHOOL.name,
          slogan: SCHOOL.motto,
          description: DESC,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Gayatri Nagar Colony, Garhwaghat Road, Samne Ghat, Lanka",
            addressLocality: "Varanasi",
            addressRegion: "Uttar Pradesh",
            addressCountry: "IN",
          },
          telephone: SCHOOL.phones.map((p) => `+91${p}`),
          email: SCHOOL.email,
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout overHero>
      <Hero />
      <TrustStrip />
      <Welcome />
      <WhyShandilya />
      <Journey />
      <Facilities />
      <LifeAtSchool />
      <AdmissionsCta />
      <Events />
      <Notices />
      <Achievements />
      <Testimonials />
      <Faq />
      <LocationContact />
    </SiteLayout>
  );
}
