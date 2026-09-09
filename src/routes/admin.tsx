import { useEffect, useState } from "react";
import { createFileRoute, Outlet, Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Trophy,
  ReceiptText,
  BellRing,
  Layers,
  Settings,
  MailCheck,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { getCurrentAdmin, logoutAdmin, AdminUser } from "@/lib/admin-auth";
import { useAdmissionEnquiriesCMS } from "@/hooks/useCMS";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { enquiries } = useAdmissionEnquiriesCMS();

  const newEnquiriesCount = enquiries.filter((e) => e.status === "new").length;

  useEffect(() => {
    // If we're on /admin/login, don't guard
    if (location.pathname === "/admin/login") {
      setIsLoading(false);
      return;
    }

    getCurrentAdmin().then((admin) => {
      if (!admin) {
        navigate({ to: "/admin/login" });
      } else {
        setUser(admin);
      }
      setIsLoading(false);
    });
  }, [location.pathname, navigate]);

  if (location.pathname === "/admin/login") {
    return <Outlet />;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          <p className="text-sm text-slate-400 font-medium">Verifying Administrator Access...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
    {
      label: "Enquiries",
      to: "/admin/enquiries",
      icon: MailCheck,
      badge: newEnquiriesCount > 0 ? newEnquiriesCount : undefined,
    },
    { label: "Page Sections CMS", to: "/admin/pages", icon: Layers },
    { label: "Teachers & Faculty", to: "/admin/teachers", icon: Users },
    { label: "Achievements & Awards", to: "/admin/achievements", icon: Trophy },
    { label: "Fee Structure", to: "/admin/fees", icon: ReceiptText },
    { label: "Notices & Events", to: "/admin/notices", icon: BellRing },
    { label: "Site Settings", to: "/admin/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    await logoutAdmin();
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-800 bg-slate-900/95 p-4 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-2 py-3 border-b border-slate-800/80">
          <Link to="/admin" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold text-white tracking-wide flex items-center gap-1.5">
                SPS Admin{" "}
                <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  CMS
                </span>
              </h1>
              <p className="text-xs text-slate-400">Shandilya Public School</p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Real-Time Status Pill */}
        <div className="mt-4 mx-1 flex items-center justify-between rounded-lg bg-emerald-950/40 border border-emerald-500/20 px-3 py-2 text-xs text-emerald-300">
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Real-Time Sync Active
          </span>
          <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
        </div>

        {/* Navigation Items */}
        <nav className="mt-4 flex-1 space-y-1 overflow-y-auto px-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.to === "/admin"
                ? location.pathname === "/admin" || location.pathname === "/admin/"
                : location.pathname.startsWith(item.to);

            return (
              <Link
                key={item.to}
                to={item.to as never}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/40"
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4.5 w-4.5 transition-colors ${isActive ? "text-white" : "text-slate-400 group-hover:text-emerald-400"}`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-bold text-slate-950">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer / User Profile */}
        <div className="mt-auto border-t border-slate-800/80 pt-3">
          <div className="flex items-center justify-between px-2 py-1 mb-2">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-200">
                {user?.email?.split("@")[0] || "Administrator"}
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                Full Access CMS
              </span>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="rounded-lg p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-800/80 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all border border-slate-700/60"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>View Public Website</span>
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 sm:px-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                School Management Portal
              </span>
              <h2 className="text-sm font-medium text-slate-300 hidden sm:block">
                Real-Time Updates & Content Control
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 text-xs font-medium text-emerald-400 hover:bg-emerald-500/20 transition-all"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Site
            </a>
          </div>
        </header>

        {/* Dynamic Nested Route Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-950">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
