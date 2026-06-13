import Image from "next/image";
import { ArrowRight, MapPin, Phone } from "lucide-react";

import kmdLogo from "@/resource/kmd-logo.png";

const exploreLinks = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" }
];

const customerLinks = [
  { label: "Account and Orders", href: "/account" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Shopping Cart", href: "/cart" }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-sand-400 bg-sand-50">
      <div className="content-shell grid gap-8 py-8 md:grid-cols-2 lg:grid-cols-[1.15fr_0.85fr_1fr] lg:items-start">
        <div>
          <a className="inline-flex items-center gap-3" href="/">
            <span className="relative flex h-12 w-20 items-center justify-center rounded-full border border-sand-400 bg-white p-2 shadow-soft">
              <Image alt="Decor logo" className="object-contain" fill sizes="80px" src={kmdLogo} />
            </span>
            <span className="font-serif text-2xl text-ink-900">Decor</span>
          </a>
          <p className="mt-3 max-w-md text-sm leading-6 text-ink-700">
            Construction materials, interior decor services, and project support for residential and commercial spaces.
          </p>
          <a className="action-commerce mt-4 w-fit" href="/contact">
            Request Quote
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <FooterLinks links={exploreLinks} title="Explore" />
          <FooterLinks links={customerLinks} title="Customer" />
        </div>

        <div className="md:col-span-2 lg:col-span-1">
          <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-ink-700">Visit or Call</h2>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-ink-700">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-brand-red" />
              <span>#54, St. 590, Sangkat Boeung Kok II, Khan Toul Kork, Phnom Penh, Cambodia</span>
            </div>
            <a className="flex items-center gap-3 transition hover:text-brand-red" href="tel:+85516927683">
              <Phone className="h-4 w-4 shrink-0 text-brand-red" />
              <span>+855 16 92 76 83</span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-sand-400 py-3">
        <div className="content-shell flex flex-col gap-2 text-xs text-ink-700 md:flex-row md:items-center md:justify-between">
          <span>© 2026 Decor. All rights reserved.</span>
          <span>Materials, interior services, and project support.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({ links, title }: { links: Array<{ label: string; href: string }>; title: string }) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-ink-700">{title}</h2>
      <nav className="mt-4 grid gap-2.5 text-sm text-ink-700" aria-label={`${title} links`}>
        {links.map((link) => (
          <a key={link.href} className="w-fit transition hover:text-brand-red" href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
