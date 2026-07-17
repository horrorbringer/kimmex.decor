"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronDown,
  Heart,
  LogOut,
  Menu,
  PackageCheck,
  Search,
  ShoppingBag,
  UserRound,
  X
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { LanguageSwitcher, useLanguage } from "@/components/language-provider";
import { readCart } from "@/lib/cart-store";
import { useAuth } from "@/lib/auth-context";
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

const searchSuggestions = ["gypsum board", "partition", "ceiling", "smart lock"];

function isCurrentRoute(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const { text } = useLanguage();
  const { user, isAuthenticated, clearAuth } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();
  const closeCart = useCallback(() => setCartOpen(false), []);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileDialogRef = useRef<HTMLDivElement>(null);
  const userInitial = user?.name?.trim().charAt(0).toUpperCase() || user?.email?.trim().charAt(0).toUpperCase() || "U";
  const handleSignOut = useCallback(() => {
    clearAuth();
    setMobileMenuOpen(false);
    setAccountMenuOpen(false);
    setSearchOpen(false);

    if (pathname.startsWith("/account") || pathname.startsWith("/orders") || pathname === "/checkout") {
      window.location.href = "/login";
    }
  }, [clearAuth, pathname]);

  useEffect(() => {
    setMounted(true);
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

  useEffect(() => {
    setMobileMenuOpen(false);
    setAccountMenuOpen(false);
    setCartOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = mobileDialogRef.current;
    const focusableSelector = "a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex='-1'])";
    const focusableElements = () => Array.from(dialog?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);
    const focusTimer = window.setTimeout(() => focusableElements()[0]?.focus(), 0);

    const handleDialogKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const elements = focusableElements();
      if (elements.length === 0) return;
      const first = elements[0];
      const last = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleDialogKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleDialogKeyDown);
      (previousFocus ?? mobileMenuButtonRef.current)?.focus();
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!searchOpen && !accountMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSearchOpen(false);
      if (event.key === "Escape") setAccountMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [accountMenuOpen, searchOpen]);

  useEffect(() => {
    if (!accountMenuOpen) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!accountMenuRef.current?.contains(event.target as Node)) {
        setAccountMenuOpen(false);
      }
    };

    window.addEventListener("mousedown", closeOnOutsideClick);

    return () => window.removeEventListener("mousedown", closeOnOutsideClick);
  }, [accountMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-sand-400/80 border-t-[3px] border-t-[var(--brand-red)] bg-sand-50/95 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[68px] max-w-screen-2xl items-center gap-3 px-4 md:px-6 xl:px-10">
        <Link className="group flex shrink-0 items-center gap-3" href="/" aria-label="Decor home">
          <Image alt="Decor logo" className="h-9 w-auto object-contain transition group-hover:opacity-80" priority src={kmdLogo} width={36} height={36} />
          <div className="hidden border-l border-sand-400 pl-3 sm:block lg:hidden xl:block">
            <span className="block font-serif text-lg leading-none text-ink-900">{text("Decor", "តុបតែង")}</span>
            <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.18em] text-ink-700 xl:block">
              {text("Products & interiors", "ផលិតផល និងការតុបតែងផ្ទៃក្នុង")}
            </span>
          </div>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex" aria-label="Main navigation">
          {mainNav.map((item) => {
            const isActive = isCurrentRoute(pathname, item.href);

            return (
              <Link
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
                </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1 lg:ml-0">
          <button
            ref={mobileMenuButtonRef}
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
          <div className="flex items-center gap-2" aria-label={text("Account", "គណនី")}>
            {mounted && isAuthenticated ? (
                <div className="header-account-menu hidden lg:block" ref={accountMenuRef}>
                  <button
                    aria-expanded={accountMenuOpen}
                    aria-haspopup="menu"
                    aria-label={text("Open account menu", "បើកម៉ឺនុយគណនី")}
                    className="header-account-button"
                    onClick={() => {
                      setSearchOpen(false);
                      setAccountMenuOpen((current) => !current);
                    }}
                    type="button"
                  >
                    <span className="header-account-avatar">{userInitial}</span>
                    <span className="min-w-0 text-left">
                      <span className="block text-[10px] font-semibold uppercase leading-none tracking-[0.12em] text-ink-700">
                        {text("Account", "គណនី")}
                      </span>
                      <span className="mt-0.5 block max-w-[120px] truncate text-sm font-semibold leading-tight text-ink-900">
                        {user?.name || user?.email}
                      </span>
                    </span>
                    <ChevronDown className={accountMenuOpen ? "is-open" : ""} size={16} strokeWidth={2} />
                  </button>
                  {accountMenuOpen ? (
                    <div className="header-account-popover" role="menu">
                      <div className="header-account-summary">
                        <span className="header-account-avatar">{userInitial}</span>
                        <div>
                          <strong>{user?.name || text("Customer", "អតិថិជន")}</strong>
                          <small>{user?.email}</small>
                        </div>
                      </div>
                      <Link href="/account" onClick={() => setAccountMenuOpen(false)} role="menuitem">
                        <UserRound size={17} strokeWidth={2} />
                        <span>{text("Account dashboard", "ផ្ទាំងគណនី")}</span>
                      </Link>
                      <Link href="/orders" onClick={() => setAccountMenuOpen(false)} role="menuitem">
                        <PackageCheck size={17} strokeWidth={2} />
                        <span>{text("Orders", "ការបញ្ជាទិញ")}</span>
                      </Link>
                      <button onClick={handleSignOut} role="menuitem" type="button">
                        <LogOut size={17} strokeWidth={2} />
                        <span>{text("Sign out", "ចាកចេញ")}</span>
                      </button>
                    </div>
                  ) : null}
                </div>
            ) : (
                <div className="header-auth-actions hidden lg:flex">
                  <Link className="header-signin-button" href="/login" title={text("Sign in", "ចូល")}>
                    <span className="header-signin-icon">
                      <UserRound size={17} strokeWidth={2} />
                    </span>
                    <span className="header-signin-copy">
                      <span>{text("Sign in", "ចូល")}</span>
                      <small>{text("Track orders", "តាមដានការបញ្ជាទិញ")}</small>
                    </span>
                  </Link>
                  <Link className="header-register-button" href="/register">
                    {text("Create account", "បង្កើតគណនី")}
                  </Link>
                </div>
            )}
          </div>
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
            {mounted && cartCount > 0 ? (
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
          <form action="/search" className="header-search-form">
            <Search />
            <label className="sr-only" htmlFor="header-product-search">{text("Search KM Decor", "ស្វែងរក KM Decor")}</label>
            <input autoFocus id="header-product-search" name="q" placeholder={text("Search products, services, brands, or materials", "ស្វែងរកផលិតផល សេវាកម្ម ម៉ាក ឬសម្ភារៈ")} type="search" />
            <button type="submit">{text("Search", "ស្វែងរក")}</button>
            <button aria-label={text("Close search", "បិទការស្វែងរក")} className="header-search-close" onClick={() => setSearchOpen(false)} type="button"><X /></button>
          </form>
          <div className="header-search-suggestions" aria-label={text("Suggested searches", "ការស្វែងរកដែលបានណែនាំ")}>
            <span>{text("Popular", "ពេញនិយម")}</span>
            {searchSuggestions.map((suggestion) => (
              <Link key={suggestion} href={`/search?q=${encodeURIComponent(suggestion)}`} onClick={() => setSearchOpen(false)}>
                {suggestion}
              </Link>
            ))}
          </div>
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
            ref={mobileDialogRef}
            aria-label="Mobile navigation"
            aria-modal="true"
            className="panel-shadow ml-auto flex h-full w-[min(90vw,400px)] flex-col bg-sand-50 animate-slide-in-right"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="flex items-center justify-between border-b border-sand-400 px-5 py-4">
              <Link className="flex items-center gap-3" href="/" onClick={() => setMobileMenuOpen(false)}>
                <Image alt="Decor logo" className="h-9 w-auto object-contain" src={kmdLogo} width={36} height={36} />
                <span className="border-l border-sand-400 pl-3 font-serif text-lg text-ink-900">{text("Decor", "តុបតែង")}</span>
              </Link>
              <button
                aria-label={text("Close navigation", "បិទម៉ឺនុយ")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-400 text-ink-900 transition hover:bg-sand-100"
                onClick={() => setMobileMenuOpen(false)}
                type="button"
              >
                <X size={19} strokeWidth={2.1} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-ink-700">{text("Explore", "ស្វែងយល់")}</p>
              <nav className="grid" aria-label="Mobile main navigation">
                {mainNav.map((item, index) => {
                  const isActive = isCurrentRoute(pathname, item.href);

                  return (
                    <Link
                      key={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`group flex min-h-14 items-center justify-between border-b border-sand-400/70 py-3 transition ${
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
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-7">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-ink-700">{text("Your space", "សម្រាប់អ្នក")}</p>
                <div className="grid gap-1">
                  <Link className="mobile-drawer-link" href="/wishlist" onClick={() => setMobileMenuOpen(false)}>
                    <Heart />
                    <span>{text("Wishlist", "ចំណូលចិត្ត")}</span>
                    <ArrowUpRight />
                  </Link>
                  {isAuthenticated ? (
                    <>
                      <Link className="mobile-drawer-link" href="/account" onClick={() => setMobileMenuOpen(false)}>
                        <UserRound />
                        <span>{text("Account dashboard", "ផ្ទាំងគណនី")}</span>
                        <ArrowUpRight />
                      </Link>
                      <Link className="mobile-drawer-link" href="/orders" onClick={() => setMobileMenuOpen(false)}>
                        <PackageCheck />
                        <span>{text("Orders", "ការបញ្ជាទិញ")}</span>
                        <ArrowUpRight />
                      </Link>
                      <button className="mobile-drawer-link" onClick={handleSignOut} type="button">
                        <LogOut />
                        <span>{text("Sign out", "ចាកចេញ")}</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link className="mobile-drawer-link" href="/login" onClick={() => setMobileMenuOpen(false)}>
                        <UserRound />
                        <span>{text("Sign in", "ចូល")}</span>
                        <ArrowUpRight />
                      </Link>
                      <Link className="mobile-drawer-link" href="/register" onClick={() => setMobileMenuOpen(false)}>
                        <UserRound />
                        <span>{text("Create account", "បង្កើតគណនី")}</span>
                        <ArrowUpRight />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-sand-400 bg-sand-100 px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <LanguageSwitcher variant="panel" />
            </div>
          </div>
        </div>
      ) : null}

      <CartDrawer onClose={closeCart} open={cartOpen} />
    </>
  );
}
