"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Zap, Mail, Phone, MapPin, MessageCircle as Twitter, Code2 as Github, Briefcase as Linkedin, Globe as Facebook } from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from "@/lib/data";
import { useTranslations } from "next-intl";

const footerSections = [
  {
    titleKey: "footer.shop",
    links: [
      { labelKey: "footer.allProducts", href: "#products" },
      { labelKey: "footer.deals", href: "#deals" },
      { labelKey: "footer.newArrivals", href: "#products" },
      { labelKey: "footer.categories", href: "#categories" },
    ],
  },
  {
    titleKey: "footer.support",
    links: [
      { labelKey: "footer.faq", href: "#contact" },
      { labelKey: "footer.shipping", href: "#contact" },
      { labelKey: "footer.returns", href: "#contact" },
      { labelKey: "footer.warranty", href: "#contact" },
    ],
  },
  {
    titleKey: "footer.company",
    links: [
      { labelKey: "footer.about", href: "#about" },
      { labelKey: "footer.blog", href: "#about" },
      { labelKey: "footer.careers", href: "#about" },
      { labelKey: "footer.press", href: "#about" },
    ],
  },
];

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  return (
    <footer className="bg-[var(--foreground)] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-[var(--brand-primary)] flex items-center justify-center shadow-[0_2px_12px_rgba(5,150,105,0.5)] group-hover:shadow-[0_4px_20px_rgba(5,150,105,0.6)] transition-all duration-300">
                <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                {APP_NAME}
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              {t("footer.tagline")}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Mail className="w-4 h-4 text-[var(--brand-secondary)] flex-shrink-0" />
                <span>hello@datics.store</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Phone className="w-4 h-4 text-[var(--brand-secondary)] flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4 text-[var(--brand-secondary)] flex-shrink-0" />
                <span>San Francisco, CA 94102</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Github, label: "GitHub" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Facebook, label: "Facebook" },
              ].map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[var(--brand-primary)] flex items-center justify-center transition-colors duration-300"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.titleKey}>
              <h4
                className="text-sm font-semibold text-white mb-4 uppercase tracking-wider"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {t(section.titleKey)}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.labelKey}>
                    <Link
                      href={getLinkHref(link.href)}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="text-sm text-white/60 hover:text-[var(--brand-secondary)] transition-colors duration-200"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            {t("footer.copyright", { year: 2024, brand: APP_NAME })}
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-white/40 hover:text-white/70 transition-colors duration-200">
              {t("footer.privacy")}
            </Link>
            <Link href="#" className="text-sm text-white/40 hover:text-white/70 transition-colors duration-200">
              {t("footer.terms")}
            </Link>
            <Link href="#" className="text-sm text-white/40 hover:text-white/70 transition-colors duration-200">
              {t("footer.cookies")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}