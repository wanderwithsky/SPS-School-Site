export interface SiteSettings {
  id: string;
  school_name: string;
  short_name: string;
  motto: string;
  affiliation_text: string;
  email: string;
  phones: string[];
  whatsapp: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  pincode: string;
  admissions_open: boolean;
  admission_banner_text: string;
  facebook_url?: string;
  instagram_url?: string;
  youtube_url?: string;
}

export interface PageSection<T = Record<string, unknown>> {
  id: string;
  page_key: string;
  section_key: string;
  title?: string;
  eyebrow?: string;
  subtitle?: string;
  content: T;
  is_visible: boolean;
  order_index: number;
}

export interface TeacherItem {
  id: string;
  name: string;
  role: string;
  department: string;
  qualification?: string;
  experience?: string;
  bio?: string;
  image_url?: string;
  email?: string;
  order_index: number;
  is_active: boolean;
}

export interface AchievementItem {
  id: string;
  title: string;
  category: string; // 'Academic' | 'Sports' | 'Cultural' | 'Olympiad' | 'School'
  year: string;
  badge?: string;
  description: string;
  image_url?: string;
  order_index: number;
  is_featured: boolean;
}

export interface FeeTierItem {
  id: string;
  category: string;
  class_name: string;
  admission_fee: string;
  tuition_fee: string;
  annual_charges: string;
  term_details?: string;
  notes?: string;
  order_index: number;
}

export interface NoticeItem {
  id: string;
  title: string;
  category: string; // 'Notice' | 'Circular' | 'Event' | 'Exam' | 'Holiday'
  publish_date: string;
  description: string;
  file_url?: string;
  link_url?: string;
  is_pinned: boolean;
  is_active: boolean;
}

export interface AdmissionEnquiryItem {
  id: string;
  student_name: string;
  date_of_birth?: string | null | undefined;
  class_applying_for: string;
  parent_name: string;
  mobile: string;
  email?: string | null | undefined;
  current_school?: string | null | undefined;
  locality?: string | null | undefined;
  message?: string | null | undefined;
  status: "new" | "contacted" | "follow_up" | "visited" | "closed";
  created_at: string;
  updated_at?: string | undefined;
}

export interface HeroSlideItem {
  id: string;
  image: string;
  alt: string;
  fit: "cover" | "contain";
  eyebrow: string;
  title: string;
  description: string;
  cta_label: string;
  cta_link?: string;
  cta_hash?: string;
}

// ---------------- Defaults / Fallbacks ----------------

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  id: "global",
  school_name: "Shandilya Public School",
  short_name: "Shandilya",
  motto: "Listen, Learn & Strive to Shine",
  affiliation_text: "CBSE Affiliated • Pre-Primary to Class XII",
  email: "shandilyaps@rediffmail.com",
  phones: ["8765261262", "9336416244"],
  whatsapp: "918765261262",
  address_line1: "Gayatri Nagar Colony, Garhwaghat Road",
  address_line2: "Samne Ghat, Lanka",
  city: "Varanasi",
  state: "Uttar Pradesh",
  pincode: "221005",
  admissions_open: true,
  admission_banner_text:
    "Admissions Open for Session 2026–27 (Pre-Primary to Class XII) — Enquire Today",
  facebook_url: "https://facebook.com",
  instagram_url: "https://instagram.com",
  youtube_url: "https://youtube.com",
};

