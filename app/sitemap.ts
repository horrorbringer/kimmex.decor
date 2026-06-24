import type { MetadataRoute } from "next";

const BASE_URL = "https://kmdecor.com";

const staticPages = [
  "",
  "/products",
  "/services",
  "/portfolio",
  "/about",
  "/contact",
  "/packages",
  "/cart",
  "/account",
  "/login",
  "/register",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  return staticEntries;
}
