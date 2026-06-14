import type { Metadata } from "next";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LanguageProvider } from "@/components/language-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "KMD Decor",
  description: "Construction decor, premium materials, and smart living solutions."
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
          {children}
          <ThemeSwitcher />
        </LanguageProvider>
      </body>
    </html>
  );
}
