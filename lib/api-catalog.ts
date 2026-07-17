import { fetchJson } from "@/lib/api-client";
import { products as fallbackProducts, shopCategories as fallbackCategories } from "@/lib/homepage-data";
import type { ProductItem } from "@/lib/homepage-data";
import { reportError } from "@/lib/error-tracking";

type ApiCategory = {
  id: string;
  name: string;
  name_kh?: string | null;
  slug: string;
  description?: string | null;
  type: string;
  icon?: string | null;
  image_url?: string | null;
  is_featured: boolean;
  product_count?: number;
};

type ApiBrand = {
  id: string;
  name: string;
  name_kh?: string | null;
  slug: string;
  description?: string | null;
  logo_url?: string | null;
  website_url?: string | null;
  country_of_origin?: string | null;
  is_featured: boolean;
};

type ApiProductImage = {
  id: string;
  product_id?: string;
  image_url?: string;
  url?: string;
  thumb_url?: string;
  alt_text?: string | null;
  is_primary: boolean;
  sort_order?: number;
};

export type ApiProduct = {
  id: string;
  name: string;
  name_kh?: string | null;
  slug: string;
  sku: string;
  short_description: string;
  short_description_kh?: string | null;
  description?: string | null;
  description_html?: string | null;
  description_text?: string | null;
  description_kh?: string | null;
  description_kh_html?: string | null;
  description_kh_text?: string | null;
  customer_goal?: string | null;
  features?: string[] | null;
  applications?: string[] | null;
  material_notes?: string[] | null;
  lead_time?: string | null;
  delivery_note?: string | null;
  compatible_product_slugs?: string[] | null;
  category?: ApiCategory | null;
  brand?: ApiBrand | null;
  price: number;
  compare_price?: number | null;
  currency: string;
  unit: string;
  min_order_qty: number;
  stock_qty: number;
  stock_status: "in_stock" | "low_stock" | "preorder" | "out_of_stock";
  requires_installation: boolean;
  rating: number;
  review_count: number;
  badges?: string[];
  specifications?: string[] | Record<string, string> | null;
  tags?: string[] | null;
  primary_image?: string | null;
  images?: ApiProductImage[];
  is_published: boolean;
  is_featured: boolean;
  structured_data?: Record<string, unknown> | null;
};

type ApiCollectionResponse<T> = {
  data: T[];
  meta?: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
};

type ApiResourceResponse<T> = {
  data: T;
};

function stockStatus(status: ApiProduct["stock_status"]): ProductItem["stockStatus"] {
  if (status === "low_stock") return "Low stock";
  if (status === "preorder" || status === "out_of_stock") return "Preorder";
  return "In stock";
}

function badgeLabel(badges?: string[]) {
  if (!badges) return undefined;
  if (badges.includes("best_seller")) return "Best seller";
  if (badges.includes("new")) return "New";
  if (badges.includes("featured")) return "Featured";
  return undefined;
}

function specifications(value: ApiProduct["specifications"], fallback: ProductItem) {
  if (Array.isArray(value) && value.length > 0) return value.map(String);
  if (value && typeof value === "object") return Object.entries(value).map(([key, detail]) => `${key}: ${detail}`);
  return fallback.specs;
}

function listOrFallback(value: string[] | null | undefined, fallback: string[]) {
  return Array.isArray(value) && value.length > 0 ? value.map(String).filter(Boolean) : fallback;
}

function productImages(product: ApiProduct, fallback: ProductItem) {
  const images = product.images ?? [];
  const urls = images
    .map((image) => image.image_url || image.url)
    .filter((url): url is string => Boolean(url));
  const primary = product.primary_image || urls[0] || fallback.imageUrl;

  return {
    imageUrl: primary,
    galleryImages: urls.length > 0 ? urls : fallback.galleryImages
  };
}

