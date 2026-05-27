"use client";

import Image from "next/image";
import { Heart, Menu, Search, ShoppingCart, UserRound, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { readCart } from "@/lib/cart-store";
import { shopCategories } from "@/lib/homepage-data";
import kmdLogo from "@/resource/kmd-logo.png";
import { ImageSearchButton } from "@/components/search/image-search-button";

const mainNav = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Project Packages", href: "/packages" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" }
];

const navPanels: Record<string, { title: string; links: Array<{ label: string; href: string }>; cta?: { label: string; href: string } }> = {
  "Project Packages": {
    title: "Project packages",
    links: [
      { label: "Ceiling Installation Package", href: "/packages" },
      { label: "Partition Wall Package", href: "/packages" },
      { label: "Bathroom Upgrade Package", href: "/packages" }
    ],
    cta: { label: "Request Package Quote", href: "/packages" }
  },
  Resources: {
    title: "Buying help",
    links: [
      { label: "Material Buying Guides", href: "/resources" },
      { label: "Installation Guides", href: "/resources" },
      { label: "FAQ", href: "/resources" },
      { label: "Contractor Account Guide", href: "/resources" }
    ],
    cta: { label: "Read Resources", href: "/resources" }
  }
};

const quickLinks = ["B2B Quote", "Project Packages", "Installation", "Delivery Support"];

const categoryGroups = [
  {
    title: "Core Materials",
    description: "Boards, frames, panels, and wall systems for daily project supply.",
    items: ["Gypsum Board", "Eco Block Ceiling Board", "Cline & Partition Frame", "Wall Systems"]
  },
  {
    title: "Finish & Fixture",
    description: "Visible finish products for home, office, bathroom, and smart spaces.",
    items: ["Sanitary Ware", "Decor Materials", "Furniture Decor", "Smart Home"]
  },
  {
    title: "Project Buying",
    description: "Quote, package, delivery, and bulk order support for B2B buyers.",
    items: ["Contractor Quote", "Bulk Order", "Delivery Support", "Project Packages"]
  }
];

const featuredDepartments = ["Gypsum Board", "Eco Block Ceiling Board", "Cline & Partition Frame", "Sanitary Ware"];

const serviceMegaGroups = [
  {
    title: "Finished Ceiling Decor",
    description: "Stretch, moisture, reflect, eco-block, PVC, AK wood, and LED ceiling options.",
    href: "/services/ceiling",
    links: ["Stretch ceiling", "Moisture ceiling", "Reflect ceiling", "LED ceiling"]
  },
  {
    title: "Partition & Wall Decor",
    description: "Room division, wall finish, and smart board systems for residential and commercial interiors.",
    href: "/services/partition",
    links: ["Smart board", "Sound-control board", "Partition room", "Wall finishing"]
  },
  {
    title: "Furniture Decor",
    description: "Built-in and custom interior furniture work connected to material supply.",
    href: "/services/furniture",
    links: ["Door", "Counter", "Cabinet", "Desk and shelf"]
  },
  {
    title: "Smart Home & Materials",
    description: "Smart access, control products, and selected building material support.",
    href: "/services/smart-home",
    links: ["Smart lock", "Smart home control", "ATS / MDB", "Duct"]
  }
];

