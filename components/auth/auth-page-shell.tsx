import { ArrowLeft, Heart, PackageCheck, ShieldCheck } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const benefits = [
  { Icon: PackageCheck, title: "Track every request", copy: "Keep orders, quotes, and delivery progress together." },
  { Icon: Heart, title: "Save products", copy: "Return to materials you are considering from any device." },
  { Icon: ShieldCheck, title: "Faster checkout", copy: "Reuse your customer details securely on future requests." },
];

export function AuthPageShell({ children, description, eyebrow, title }: {
  children: ReactNode;
  description: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <main className="min-h-[calc(100vh-71px)] bg-sand-50">
      <div className="content-shell py-6 lg:py-12">
        <Link className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink-700 transition hover:text-brand-red" href="/">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <div className="mt-5 grid overflow-hidden rounded-xl border border-sand-400 bg-white shadow-panel lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="hidden bg-[var(--text)] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">KM Decor account</p>
              <h2 className="mt-4 max-w-md font-serif text-4xl leading-tight">Plan, save, and follow your project in one place.</h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/65">Built for homeowners, project buyers, and contractors who need a clearer path from product selection to delivery.</p>
            </div>
            <div className="mt-10 grid gap-5">
              {benefits.map(({ Icon, title: benefitTitle, copy }) => (
                <div className="flex items-start gap-4" key={benefitTitle}>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/10 text-white"><Icon className="h-5 w-5" /></span>
                  <div><h3 className="font-semibold">{benefitTitle}</h3><p className="mt-1 text-sm leading-6 text-white/60">{copy}</p></div>
                </div>
              ))}
            </div>
          </aside>

          <section className="p-6 sm:p-8 lg:p-10 xl:p-12">
            <div className="mx-auto max-w-lg">
              <p className="eyebrow">{eyebrow}</p>
              <h1 className="font-serif text-4xl leading-tight text-ink-900">{title}</h1>
              <p className="mt-3 text-sm leading-6 text-ink-700">{description}</p>
              <div className="mt-7">{children}</div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
