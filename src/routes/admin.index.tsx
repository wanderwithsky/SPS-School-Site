import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  Trophy,
  ReceiptText,
  BellRing,
  MailCheck,
  Layers,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";
import {
  useAdmissionEnquiriesCMS,
  useTeachersCMS,
  useAchievementsCMS,
  useNoticesCMS,
  useFeeStructureCMS,
  useSiteSettings,
} from "@/hooks/useCMS";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { enquiries } = useAdmissionEnquiriesCMS();
  const { teachers } = useTeachersCMS();
  const { achievements } = useAchievementsCMS();
  const { notices } = useNoticesCMS();
  const { feeTiers } = useFeeStructureCMS();
  const { data: settings } = useSiteSettings();

  const newEnquiries = enquiries.filter((e) => e.status === "new");
  const contactedEnquiries = enquiries.filter((e) => e.status === "contacted");

  const statCards = [
    {
      title: "Admission Enquiries",
      value: enquiries.length,
      subvalue: `${newEnquiries.length} New Unread`,
      icon: MailCheck,
      to: "/admin/enquiries",
      color: "from-blue-600 to-indigo-600",
      accent: "text-blue-400",
    },
    {
      title: "Faculty Members",
      value: teachers.length,
      subvalue: `${teachers.filter((t) => t.is_active).length} Active Staff`,
      icon: Users,
      to: "/admin/teachers",
      color: "from-emerald-600 to-teal-600",
      accent: "text-emerald-400",
    },
    {
      title: "Achievements & Awards",
      value: achievements.length,
      subvalue: `${achievements.filter((a) => a.is_featured).length} Featured Highlights`,
      icon: Trophy,
      to: "/admin/achievements",
      color: "from-amber-600 to-orange-600",
      accent: "text-amber-400",
    },
    {
      title: "Active Notices & Events",
      value: notices.length,
      subvalue: `${notices.filter((n) => n.is_pinned).length} Pinned to Marquee`,
      icon: BellRing,
      to: "/admin/notices",
      color: "from-purple-600 to-pink-600",
      accent: "text-purple-400",
    },
  ];

  const quickActions = [
    {
      title: "Edit Page Sections CMS",
      desc: "Customize Hero titles, Welcome text, Why Choose Us cards, Facilities, and FAQs.",
      to: "/admin/pages",
      icon: Layers,
    },
    {
      title: "Manage Fee Structure",
      desc: "Update tuition fees, admission charges, and annual schedules for all classes.",
      to: "/admin/fees",
      icon: ReceiptText,
    },
    {
      title: "School Global Settings",
      desc: "Update contact numbers, email, address, motto, and admission badge toggle.",
      to: "/admin/settings",
      icon: Sparkles,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 p-6 sm:p-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            Live Content Management System
          </div>
          <h1 className="mt-3 font-serif text-2xl font-bold text-white sm:text-3xl">
            Welcome to {settings?.school_name || "Shandilya Public School"} CMS
          </h1>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            Create, update, and manage all school web pages, faculty profiles, circulars, fee
            charts, and student admission leads in real time.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              to={stat.to as never}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-5 transition-all hover:border-slate-700 hover:shadow-xl hover:shadow-emerald-950/20"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">{stat.title}</span>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-md`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">{stat.value}</span>
                <span className={`text-xs font-medium ${stat.accent}`}>{stat.subvalue}</span>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-medium text-slate-400 group-hover:text-emerald-400 transition-colors">
                <span>Manage</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Grid: Recent Enquiries + Quick Actions */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Enquiries (2 cols) */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="font-serif text-lg font-bold text-white">
                Recent Admission Enquiries
              </h2>
              <p className="text-xs text-slate-400">
                Latest student registration inquiries received
              </p>
            </div>
            <Link
              to="/admin/enquiries"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
            >
              View All ({enquiries.length})
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-4 divide-y divide-slate-800/80">
            {enquiries.length === 0 ? (
              <div className="py-8 text-center text-sm text-slate-500">
                No admission enquiries submitted yet.
              </div>
            ) : (
              enquiries.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-emerald-400">
                      {item.student_name[0]?.toUpperCase() || "S"}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-200">{item.student_name}</p>
                      <p className="text-xs text-slate-400">
                        Class:{" "}
                        <span className="text-emerald-400 font-medium">
                          {item.class_applying_for}
                        </span>{" "}
                        • Parent: {item.parent_name} ({item.mobile})
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        item.status === "new"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : item.status === "contacted"
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick CMS Actions (1 col) */}
        <div className="space-y-4">
          <h2 className="font-serif text-lg font-bold text-white">Quick CMS Actions</h2>
          <div className="space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.title}
                  to={action.to as never}
                  className="group block rounded-2xl border border-slate-800 bg-slate-900/90 p-4 transition-all hover:border-emerald-500/40 hover:bg-slate-850"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-slate-800 p-2 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">
                        {action.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-400 leading-relaxed">{action.desc}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
