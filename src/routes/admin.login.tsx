import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Lock, Mail } from "lucide-react";
import { AdminThemeToggle } from "@/components/admin-theme-toggle";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Email not confirmed")) {
          throw new Error("Please confirm your admin email before signing in.");
        } else if (error.message.includes("Invalid login credentials")) {
          throw new Error("Invalid email or password.");
        }
        throw error;
      }

      if (data.session) {
        navigate({ to: "/admin/dashboard" });
      }
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F9FA] p-4 transition-colors duration-300 dark:bg-[#0F1115]">
      <div className="absolute top-4 right-4 md:top-8 md:right-8">
        <AdminThemeToggle />
      </div>

      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/50 transition-colors duration-300 dark:bg-[#181C22] dark:shadow-black/50 dark:border dark:border-[#303640]">
        <div className="bg-[#9e1c3f] px-8 py-10 text-center">
          <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm p-3">
            <img
              src="/favicon.png"
              alt="Shandilya Public School Logo"
              className="size-full object-contain"
            />
          </div>
          <h1 className="font-serif text-2xl font-bold text-white leading-tight">
            Shandilya Public School
          </h1>
          <p className="mt-2 text-sm text-white/90 font-medium tracking-wide">Admin Portal</p>
          <p className="mt-1 text-xs text-white/70">Sign in to manage the school portal</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400 dark:border dark:border-red-900/50">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-[#B8BEC8]"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="size-5 text-slate-400 dark:text-[#858D99]" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 pl-10 text-sm text-slate-900 transition-colors focus:border-[#9e1c3f] focus:bg-white focus:ring-1 focus:ring-[#9e1c3f] focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f] dark:focus:bg-[#181C22] placeholder:dark:text-[#7D8590]"
                  placeholder="admin@shandilyaschool.edu.in"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-[#B8BEC8]"
              >
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="size-5 text-slate-400 dark:text-[#858D99]" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 pl-10 text-sm text-slate-900 transition-colors focus:border-[#9e1c3f] focus:bg-white focus:ring-1 focus:ring-[#9e1c3f] focus:outline-none dark:border-[#303640] dark:bg-[#1D2229] dark:text-[#F5F5F2] dark:focus:border-[#9e1c3f] dark:focus:bg-[#181C22] placeholder:dark:text-[#7D8590]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#9e1c3f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#801733] disabled:opacity-70"
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
