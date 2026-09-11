import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import {
  Users,
  UserPlus,
  Calendar,
  Bell,
  Image as ImageIcon,
  ArrowRight,
  Plus,
} from "lucide-react";
import { format } from "date-fns";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    newEnquiries: 0,
    upcomingEvents: 0,
    publishedNotices: 0,
    galleryImages: 0,
  });
  const [recentEnquiries, setRecentEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [
          { count: totalEnquiries },
          { count: newEnquiries },
          { count: upcomingEvents },
          { count: publishedNotices },
          { data: recent },
        ] = await Promise.all([
          supabase.from("admission_enquiries").select("*", { count: "exact", head: true }),
          supabase
            .from("admission_enquiries")
            .select("*", { count: "exact", head: true })
            .eq("status", "new"),
          supabase
            .from("events")
            .select("*", { count: "exact", head: true })
            .eq("status", "Published")
            .gte("date", new Date().toISOString().split("T")[0]),
          supabase
            .from("notices")
            .select("*", { count: "exact", head: true })
            .eq("status", "Published"),
          supabase
            .from("admission_enquiries")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(5),
        ]);

        setStats({
          totalEnquiries: totalEnquiries || 0,
          newEnquiries: newEnquiries || 0,
          upcomingEvents: upcomingEvents || 0,
          publishedNotices: publishedNotices || 0,
          galleryImages: 186, // Mocked for now as media module is not fully implemented
        });

        if (recent) {
          setRecentEnquiries(recent);
        }
      } catch (err) {
        console.error("Error loading dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const STAT_CARDS = [
    {
      label: "Admission Enquiries",
      value: stats.totalEnquiries,
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      label: "New Enquiries",
      value: stats.newEnquiries,
      icon: UserPlus,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/20",
    },
    {
      label: "Upcoming Events",
      value: stats.upcomingEvents,
      icon: Calendar,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      label: "Published Notices",
      value: stats.publishedNotices,
      icon: Bell,
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      label: "Gallery Images",
      value: stats.galleryImages,
      icon: ImageIcon,
      color: "text-pink-600 dark:text-pink-400",
      bg: "bg-pink-50 dark:bg-pink-900/20",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-[#F5F5F2]">
          Dashboard
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl bg-slate-200 dark:bg-[#181C22]" />
          ))}
        </div>
        <div className="h-96 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-[#181C22]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-[#F5F5F2]">
          Dashboard
        </h1>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/admin/events"
            className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:bg-[#181C22] dark:border dark:border-[#303640] dark:text-[#F5F5F2] dark:hover:bg-[#1D2229]"
          >
            <Plus className="size-4" /> New Event
          </Link>
          <Link
            to="/admin/notices"
            className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:bg-[#181C22] dark:border dark:border-[#303640] dark:text-[#F5F5F2] dark:hover:bg-[#1D2229]"
          >
            <Plus className="size-4" /> New Notice
          </Link>
          <Link
            to="/admin/admissions"
            className="flex items-center gap-2 rounded-lg bg-[#9e1c3f] px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#801733]"
          >
            Manage Admissions
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {STAT_CARDS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm dark:border-[#303640] dark:bg-[#181C22]"
          >
            <div className="flex items-center gap-4">
              <div className={`flex size-12 items-center justify-center rounded-lg ${stat.bg}`}>
                <stat.icon className={`size-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-[#858D99]">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-[#F5F5F2]">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Enquiries */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm dark:border-[#303640] dark:bg-[#181C22]">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-[#303640]">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-[#F5F5F2]">
            Recent Admission Enquiries
          </h2>
          <Link
            to="/admin/admissions"
            className="flex items-center gap-1 text-sm font-medium text-[#9e1c3f] transition hover:text-[#801733] dark:text-red-400 dark:hover:text-red-300"
          >
            View All <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          {recentEnquiries.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500 dark:text-[#858D99]">
              No admission enquiries yet.
            </div>
          ) : (
            <table className="w-full text-left text-sm text-slate-600 dark:text-[#B8BEC8]">
              <thead className="bg-slate-50 text-xs font-medium text-slate-500 uppercase dark:bg-[#1D2229] dark:text-[#858D99]">
                <tr>
                  <th className="px-6 py-3">Student</th>
                  <th className="px-6 py-3">Class</th>
                  <th className="px-6 py-3">Parent / Guardian</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#303640] bg-white dark:bg-[#181C22]">
                {recentEnquiries.map((enquiry) => {
                  let statusColor =
                    "bg-slate-100 text-slate-600 dark:bg-[#1D2229] dark:text-[#858D99]";
                  switch (enquiry.status.toLowerCase()) {
                    case "new":
                      statusColor = "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400";
                      break;
                    case "contacted":
                      statusColor =
                        "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
                      break;
                    case "follow_up":
                      statusColor =
                        "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400";
                      break;
                    case "visited":
                      statusColor =
                        "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
                      break;
                  }

                  return (
                    <tr
                      key={enquiry.id}
                      className="transition hover:bg-slate-50 dark:hover:bg-[#1D2229]"
                    >
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-[#F5F5F2]">
                        {enquiry.student_name}
                      </td>
                      <td className="px-6 py-4">{enquiry.class_applying_for}</td>
                      <td className="px-6 py-4">{enquiry.parent_name}</td>
                      <td className="px-6 py-4">{enquiry.mobile}</td>
                      <td className="px-6 py-4">
                        {format(new Date(enquiry.created_at), "dd MMM yyyy")}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${statusColor}`}
                        >
                          {enquiry.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
