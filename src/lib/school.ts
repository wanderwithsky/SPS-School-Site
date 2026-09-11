export const SCHOOL = {
  name: "Shandilya Public School",
  shortName: "Shandilya",
  motto: "Listen, Learn & Strive to Shine",
  addressLines: [
    "Gayatri Nagar Colony, Garhwaghat Road",
    "Samne Ghat, Lanka, Varanasi",
    "Uttar Pradesh, India",
  ],
  addressOneLine:
    "Gayatri Nagar Colony, Garhwaghat Road, Samne Ghat, Lanka, Varanasi, Uttar Pradesh, India",
  locality: "Varanasi",
  region: "Uttar Pradesh",
  country: "IN",
  phones: ["8765261262", "9336416244"],
  whatsapp: "918765261262",
  email: "shandilyaps@rediffmail.com",
  mapsQuery: "Shandilya Public School, Samne Ghat, Lanka, Varanasi",
} as const;

export const telHref = (phone: string) => `tel:+91${phone}`;
export const waHref = `https://wa.me/${SCHOOL.whatsapp}?text=${encodeURIComponent(
  "Hello, I would like to know more about admissions at Shandilya Public School.",
)}`;
export const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  SCHOOL.mapsQuery,
)}`;
export const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  SCHOOL.mapsQuery,
)}&output=embed`;

export const CLASS_OPTIONS = [
  "Pre-Primary",
  "Class I",
  "Class II",
  "Class III",
  "Class IV",
  "Class V",
  "Class VI",
  "Class VII",
  "Class VIII",
  "Class IX",
  "Class X",
  "Class XI — Science",
  "Class XI — Commerce",
  "Class XI — Humanities",
  "Class XII",
];

export const NAV: {
  label: string;
  to?: string;
  hash?: string;
  items?: { label: string; to: string; hash?: string }[];
}[] = [
  { label: "Home", to: "/" },
  {
    label: "About",
    items: [
      { label: "Our School", to: "/about" },
      { label: "Vision & Mission", to: "/", hash: "welcome" },
      { label: "Achievements", to: "/achievements" },
      { label: "Events & Activities", to: "/events" },
    ],
  },
  {
    label: "Academics",
    items: [
      { label: "Academic Journey", to: "/", hash: "journey" },
      { label: "Campus & Facilities", to: "/", hash: "facilities" },
      { label: "Fees Structure", to: "/fee-structure" },
    ],
  },
  {
    label: "Admissions",
    items: [
      { label: "Admission Process", to: "/admissions/apply" },
      { label: "FAQs", to: "/", hash: "faq" },
      { label: "Apply Now", to: "/admissions/apply" },
    ],
  },
  {
    label: "Teachers",
    to: "/teachers",
  },
  { label: "Contact", to: "/contact" },
];
