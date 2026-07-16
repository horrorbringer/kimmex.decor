import { fetchJson } from "@/lib/api-client";
import { products as fallbackProducts, projects as fallbackProjects, services as fallbackServices } from "@/lib/homepage-data";
import { projectDetails as fallbackDetails } from "@/lib/project-data";
import { richContentToText } from "@/lib/rich-content";
import type { ProductItem, ProjectItem, ServiceItem } from "@/lib/homepage-data";
import type { ProjectDetail } from "@/lib/project-data";

type ApiService = {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  image_url?: string | null;
};

type ApiProduct = {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  price: number;
  compare_price?: number | null;
  currency?: string;
  unit?: string;
  stock_status?: "in_stock" | "preorder" | "low_stock" | "out_of_stock";
  rating?: number;
  review_count?: number;
  badges?: string[];
  sku?: string;
  primary_image: string | null;
};

type ApiMedia = {
  title: string;
  caption: string;
  image_url: string;
  thumb_url: string;
};

type ApiProject = {
  id: string;
  title: string;
  title_kh: string | null;
  slug: string;
  overview: string | null;
  overview_html?: string | null;
  overview_text?: string | null;
  setting: string | null;
  focus: string | null;
  goal: string | null;
  goal_html?: string | null;
  goal_text?: string | null;
  challenge: string | null;
  challenge_html?: string | null;
  challenge_text?: string | null;
  response: string | null;
  response_html?: string | null;
  response_text?: string | null;
  scope: string[] | null;
  outcomes: string[] | null;
  process: { title: string; copy: string }[] | null;
  services: ApiService[];
  products: ApiProduct[];
  gallery: ApiMedia[];
  primary_image: string | null;
  sort_order: number;
  is_featured: boolean;
  status: string;
};

type ApiCollectionResponse<T> = {
  data: T[];
};

type ApiResourceResponse<T> = {
  data: T;
};

type PortfolioProjectResult = {
  project: ProjectItem;
  detail: ProjectDetail;
  services: ServiceItem[];
  products: ProductItem[];
};

function adaptToProjectItem(project: ApiProject): ProjectItem {
  const fallback = fallbackProjects.find((item) => item.id === project.slug);
  const plainOverview = project.overview_text || richContentToText(project.overview) || fallback?.caption || "";

  return {
    id: project.slug,
    title: project.title,
    projectType: project.focus ?? "Project",
    caption: plainOverview,
    href: `/portfolio/${project.slug}`,
    imageUrl: project.primary_image ?? fallback?.imageUrl ?? fallbackProjects[0]?.imageUrl ?? "",
  };
}

function adaptToServiceItem(service: ApiService): ServiceItem {
  const fallback = fallbackServices.find((item) => item.id === service.slug);

  return {
    id: service.slug,
    title: service.name,
    description: service.short_description ?? fallback?.description ?? "",
    href: `/services/${service.slug}`,
    imageUrl: service.image_url ?? fallback?.imageUrl ?? fallbackServices[0]?.imageUrl ?? "",
  };
}

function adaptStockStatus(status: ApiProduct["stock_status"]): ProductItem["stockStatus"] {
  if (status === "preorder" || status === "out_of_stock") return "Preorder";
  if (status === "low_stock") return "Low stock";
  return "In stock";
}

function adaptToProductItem(product: ApiProduct): ProductItem {
  const fallback = fallbackProducts.find((item) => item.id === product.slug);
  const imageUrl = product.primary_image ?? fallback?.imageUrl ?? fallbackProducts[0]?.imageUrl ?? "";

  return {
    id: product.slug,
    name: product.name,
    descriptor: product.short_description ?? fallback?.descriptor ?? "",
    brand: fallback?.brand ?? "KMD",
    category: fallback?.category ?? "Project material",
    sku: product.sku ?? fallback?.sku ?? product.slug,
    price: product.price ?? fallback?.price ?? 0,
    comparePrice: product.compare_price ?? fallback?.comparePrice,
    unit: product.unit ?? fallback?.unit ?? "unit",
    stockStatus: adaptStockStatus(product.stock_status),
    rating: product.rating ?? fallback?.rating ?? 0,
    reviewCount: product.review_count ?? fallback?.reviewCount ?? 0,
    badge: product.badges?.[0] ?? fallback?.badge,
    specs: fallback?.specs ?? [],
    moq: fallback?.moq ?? "Quote required",
    leadTime: fallback?.leadTime ?? "Confirm availability",
    delivery: fallback?.delivery ?? "Delivery available",
    quoteRecommended: fallback?.quoteRecommended ?? true,
    customerGoal: fallback?.customerGoal ?? product.short_description ?? "",
    keyFeatures: fallback?.keyFeatures ?? [],
    compatibleProductIds: fallback?.compatibleProductIds ?? [],
    applications: fallback?.applications ?? [],
    materialNotes: fallback?.materialNotes ?? [],
    href: `/products/${product.slug}`,
    imageUrl,
    galleryImages: fallback?.galleryImages ?? [imageUrl],
  };
}

