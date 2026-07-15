"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart, ArrowRight, Zap, Shield, Truck, HeadphonesIcon, Check, Heart, Eye, ChevronRight, Sparkles, Clock, Award } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, APP_DESCRIPTION, CTA_LABEL, CTA_HREF } from "@/lib/data";
import { fadeInUp, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";
import { useTranslations } from "next-intl";

const products = [
  {
    id: "1",
    name: "AirPods Pro Max",
    category: "Audio",
    price: 249,
    originalPrice: 349,
    rating: 4.9,
    reviewCount: 2847,
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-max-select-202409-midnight_FV1_FMT_WHH?wid=752&hei=636&fmt=jpeg&qlt=90&.v=azQxRkVJKzd6V3J0aGNqWFhLMzBmdmVWNWdHYnp5cHkwMldsSElEOHpyd2ttdW5wTmRBL1NETnlMVldNRXJ0RFZOSzlQRTFSbHNFZCtKQi9Wc2w5b3I2TGhYaGhMVkJpQ2RGWWVURTZNbXphV29iOFBIcjE1bWVvKzVNUlpwYys",
    badge: "Sale" as const,
    description: "Studio-quality sound with adaptive noise cancellation and spatial audio.",
    inStock: true,
  },
  {
    id: "2",
    name: "UltraWatch Series X",
    category: "Wearables",
    price: 399,
    originalPrice: undefined,
    rating: 4.8,
    reviewCount: 1523,
    image: "https://m.media-amazon.com/images/I/810JR81LIsL.jpg",
    badge: "New" as const,
    description: "Advanced health monitoring with a titanium case and always-on display.",
    inStock: true,
  },
  {
    id: "3",
    name: "ProTab 12 Ultra",
    category: "Tablets",
    price: 799,
    originalPrice: 999,
    rating: 4.7,
    reviewCount: 984,
    image: "https://tymber-blaze-products.imgix.net/6408e24515c8c763d34cf281-1e43a152-f84f-4022-a2c6-0c66c86e9e70_d8acb6ca-a7d7-4a9d-af04-6d703a428123_null_26-12-22-15-13-15-1-1682794050300.jpeg",
    badge: "Hot" as const,
    description: "M3-powered tablet with a 12.9-inch Liquid Retina display and all-day battery.",
    inStock: true,
  },
  {
    id: "4",
    name: "NovaCam 4K Drone",
    category: "Cameras",
    price: 599,
    originalPrice: undefined,
    rating: 4.6,
    reviewCount: 712,
    image: "https://m.media-amazon.com/images/I/719ysqDVQ6L._AC_UF894,1000_QL80_.jpg",
    badge: "New" as const,
    description: "Foldable 4K drone with 3-axis gimbal stabilization and 40-min flight time.",
    inStock: true,
  },
  {
    id: "5",
    name: "MechKey Pro 75",
    category: "Accessories",
    price: 149,
    originalPrice: 199,
    rating: 4.8,
    reviewCount: 3201,
    image: "https://m.media-amazon.com/images/I/61uxUR+l5LL._AC_UF894,1000_QL80_.jpg",
    badge: "Sale" as const,
    description: "Compact 75% layout with hot-swap switches and per-key RGB lighting.",
    inStock: true,
  },
  {
    id: "6",
    name: "PixelBuds X3",
    category: "Audio",
    price: 129,
    originalPrice: undefined,
    rating: 4.5,
    reviewCount: 1876,
    image: "https://cdn.mos.cms.futurecdn.net/v2/t:0,l:420,cw:1080,ch:1080,q:80,w:1080/TyZJPdh2kMeDkTXCEsoHUm.jpg",
    badge: undefined,
    description: "True wireless earbuds with 36-hour total battery and IPX5 water resistance.",
    inStock: true,
  },
];

const categories = [
  { name: "Audio", icon: "🎧", count: 48, image: "https://media.wired.com/photos/65e8385a7e55097b1dfa6ac1/master/w_1600%2Cc_limit/iStock-500703366.jpg" },
  { name: "Wearables", icon: "⌚", count: 32, image: "https://media.wired.com/photos/65e8385a7e55097b1dfa6ac1/master/w_1600%2Cc_limit/iStock-500703366.jpg" },
  { name: "Tablets", icon: "📱", count: 24, image: "https://media.wired.com/photos/65e8385a7e55097b1dfa6ac1/master/w_1600%2Cc_limit/iStock-500703366.jpg" },
  { name: "Cameras", icon: "📷", count: 36, image: "https://careevolution.com/wp-content/uploads/2025/04/Wearables-WP-hero3.jpg" },
  { name: "Accessories", icon: "⌨️", count: 120, image: "https://cdn.thewirecutter.com/wp-content/media/2025/04/BEST-TABLETS-2048px-3x2-1.jpg?auto=webp&quality=75&crop=1:1,smart&width=1024" },
  { name: "Laptops", icon: "💻", count: 29, image: "http://woodwardcamera.com/cdn/shop/products/thsk9kld2jigqbdnzuvi.jpg?v=1677888076" },
];

const valueProps = [
  {
    icon: Truck,
    title: "Free Express Shipping",
    description: "Free 2-day shipping on all orders over $50. Same-day delivery available in select cities.",
  },
  {
    icon: Shield,
    title: "2-Year Warranty",
    description: "Every product comes with a comprehensive 2-year warranty and hassle-free returns.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Expert Support",
    description: "Our tech specialists are available around the clock to help you get the most from your gear.",
  },
  {
    icon: Award,
    title: "Certified Authentic",
    description: "Every item is sourced directly from manufacturers. 100% genuine, never refurbished.",
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Sarah Chen",
    role: "Product Designer",
    avatar: "https://www.wilsonaudio.com/images/logos/certified-authentic.png",
    rating: 5,
    text: "Datics is my go-to for all things tech. The AirPods Pro Max I ordered arrived in perfect condition, and the packaging was premium. Will definitely be back.",
  },
  {
    id: "t2",
    name: "Marcus Williams",
    role: "Software Engineer",
    avatar: "https://static.clubs.nfl.com/image/upload/t_editorial_landscape_mobile/f_png/ravens/vkeaskeyi2nes6jtsppz.png",
    rating: 5,
    text: "Ordered the MechKey Pro 75 and it exceeded every expectation. Fast shipping, great price, and the product is exactly as described. Highly recommend.",
  },
  {
    id: "t3",
    name: "Priya Nair",
    role: "Content Creator",
    avatar: "https://media.licdn.com/dms/image/v2/D5622AQE3NpM1FP01Yg/feedshare-shrink_800/B56Zf4pvKcGUAg-/0/1752223383746?e=2147483647&v=beta&t=C11dC6M36dpAKpcbBRMtusPrnkgE-cNJfHc93ZNpFoQ",
    rating: 5,
    text: "The NovaCam drone is incredible. Datics had the best price I found anywhere online, and their customer support helped me set it up on day one.",
  },
];

const stats = [
  { value: "150K+", label: "Happy Customers" },
  { value: "2,400+", label: "Products Listed" },
  { value: "4.9", label: "Average Rating" },
  { value: "99%", label: "Satisfaction Rate" },
];

const badgeStyles: Record<string, string> = {
  New: "bg-[var(--brand-primary)] text-white",
  Sale: "bg-[var(--brand-accent)] text-white",
  Hot: "bg-orange-500 text-white",
};

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
          />
        ))}
      </div>
      <span className="text-xs text-[var(--muted-foreground)]">({count.toLocaleString("en-US")})</span>
    </div>
  );
}

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const t = useTranslations();
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.07 }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative bg-white rounded-2xl border border-[var(--border)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface)]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='14' font-family='sans-serif'%3ENo Image%3C/text%3E%3C/svg%3E";
          }}
        />
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full ${badgeStyles[product.badge]}`}>
            {t(`badge.${product.badge.toLowerCase()}`)}
          </span>
        )}
        {/* Wishlist */}
        <button
          onClick={() => setWishlisted((w) => !w)}
          aria-label={t("product.wishlist")}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
        >
          <Heart className={`w-4 h-4 transition-colors ${wishlisted ? "fill-red-500 text-red-500" : "text-[var(--muted-foreground)]"}`} />
        </button>
        {/* Quick view */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200">
          <button className="w-full flex items-center justify-center gap-2 py-2 bg-white/95 backdrop-blur-sm rounded-xl text-xs font-semibold text-[var(--foreground)] shadow-sm hover:bg-white transition-colors">
            <Eye className="w-3.5 h-3.5" />
            {t("product.quickView")}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <span className="text-xs font-medium text-[var(--brand-primary)] uppercase tracking-wide">{product.category}</span>
        <h3 className="font-semibold text-[var(--foreground)] text-sm leading-snug line-clamp-1">{product.name}</h3>
        <p className="text-xs text-[var(--muted-foreground)] leading-relaxed line-clamp-2 flex-1">{product.description}</p>
        <StarRating rating={product.rating} count={product.reviewCount} />
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-[var(--foreground)]">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-[var(--muted-foreground)] line-through">${product.originalPrice}</span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-2 bg-[var(--brand-primary)] text-white text-xs font-semibold rounded-xl hover:bg-[var(--brand-primary-dark)] transition-colors shadow-[0_2px_8px_rgba(5,150,105,0.3)]"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {t("product.addToCart")}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center pt-20 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface)] via-white to-[var(--brand-primary)]/5 -z-10" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[var(--brand-primary)]/8 blur-[120px] -z-10 translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[var(--brand-secondary)]/10 blur-[100px] -z-10 -translate-x-1/3 translate-y-1/4" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6"
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/20 text-sm font-semibold text-[var(--brand-primary)]">
                  <Sparkles className="w-4 h-4" />
                  {t("hero.eyebrow")}
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[var(--foreground)] leading-[1.05] tracking-tight text-balance"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {t("hero.titleLine1")}{" "}
                <span className="text-[var(--brand-primary)]">{t("hero.titleAccent")}</span>
                <br />
                {t("hero.titleLine2")}
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-[var(--muted-foreground)] leading-relaxed max-w-lg text-pretty"
              >
                {t("hero.subtitle")}
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link
                  href={CTA_HREF}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(CTA_HREF)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--brand-primary)] text-white font-semibold rounded-2xl shadow-[0_4px_16px_rgba(5,150,105,0.35)] hover:shadow-[0_6px_24px_rgba(5,150,105,0.45)] hover:bg-[var(--brand-primary-dark)] transition-all duration-300 text-sm"
                >
                  {t("hero.cta")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#categories"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#categories")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white border border-[var(--border)] text-[var(--foreground)] font-semibold rounded-2xl hover:border-[var(--brand-primary)]/40 hover:bg-[var(--brand-primary)]/4 transition-all duration-300 text-sm shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                >
                  {t("hero.secondary")}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-5 pt-2">
                {[
                  { icon: Check, text: t("hero.trust1") },
                  { icon: Check, text: t("hero.trust2") },
                  { icon: Check, text: t("hero.trust3") },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5 text-sm text-[var(--muted-foreground)]">
                    <Icon className="w-4 h-4 text-[var(--brand-primary)]" />
                    {text}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Hero image collage */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square max-w-[520px] ml-auto">
                {/* Main image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.15)] border border-white/60"
                >
                  <img
                    src="https://www.digitalfirstmagazine.com/wp-content/uploads/2021/12/tcl-550x330.jpg"
                    alt={t("hero.imageAlt")}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='520' height='520' viewBox='0 0 520 520'%3E%3Crect width='520' height='520' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='16' font-family='sans-serif'%3EDatics Electronics%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </motion.div>

                {/* Floating card — rating */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -left-10 bottom-16 bg-white rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-[var(--border)] flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--muted-foreground)]">{t("hero.floatRatingLabel")}</p>
                    <p className="text-sm font-bold text-[var(--foreground)]">4.9 / 5.0</p>
                  </div>
                </motion.div>

                {/* Floating card — orders */}
                <motion.div
                  initial={{ opacity: 0, x: 20, y: -20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  className="absolute -right-8 top-12 bg-white rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-[var(--border)] flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--brand-primary)]/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[var(--brand-primary)]" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--muted-foreground)]">{t("hero.floatOrdersLabel")}</p>
                    <p className="text-sm font-bold text-[var(--foreground)]">150K+ {t("hero.floatOrdersSuffix")}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────── */}
      <Reveal>
        <section className="border-y border-[var(--border)] bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-extrabold text-[var(--brand-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
                    {stat.value}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)] mt-1">{t(`stats.${stat.label.toLowerCase().replace(/ /g, "")}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── CATEGORIES ───────────────────────────────────────────────── */}
      <section id="categories" className="py-24 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-sm font-semibold text-[var(--brand-primary)] uppercase tracking-widest">{t("categories.eyebrow")}</span>
                <h2 className="text-4xl font-extrabold text-[var(--foreground)] mt-2 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                  {t("categories.title")}
                </h2>
              </div>
              <Link
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-primary)] hover:gap-2.5 transition-all duration-200"
              >
                {t("categories.viewAll")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <Reveal key={cat.name} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="group cursor-pointer bg-white rounded-2xl border border-[var(--border)] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_-8px_rgba(5,150,105,0.2)] hover:border-[var(--brand-primary)]/30 transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden bg-[var(--surface)]">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='32'%3E" + encodeURIComponent(cat.icon) + "%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <div className="p-3 text-center">
                    <p className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors">{cat.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{cat.count} {t("categories.items")}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────── */}
      <section id="products" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-sm font-semibold text-[var(--brand-primary)] uppercase tracking-widest">{t("products.eyebrow")}</span>
                <h2 className="text-4xl font-extrabold text-[var(--foreground)] mt-2 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                  {t("products.title")}
                </h2>
                <p className="text-[var(--muted-foreground)] mt-2 max-w-lg">{t("products.subtitle")}</p>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="text-center mt-12">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] font-semibold rounded-2xl hover:bg-[var(--brand-primary)] hover:text-white transition-all duration-300 text-sm"
              >
                {t("products.loadMore")}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── DEALS BANNER ─────────────────────────────────────────────── */}
      <section id="deals" className="py-20 bg-[var(--foreground)] overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-primary)]/20 to-transparent -z-0" />
        <div className="absolute right-0 top-0 w-[500px] h-full bg-[var(--brand-primary)]/10 blur-[80px] -z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-6"
            >
              <span className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-[var(--brand-accent)]/20 border border-[var(--brand-accent)]/30 text-sm font-semibold text-[var(--brand-accent)]">
                <Clock className="w-4 h-4" />
                {t("deals.eyebrow")}
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                {t("deals.title")}
                <span className="text-[var(--brand-primary)] block">{t("deals.titleAccent")}</span>
              </h2>
              <p className="text-white/60 leading-relaxed max-w-md">{t("deals.subtitle")}</p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#products"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--brand-primary)] text-white font-semibold rounded-2xl shadow-[0_4px_16px_rgba(5,150,105,0.4)] hover:shadow-[0_6px_24px_rgba(5,150,105,0.5)] hover:bg-[var(--brand-primary-dark)] transition-all duration-300 text-sm"
                >
                  {t("deals.cta")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-2 gap-4"
            >
              {products.filter((p) => p.badge === "Sale").concat(products.filter((p) => p.badge === "Hot")).slice(0, 4).map((product, i) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%231e293b'/%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-white text-xs font-semibold line-clamp-1">{product.name}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[var(--brand-primary)] text-sm font-bold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-white/40 text-xs line-through">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUE PROPS ──────────────────────────────────────────────── */}
      <section className="py-24 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <span className="text-sm font-semibold text-[var(--brand-primary)] uppercase tracking-widest">{t("values.eyebrow")}</span>
              <h2 className="text-4xl font-extrabold text-[var(--foreground)] mt-2 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                {t("values.title")}
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueProps.map((vp, i) => (
              <Reveal key={vp.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl p-6 border border-[var(--border)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_-8px_rgba(5,150,105,0.15)] hover:border-[var(--brand-primary)]/20 transition-all duration-300 flex flex-col gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[var(--brand-primary)]/10 flex items-center justify-center">
                    <vp.icon className="w-6 h-6 text-[var(--brand-primary)]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--foreground)] mb-1.5">{t(`values.${i}.title`)}</h3>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{t(`values.${i}.description`)}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <span className="text-sm font-semibold text-[var(--brand-primary)] uppercase tracking-widest">{t("testimonials.eyebrow")}</span>
              <h2 className="text-4xl font-extrabold text-[var(--foreground)] mt-2 tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                {t("testimonials.title")}
              </h2>
              <p className="text-[var(--muted-foreground)] mt-3 max-w-xl mx-auto">{t("testimonials.subtitle")}</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((review, i) => (
              <Reveal key={review.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)] shadow-[0_1px_2px_rgba(0,0,0,0.04)] flex flex-col gap-4"
                >
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-[var(--foreground)] leading-relaxed flex-1">&ldquo;{review.text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-[var(--border)]">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[var(--brand-primary)]/20"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='20' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='16' font-family='sans-serif'%3E${encodeURIComponent(review.name.charAt(0))}%3C/text%3E%3C/svg%3E`;
                      }}
                    />
                    <div>
                      <p className="text-sm font-semibold text-[var(--foreground)]">{review.name}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{review.role}</p>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.12)] border border-[var(--border)]">
                <img
                  src="https://cdn.xingosoftware.com/elektor/images/fetch/dpr_1/https%3A%2F%2Fwww.elektormagazine.com%2Fassets%2Fupload%2Fimages%2F42%2F20200515164413_Christian-Fromentin-in-workspace.png"
                  alt={t("about.imageAlt")}
                  className="w-full aspect-[4/3] object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='450' viewBox='0 0 600 450'%3E%3Crect width='600' height='450' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='16' font-family='sans-serif'%3EAbout Datics%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-[var(--border)]"
              >
                <p className="text-3xl font-extrabold text-[var(--brand-primary)]" style={{ fontFamily: "var(--font-heading)" }}>2019</p>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{t("about.foundedLabel")}</p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-6"
            >
              <span className="text-sm font-semibold text-[var(--brand-primary)] uppercase tracking-widest">{t("about.eyebrow")}</span>
              <h2 className="text-4xl font-extrabold text-[var(--foreground)] tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                {t("about.title")}
              </h2>
              <p className="text-[var(--muted-foreground)] leading-relaxed">{t("about.body1")}</p>
              <p className="text-[var(--muted-foreground)] leading-relaxed">{t("about.body2")}</p>
              <ul className="flex flex-col gap-3 mt-2">
                {[t("about.bullet1"), t("about.bullet2"), t("about.bullet3")].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[var(--foreground)]">
                    <span className="w-5 h-5 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[var(--brand-primary)]" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER / CONTACT ─────────────────────────────────────── */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-primary-dark)] rounded-3xl p-10 md:p-16 overflow-hidden text-center shadow-[0_24px_80px_rgba(5,150,105,0.25)]">
              {/* Background glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl mx-auto">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 text-sm font-semibold text-white">
                  <Sparkles className="w-4 h-4" />
                  {t("newsletter.eyebrow")}
                </span>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                  {t("newsletter.title")}
                </h2>
                <p className="text-white/75 leading-relaxed">{t("newsletter.subtitle")}</p>

                {subscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 px-6 py-4 bg-white/15 border border-white/25 rounded-2xl text-white font-semibold"
                  >
                    <Check className="w-5 h-5" />
                    {t("newsletter.success")}
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("newsletter.placeholder")}
                      required
                      className="flex-1 px-5 py-3.5 rounded-2xl bg-white/15 border border-white/25 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition-all"
                    />
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="px-7 py-3.5 bg-white text-[var(--brand-primary)] font-bold rounded-2xl text-sm hover:bg-white/90 transition-colors shadow-[0_4px_16px_rgba(0,0,0,0.15)] whitespace-nowrap"
                    >
                      {t("newsletter.cta")}
                    </motion.button>
                  </form>
                )}

                <p className="text-white/50 text-xs">{t("newsletter.disclaimer")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}