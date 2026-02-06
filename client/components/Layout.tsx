import { ReactNode } from "react";
import { Navigation } from "./Navigation";

interface LayoutProps {
  children: ReactNode;
  showPadding?: boolean;
}

export function Layout({ children, showPadding = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className={`max-w-2xl mx-auto ${showPadding ? "px-4 pb-24 pt-4" : ""}`}>
        {children}
      </main>
    </div>
  );
}
