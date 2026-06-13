import { FeaturedProjectsSection } from "@/components/home/featured-projects-section";
import { HeroSection } from "@/components/home/hero-section";
import { HomeContactCta } from "@/components/home/home-contact-cta";
import { ProductShowcaseSection } from "@/components/home/product-showcase-section";
import { ServicesOverviewSection } from "@/components/home/services-overview-section";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";

export default function Home() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <HeroSection />
      <ProductShowcaseSection />
      <ServicesOverviewSection />
      <FeaturedProjectsSection />
      <HomeContactCta />
      <SiteFooter />
    </main>
  );
}
