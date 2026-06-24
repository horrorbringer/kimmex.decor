import type { Metadata, Viewport } from "next";
import { Noto_Sans_Khmer, Noto_Serif_Khmer } from "next/font/google";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LanguageProvider } from "@/components/language-provider";
import { AuthProvider } from "@/lib/auth-context";
import { ToastProvider } from "@/components/ui/toast";
import "./globals.css";

const notoSansKhmer = Noto_Sans_Khmer({
  subsets: ["khmer"],
  variable: "--font-noto-sans-khmer",
  display: "swap",
});

const notoSerifKhmer = Noto_Serif_Khmer({
  subsets: ["khmer"],
  variable: "--font-noto-serif-khmer",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: {
    default: "KM Decor",
    template: "%s | KM Decor",
  },
  description: "Cambodia interior design and construction material supplier — premium products and professional interior services in Phnom Penh.",
  manifest: "/manifest.json",
  themeColor: "#061b73",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "KM Decor — Interior Design & Materials",
    description: "Cambodia interior design and construction material supplier — premium products and professional interior services in Phnom Penh.",
    url: "https://kmdecor.com",
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
    <html lang="en">
      <body>
        <LanguageProvider>
          <AuthProvider>
            <ToastProvider>
              {children}
              <ThemeSwitcher />
            </ToastProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
