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
import { readCart } from "@/lib/cart-store";
import kmdLogo from "@/resource/kmd-logo.png";

const mainNav = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" }
];

function isCurrentRoute(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
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

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-sand-400/80 border-t-[3px] border-t-[var(--brand-red)] bg-sand-50/95 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[72px] max-w-screen-2xl items-center gap-4 px-4 md:px-6 lg:gap-5 xl:px-10">
        <a className="group flex shrink-0 items-center gap-3" href="/" aria-label="Decor home">
          <Image alt="Decor logo" className="h-9 w-auto object-contain transition group-hover:opacity-80" priority src={kmdLogo} />
          <div className="hidden border-l border-sand-400 pl-3 sm:block">
            <span className="block font-serif text-lg leading-none text-ink-900">Decor</span>
            <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.18em] text-ink-700 xl:block">
              Products &amp; interiors
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
                {item.label}
                {isActive ? (
                  <span className="absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-red" />
                ) : null}
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 lg:ml-0">
          <form action="/products" className="search-group hidden h-11 w-44 grid-cols-[minmax(0,1fr)_44px] rounded-full shadow-none lg:grid xl:w-64">
            <label className="sr-only" htmlFor="desktop-product-search">
              Search products
            </label>
            <input
              className="field min-w-0 rounded-none border-0 bg-transparent py-2.5 pl-4 pr-1"
              id="desktop-product-search"
              name="q"
              placeholder="Search products"
              type="search"
            />
            <button aria-label="Search products" className="flex items-center justify-center text-ink-700 transition hover:text-brand-red" type="submit">
              <Search size={18} strokeWidth={2.1} />
            </button>
          </form>

          <a className="action-commerce hidden gap-2 whitespace-nowrap px-4 lg:inline-flex" href="/contact">
            Request Quote
            <ArrowUpRight size={16} strokeWidth={2.2} />
          </a>

          <a
            aria-label="Account and orders"
            className="hidden h-11 w-11 items-center justify-center rounded-full text-ink-700 transition hover:bg-sand-100 hover:text-ink-900 lg:flex"
            href="/account"
            title="Account and orders"
          >
            <UserRound size={19} strokeWidth={2} />
          </a>
          <a
            aria-label="Wishlist"
            className="hidden h-11 w-11 items-center justify-center rounded-full text-ink-700 transition hover:bg-sand-100 hover:text-brand-red lg:flex"
            href="/wishlist"
            title="Wishlist"
          >
            <Heart size={19} strokeWidth={2} />
          </a>
          <button
            aria-label={cartCount > 0 ? `Cart with ${cartCount} items` : "Cart"}
            aria-expanded={cartOpen}
            aria-haspopup="dialog"
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-ink-900 transition hover:bg-sand-100 hover:text-brand-red"
            onClick={() => {
              setMobileMenuOpen(false);
              setCartOpen(true);
            }}
            title="Cart"
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
            aria-label="Open navigation"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-sand-400 text-ink-900 transition hover:bg-sand-100 lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
            type="button"
          >
            <Menu size={21} strokeWidth={2.1} />
          </button>
        </div>
      </div>

      <div className="border-t border-sand-400/70 px-4 pb-3 pt-2 md:px-6 lg:hidden">
        <form action="/products" className="search-group mx-auto grid max-w-2xl grid-cols-[minmax(0,1fr)_48px] rounded-full shadow-none">
          <label className="sr-only" htmlFor="mobile-product-search">
            Search products
          </label>
          <input
            className="field min-w-0 rounded-none border-0 bg-transparent py-2.5 pl-4 pr-1"
            id="mobile-product-search"
            name="q"
            placeholder="Search products, materials..."
            type="search"
          />
          <button aria-label="Search products" className="flex items-center justify-center text-brand-red" type="submit">
            <Search size={18} strokeWidth={2.2} />
          </button>
        </form>
      </div>

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
                <span className="border-l border-sand-400 pl-3 font-serif text-lg text-ink-900">Decor</span>
              </a>
              <button
                aria-label="Close navigation"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-400 text-ink-900 transition hover:bg-sand-100"
                onClick={() => setMobileMenuOpen(false)}
                type="button"
              >
                <X size={19} strokeWidth={2.1} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-ink-700">Explore</p>
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
                        <span className="font-serif text-2xl">{item.label}</span>
                      </span>
                      <ArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={18} strokeWidth={1.8} />
                    </a>
                  );
                })}
              </nav>

              <div className="mt-7 rounded-lg bg-[var(--text)] p-5 text-white">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">Planning a project?</p>
                <p className="mt-2 font-serif text-xl leading-snug">Get product and installation guidance from our team.</p>
                <a className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white" href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Request Quote
                  <ArrowUpRight size={16} strokeWidth={2.2} />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 border-t border-sand-400 bg-sand-100">
              <a className="flex items-center justify-center gap-2 border-r border-sand-400 px-3 py-4 text-sm font-semibold text-ink-900" href="/account" onClick={() => setMobileMenuOpen(false)}>
                <UserRound size={17} strokeWidth={2} />
                Account
              </a>
              <a className="flex items-center justify-center gap-2 px-3 py-4 text-sm font-semibold text-ink-900" href="/wishlist" onClick={() => setMobileMenuOpen(false)}>
                <Heart size={17} strokeWidth={2} />
                Wishlist
              </a>
            </div>
          </div>
        </div>
      ) : null}

      <CartDrawer onClose={closeCart} open={cartOpen} />
    </>
  );
}