function adaptToProjectDetail(project: ApiProject): ProjectDetail {
  const fallback = fallbackDetails[project.slug];
  const fallbackItem = fallbackProjects.find((item) => item.id === project.slug);
  const fallbackImage = project.primary_image ?? fallbackItem?.imageUrl ?? fallbackProjects[0]?.imageUrl ?? "";
  const gallery = (project.gallery ?? []).length > 0
    ? project.gallery.map((media) => ({
        title: media.title,
        caption: richContentToText(media.caption) || media.title,
        imageUrl: media.image_url,
      }))
    : fallback?.gallery ?? [];

  return {
    overview: project.overview_html ?? project.overview ?? fallback?.overview ?? "",
    setting: project.setting ?? fallback?.setting ?? "",
    focus: project.focus ?? fallback?.focus ?? "",
    goal: project.goal_html ?? project.goal ?? fallback?.goal ?? "",
    challenge: project.challenge_html ?? project.challenge ?? fallback?.challenge ?? "",
    response: project.response_html ?? project.response ?? fallback?.response ?? "",
    scope: project.scope ?? fallback?.scope ?? [],
    outcomes: project.outcomes ?? fallback?.outcomes ?? [],
    process: project.process ?? fallback?.process ?? [],
    gallery: gallery.length > 0
      ? gallery
      : [{ title: project.title, caption: project.overview_text || richContentToText(project.overview), imageUrl: fallbackImage }],
    serviceIds: project.services?.map((s) => s.slug) ?? fallback?.serviceIds ?? [],
    productIds: project.products?.map((p) => p.slug) ?? fallback?.productIds ?? [],
  };
}

type PortfolioProjectListOptions = {
  featured?: boolean;
};

export async function getPortfolioProjects(options: PortfolioProjectListOptions = {}): Promise<ProjectItem[]> {
  const params = new URLSearchParams({ per_page: "100" });

  if (options.featured !== undefined) {
    params.set("featured", options.featured ? "1" : "0");
  }

  try {
    const response = await fetchJson<ApiCollectionResponse<ApiProject>>(`/portfolio?${params.toString()}`);
    return response.data.map(adaptToProjectItem);
  } catch {
    return options.featured ? fallbackProjects.slice(0, 3) : fallbackProjects;
  }
}

export async function getPortfolioProject(slug: string): Promise<PortfolioProjectResult | null> {
  try {
    const response = await fetchJson<ApiResourceResponse<ApiProject>>(`/portfolio/${encodeURIComponent(slug)}`);
    const project = adaptToProjectItem(response.data);
    const detail = adaptToProjectDetail(response.data);
    const services = response.data.services?.map(adaptToServiceItem) ?? [];
    const products = response.data.products?.map(adaptToProductItem) ?? [];

    return { project, detail, services, products };
  } catch {
    const fallbackItem = fallbackProjects.find((p) => p.id === slug);
    const fallbackDetail = fallbackDetails[slug];
    if (!fallbackItem || !fallbackDetail) return null;
    return {
      project: fallbackItem,
      detail: fallbackDetail,
      services: fallbackDetail.serviceIds
        .map((id) => fallbackServices.find((service) => service.id === id))
        .filter((service): service is ServiceItem => Boolean(service)),
      products: fallbackDetail.productIds
        .map((id) => fallbackProducts.find((product) => product.id === id))
        .filter((product): product is ProductItem => Boolean(product)),
    };
  }
}
