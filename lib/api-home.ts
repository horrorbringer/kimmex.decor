import { fetchJson } from "@/lib/api-client";
import { adaptBrand, type ApiBrand } from "@/lib/api-browse";
import { adaptProduct, resolveCompatibleProductIds, type ApiProduct } from "@/lib/api-catalog";
import { adaptToProjectItem, type ApiProject } from "@/lib/api-portfolio";
import { adaptService, type ApiService } from "@/lib/api-services";
import { brands as fallbackBrands, products as fallbackProducts, projects as fallbackProjects, services as fallbackServices } from "@/lib/homepage-data";

export type HomeBrandItem = ReturnType<typeof adaptBrand>;

type ApiHomeResponse = {
  data: {
    featured_products?: ApiProduct[];
    featured_services?: ApiService[];
    featured_projects?: ApiProject[];
    featured_brands?: ApiBrand[];
  };
};

export async function getHomepageContent() {
  try {
    const response = await fetchJson<ApiHomeResponse>("/home", { next: { revalidate: 60 } });

    return {
      products: resolveCompatibleProductIds((response.data.featured_products ?? []).map(adaptProduct)),
      services: (response.data.featured_services ?? []).map(adaptService),
      projects: (response.data.featured_projects ?? []).map(adaptToProjectItem),
      brands: (response.data.featured_brands ?? []).map(adaptBrand),
    };
  } catch (error) {
    console.error("Failed to fetch homepage content:", error);

    return {
      products: fallbackProducts.slice(0, 4),
      services: fallbackServices,
      projects: fallbackProjects.slice(0, 3),
      brands: fallbackBrands.map((brand) => ({
        id: brand.id,
        name: brand.name,
        slug: brand.id,
        description: null,
        logoUrl: null,
        href: brand.href,
      })),
    };
  }
}
