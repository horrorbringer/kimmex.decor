import { LoginForm } from "@/components/auth/login-form";
import { AuthPageShell } from "@/components/auth/auth-page-shell";

export const metadata = {
  title: "Sign In | KMD Decor",
  description: "Sign in to your KMD Decor account"
};

export default function LoginPage() {
  return (
    <AuthPageShell description="Access saved products, requests, and order updates." eyebrow="Sign in" title="Welcome back.">
      <LoginForm />
    </AuthPageShell>
  );
}
