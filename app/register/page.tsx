import { SiteHeader } from "@/components/home/site-header";
import { SiteFooter } from "@/components/home/site-footer";
import { RegisterForm } from "@/components/auth/register-form";
import { AuthPageShell } from "@/components/auth/auth-page-shell";

export const metadata = {
  title: "Create Account | KMD Decor",
  description: "Create a new KMD Decor account"
};

export default function RegisterPage() {
  return (
    <>
      <SiteHeader />
      <AuthPageShell description="Create one account for saved products, quotes, and order tracking." eyebrow="New customer" title="Create your account."><RegisterForm /></AuthPageShell>
      <SiteFooter />
    </>
  );
}