export function SiteHeader() {
  const [showUtilityBar, setShowUtilityBar] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      setShowUtilityBar(window.scrollY < 24);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const syncCartCount = () => {
      setCartCount(readCart().reduce((count, item) => count + item.quantity, 0));
    };

    syncCartCount();
    window.addEventListener("kmd-cart-updated", syncCartCount);
    window.addEventListener("storage", syncCartCount);

    return () => {
      window.removeEventListener("kmd-cart-updated", syncCartCount);
      window.removeEventListener("storage", syncCartCount);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-sand-400/80 bg-sand-50/95 backdrop-blur">
      <div
        className={`overflow-hidden border-b border-sand-400/70 bg-sand-100/80 transition-all duration-300 ${
          showUtilityBar ? "max-h-10 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 text-xs text-ink-700 md:px-10 lg:px-12">
          <div className="hidden md:block">Welcome to Kimmex Decor marketplace | Contractor pricing available</div>
          <div className="flex w-full items-center justify-between gap-4 md:w-auto md:justify-end">
            <a className="hover:text-ink-900" href="/contact">
              Request B2B Quote
            </a>
            <a className="hover:text-ink-900" href="/account">
              Track Order
            </a>
            <span>English</span>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-screen-2xl gap-4 px-4 py-3 md:px-6 lg:grid-cols-[230px_1fr_auto] lg:items-center xl:px-10">
        <a className="flex items-center gap-3" href="/">
          <Image alt="Kimmex Decor logo" className="h-10 w-auto object-contain" priority src={kmdLogo} />
          <div>
            <div className="font-serif text-xl text-ink-900">Kimmex Decor</div>
          </div>
        </a>

        <form action="/products" className="search-group grid-cols-1 md:grid-cols-[170px_1fr_auto_auto]">
          <select className="select-field rounded-none border-0 border-b border-sand-400 bg-sand-100 md:border-b-0 md:border-r" name="category">
            <option>All Categories</option>
            {shopCategories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          <input className="field min-w-0 rounded-none border-0" name="q" placeholder="Search product, SKU, brand, material..." type="search" />
          <ImageSearchButton
            compact
            className="flex min-h-11 items-center justify-center gap-2 border-y border-sand-400 bg-sand-50 px-4 py-3 text-sm font-semibold text-ink-900 transition hover:text-brand-red md:border-x md:border-y-0"
            label="Search by photo"
          />
          <button className="flex items-center justify-center gap-2 bg-brand-red px-6 py-3 text-sm font-semibold text-white transition" type="submit">
            <Search size={16} strokeWidth={2.2} />
            <span>Search</span>
          </button>
        </form>

        <div className="flex items-center justify-end gap-2 text-sm lg:min-w-[290px]">
          <button
            aria-expanded={mobileMenuOpen}
            aria-label="Open menu"
            className="flex min-h-11 items-center justify-center rounded-md border border-sand-400 bg-sand-50 px-3 text-ink-900 transition hover:bg-sand-100 lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
            type="button"
          >
            <Menu size={21} strokeWidth={2.2} />
          </button>
          <a
            className="group flex min-h-11 items-center gap-2 rounded-md border border-sand-400 bg-sand-50 px-3 py-2 text-ink-700 transition hover:border-bronze-500 hover:bg-sand-100 hover:text-ink-900"
            href="/account"
            aria-label="Account"
          >
            <UserRound size={19} strokeWidth={2.1} />
            <span className="hidden xl:block">Account</span>
          </a>
          <a
            className="group flex min-h-11 items-center gap-2 rounded-md border border-sand-400 bg-sand-50 px-3 py-2 text-ink-700 transition hover:border-bronze-500 hover:bg-sand-100 hover:text-ink-900"
            href="/wishlist"
            aria-label="Saved products"
          >
            <Heart size={19} strokeWidth={2.1} />
            <span className="hidden xl:block">Saved</span>
          </a>
          <a
            className="relative flex min-h-11 items-center gap-2 rounded-md border border-brand-red bg-sand-50 px-3 py-2 font-semibold text-brand-red transition hover:bg-brand-red hover:text-white"
            href="/cart"
            aria-label="Cart"
          >
            <ShoppingCart size={20} strokeWidth={2.2} />
            <span>Cart</span>
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full border border-sand-50 bg-sand-50 px-1 text-xs font-semibold text-brand-red">
              {cartCount}
            </span>
          </a>
        </div>
      </div>

      <div className="border-t border-sand-400/70">
        <div className="mx-auto flex max-w-screen-2xl items-stretch gap-3 px-4 md:px-6 xl:px-10">
          <div className="group static">
            <a
              className="relative flex h-full min-w-[230px] items-center gap-3 rounded-t-lg bg-bronze-500 px-4 py-3 text-white transition group-hover:bg-bronze-600"
              href="/products"
            >
              <span className="grid h-8 w-8 shrink-0 grid-cols-2 gap-1 rounded-md bg-white/12 p-1.5">
                <span className="rounded-sm bg-white" />
                <span className="rounded-sm bg-white" />
                <span className="rounded-sm bg-white" />
                <span className="rounded-sm bg-white" />
              </span>
              <span className="grid min-w-0">
                <span className="text-sm font-semibold uppercase tracking-[0.12em]">Departments</span>
                <span className="truncate text-xs text-white/80">Products, packages, quote paths</span>
              </span>
              <span className="ml-auto text-lg leading-none transition group-hover:rotate-180" aria-hidden="true">
                v
              </span>
              <span className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-brand-red transition group-hover:scale-x-100" />
            </a>
            <div className="panel-shadow invisible absolute left-0 right-0 top-full z-50 translate-y-2 border-t border-sand-400 bg-sand-50 opacity-0 transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="mx-auto grid max-w-screen-2xl gap-6 px-4 py-5 md:px-6 lg:grid-cols-[250px_1fr_300px] xl:px-10">
                <nav className="border-r border-sand-400 pr-5">
                  <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-700">Shopping departments</div>
                  <div className="grid">
                    {featuredDepartments.map((item) => (
                      <a key={item} className="flex items-center justify-between border-b border-sand-400 px-1 py-3 text-sm font-semibold text-ink-900 transition hover:text-brand-red" href={`/products?category=${encodeURIComponent(item)}`}>
                        {item}
                        <span className="text-brand-red">→</span>
                      </a>
                    ))}
                    <a className="flex items-center justify-between px-1 py-3 text-sm font-semibold text-ink-900 transition hover:text-brand-red" href="/contact">
                      B2B Quote Desk
                      <span className="text-brand-red">→</span>
                    </a>
                  </div>
                </nav>

                <div className="grid gap-8 md:grid-cols-3">
                  {categoryGroups.map((group) => (
                    <div key={group.title}>
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-700">{group.title}</div>
                      <p className="mt-2 text-sm leading-6 text-ink-700">{group.description}</p>
                      <div className="mt-4 grid gap-2">
                        {group.items.map((item) => (
                          <a
                            key={item}
                            className="text-sm font-medium text-ink-900 transition hover:text-brand-red"
                            href={item.includes("Quote") || item.includes("Support") ? "/contact" : item.includes("Bulk") || item.includes("Packages") ? "/packages" : "/products"}
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg bg-sand-100 p-5">
                  <div className="promo-chip">B2B Quote</div>
                  <div className="mt-4 font-serif text-2xl leading-tight text-ink-900">Need project pricing?</div>
                  <p className="mt-2 text-sm leading-6 text-ink-700">Send your material list, location, and quantity for a contractor quote.</p>
                  <a className="action-commerce mt-5 w-full" href="/contact">
                    Start Quote
                  </a>
                </div>
              </div>
            </div>
          </div>

          <nav className="hidden items-stretch gap-1 lg:flex">
            {mainNav.map((item) => {
              const panel = navPanels[item.label];
              const isServices = item.label === "Services";

              return (
                <div key={item.label} className={`group/nav ${isServices ? "static" : "relative"}`}>
                  <a className="flex min-w-24 items-center justify-center px-4 py-2.5 text-center transition hover:bg-sand-100" href={item.href}>
                    <span className={`text-sm font-semibold ${pathname === item.href ? "text-brand-red" : "text-ink-900"}`}>{item.label}</span>
                  </a>
                  {isServices ? (
                    <div className="panel-shadow invisible absolute left-0 right-0 top-full z-50 translate-y-2 border-t border-sand-400 bg-sand-50 opacity-0 transition duration-200 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100">
                      <div className="mx-auto grid max-w-screen-2xl gap-6 px-4 py-6 md:px-6 lg:grid-cols-[300px_1fr_280px] xl:px-10">
                        <div>
                          <div className="promo-chip w-fit">KMD Services</div>
                          <h2 className="mt-4 font-serif text-3xl leading-tight text-ink-900">Interior decor and project service support.</h2>
                          <p className="mt-3 text-sm leading-6 text-ink-700">
                            Choose a service path, then send location and requirements for advice or quotation.
                          </p>
                          <a className="action-commerce mt-5" href="/services">
                            Explore Services
                          </a>
                        </div>

                        <div className="grid gap-x-8 gap-y-5 md:grid-cols-2">
                          {serviceMegaGroups.map((group) => (
                            <div key={group.title}>
                              <div className="border-b border-sand-400 pb-2 font-semibold text-ink-900">{group.title}</div>
                              <p className="mt-2 text-xs leading-5 text-ink-700">{group.description}</p>
                              <div className="mt-3 grid gap-1">
                                {group.links.map((link) => (
                                  <a
                                    key={link}
                                    className="rounded-md py-1.5 text-sm font-medium text-ink-900 transition hover:text-brand-red"
                                    href={group.href}
                                  >
                                    {link}
                                  </a>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="rounded-xl bg-sand-100 p-5">
                          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-700">Service quote</div>
                          <h3 className="mt-3 font-serif text-2xl leading-tight text-ink-900">Need advice?</h3>
                          <p className="mt-2 text-sm leading-6 text-ink-700">
                            Share your requirement and appointment time.
                          </p>
                          <a className="action-secondary mt-5 w-full bg-white" href="/contact">
                            Request Service Advice
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : panel ? (
                    <div className="panel-shadow invisible absolute left-0 top-full z-50 w-80 translate-y-2 rounded-b-lg border border-sand-400 bg-sand-50 p-4 opacity-0 transition duration-200 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100">
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-700">{panel.title}</div>
                      <div className="mt-3 grid gap-1">
                        {panel.links.map((link) => (
                          <a key={link.label} className="rounded-md px-3 py-2 text-sm font-medium text-ink-900 transition hover:bg-sand-100 hover:text-brand-red" href={link.href}>
                            {link.label}
                          </a>
                        ))}
                      </div>
                      {panel.cta ? (
                        <a className="action-secondary mt-4 w-full" href={panel.cta.href}>
                          {panel.cta.label}
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <div className="ml-auto hidden items-center gap-4 text-xs text-ink-700 xl:flex">
            {quickLinks.map((item) => (
              <a key={item} className="whitespace-nowrap hover:text-ink-900" href={item === "Project Packages" ? "/packages" : "/contact"}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
      {mobileMenuOpen ? (
        <div className="fixed inset-0 z-50 bg-black/30 lg:hidden" role="presentation">
          <div className="panel-shadow ml-auto flex h-full w-[min(88vw,390px)] flex-col bg-sand-50">
            <div className="flex items-center justify-between border-b border-sand-400 p-4">
              <div className="flex items-center gap-3">
                <Image alt="Kimmex Decor logo" className="h-9 w-auto object-contain" src={kmdLogo} />
                <div className="font-serif text-lg text-ink-900">Kimmex Decor</div>
              </div>
              <button
                aria-label="Close menu"
                className="rounded-md border border-sand-400 p-2 text-ink-900"
                onClick={() => setMobileMenuOpen(false)}
                type="button"
              >
                <X size={20} strokeWidth={2.2} />
              </button>
            </div>
            <div className="grid gap-5 overflow-y-auto p-4">
              <form action="/products" className="grid gap-3">
                <input className="field" name="q" placeholder="Search products..." type="search" />
                <div className="grid grid-cols-[1fr_auto] gap-2">
                  <button className="action-commerce" type="submit">
                    Search Catalog
                  </button>
                  <ImageSearchButton compact label="Search by photo" />
                </div>
              </form>
              <nav className="grid gap-1">
                {mainNav.map((item) => (
                  <a
                    key={item.href}
                    className={`rounded-md px-3 py-3 text-sm font-semibold transition hover:bg-sand-100 ${
                      pathname === item.href ? "text-brand-red" : "text-ink-900"
                    }`}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="grid gap-2 border-t border-sand-400 pt-4">
                <a className="rounded-md border border-sand-400 px-3 py-3 text-sm font-semibold text-ink-900" href="/account" onClick={() => setMobileMenuOpen(false)}>
                  Account and Orders
                </a>
                <a className="rounded-md border border-sand-400 px-3 py-3 text-sm font-semibold text-ink-900" href="/wishlist" onClick={() => setMobileMenuOpen(false)}>
                  Saved Products
                </a>
                <a className="action-commerce" href="/cart" onClick={() => setMobileMenuOpen(false)}>
                  View Cart{cartCount > 0 ? ` (${cartCount})` : ""}
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
