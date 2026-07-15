"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, Zap } from 'lucide-react';
import { navLinks, APP_NAME, CTA_LABEL, CTA_HREF } from "@/lib/data";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount] = useState(3);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[var(--brand-primary)] flex items-center justify-center shadow-[0_2px_8px_rgba(5,150,105,0.4)] group-hover:shadow-[0_4px_16px_rgba(5,150,105,0.5)] transition-all duration-300">
              <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-[var(--foreground)]" style={{ fontFamily: "var(--font-heading)" }}>
              {t("nav.brand")}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={getLinkHref(link.href)}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--brand-primary)] rounded-lg hover:bg-[var(--brand-primary)]/8 transition-all duration-200"
              >
                {t(`nav.${link.label.toLowerCase()}`)}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link
              href={getLinkHref("#products")}
              onClick={(e) => handleAnchorClick(e, "#products")}
              className="relative p-2 rounded-xl text-[var(--muted-foreground)] hover:text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/8 transition-all duration-200"
              aria-label={t("nav.cart")}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[var(--brand-accent)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* CTA */}
            <Link
              href={getLinkHref(CTA_HREF)}
              onClick={(e) => handleAnchorClick(e, CTA_HREF)}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--brand-primary)] text-white text-sm font-semibold rounded-xl shadow-[0_2px_8px_rgba(5,150,105,0.35)] hover:bg-[var(--brand-secondary)] hover:shadow-[0_4px_16px_rgba(5,150,105,0.45)] transition-all duration-300"
            >
              {t("nav.cta")}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl text-[var(--muted-foreground)] hover:text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/8 transition-all duration-200"
              aria-label={t("nav.toggleMenu")}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-[var(--border)]"
          >
            <nav className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getLinkHref(link.href)}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="px-4 py-3 text-sm font-medium text-[var(--foreground)] hover:text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/8 rounded-xl transition-all duration-200"
                >
                  {t(`nav.${link.label.toLowerCase()}`)}
                </Link>
              ))}
              <Link
                href={getLinkHref(CTA_HREF)}
                onClick={(e) => handleAnchorClick(e, CTA_HREF)}
                className="mt-2 px-4 py-3 bg-[var(--brand-primary)] text-white text-sm font-semibold rounded-xl text-center shadow-[0_2px_8px_rgba(5,150,105,0.35)] hover:bg-[var(--brand-secondary)] transition-all duration-300"
              >
                {t("nav.cta")}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}