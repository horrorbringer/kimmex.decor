import type { Metadata } from "next";
import { ThemeSwitcher } from "@/components/theme-switcher";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kimmex Decor",
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
        {children}
        <ThemeSwitcher />
      </body>
    </html>
  );
}
