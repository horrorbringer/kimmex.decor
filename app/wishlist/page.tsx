import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { WishlistContent } from "@/components/wishlist/wishlist-content";
import { WishlistHeading } from "@/components/customer-page-headings";

export default function WishlistPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <WishlistHeading />
      <section className="section-shell wishlist-section"><WishlistContent /></section>
      <SiteFooter />
    </main>
  );
}
