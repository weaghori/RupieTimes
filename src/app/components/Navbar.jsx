"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useId, useState } from "react";
import logo from "../assets/logo.png";

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Market News", href: "/news" },
  { name: "Insights", href: "/insights" },
  { name: "Plans", href: "/plans" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonId = useId();
  const menuPanelId = useId();

  // Close on ESC for accessibility
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  // Prevent body scroll when menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/80 bg-white/90 border-b border-slate-200/70">
      <nav
        className="mx-auto flex h-16 sm:h-18 lg:h-20 max-w-7xl items-center justify-between px-4 sm:px-5 md:px-6 lg:px-8"
        aria-label="Primary"
      >
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group" aria-label="Rupie Times Home">
            <Image
              src={logo}
              alt="Rupie Times logo"
              priority
              className="h-8 w-auto sm:h-9 lg:h-10"
            />
          </Link>
        </div>

        {/* Center: Desktop navigation */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-3 xl:px-4 py-2 text-sm xl:text-[0.95rem] font-medium text-slate-700 rounded-md hover:text-slate-900 hover:bg-slate-100/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 transition"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right: CTA */}
        <div className="flex items-center gap-2">
          <Link
            href="/trial"
            className="hidden sm:inline-flex rounded-md bg-primary px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent transition"
          >
            Take a Trial
          </Link>

          {/* Hamburger button - visible on small/medium screens */}
          <button
            id={menuButtonId}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls={menuPanelId}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex lg:hidden items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition"
          >
            <svg
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        id={menuPanelId}
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-6 lg:px-8 pb-3">
          <div className="flex flex-col gap-1 py-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-[0.95rem] font-medium text-slate-800 hover:bg-slate-100/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition"
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="/trial"
              onClick={() => setMobileOpen(false)}
              className="mt-1 inline-flex rounded-md bg-primary px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent transition"
            >
              Take a Trial
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