export const DEFAULT_HERO_SLIDES: HeroSlideItem[] = [
  {
    id: "1",
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788826061/IMG-20260829-WA0088.jpg",
    alt: "Students and teachers of Shandilya Public School with medals and trophies",
    fit: "cover",
    eyebrow: "Welcome to Shandilya",
    title: "A place to learn and grow.",
    description: "An environment where curiosity and confidence grow together.",
    cta_label: "Explore our school",
    cta_hash: "welcome",
  },
  {
    id: "2",
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788826062/IMG-20260829-WA0009.jpg",
    alt: "Students receiving certificates in front of the school banner",
    fit: "cover",
    eyebrow: "Learning that inspires",
    title: "Every child discovers their potential.",
    description: "Meaningful learning experiences for a brighter future.",
    cta_label: "Explore academics",
    cta_hash: "journey",
  },
  {
    id: "3",
    image:
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1788824476/fcfb3fd3-c2fb-438f-9da1-c921451933bd.jpg",
    alt: "Students practising yoga together in the school courtyard",
    fit: "cover",
    eyebrow: "Play. Perform. Grow.",
    title: "Building confidence beyond the classroom.",
    description: "Sports, yoga and activities that shape character.",
    cta_label: "Campus life",
    cta_hash: "life",
  },
  {
    id: "4",
    image:
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1788927450/Shandilya-Public-School-HeroSection4.jpg",
    alt: "School topper Class XII congratulations poster",
    fit: "contain",
    eyebrow: "Proud achievement",
    title: "Our Toppers. Our Pride.",
    description: "Celebrating the dedication and achievements of our Class XII Commerce students.",
    cta_label: "See achievements",
    cta_link: "/achievements",
  },
  {
    id: "5",
    image:
      "https://res.cloudinary.com/zvlxacfu/image/upload/v1788927450/Shandilya-Public-School-HeroSection5.jpg",
    alt: "CBSE Class XII Science toppers of 2025-26",
    fit: "contain",
    eyebrow: "Class XII Science",
    title: "Curiosity, rewarded.",
    description: "Our Science stream achievers of the 2025-26 CBSE board examinations.",
    cta_label: "See achievements",
    cta_link: "/achievements",
  },
  {
    id: "6",
    image: "https://res.cloudinary.com/zvlxacfu/image/upload/v1788826061/IMG-20260829-WA0010.jpg",
    alt: "Admissions open for 2026-27 at Shandilya Public School",
    fit: "contain",
    eyebrow: "Admissions open 2026-27",
    title: "Begin your child's journey with us.",
    description: "Playgroup to Class IX and XI — limited seats, enquire today.",
    cta_label: "Apply now",
    cta_link: "/admissions/apply",
  },
];

export const DEFAULT_HERO_CONTENT = {
  headline: "Where Potential Meets Purpose",
  subheadline:
    "Shandilya Public School nurtures inquisitive minds, strong character, and high academic excellence from Pre-Primary through Senior Secondary in Samne Ghat, Varanasi.",
  primary_cta_text: "Enquire for Admission",
  primary_cta_link: "/admissions/apply",
  secondary_cta_text: "Explore Academics",
  secondary_cta_link: "/about",
  badge_text: "CBSE Affiliated (Pre-Primary to Class XII)",
  stats: [
    { label: "CBSE Curriculum", value: "Class Pre-Nursery to XII" },
    { label: "Streams Offered", value: "Science, Commerce & Arts" },
    { label: "Teacher Ratio", value: "1:25 Focused Care" },
  ],
};

export const DEFAULT_WELCOME_CONTENT = {
  eyebrow: "Welcome Message",
  title: "A Message from Our Leadership",
  quote:
    "At Shandilya Public School, education extends far beyond textbooks. We are dedicated to nurturing responsible, creative, and confident citizens equipped for tomorrow's global challenges.",
  author_name: "Er. Arvind Kr. Tiwari",
  author_title: "Manager, Shandilya Public School",
  image_url: "",
  points: [
    "Holistic development combining academic rigor with moral values",
    "State-of-the-art science labs, digital classrooms, and extensive library",
    "Individualized attention with supportive faculty mentoring",
  ],
};

export const DEFAULT_TRUST_STRIP = [
  "CBSE Affiliated",
  "Pre-Primary to Class XII",
  "Science • Commerce • Humanities",
  "Varanasi, Uttar Pradesh",
  "100% Board Result Record",
  "Safe GPS Transport",
];

export const DEFAULT_WHY_US_ITEMS = [
  {
    id: "1",
    title: "Academic Excellence",
    description:
      "Rigorous and holistic curriculum designed to foster critical thinking and prepare students for competitive national examinations.",
    icon: "BookOpen",
  },
  {
    id: "2",
    title: "Practical Learning & Labs",
    description:
      "Well-equipped Physics, Chemistry, Biology, and Computer Science laboratories for active hands-on experimentation.",
    icon: "FlaskConical",
  },
  {
    id: "3",
    title: "Art, Music & Culture",
    description:
      "Creative studios for performing arts, instrumental music, vocal training, and painting to nurture artistic passions.",
    icon: "Palette",
  },
  {
    id: "4",
    title: "Sports & Physical Education",
    description:
      "Comprehensive athletic curriculum with cricket, football, basketball, yoga, and gymnastics for physical vitality.",
    icon: "Trophy",
  },
  {
    id: "5",
    title: "Holistic Character Growth",
    description:
      "Value-centric schooling instilling integrity, leadership, empathy, and environmental stewardship.",
    icon: "Sprout",
  },
];

