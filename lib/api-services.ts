import { fetchJson } from "@/lib/api-client";
import type { ServiceItem } from "@/lib/homepage-data";

type ApiService = {
  id: string;
  name: string;
  name_kh?: string | null;
  slug: string;
  short_description: string;
  short_description_kh?: string | null;
  description?: string | null;
  description_kh?: string | null;
  category?: any | null;
  inquiry_type: string;
  image_url?: string | null;
  is_featured: boolean;
  is_published: boolean;
};

type ApiCollectionResponse<T> = {
  data: T[];
};

type ApiResourceResponse<T> = {
  data: T;
};

function adaptService(service: ApiService): ServiceItem {
  return {
    id: service.slug,
    title: service.name,
    description: service.short_description,
    descriptionHtml: service.description ?? undefined,
    href: `/services/${service.slug}`,
    imageUrl: service.image_url || "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
  };
}

export async function getCatalogServices(): Promise<ServiceItem[]> {
  try {
    const response = await fetchJson<ApiCollectionResponse<ApiService>>("/services");
    return response.data
      .filter((s) => s.is_published)
      .map(adaptService);
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
}

export async function getCatalogService(slug: string): Promise<ApiService | null> {
  try {
    const response = await fetchJson<ApiResourceResponse<ApiService>>(`/services/${encodeURIComponent(slug)}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch service ${slug}:`, error);
    return null;
  }
}

export type { ApiService };
