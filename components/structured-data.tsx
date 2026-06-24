interface OrganizationData {
  type: "organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  address?: {
    "@type": "PostalAddress";
    addressCountry: string;
    addressLocality: string;
  };
}

interface ProductData {
  type: "product";
  name: string;
  description: string;
  image: string;
  sku: string;
  brand: { "@type": "Brand"; name: string };
  offers: {
    "@type": "Offer";
    price: string;
    priceCurrency: string;
    availability: string;
    url: string;
  };
}

interface BreadcrumbData {
  type: "breadcrumb";
  items: Array<{ name: string; url: string }>;
}

type StructuredDataProps = OrganizationData | ProductData | BreadcrumbData;

export function StructuredData({ data }: { data: StructuredDataProps }) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
  };

  if (data.type === "organization") {
    jsonLd["@type"] = "Organization";
    jsonLd.name = data.name;
    jsonLd.url = data.url;
    jsonLd.logo = data.logo;
    jsonLd.description = data.description;
    if (data.address) {
      jsonLd.address = {
        "@type": "PostalAddress",
        addressCountry: data.address.addressCountry,
        addressLocality: data.address.addressLocality,
      };
    }
  } else if (data.type === "product") {
    jsonLd["@type"] = "Product";
    jsonLd.name = data.name;
    jsonLd.description = data.description;
    jsonLd.image = data.image;
    jsonLd.sku = data.sku;
    jsonLd.brand = data.brand;
    jsonLd.offers = {
      "@type": "Offer",
      price: data.offers.price,
      priceCurrency: data.offers.priceCurrency,
      availability: data.offers.availability,
      url: data.offers.url,
    };
  } else if (data.type === "breadcrumb") {
    jsonLd["@type"] = "BreadcrumbList";
    jsonLd.itemListElement = data.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    }));
  }

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      type="application/ld+json"
    />
  );
}