export const DEFAULT_FACILITIES_ITEMS = [
  {
    id: "1",
    name: "Composite Science & Tech Labs",
    category: "Academics",
    desc: "Fully equipped Physics, Chemistry, and Biology laboratories enabling hands-on scientific inquiry.",
  },
  {
    id: "2",
    name: "Digital Smart Classrooms",
    category: "Technology",
    desc: "Interactive audio-visual learning spaces for dynamic, immersive pedagogical delivery.",
  },
  {
    id: "3",
    name: "Resource-Rich Central Library",
    category: "Academics",
    desc: "Vast collection of reference volumes, literature, journals, and digital periodicals.",
  },
  {
    id: "4",
    name: "Sports Complex & Playgrounds",
    category: "Sports",
    desc: "Spacious grounds for cricket, football, basketball, badminton, yoga, and athletic training.",
  },
  {
    id: "5",
    name: "Safe GPS-Tracked Transport",
    category: "Safety",
    desc: "Dedicated fleet of buses and vans covering major routes across Lanka, Samne Ghat, and Varanasi.",
  },
  {
    id: "6",
    name: "CCTV Monitored Secure Campus",
    category: "Safety",
    desc: "24/7 security surveillance, disciplined campus environment, and hygienic RO water facilities.",
  },
];

export const DEFAULT_LIFE_AT_SCHOOL = [
  { id: "1", title: "Academics & Smart Classrooms", desc: "Interactive smart learning sessions." },
  {
    id: "2",
    title: "Sports & Athletics",
    desc: "Cricket, football, badminton & athletics training.",
  },
  {
    id: "3",
    title: "Cultural & Arts Activities",
    desc: "Music, dance, debates, and drama festivals.",
  },
  {
    id: "4",
    title: "National Celebrations",
    desc: "Independence Day, Republic Day & Annual Functions.",
  },
  {
    id: "5",
    title: "Inter-School Competitions",
    desc: "Science exhibitions, quizzes, and Olympiads.",
  },
  {
    id: "6",
    title: "Student Club Activities",
    desc: "Eco-club, coding society, and literary guild.",
  },
];

export const DEFAULT_ABOUT_IDENTITY = {
  vision:
    "To be a leading center of educational excellence that empowers students with critical intellect, compassionate hearts, and moral resilience.",
  mission:
    "Providing balanced, inclusive, and future-ready education that harmonizes academic rigor with character building, creative expression, and social responsibility.",
  core_values: [
    "Integrity & Truthfulness",
    "Respect for Diversity & Inclusivity",
    "Academic Discipline & Curiosity",
    "Empathy, Care & Community Service",
  ],
};

export const DEFAULT_ABOUT_PHILOSOPHY = [
  {
    id: "1",
    title: "Foundational Care (Pre-Primary)",
    desc: "Activity-based, play-centric learning developing early literacy, numeracy, and social-emotional warmth.",
  },
  {
    id: "2",
    title: "Exploration & Mastery (Primary to Middle)",
    desc: "Concept-driven pedagogy fostering problem solving, language command, and scientific curiosity.",
  },
  {
    id: "3",
    title: "Scholastic Rigor (Secondary & Senior Secondary)",
    desc: "Targeted CBSE board exam prep, practical lab proficiency, and career stream guidance.",
  },
];

