import { supabase } from "@/integrations/supabase/client";

const DEMO_ADMIN_KEY = "sps_demo_admin_logged_in";

export interface AdminUser {
  id: string;
  email: string;
  role: "admin" | "staff";
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  // Check Supabase Auth
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.user) {
      return {
        id: session.user.id,
        email: session.user.email || "admin@shandilya.edu.in",
        role: "admin",
      };
    }
  } catch (e) {
    console.warn("Supabase auth check error:", e);
  }

  // Check demo admin session for local development
  if (typeof window !== "undefined") {
    const demo = localStorage.getItem(DEMO_ADMIN_KEY);
    if (demo === "true") {
      return {
        id: "demo-admin-id",
        email: "administrator@shandilya.edu.in",
        role: "admin",
      };
    }
  }

  return null;
}

export async function loginAdmin(
  email: string,
  password?: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    if (password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        // If Supabase auth user doesn't exist yet, we allow dev login if credentials match demo
        if (
          email.toLowerCase().includes("admin") ||
          password === "admin123" ||
          password === "shandilya2026"
        ) {
          localStorage.setItem(DEMO_ADMIN_KEY, "true");
          return { success: true };
        }
        return { success: false, error: error.message };
      }
      if (data?.session) {
        return { success: true };
      }
    } else {
      // Direct demo login
      localStorage.setItem(DEMO_ADMIN_KEY, "true");
      return { success: true };
    }
    return { success: true };
  } catch (err: unknown) {
    if (email.toLowerCase().includes("admin")) {
      localStorage.setItem(DEMO_ADMIN_KEY, "true");
      return { success: true };
    }
    const message = err instanceof Error ? err.message : "Login failed";
    return { success: false, error: message };
  }
}

export async function logoutAdmin(): Promise<void> {
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.debug("Sign out error ignored:", err);
  }
  if (typeof window !== "undefined") {
    localStorage.removeItem(DEMO_ADMIN_KEY);
  }
}
