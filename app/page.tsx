import { InquirySection } from "@/components/home/inquiry-section";
import { MarketplaceHomeSection } from "@/components/home/marketplace-home-section";
import { ServicesOverviewSection } from "@/components/home/services-overview-section";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";

export default function Home() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <MarketplaceHomeSection />
      <ServicesOverviewSection />
      <InquirySection />
      <SiteFooter />
    </main>
  );
}
