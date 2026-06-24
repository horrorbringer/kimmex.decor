import { AccountDashboard } from "@/components/account/account-dashboard";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { getCatalogProducts } from "@/lib/api-catalog";

export const metadata = {
  title: "Account",
  description: "Manage your KM Decor account — view orders, track deliveries, and update your profile.",
};

export default async function AccountPage() {
  const products = await getCatalogProducts();

  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="section-shell account-section"><AccountDashboard products={products} /></section>
      <SiteFooter />
    </main>
  );
}