export const DEFAULT_TEACHERS: TeacherItem[] = [
  {
    id: "1",
    name: "Dr. R. K. Sharma",
    role: "Principal & Academic Director",
    department: "Administration & Leadership",
    qualification: "Ph.D. in Education, M.Sc. Physics",
    experience: "24+ Years",
    bio: "Dedicated academician guiding students toward scholastic excellence and character building.",
    order_index: 1,
    is_active: true,
  },
  {
    id: "2",
    name: "Mrs. Sunita Pandey",
    role: "Headmistress (Primary Wing)",
    department: "Primary Section",
    qualification: "M.A. English, B.Ed.",
    experience: "16+ Years",
    bio: "Specializes in early childhood foundational learning and innovative activity-based pedagogy.",
    order_index: 2,
    is_active: true,
  },
  {
    id: "3",
    name: "Mr. Amit Verma",
    role: "Senior PGT Mathematics",
    department: "Mathematics",
    qualification: "M.Sc. Mathematics, B.Ed.",
    experience: "12+ Years",
    bio: "Mentors Class XI & XII students for CBSE Boards and competitive exams with problem-solving mastery.",
    order_index: 3,
    is_active: true,
  },
  {
    id: "4",
    name: "Dr. Ananya Mishra",
    role: "PGT Chemistry & Lab Coordinator",
    department: "Science",
    qualification: "Ph.D. Chemistry, M.Sc., B.Ed.",
    experience: "10+ Years",
    bio: "Passionate about experiential science and inspiring young researchers through laboratory work.",
    order_index: 4,
    is_active: true,
  },
  {
    id: "5",
    name: "Mr. Rajesh Srivastava",
    role: "PGT Commerce & Economics",
    department: "Commerce",
    qualification: "M.Com, M.A. Economics, B.Ed.",
    experience: "14+ Years",
    bio: "Expert in Accountancy and Business Studies with practical financial literacy emphasis.",
    order_index: 5,
    is_active: true,
  },
  {
    id: "6",
    name: "Ms. Priyanka Singh",
    role: "TGT Computer Science & AI",
    department: "Technology",
    qualification: "MCA, B.Ed.",
    experience: "8+ Years",
    bio: "Fosters coding, computational thinking, and web design skills for middle and secondary schoolers.",
    order_index: 6,
    is_active: true,
  },
];

export const DEFAULT_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "1",
    title: "100% Pass Result in Class X & XII CBSE Board",
    category: "Academic",
    year: "2024-25",
    badge: "Board Milestone",
    description:
      "Consistent academic triumph with over 35% of students securing 90%+ distinctions in CBSE exams.",
    order_index: 1,
    is_featured: true,
  },
  {
    id: "2",
    title: "Inter-School Science & Robotics Championship",
    category: "Olympiad",
    year: "2025",
    badge: "1st Place Gold",
    description:
      "SPS student innovation team bagged 1st prize in the Varanasi Regional Inter-School Robotics Fair.",
    order_index: 2,
    is_featured: true,
  },
  {
    id: "3",
    title: "District Athletic & Football Championship",
    category: "Sports",
    year: "2024",
    badge: "Champions Trophy",
    description:
      "U-17 Boys football squad emerged victorious in the District Inter-School Tournament.",
    order_index: 3,
    is_featured: true,
  },
  {
    id: "4",
    title: "National Hindi & English Debate Trophy",
    category: "Cultural",
    year: "2025",
    badge: "Best Speaker Award",
    description:
      "Demonstrated exceptional eloquence and critical oratory skills at the State Debate Colloquium.",
    order_index: 4,
    is_featured: true,
  },
];

export const DEFAULT_FEE_TIERS: FeeTierItem[] = [
  {
    id: "1",
    category: "Pre-Primary Wing",
    class_name: "Pre-Nursery, Nursery, LKG, UKG",
    admission_fee: "₹ 5,000",
    tuition_fee: "₹ 1,800 / month",
    annual_charges: "₹ 3,500 / year",
    term_details: "Payable quarterly or monthly",
    notes: "Includes activity kit and foundational learning supplies.",
    order_index: 1,
  },
  {
    id: "2",
    category: "Primary Wing",
    class_name: "Class I to Class V",
    admission_fee: "₹ 6,500",
    tuition_fee: "₹ 2,200 / month",
    annual_charges: "₹ 4,200 / year",
    term_details: "Payable quarterly",
    notes: "Covers computer labs, arts, and physical education access.",
    order_index: 2,
  },
  {
    id: "3",
    category: "Middle Wing",
    class_name: "Class VI to Class VIII",
    admission_fee: "₹ 8,000",
    tuition_fee: "₹ 2,600 / month",
    annual_charges: "₹ 4,800 / year",
    term_details: "Payable quarterly",
    notes: "Covers integrated science labs, library, and sports coaching.",
    order_index: 3,
  },
  {
    id: "4",
    category: "Secondary Wing",
    class_name: "Class IX & Class X",
    admission_fee: "₹ 10,000",
    tuition_fee: "₹ 3,100 / month",
    annual_charges: "₹ 5,500 / year",
    term_details: "Payable quarterly",
    notes: "Includes CBSE Board preparation resources and practical exams.",
    order_index: 4,
  },
  {
    id: "5",
    category: "Senior Secondary (Science)",
    class_name: "Class XI & Class XII (PCM / PCB)",
    admission_fee: "₹ 12,000",
    tuition_fee: "₹ 3,800 / month",
    annual_charges: "₹ 6,500 / year",
    term_details: "Payable quarterly",
    notes: "Includes advanced Physics, Chemistry, Biology and Math lab charges.",
    order_index: 5,
  },
  {
    id: "6",
    category: "Senior Secondary (Commerce & Arts)",
    class_name: "Class XI & Class XII (Commerce / Humanities)",
    admission_fee: "₹ 11,000",
    tuition_fee: "₹ 3,400 / month",
    annual_charges: "₹ 6,000 / year",
    term_details: "Payable quarterly",
    notes: "Includes economics, accountancy projects, and humanities workshops.",
    order_index: 6,
  },
];