export function adaptProduct(product: ApiProduct): ProductItem {
  const fallback = fallbackProducts.find((item) => item.href === `/products/${product.slug}`) ?? fallbackProducts[0];
  const images = productImages(product, fallback);
  const currentStockStatus = stockStatus(product.stock_status);

  return {
    id: product.id,
    name: product.name,
    descriptor: product.short_description,
    descriptionHtml: product.description_html ?? product.description ?? undefined,
    brand: product.brand?.name ?? fallback.brand,
    category: product.category?.name ?? fallback.category,
    sku: product.sku,
    price: Number(product.price),
    comparePrice: product.compare_price === null || product.compare_price === undefined ? undefined : Number(product.compare_price),
    unit: product.unit,
    stockStatus: currentStockStatus,
    rating: Number(product.rating),
    reviewCount: product.review_count,
    badge: badgeLabel(product.badges) ?? fallback.badge,
    specs: specifications(product.specifications, fallback),
    moq: `${product.min_order_qty} ${product.unit}${product.min_order_qty > 1 ? "s" : ""}`,
    leadTime: product.lead_time || (currentStockStatus === "In stock" ? "Ready stock" : currentStockStatus === "Low stock" ? "Check stock" : "Preorder"),
    delivery: product.delivery_note || fallback.delivery,
    quoteRecommended: currentStockStatus !== "In stock" || fallback.quoteRecommended,
    customerGoal: product.customer_goal || fallback.customerGoal,
    keyFeatures: listOrFallback(product.features, fallback.keyFeatures),
    compatibleProductIds: listOrFallback(product.compatible_product_slugs, fallback.compatibleProductIds),
    applications: listOrFallback(product.applications, fallback.applications),
    materialNotes: listOrFallback(product.material_notes, fallback.materialNotes),
    href: `/products/${product.slug}`,
    imageUrl: images.imageUrl,
    galleryImages: images.galleryImages,
    structuredData: product.structured_data ?? undefined
  };
}

export function resolveCompatibleProductIds(products: ProductItem[]) {
  const bySlug = new Map(products.map((product) => [product.href.replace("/products/", ""), product.id]));

  return products.map((product) => ({
    ...product,
    compatibleProductIds: product.compatibleProductIds.map((slugOrId) => bySlug.get(slugOrId) ?? slugOrId)
  }));
}

export async function getCatalogProducts(): Promise<ProductItem[]> {
  try {
    const response = await fetchJson<ApiCollectionResponse<ApiProduct>>("/products?per_page=100", { next: { revalidate: 60 } });
    return resolveCompatibleProductIds(response.data.map(adaptProduct));
  } catch (error) {
    reportError(error, { component: "api-catalog", action: "getCatalogProducts" });
    return fallbackProducts;
  }
}

export async function getCatalogFeaturedProducts(limit = 4): Promise<ProductItem[]> {
  try {
    const response = await fetchJson<ApiCollectionResponse<ApiProduct>>(`/products?featured=1&per_page=${limit}`);
    return resolveCompatibleProductIds(response.data.map(adaptProduct));
  } catch {
    return fallbackProducts.slice(0, limit);
  }
}

export async function getCatalogProduct(slug: string): Promise<ProductItem | null> {
  try {
    const response = await fetchJson<ApiResourceResponse<ApiProduct>>(`/products/${encodeURIComponent(slug)}`);
    return adaptProduct(response.data);
  } catch {
    return fallbackProducts.find((product) => product.href === `/products/${slug}`) ?? null;
  }
}

export async function getCatalogCategories(products: ProductItem[] = []): Promise<string[]> {
  try {
    const response = await fetchJson<ApiCollectionResponse<ApiCategory>>("/categories", { next: { revalidate: 60 } });
    const categoryNames = response.data.map((category) => category.name).filter(Boolean);
    return categoryNames.length > 0 ? categoryNames : fallbackCategories;
  } catch {
    const productCategories = Array.from(new Set(products.map((product) => product.category)));
    return productCategories.length > 0 ? productCategories : fallbackCategories;
  }
}
