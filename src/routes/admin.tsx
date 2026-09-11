import {
  createFileRoute,
  redirect,
  Outlet,
  Link,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Bell,
  FileText,
  Award,
  HelpCircle,
  Settings,
  LogOut,
  Image as ImageIcon,
  BookOpen,
  Menu,
  X,
  UserCheck,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/admin")({
  beforeLoad: async ({ location }) => {
    if (location.pathname === "/admin/login") return;
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      throw redirect({
        to: "/admin/login",
        search: { redirect: location.href },
      });
    }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin");

    if (!roles || roles.length === 0) {
      await supabase.auth.signOut();
      throw redirect({
        to: "/admin/login",
        search: { redirect: location.href },
      });
    }
  },
  component: AdminLayout,
});

const NAV_ITEMS = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Admissions", to: "/admin/admissions", icon: Users },
  { label: "Events", to: "/admin/events", icon: Calendar },
  { label: "Teachers", to: "/admin/teachers", icon: UserCheck },
  { label: "Achievements", to: "/admin/achievements", icon: Award },
  { label: "FAQs", to: "/admin/faqs", icon: HelpCircle },
  { label: "Media Library", to: "/admin/media", icon: ImageIcon },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

import { AdminThemeProvider, useAdminTheme } from "@/components/admin-theme-provider";
import { AdminThemeToggle } from "@/components/admin-theme-toggle";

const SCHOOL_WEBSITE_URL = "https://shandilyaschool.edu.in"; // Replace with actual production URL if different

function ThemeWrapper({ children, isLogin }: { children: React.ReactNode; isLogin: boolean }) {
  const { theme } = useAdminTheme();

  return (
    <div
      className={`${theme === "dark" ? "dark" : ""} min-h-screen bg-transparent transition-colors duration-300`}
    >
      {children}
    </div>
  );
}

function AdminLayout() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [session, setSession] = useState<any>(null);

  const isLogin = routerState.location.pathname === "/admin/login";

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session && !isLogin) {
        navigate({ to: "/admin/login" });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, isLogin]);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  }

  const content = isLogin ? (
    <Outlet />
  ) : (
    <div className="flex min-h-screen bg-[#F8F9FA] font-sans text-slate-800 transition-colors duration-300 dark:bg-[#0F1115] dark:text-[#F5F5F2]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out md:static md:translate-x-0 dark:border-[#303640] dark:bg-[#111318] ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-6 dark:border-[#303640]">
          <div className="flex items-center gap-2">
            <img
              src="/favicon.png"
              alt="Shandilya Public School Logo"
              className="size-8 object-contain"
            />
            <span className="font-serif text-sm font-bold tracking-tight text-[#1e293b] dark:text-[#F5F5F2] leading-tight">
              Shandilya
              <br />
              <span className="text-[#9e1c3f]">Public School</span>
            </span>
          </div>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="size-5 text-slate-500 dark:text-[#858D99]" />
          </button>
        </div>

        <nav className="h-[calc(100vh-4rem)] overflow-y-auto p-4">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 [&.active]:bg-[#9e1c3f]/10 [&.active]:text-[#9e1c3f] dark:text-[#B8BEC8] dark:hover:bg-[#1D2229] dark:hover:text-[#F5F5F2] dark:[&.active]:bg-[#9e1c3f]/20 dark:[&.active]:text-[#F5F5F2]"
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-slate-100 pt-4 dark:border-[#303640]">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-[#858D99] dark:hover:bg-red-950/30 dark:hover:text-red-400"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center border-b border-slate-200 bg-white px-4 shadow-sm md:px-8 dark:border-[#303640] dark:bg-[#12151A]">
          <button
            className="mr-4 rounded-md p-1 hover:bg-slate-100 md:hidden dark:hover:bg-[#1D2229]"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="size-6 text-slate-600 dark:text-[#B8BEC8]" />
          </button>
          <div className="flex flex-1 items-center justify-end gap-4">
            <a
              href={SCHOOL_WEBSITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-[#303640] dark:bg-[#181C22] dark:text-[#F5F5F2] dark:hover:bg-[#1D2229] dark:hover:text-white"
            >
              Visit School <ExternalLink className="size-3.5" />
            </a>
            <AdminThemeToggle />
            <div className="hidden text-right md:block">
              <p className="text-sm font-semibold text-slate-700 dark:text-[#F5F5F2]">Admin User</p>
              <p className="text-xs text-slate-500 dark:text-[#858D99]">{session?.user?.email}</p>
            </div>
            <div className="flex size-9 items-center justify-center rounded-full bg-[#9e1c3f] text-sm font-bold text-white">
              {session?.user?.email?.charAt(0).toUpperCase() || "A"}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );

  return (
    <AdminThemeProvider>
      <ThemeWrapper isLogin={isLogin}>{content}</ThemeWrapper>
    </AdminThemeProvider>
  );
}
