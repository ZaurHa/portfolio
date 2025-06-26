'use client';
import Link from "next/link";
import { ThemeProvider, useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <button
      onClick={toggleTheme}
      aria-label="Theme wechseln"
      className="ml-4 text-2xl hover:text-cyan-400 transition"
      style={{ lineHeight: 1 }}
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
}

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-8 h-16 bg-black/80 backdrop-blur z-50 border-b border-cyan-600">
        <Link href="/" className="text-2xl font-bold tracking-tight text-cyan-400">Zaur</Link>
        <div className="flex gap-6 text-lg items-center">
          <Link href="/" className="hover:text-cyan-400 transition">Home</Link>
          <Link href="/projekte" className="hover:text-cyan-400 transition">Projekte</Link>
          <Link href="/ueber-mich" className="hover:text-cyan-400 transition">Über mich</Link>
          <Link href="/kontakt" className="hover:text-cyan-400 border border-cyan-400 rounded px-3 py-1 transition hover:bg-cyan-400 hover:text-black">Kontakt</Link>
          <ThemeSwitcher />
        </div>
      </nav>
      <main className="pt-20 px-4 max-w-3xl mx-auto w-full">{children}</main>
    </ThemeProvider>
  );
} 