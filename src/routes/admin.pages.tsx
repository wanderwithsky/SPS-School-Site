import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Layers,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  MessageSquare,
  Building,
  GraduationCap,
  Quote,
  Sliders,
  Compass,
  Image,
  BookOpen,
} from "lucide-react";
import { usePageSection } from "@/hooks/useCMS";
import {
  DEFAULT_HERO_CONTENT,
  DEFAULT_HERO_SLIDES,
  DEFAULT_WELCOME_CONTENT,
  DEFAULT_WHY_US_ITEMS,
  DEFAULT_FACILITIES_ITEMS,
  DEFAULT_LIFE_AT_SCHOOL,
  DEFAULT_ABOUT_PHILOSOPHY,
  DEFAULT_FAQS,
  DEFAULT_TESTIMONIALS,
  HeroSlideItem,
} from "@/lib/cms-types";

export const Route = createFileRoute("/admin/pages")({
  component: AdminPagesCMS,
});

function AdminPagesCMS() {
  const [activeTab, setActiveTab] = useState<
    "slides" | "welcome" | "why_us" | "facilities" | "life" | "philosophy" | "faqs" | "testimonials"
  >("slides");
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Hook subscriptions
  const heroSlidesCMS = usePageSection("home", "hero_slides", DEFAULT_HERO_SLIDES);
  const welcomeCMS = usePageSection("home", "welcome", DEFAULT_WELCOME_CONTENT);
  const whyUsCMS = usePageSection("home", "why_us", DEFAULT_WHY_US_ITEMS);
  const facilitiesCMS = usePageSection("home", "facilities", DEFAULT_FACILITIES_ITEMS);
  const lifeCMS = usePageSection("home", "life_at_school", DEFAULT_LIFE_AT_SCHOOL);
  const philosophyCMS = usePageSection("about", "philosophy", DEFAULT_ABOUT_PHILOSOPHY);
  const faqsCMS = usePageSection("home", "faqs", DEFAULT_FAQS);
  const testimonialsCMS = usePageSection("home", "testimonials", DEFAULT_TESTIMONIALS);

  // Local state buffers for editing
  const [slidesList, setSlidesList] = useState<HeroSlideItem[]>(
    heroSlidesCMS.data || DEFAULT_HERO_SLIDES,
  );
  const [welcomeForm, setWelcomeForm] = useState(welcomeCMS.data || DEFAULT_WELCOME_CONTENT);
  const [whyUsList, setWhyUsList] = useState(whyUsCMS.data || DEFAULT_WHY_US_ITEMS);
  const [facilitiesList, setFacilitiesList] = useState(
    facilitiesCMS.data || DEFAULT_FACILITIES_ITEMS,
  );
  const [lifeList, setLifeList] = useState(lifeCMS.data || DEFAULT_LIFE_AT_SCHOOL);
  const [philosophyList, setPhilosophyList] = useState(
    philosophyCMS.data || DEFAULT_ABOUT_PHILOSOPHY,
  );
  const [faqsList, setFaqsList] = useState(faqsCMS.data || DEFAULT_FAQS);
  const [testimonialsList, setTestimonialsList] = useState(
    testimonialsCMS.data || DEFAULT_TESTIMONIALS,
  );

  const notifySaved = (msg: string) => {
    setSaveSuccess(msg);
    setTimeout(() => setSaveSuccess(null), 3500);
  };

  // Save Handlers
  const handleSaveSlides = async () => {
    await heroSlidesCMS.saveSection(slidesList, "Home Hero Slider");
    notifySaved("Hero slides updated and pushed live in real-time!");
  };

  const handleSaveWelcome = async () => {
    await welcomeCMS.saveSection(welcomeForm, "Home Welcome Message");
    notifySaved("Welcome message saved in real-time!");
  };

  const handleSaveWhyUs = async () => {
    await whyUsCMS.saveSection(whyUsList, "Why Choose Us Cards");
    notifySaved("Why Choose Us cards saved in real-time!");
  };

  const handleSaveFacilities = async () => {
    await facilitiesCMS.saveSection(facilitiesList, "Campus Facilities");
    notifySaved("Facilities cards saved in real-time!");
  };

  const handleSaveLife = async () => {
    await lifeCMS.saveSection(lifeList, "Life at School Cards");
    notifySaved("Life at School cards saved in real-time!");
  };

  const handleSavePhilosophy = async () => {
    await philosophyCMS.saveSection(philosophyList, "Educational Philosophy");
    notifySaved("Philosophy pillars saved in real-time!");
  };

  const handleSaveFaqs = async () => {
    await faqsCMS.saveSection(faqsList, "School FAQs");
    notifySaved("FAQs saved in real-time!");
  };

  const handleSaveTestimonials = async () => {
    await testimonialsCMS.saveSection(testimonialsList, "Parent Testimonials");
    notifySaved("Testimonials saved in real-time!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">
            Page Content &amp; Sections CMS
          </h1>
          <p className="text-sm text-slate-400">
            Edit live texts, headings, hero slides, cards, FAQs, and multimedia elements across all
            web pages in real-time
          </p>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
            <CheckCircle2 className="h-4 w-4" />
            <span>{saveSuccess}</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {(
          [
            { key: "slides", label: "Hero Slider", icon: Sparkles },
            { key: "welcome", label: "Welcome Section", icon: BookOpen },
            { key: "why_us", label: "Why Choose Us", icon: CheckCircle2 },
            { key: "facilities", label: "Facilities", icon: Building },
            { key: "life", label: "Life at School", icon: Image },
            { key: "philosophy", label: "Philosophy & About", icon: Compass },
            { key: "faqs", label: "School FAQs", icon: HelpCircle },
            { key: "testimonials", label: "Testimonials", icon: Quote },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                isActive
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/30"
                  : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: HERO SLIDER */}
      {activeTab === "slides" && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="font-serif text-lg font-bold text-white">Hero Slider Banners</h2>
              <p className="text-xs text-slate-400">
                Add, edit, or reorder the visual slides, headings, and CTAs appearing on the
                homepage header.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setSlidesList([
                    ...slidesList,
                    {
                      id: `${Date.now()}`,
                      image:
                        "https://res.cloudinary.com/zvlxacfu/image/upload/v1788826061/IMG-20260829-WA0088.jpg",
                      alt: "New slide description",
                      fit: "cover",
                      eyebrow: "Welcome to Shandilya",
                      title: "New Headline Title",
                      description: "Enter your slide description here.",
                      cta_label: "Explore Now",
                      cta_link: "/about",
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 border border-slate-700 hover:bg-slate-750"
              >
                <Plus className="h-4 w-4 text-emerald-400" />
                Add Slide
              </button>
              <button
                onClick={handleSaveSlides}
                disabled={heroSlidesCMS.isSaving}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-all disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>Save Slides</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {slidesList.map((slide, idx) => (
              <div
                key={slide.id || idx}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4 relative"
              >
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-xs font-bold text-emerald-400">Slide #{idx + 1}</span>
                  <button
                    onClick={() => setSlidesList(slidesList.filter((_, i) => i !== idx))}
                    className="p-1 text-slate-500 hover:text-red-400"
                    title="Remove Slide"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase">
                    Slide Image URL
                  </label>
                  <input
                    type="url"
                    value={slide.image}
                    onChange={(e) => {
                      const updated = [...slidesList];
                      if (updated[idx]) {
                        updated[idx]!.image = e.target.value;
                        setSlidesList(updated);
                      }
                    }}
                    placeholder="https://..."
                    className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-xs text-white focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 uppercase">
                      Eyebrow Pill
                    </label>
                    <input
                      type="text"
                      value={slide.eyebrow}
                      onChange={(e) => {
                        const updated = [...slidesList];
                        if (updated[idx]) {
                          updated[idx]!.eyebrow = e.target.value;
                          setSlidesList(updated);
                        }
                      }}
                      className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 uppercase">
                      Slide Title
                    </label>
                    <input
                      type="text"
                      value={slide.title}
                      onChange={(e) => {
                        const updated = [...slidesList];
                        if (updated[idx]) {
                          updated[idx]!.title = e.target.value;
                          setSlidesList(updated);
                        }
                      }}
                      className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase">
                    Description Subtitle
                  </label>
                  <textarea
                    rows={2}
                    value={slide.description}
                    onChange={(e) => {
                      const updated = [...slidesList];
                      if (updated[idx]) {
                        updated[idx]!.description = e.target.value;
                        setSlidesList(updated);
                      }
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 uppercase">
                      Button Label
                    </label>
                    <input
                      type="text"
                      value={slide.cta_label}
                      onChange={(e) => {
                        const updated = [...slidesList];
                        if (updated[idx]) {
                          updated[idx]!.cta_label = e.target.value;
                          setSlidesList(updated);
                        }
                      }}
                      className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 uppercase">
                      Button Link
                    </label>
                    <input
                      type="text"
                      value={slide.cta_link || slide.cta_hash || ""}
                      onChange={(e) => {
                        const updated = [...slidesList];
                        if (updated[idx]) {
                          updated[idx]!.cta_link = e.target.value;
                          setSlidesList(updated);
                        }
                      }}
                      placeholder="/admissions/apply"
                      className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: WELCOME SECTION */}
      {activeTab === "welcome" && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="font-serif text-lg font-bold text-white">
                Welcome &amp; Leadership Section
              </h2>
              <p className="text-xs text-slate-400">
                Controls the message from the Principal / Manager on the Home page.
              </p>
            </div>
            <button
              onClick={handleSaveWelcome}
              disabled={welcomeCMS.isSaving}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-all disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{welcomeCMS.isSaving ? "Saving..." : "Save & Publish"}</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Section Eyebrow
                </label>
                <input
                  type="text"
                  value={welcomeForm.eyebrow || ""}
                  onChange={(e) => setWelcomeForm({ ...welcomeForm, eyebrow: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Section Title
                </label>
                <input
                  type="text"
                  value={welcomeForm.title || ""}
                  onChange={(e) => setWelcomeForm({ ...welcomeForm, title: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Leadership Quote / Message
              </label>
              <textarea
                rows={4}
                value={welcomeForm.quote || ""}
                onChange={(e) => setWelcomeForm({ ...welcomeForm, quote: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Author Name
                </label>
                <input
                  type="text"
                  value={welcomeForm.author_name || ""}
                  onChange={(e) => setWelcomeForm({ ...welcomeForm, author_name: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Author Title
                </label>
                <input
                  type="text"
                  value={welcomeForm.author_title || ""}
                  onChange={(e) => setWelcomeForm({ ...welcomeForm, author_title: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WHY CHOOSE US */}
      {activeTab === "why_us" && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="font-serif text-lg font-bold text-white">
                Why Choose Shandilya (5 Pillars)
              </h2>
              <p className="text-xs text-slate-400">
                Add, edit, or remove the core value propositions displayed on the Home page.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setWhyUsList([
                    ...whyUsList,
                    {
                      id: `${Date.now()}`,
                      title: "New Growth Pillar",
                      description: "Enter pedagogical excellence or sports description here.",
                      icon: "BookOpen",
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 border border-slate-700 hover:bg-slate-750"
              >
                <Plus className="h-4 w-4 text-emerald-400" />
                Add Card
              </button>
              <button
                onClick={handleSaveWhyUs}
                disabled={whyUsCMS.isSaving}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-all disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>Save Cards</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyUsList.map((card, idx) => (
              <div
                key={card.id || idx}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">Card #{idx + 1}</span>
                  <button
                    onClick={() => setWhyUsList(whyUsList.filter((_, i) => i !== idx))}
                    className="p-1 text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase">
                    Title
                  </label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => {
                      const updated = [...whyUsList];
                      if (updated[idx]) {
                        updated[idx]!.title = e.target.value;
                        setWhyUsList(updated);
                      }
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={card.description}
                    onChange={(e) => {
                      const updated = [...whyUsList];
                      if (updated[idx]) {
                        updated[idx]!.description = e.target.value;
                        setWhyUsList(updated);
                      }
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: FACILITIES */}
      {activeTab === "facilities" && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="font-serif text-lg font-bold text-white">Campus Facilities Cards</h2>
              <p className="text-xs text-slate-400">Manage modern campus infrastructure cards.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setFacilitiesList([
                    ...facilitiesList,
                    {
                      id: `${Date.now()}`,
                      name: "New Campus Facility",
                      category: "Academics",
                      desc: "Details about modern lab, library, sports ground, or transport.",
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 border border-slate-700 hover:bg-slate-750"
              >
                <Plus className="h-4 w-4 text-emerald-400" />
                Add Facility
              </button>
              <button
                onClick={handleSaveFacilities}
                disabled={facilitiesCMS.isSaving}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-all disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>Save Facilities</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {facilitiesList.map((fac, idx) => (
              <div
                key={fac.id || idx}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">Facility #{idx + 1}</span>
                  <button
                    onClick={() => setFacilitiesList(facilitiesList.filter((_, i) => i !== idx))}
                    className="p-1 text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase">
                    Facility Name
                  </label>
                  <input
                    type="text"
                    value={fac.name}
                    onChange={(e) => {
                      const updated = [...facilitiesList];
                      if (updated[idx]) {
                        updated[idx]!.name = e.target.value;
                        setFacilitiesList(updated);
                      }
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase">
                    Category
                  </label>
                  <input
                    type="text"
                    value={fac.category}
                    onChange={(e) => {
                      const updated = [...facilitiesList];
                      if (updated[idx]) {
                        updated[idx]!.category = e.target.value;
                        setFacilitiesList(updated);
                      }
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={fac.desc}
                    onChange={(e) => {
                      const updated = [...facilitiesList];
                      if (updated[idx]) {
                        updated[idx]!.desc = e.target.value;
                        setFacilitiesList(updated);
                      }
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: LIFE AT SCHOOL */}
      {activeTab === "life" && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="font-serif text-lg font-bold text-white">Life at School Activities</h2>
              <p className="text-xs text-slate-400">
                Manage co-curricular, sports, celebrations, and cultural activity highlights.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setLifeList([
                    ...lifeList,
                    {
                      id: `${Date.now()}`,
                      title: "New Student Activity",
                      desc: "Details about activities, clubs, celebrations.",
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 border border-slate-700 hover:bg-slate-750"
              >
                <Plus className="h-4 w-4 text-emerald-400" />
                Add Item
              </button>
              <button
                onClick={handleSaveLife}
                disabled={lifeCMS.isSaving}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-all disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>Save Life at School</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lifeList.map((item, idx) => (
              <div
                key={item.id || idx}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">Activity #{idx + 1}</span>
                  <button
                    onClick={() => setLifeList(lifeList.filter((_, i) => i !== idx))}
                    className="p-1 text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase">
                    Title
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...lifeList];
                      if (updated[idx]) {
                        updated[idx]!.title = e.target.value;
                        setLifeList(updated);
                      }
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={item.desc}
                    onChange={(e) => {
                      const updated = [...lifeList];
                      if (updated[idx]) {
                        updated[idx]!.desc = e.target.value;
                        setLifeList(updated);
                      }
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: PHILOSOPHY */}
      {activeTab === "philosophy" && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="font-serif text-lg font-bold text-white">
                Educational Philosophy &amp; Stages
              </h2>
              <p className="text-xs text-slate-400">
                Manage foundational learning, scholastic mastery, and pedagogical philosophy
                pillars.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setPhilosophyList([
                    ...philosophyList,
                    {
                      id: `${Date.now()}`,
                      title: "New Stage / Pillar",
                      desc: "Details about stage learning methodology.",
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 border border-slate-700 hover:bg-slate-750"
              >
                <Plus className="h-4 w-4 text-emerald-400" />
                Add Pillar
              </button>
              <button
                onClick={handleSavePhilosophy}
                disabled={philosophyCMS.isSaving}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-all disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>Save Philosophy</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {philosophyList.map((p, idx) => (
              <div
                key={p.id || idx}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">Pillar #{idx + 1}</span>
                  <button
                    onClick={() => setPhilosophyList(philosophyList.filter((_, i) => i !== idx))}
                    className="p-1 text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase">
                    Pillar Title
                  </label>
                  <input
                    type="text"
                    value={p.title}
                    onChange={(e) => {
                      const updated = [...philosophyList];
                      if (updated[idx]) {
                        updated[idx]!.title = e.target.value;
                        setPhilosophyList(updated);
                      }
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={p.desc}
                    onChange={(e) => {
                      const updated = [...philosophyList];
                      if (updated[idx]) {
                        updated[idx]!.desc = e.target.value;
                        setPhilosophyList(updated);
                      }
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: FAQS */}
      {activeTab === "faqs" && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="font-serif text-lg font-bold text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-slate-400">
                Add or edit questions and answers displayed in the accordion.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setFaqsList([
                    ...faqsList,
                    {
                      id: `${Date.now()}`,
                      q: "New School Question?",
                      a: "Clear and helpful answer for parents and students.",
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 border border-slate-700 hover:bg-slate-750"
              >
                <Plus className="h-4 w-4 text-emerald-400" />
                Add FAQ
              </button>
              <button
                onClick={handleSaveFaqs}
                disabled={faqsCMS.isSaving}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-all disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>Save FAQs</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {faqsList.map((faq, idx) => (
              <div
                key={faq.id || idx}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">Question #{idx + 1}</span>
                  <button
                    onClick={() => setFaqsList(faqsList.filter((_, i) => i !== idx))}
                    className="p-1 text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase">
                    Question
                  </label>
                  <input
                    type="text"
                    value={faq.q}
                    onChange={(e) => {
                      const updated = [...faqsList];
                      if (updated[idx]) {
                        updated[idx]!.q = e.target.value;
                        setFaqsList(updated);
                      }
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase">
                    Answer
                  </label>
                  <textarea
                    rows={3}
                    value={faq.a}
                    onChange={(e) => {
                      const updated = [...faqsList];
                      if (updated[idx]) {
                        updated[idx]!.a = e.target.value;
                        setFaqsList(updated);
                      }
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: TESTIMONIALS */}
      {activeTab === "testimonials" && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="font-serif text-lg font-bold text-white">
                Parent &amp; Student Testimonials
              </h2>
              <p className="text-xs text-slate-400">
                Manage real parent reviews and student feedback.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setTestimonialsList([
                    ...testimonialsList,
                    {
                      id: `${Date.now()}`,
                      quote:
                        "Shandilya Public School has provided an exceptional environment for our child.",
                      author: "Parent Name",
                      role: "Parent of Class X Student",
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 border border-slate-700 hover:bg-slate-750"
              >
                <Plus className="h-4 w-4 text-emerald-400" />
                Add Testimonial
              </button>
              <button
                onClick={handleSaveTestimonials}
                disabled={testimonialsCMS.isSaving}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-all disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>Save Testimonials</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {testimonialsList.map((test, idx) => (
              <div
                key={test.id || idx}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">Testimonial #{idx + 1}</span>
                  <button
                    onClick={() =>
                      setTestimonialsList(testimonialsList.filter((_, i) => i !== idx))
                    }
                    className="p-1 text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase">
                    Quote Review
                  </label>
                  <textarea
                    rows={3}
                    value={test.quote}
                    onChange={(e) => {
                      const updated = [...testimonialsList];
                      if (updated[idx]) {
                        updated[idx]!.quote = e.target.value;
                        setTestimonialsList(updated);
                      }
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 uppercase">
                      Author
                    </label>
                    <input
                      type="text"
                      value={test.author}
                      onChange={(e) => {
                        const updated = [...testimonialsList];
                        if (updated[idx]) {
                          updated[idx]!.author = e.target.value;
                          setTestimonialsList(updated);
                        }
                      }}
                      className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 uppercase">
                      Role / Relation
                    </label>
                    <input
                      type="text"
                      value={test.role}
                      onChange={(e) => {
                        const updated = [...testimonialsList];
                        if (updated[idx]) {
                          updated[idx]!.role = e.target.value;
                          setTestimonialsList(updated);
                        }
                      }}
                      className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
