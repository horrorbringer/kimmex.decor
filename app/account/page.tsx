import { AccountDashboard } from "@/components/account/account-dashboard";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";

export default function AccountPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="section-shell account-section"><AccountDashboard /></section>
      <SiteFooter />
    </main>
  );
}
