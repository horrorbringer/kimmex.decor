import Image from "next/image";

import kmdLogo from "@/resource/kmd-logo.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-sand-400 bg-sand-50">
      <div className="content-shell grid gap-8 py-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr]">
        <div>
          <a className="inline-flex items-center gap-3" href="/">
            <span className="relative flex h-12 w-20 items-center justify-center rounded-full border border-sand-400 bg-white p-2 shadow-soft">
              <Image alt="Kimmex Decor logo" className="object-contain" fill sizes="80px" src={kmdLogo} />
            </span>
            <span className="font-serif text-2xl text-ink-900">Kimmex Decor</span>
          </a>
          <p className="mt-3 text-sm leading-7 text-ink-700">
            Construction materials, decor solutions, and project quote support for modern spaces.
          </p>
          <a className="action-commerce mt-5 w-fit" href="/contact">
            Request Quote
          </a>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-ink-700">Shop</div>
          <div className="mt-4 grid gap-3 text-sm text-ink-700">
            <a href="/products">Products</a>
            <a href="/products?category=Gypsum%20Board">Gypsum Board</a>
            <a href="/products?category=Ceiling%20Frame">Ceiling Frame</a>
            <a href="/products?category=Sanitary%20Ware">Sanitary Ware</a>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-ink-700">Project</div>
          <div className="mt-4 grid gap-3 text-sm text-ink-700">
            <a href="/packages">Project Packages</a>
            <a href="/services">Services</a>
            <a href="/portfolio">Portfolio</a>
            <a href="/brands">Brands</a>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-ink-700">Company</div>
          <div className="mt-4 grid gap-3 text-sm text-ink-700">
            <a href="/about">About</a>
            <a href="/resources">Resources</a>
            <a href="/account">Account</a>
            <a href="/contact">Contact</a>
            <div>Phnom Penh, Cambodia</div>
            <div>hello@kimmexdecor.com</div>
            <div>+855 XX XXX XXX</div>
          </div>
        </div>
      </div>
      <div className="border-t border-sand-400 py-4">
        <div className="content-shell flex flex-col gap-2 text-xs text-ink-700 md:flex-row md:items-center md:justify-between">
          <span>© 2026 Kimmex Decor. All rights reserved.</span>
          <span>Retail, contractor, and project purchasing support.</span>
        </div>
      </div>
    </footer>
  );
}
