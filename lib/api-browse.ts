import { fetchJson } from "@/lib/api-client";

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
  product_count?: number;
};

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

type SearchResult = {
  id: string;
  name: string;
  slug: string;
  type: "product" | "service" | "category" | "brand";
  image_url?: string | null;
  short_description?: string | null;
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

export async function getCatalogBrands(): Promise<ApiBrand[]> {
  try {
    const response = await fetchJson<ApiCollectionResponse<ApiBrand>>("/brands");
    return response.data.filter((b) => b.is_featured).slice(0, 8);
  } catch (error) {
    console.error("Failed to fetch brands:", error);
    return [];
  }
}

export async function getCatalogCategories(): Promise<ApiCategory[]> {
  try {
    const response = await fetchJson<ApiCollectionResponse<ApiCategory>>("/categories");
    return response.data.filter((c) => c.is_featured);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export async function searchCatalog(query: string): Promise<SearchResult[]> {
  if (!query.trim()) return [];

  try {
    const response = await fetchJson<ApiCollectionResponse<SearchResult>>(`/search?q=${encodeURIComponent(query)}`);
    return response.data.slice(0, 10);
  } catch (error) {
    console.error("Failed to search catalog:", error);
    return [];
  }
}

export type { ApiBrand, ApiCategory, SearchResult };
