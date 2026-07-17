import { BrandsSection } from "@/components/home/brands-section";
import { FeaturedProjectsSection } from "@/components/home/featured-projects-section";
import { HeroSection } from "@/components/home/hero-section";
import { ProductShowcaseSection } from "@/components/home/product-showcase-section";
import { ServicesOverviewSection } from "@/components/home/services-overview-section";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { StructuredData } from "@/components/structured-data";
import { TrustHighlightsSection } from "@/components/home/trust-highlights-section";
import { getHomepageContent } from "@/lib/api-home";

export const revalidate = 60;

export default async function Home() {
  const home = await getHomepageContent();

  return (
    <main className="page-shell">
      <StructuredData
        data={{
          type: "organization",
          name: "KM Decor",
          url: "https://kmdecor.com",
          logo: "https://kmdecor.com/kmd-logo.png",
          description: "Cambodia interior design and construction material supplier — premium products and professional interior services in Phnom Penh.",
          address: {
            "@type": "PostalAddress",
            addressCountry: "KH",
            addressLocality: "Phnom Penh",
          },
        }}
      />
      <SiteHeader />
      <HeroSection />
      <ServicesOverviewSection services={home.services} />
      <ProductShowcaseSection products={home.products} />
      <FeaturedProjectsSection projects={home.projects} />
      <TrustHighlightsSection />
      <BrandsSection brands={home.brands} />
      <SiteFooter />
    </main>
  );
}
