import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

type AdminThemeProviderProps = {
  children: React.ReactNode;
};

type AdminThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: AdminThemeProviderState = {
  theme: "light",
  setTheme: () => null,
};

const AdminThemeProviderContext = createContext<AdminThemeProviderState>(initialState);

export function AdminThemeProvider({ children }: AdminThemeProviderProps) {
  // Initialize from localStorage safely
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("admin-theme") as Theme | null;
      if (savedTheme) {
        return savedTheme;
      }
    }
    return "light";
  });

  useEffect(() => {
    localStorage.setItem("admin-theme", theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme);
    },
  };

  return (
    <AdminThemeProviderContext.Provider value={value}>
      {children}
    </AdminThemeProviderContext.Provider>
  );
}

export const useAdminTheme = () => {
  const context = useContext(AdminThemeProviderContext);

  if (context === undefined)
    throw new Error("useAdminTheme must be used within an AdminThemeProvider");

  return context;
};
