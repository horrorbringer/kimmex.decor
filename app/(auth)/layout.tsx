import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import kmdLogo from "@/resource/kmd-logo.png";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-sand-50">
      <header className="border-b border-sand-300 bg-white/95">
        <div className="content-shell flex min-h-[72px] items-center justify-between gap-4">
          <Link href="/" aria-label="KM Decor home" className="inline-flex items-center">
            <Image src={kmdLogo} alt="KM Decor" className="h-11 w-auto object-contain" priority />
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-ink-700 transition hover:bg-sand-100 hover:text-brand-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/40"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Back to website</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
