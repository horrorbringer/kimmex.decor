"use client";

import Image from "next/image";
import { Heart, Menu, Search, ShoppingCart, UserRound, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { readCart } from "@/lib/cart-store";
import kmdLogo from "@/resource/kmd-logo.png";
import { ImageSearchButton } from "@/components/search/image-search-button";

const mainNav = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" }
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();

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
      <div className="mx-auto grid max-w-screen-2xl grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 md:px-6 lg:grid-cols-[220px_minmax(0,1fr)_auto] lg:gap-5 xl:px-10">
        <a className="flex items-center gap-3" href="/">
          <Image alt="Kimmex Decor logo" className="h-10 w-auto object-contain" priority src={kmdLogo} />
          <span className="font-serif text-xl text-ink-900">Decor</span>
        </a>

        <form action="/products" className="search-group order-3 col-span-2 grid-cols-[minmax(0,1fr)_auto_auto] lg:order-none lg:col-span-1">
          <input className="field min-w-0 rounded-none border-0" name="q" placeholder="Search product, SKU, brand, material..." type="search" />
          <ImageSearchButton
            compact
            className="flex min-h-11 items-center justify-center border-x border-sand-400 bg-sand-50 px-3 text-ink-900 transition hover:text-brand-red"
            label="Photo"
          />
          <button aria-label="Search" className="flex items-center justify-center bg-brand-red px-4 text-white transition" type="submit">
            <Search size={16} strokeWidth={2.2} />
          </button>
        </form>

        <div className="flex items-center justify-end gap-2 text-sm">
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
            className="hidden min-h-11 items-center gap-2 rounded-md px-3 py-2 text-ink-700 transition hover:bg-sand-100 hover:text-ink-900 sm:flex"
            href="/account"
            aria-label="Account"
          >
            <UserRound size={19} strokeWidth={2.1} />
            <span className="hidden xl:block">Account</span>
          </a>
          <a
            className="hidden min-h-11 items-center gap-2 rounded-md px-3 py-2 text-ink-700 transition hover:bg-sand-100 hover:text-ink-900 md:flex"
            href="/wishlist"
            aria-label="Saved products"
          >
            <Heart size={19} strokeWidth={2.1} />
            <span className="hidden xl:block">Saved</span>
          </a>
          <a
            className="relative flex min-h-11 items-center gap-2 rounded-md px-3 py-2 font-semibold text-brand-red transition hover:bg-sand-100"
            href="/cart"
            aria-label="Cart"
          >
            <ShoppingCart size={20} strokeWidth={2.2} />
            <span className="hidden sm:inline">Cart</span>
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full border border-sand-50 bg-sand-50 px-1 text-xs font-semibold text-brand-red">
              {cartCount}
            </span>
          </a>
        </div>
      </div>

      <div className="hidden border-t border-sand-400/70 lg:block">
        <nav className="mx-auto flex max-w-screen-2xl items-center gap-1 px-6 xl:px-10" aria-label="Main navigation">
          {mainNav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <a
                key={item.href}
                className={`border-b-2 px-4 py-3 text-sm font-semibold transition hover:bg-sand-100 hover:text-brand-red ${
                  isActive ? "border-brand-red text-brand-red" : "border-transparent text-ink-900"
                }`}
                href={item.href}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
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
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