export const DEFAULT_NOTICES: NoticeItem[] = [
  {
    id: "1",
    title: "Admissions Open for Session 2026–27 (Pre-Primary to Class XII)",
    category: "Notice",
    publish_date: "2026-03-01",
    description:
      "Registration and admission enquiry forms are now available online and at the school reception desk between 8:30 AM to 2:00 PM.",
    is_pinned: true,
    is_active: true,
  },
  {
    id: "2",
    title: "Annual Sports & Cultural Meet 2026 Schedule",
    category: "Event",
    publish_date: "2026-03-10",
    description:
      "The Grand Annual Sports and Athletics Day will be conducted across 3 days with inter-house track, field, and cultural performances.",
    is_pinned: true,
    is_active: true,
  },
  {
    id: "3",
    title: "Parent-Teacher Meeting (PTM) for Term Assessment",
    category: "Circular",
    publish_date: "2026-03-15",
    description:
      "Parents are cordially invited to interact with class mentors to review student performance and holistic progress.",
    is_pinned: false,
    is_active: true,
  },
];

export const DEFAULT_FAQS = [
  {
    id: "1",
    q: "What is the admission procedure at Shandilya Public School?",
    a: "Parents can fill out the online admission enquiry form on this website or visit the campus reception. An interaction with the student and parents is scheduled, followed by document submission and fee payment to confirm admission.",
  },
  {
    id: "2",
    q: "Which curriculum does Shandilya Public School follow?",
    a: "We follow the CBSE (Central Board of Secondary Education, New Delhi) curriculum from Pre-Primary through Senior Secondary (Class XII), with Science, Commerce, and Humanities streams.",
  },
  {
    id: "3",
    q: "Is school transport facility available across Varanasi?",
    a: "Yes, we provide safe, GPS-monitored school buses and vans with trained drivers and attendants covering Lanka, Samne Ghat, Assi, BHU perimeter, and neighboring residential sectors.",
  },
  {
    id: "4",
    q: "What is the student-to-teacher ratio in classrooms?",
    a: "We maintain a student-to-teacher ratio of approximately 25:1 to ensure that every child receives individualized attention, care, and guidance.",
  },
  {
    id: "5",
    q: "What co-curricular and sports facilities are offered?",
    a: "Students participate in competitive cricket, football, basketball, badminton, athletics, yoga, dance, vocal & instrumental music, fine arts, debate clubs, and robotics.",
  },
];

export const DEFAULT_TESTIMONIALS = [
  {
    id: "1",
    quote:
      "Enrolling our son at Shandilya was the best decision. The teachers are approachable, caring, and balance academic discipline with moral grounding.",
    author: "Dr. Arvind Tripathi",
    role: "Parent of Class VIII Student",
  },
  {
    id: "2",
    quote:
      "The individual attention in science labs and regular doubt-clearing sessions helped my daughter score 96% in her Class X CBSE examinations.",
    author: "Mrs. Meenakshi Srivastava",
    role: "Parent of Class XI Student",
  },
  {
    id: "3",
    quote:
      "The school provides a positive environment where sports, arts, and character development go hand in hand with textbook learning.",
    author: "Mr. Rajesh Kumar Verma",
    role: "Parent of Class V Student",
  },
];
