import type { Metadata, Viewport } from "next";
import { LanguageProvider } from "@/components/language-provider";
import { AuthProvider } from "@/lib/auth-context";
import { ToastProvider } from "@/components/ui/toast";
import { PwaServiceWorker } from "@/components/pwa-service-worker";
import { ErrorTracker } from "@/components/error-tracker";
import "./globals.css";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://kmdecor.com").replace(/\/$/, "");

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0b1f4d",
};

export const metadata: Metadata = {
  title: {
    default: "KM Decor",
    template: "%s | KM Decor",
  },
  description: "Cambodia interior design and construction material supplier — premium products and professional interior services in Phnom Penh.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "KM Decor — Interior Design & Materials",
    description: "Cambodia interior design and construction material supplier — premium products and professional interior services in Phnom Penh.",
    url: siteUrl,
    siteName: "KM Decor",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KM Decor — Interior Design & Materials",
    description: "Cambodia interior design and construction material supplier — premium products and professional interior services in Phnom Penh.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <AuthProvider>
            <ToastProvider>
              {children}
              <ErrorTracker />
              <PwaServiceWorker />
            </ToastProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
