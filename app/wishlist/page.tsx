import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { WishlistContent } from "@/components/wishlist/wishlist-content";
import { WishlistHeading } from "@/components/customer-page-headings";
import { getCatalogProducts } from "@/lib/api-catalog";

export const metadata = {
  title: "Wishlist",
  description: "Your saved products — review and move items to cart when you're ready to order.",
};

export default async function WishlistPage() {
  const products = await getCatalogProducts();

  return (
    <main className="page-shell">
      <SiteHeader />
      <WishlistHeading />
      <section className="section-shell wishlist-section"><WishlistContent products={products} /></section>
      <SiteFooter />
    </main>
  );
}
