"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { LanguageSwitcher, useLanguage } from "@/components/language-provider";
import { readCart } from "@/lib/cart-store";
import kmdLogo from "@/resource/kmd-logo.png";

const mainNav = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" }
];

const khmerNav: Record<string, string> = {
  Products: "ផលិតផល",
  Services: "សេវាកម្ម",
  Portfolio: "ស្នាដៃ",
  About: "អំពីយើង"
};

function isCurrentRoute(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const { text } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();
  const closeCart = useCallback(() => setCartOpen(false), []);

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

  useEffect(() => {
    setMobileMenuOpen(false);
    setCartOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [searchOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-sand-400/80 border-t-[3px] border-t-[var(--brand-red)] bg-sand-50/95 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[68px] max-w-screen-2xl items-center gap-3 px-4 md:px-6 xl:px-10">
        <a className="group flex shrink-0 items-center gap-3" href="/" aria-label="Decor home">
          <Image alt="Decor logo" className="h-9 w-auto object-contain transition group-hover:opacity-80" priority src={kmdLogo} />
          <div className="hidden border-l border-sand-400 pl-3 sm:block lg:hidden xl:block">
            <span className="block font-serif text-lg leading-none text-ink-900">{text("Decor", "តុបតែង")}</span>
            <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.18em] text-ink-700 xl:block">
              {text("Products & interiors", "ផលិតផល និងការតុបតែងផ្ទៃក្នុង")}
            </span>
          </div>
        </a>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex" aria-label="Main navigation">
          {mainNav.map((item) => {
            const isActive = isCurrentRoute(pathname, item.href);

            return (
              <a
                key={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative rounded-full px-3 py-2.5 text-sm font-semibold transition xl:px-4 ${
                  isActive
                    ? "bg-sand-100 text-ink-900"
                    : "text-ink-700 hover:bg-sand-100 hover:text-ink-900"
                }`}
                href={item.href}
              >
                {text(item.label, khmerNav[item.label] || item.label)}
                {isActive ? (
                  <span className="absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-red" />
                ) : null}
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1 lg:ml-0">
          <button
            aria-expanded={searchOpen}
            aria-label={text("Search products", "ស្វែងរកផលិតផល")}
            className={`header-tool-button ${searchOpen ? "is-active" : ""}`}
            onClick={() => {
              setMobileMenuOpen(false);
              setSearchOpen((current) => !current);
            }}
            title={text("Search", "ស្វែងរក")}
            type="button"
          >
            <Search size={19} strokeWidth={2.1} />
          </button>
          <div className="hidden lg:block"><LanguageSwitcher /></div>
          <a
            aria-label={text("Account and orders", "គណនី និងការបញ្ជាទិញ")}
            className="header-tool-button hidden lg:flex"
            href="/account"
            title={text("Account and orders", "គណនី និងការបញ្ជាទិញ")}
          >
            <UserRound size={19} strokeWidth={2} />
          </a>
          <button
            aria-label={cartCount > 0 ? text(`Cart with ${cartCount} items`, `កន្ត្រកមានទំនិញ ${cartCount} មុខ`) : text("Cart", "កន្ត្រក")}
            aria-expanded={cartOpen}
            aria-haspopup="dialog"
            className="header-tool-button relative"
            onClick={() => {
              setMobileMenuOpen(false);
              setCartOpen(true);
            }}
            title={text("Cart", "កន្ត្រក")}
            type="button"
          >
            <ShoppingBag size={20} strokeWidth={2.1} />
            {cartCount > 0 ? (
              <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-red px-1 text-[10px] font-bold text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            ) : null}
          </button>
          <button
            aria-expanded={mobileMenuOpen}
            aria-label={text("Open navigation", "បើកម៉ឺនុយ")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-sand-400 text-ink-900 transition hover:bg-sand-100 lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
            type="button"
          >
            <Menu size={21} strokeWidth={2.1} />
          </button>
        </div>
      </div>

      {searchOpen ? (
        <div className="header-search-panel">
          <form action="/products" className="header-search-form">
            <Search />
            <label className="sr-only" htmlFor="header-product-search">{text("Search products", "ស្វែងរកផលិតផល")}</label>
            <input autoFocus id="header-product-search" name="q" placeholder={text("Search products, materials, or brands", "ស្វែងរកផលិតផល សម្ភារៈ ឬម៉ាក")} type="search" />
            <button type="submit">{text("Search", "ស្វែងរក")}</button>
            <button aria-label={text("Close search", "បិទការស្វែងរក")} className="header-search-close" onClick={() => setSearchOpen(false)} type="button"><X /></button>
          </form>
        </div>
      ) : null}

      </header>

      {mobileMenuOpen ? (
        <div
          className="fixed inset-0 z-50 bg-black/35 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          role="presentation"
        >
          <div
            aria-label="Mobile navigation"
            aria-modal="true"
            className="panel-shadow ml-auto flex h-full w-[min(90vw,400px)] flex-col bg-sand-50"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="flex items-center justify-between border-b border-sand-400 px-5 py-4">
              <a className="flex items-center gap-3" href="/" onClick={() => setMobileMenuOpen(false)}>
                <Image alt="Decor logo" className="h-9 w-auto object-contain" src={kmdLogo} />
                <span className="border-l border-sand-400 pl-3 font-serif text-lg text-ink-900">{text("Decor", "តុបតែង")}</span>
              </a>
              <button
                aria-label={text("Close navigation", "បិទម៉ឺនុយ")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-400 text-ink-900 transition hover:bg-sand-100"
                onClick={() => setMobileMenuOpen(false)}
                type="button"
              >
                <X size={19} strokeWidth={2.1} />
              </button>
            </div>

            <div className="border-b border-sand-400 px-5 py-4">
              <LanguageSwitcher variant="panel" />
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-ink-700">{text("Explore", "ស្វែងយល់")}</p>
              <nav className="grid" aria-label="Mobile main navigation">
                {mainNav.map((item, index) => {
                  const isActive = isCurrentRoute(pathname, item.href);

                  return (
                    <a
                      key={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`group flex items-center justify-between border-b border-sand-400/70 py-4 transition ${
                        isActive ? "text-brand-red" : "text-ink-900 hover:text-brand-red"
                      }`}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="flex items-center gap-4">
                        <span className="text-[10px] font-semibold tracking-[0.16em] text-ink-700">0{index + 1}</span>
                        <span className="font-serif text-2xl">{text(item.label, khmerNav[item.label] || item.label)}</span>
                      </span>
                      <ArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={18} strokeWidth={1.8} />
                    </a>
                  );
                })}
              </nav>

              <div className="mt-7 rounded-lg bg-[var(--text)] p-5 text-white">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">{text("Planning a project?", "កំពុងរៀបចំគម្រោង?")}</p>
                <p className="mt-2 font-serif text-xl leading-snug">{text("Get product and installation guidance from our team.", "ទទួលការណែនាំអំពីផលិតផល និងការដំឡើងពីក្រុមការងាររបស់យើង។")}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 border-t border-sand-400 bg-sand-100">
              <a className="flex items-center justify-center gap-2 border-r border-sand-400 px-3 py-4 text-sm font-semibold text-ink-900" href="/account" onClick={() => setMobileMenuOpen(false)}>
                <UserRound size={17} strokeWidth={2} />
                {text("Account", "គណនី")}
              </a>
              <a className="flex items-center justify-center gap-2 px-3 py-4 text-sm font-semibold text-ink-900" href="/wishlist" onClick={() => setMobileMenuOpen(false)}>
                <Heart size={17} strokeWidth={2} />
                {text("Wishlist", "បញ្ជីចំណូលចិត្ត")}
              </a>
            </div>
          </div>
        </div>
      ) : null}

      <CartDrawer onClose={closeCart} open={cartOpen} />
    </>
  );
}
