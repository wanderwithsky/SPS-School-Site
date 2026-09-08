import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";
import { AdmissionPopup } from "./AdmissionPopup";

export function SiteLayout({
  children,
  overHero = false,
}: {
  children: ReactNode;
  overHero?: boolean;
}) {
  return (
    <div className="min-h-dvh bg-background">
      <Header overHero={overHero} />
      <main id="main">{children}</main>
      <Footer />
      <FloatingActions />
      <AdmissionPopup />
    </div>
  );
}
