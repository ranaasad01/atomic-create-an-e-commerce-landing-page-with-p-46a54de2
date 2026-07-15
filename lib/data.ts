export interface NavLink {
  label: string;
  href: string;
  isAnchor?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: "New" | "Sale" | "Hot";
  description: string;
  inStock: boolean;
}

export const APP_NAME = "Datics";
export const APP_TAGLINE = "Next-Level Tech, Delivered.";
export const APP_DESCRIPTION =
  "Premium electronics and gadgets for the modern world.";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "#products" },
  { label: "Deals", href: "#deals" },
  { label: "Categories", href: "#categories" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const CTA_LABEL = "Shop Now";
export const CTA_HREF = "#products";