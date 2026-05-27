"use client";

import { BookOpenCheck, ClipboardCheck, Download, RotateCcw, Search } from "lucide-react";
import { useMemo, useState } from "react";

type ResourceItem = {
  title: string;
  category: string;
  format: "Guide" | "Checklist" | "FAQ";
  summary: string;
  href: string;
  tags: string[];
  downloadSections: Array<{
    heading: string;
    items: string[];
  }>;
};

const resources: ResourceItem[] = [
  {
    title: "Ceiling Material Buying Guide",
    category: "Ceiling",
    format: "Guide",
    summary: "Ceiling board, stretch ceiling, reflect ceiling, LED details, and support materials before quote request.",
    href: "/services/ceiling",
    tags: ["Board", "Finish", "LED"],
    downloadSections: [
      {
        heading: "Measure before quote",
        items: ["Room width and length", "Ceiling height", "Number of rooms", "Photos of existing ceiling condition"]
      },
      {
        heading: "Decide finish direction",
        items: ["Gypsum board, stretch ceiling, or reflect ceiling", "Flat, recessed, or layered profile", "LED strip or spotlight areas"]
      }
    ]
  },
  {
    title: "Partition Wall Planning Checklist",
    category: "Partition",
    format: "Checklist",
    summary: "Room size, partition purpose, frame needs, sound-control expectations, and finishing requirements.",
    href: "/services/partition",
    tags: ["Wall", "Frame", "Room division"],
    downloadSections: [
      {
        heading: "Site information",
        items: ["Wall length and height", "Door or glass opening positions", "Floor and ceiling condition", "Photos from both sides of the room"]
      },
      {
        heading: "Performance needs",
        items: ["Privacy level", "Sound-control expectation", "Frame strength needs", "Paint, board, or decorative finish"]
      }
    ]
  },
  {
    title: "Project Package Guide",
    category: "Package",
    format: "Guide",
    summary: "How to group materials, accessories, delivery, and service advice by project goal.",
    href: "/packages",
    tags: ["Package", "Quote", "Delivery"],
    downloadSections: [
      {
        heading: "Package scope",
        items: ["Project type", "Target rooms or areas", "Materials needed", "Accessories and finishing pieces"]
      },
      {
        heading: "Quote preparation",
        items: ["Delivery location", "Preferred deadline", "Supply-only or service support", "Budget range or quality level"]
      }
    ]
  },
  {
    title: "Furniture Decor Scope Guide",
    category: "Furniture",
    format: "Guide",
    summary: "Doors, counters, cabinets, desks, shelves, and built-in commercial furniture scope planning.",
    href: "/services/furniture",
    tags: ["Built-in", "Fit-out", "Finish"],
    downloadSections: [
      {
        heading: "Drawings and size",
        items: ["Width, depth, and height", "Door swing or drawer direction", "Room photos", "Reference images for finish style"]
      },
      {
        heading: "Commercial use",
        items: ["Expected daily use", "Storage needs", "Surface durability", "Installation access and working hours"]
      }
    ]
  },
  {
    title: "Smart Home Starter FAQ",
    category: "Smart Home",
    format: "FAQ",
    summary: "Basic smart access, lighting control, and room-control planning before choosing products or installation.",
    href: "/services/smart-home",
    tags: ["Control", "Access", "Lighting"],
    downloadSections: [
      {
        heading: "Start with rooms",
        items: ["Rooms to control", "Lighting zones", "Door or access points", "Current wiring condition"]
      },
      {
        heading: "User needs",
        items: ["Who will control the system", "Phone app or wall switch preference", "Remote access needs", "Installation timing"]
      }
    ]
  },
  {
    title: "Delivery and Installation Questions",
    category: "Delivery",
    format: "FAQ",
    summary: "Stock, location, truck delivery, site access, and installation schedule details KMD needs.",
    href: "/contact?topic=delivery-installation",
    tags: ["Delivery", "Install", "Support"],
    downloadSections: [
      {
        heading: "Delivery details",
        items: ["Exact project location", "Unload area", "Truck access", "Preferred delivery date"]
      },
      {
        heading: "Installation details",
        items: ["Site readiness", "Working-hour restrictions", "Power and elevator access", "Contact person on site"]
      }
    ]
  }
];

const categories = ["All", ...Array.from(new Set(resources.map((item) => item.category)))];
const formats = ["All", "Guide", "Checklist", "FAQ"];

export function ResourceDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [format, setFormat] = useState("All");

  const filteredResources = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return resources.filter((resource) => {
      const matchesCategory = category === "All" || resource.category === category;
      const matchesFormat = format === "All" || resource.format === format;
      const searchableText = [resource.title, resource.category, resource.format, resource.summary, ...resource.tags]
        .join(" ")
        .toLowerCase();
      const matchesQuery = normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);

      return matchesCategory && matchesFormat && matchesQuery;
    });
  }, [category, format, query]);

  const resetFilters = () => {
    setQuery("");
    setCategory("All");
    setFormat("All");
  };

  const downloadResource = (resource: ResourceItem) => {
    saveMarkdown(`${slugify(resource.title)}.md`, buildResourceMarkdown(resource));
  };

  const downloadSelectedResources = () => {
    const fileBody = [
      "# KMD Decor Resource Directory",
      "",
      `Resources: ${filteredResources.length}`,
      "",
      ...filteredResources.flatMap((resource, index) => [
        index === 0 ? "" : "---",
        "",
        buildResourceMarkdown(resource)
      ])
    ].join("\n");

    saveMarkdown("kmd-decor-selected-resources.md", fileBody);
  };

  const hasActiveFilters = query.length > 0 || category !== "All" || format !== "All";

  return (
    <div className="surface-card overflow-hidden">
      <div className="border-b border-sand-400 p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto] lg:items-center">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-700" />
            <input
              className="w-full rounded-md border border-sand-400 bg-white py-3 pl-10 pr-3 text-sm text-ink-900 outline-none transition placeholder:text-ink-700 focus:border-brand-red"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search resources"
              type="search"
              value={query}
            />
          </label>

          <SegmentedControl label="Category" onChange={setCategory} options={categories} value={category} />
          <SegmentedControl label="Type" onChange={setFormat} options={formats} value={format} />
        </div>
      </div>

      <div className="flex flex-col gap-3 border-b border-sand-400 bg-sand-50 p-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-ink-900">
            {filteredResources.length} downloadable {filteredResources.length === 1 ? "resource" : "resources"}
          </p>
          <p className="mt-1 text-xs leading-5 text-ink-700">Downloads include project details, quote notes, and an online link.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {hasActiveFilters ? (
            <button className="resource-action" onClick={resetFilters} type="button">
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          ) : null}
          <button
            className="resource-action"
            disabled={filteredResources.length === 0}
            onClick={downloadSelectedResources}
            type="button"
          >
            <Download className="h-4 w-4" />
            Download selected
          </button>
        </div>
      </div>

      <div className="hidden md:block">
        <table className="w-full border-collapse text-left">
          <thead className="bg-sand-100 text-xs font-semibold uppercase tracking-[0.16em] text-ink-700">
            <tr>
              <th className="px-5 py-4">Resource</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Type</th>
              <th className="px-5 py-4">Download includes</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredResources.map((resource) => (
              <tr key={resource.title} className="border-t border-sand-400 align-top">
                <td className="px-5 py-4">
                  <div className="flex gap-3">
                    <ResourceIcon format={resource.format} />
                    <div>
                      <div className="font-serif text-xl text-ink-900">{resource.title}</div>
                      <p className="mt-2 max-w-sm text-sm leading-6 text-ink-700">{resource.summary}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {resource.tags.map((tag) => (
                          <span key={tag} className="rounded-md bg-sand-100 px-2 py-1 text-xs font-semibold text-ink-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm font-semibold text-ink-900">{resource.category}</td>
                <td className="px-5 py-4 text-sm text-ink-700">{resource.format}</td>
                <td className="px-5 py-4">
                  <ul className="grid gap-1 text-sm leading-6 text-ink-700">
                    {resource.downloadSections.map((section) => (
                      <li key={section.heading}>{section.heading}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    <a className="resource-action" href={resource.href}>
                      View
                    </a>
                    <button className="resource-action" onClick={() => downloadResource(resource)} type="button">
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 p-4 md:hidden">
        {filteredResources.map((resource) => (
          <article key={resource.title} className="rounded-md border border-sand-400 bg-sand-50 p-4">
            <a href={resource.href}>
              <div className="flex items-start gap-3">
                <ResourceIcon format={resource.format} />
                <div>
                  <div className="font-serif text-xl text-ink-900">{resource.title}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-red">
                    {resource.category} / {resource.format}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-ink-700">{resource.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {resource.tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-sand-100 px-2 py-1 text-xs font-semibold text-ink-700">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
            <div className="mt-4 flex gap-2">
              <a className="resource-action flex-1 justify-center" href={resource.href}>
                View
              </a>
              <button
                className="resource-action flex-1 justify-center"
                onClick={() => downloadResource(resource)}
                type="button"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>
          </article>
        ))}
      </div>

      {filteredResources.length === 0 ? (
        <div className="border-t border-sand-400 p-6 text-sm text-ink-700">No resources match this filter.</div>
      ) : null}
    </div>
  );
}

function saveMarkdown(fileName: string, fileBody: string) {
  const blob = new Blob([fileBody], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function buildResourceMarkdown(resource: ResourceItem) {
  return [
    `# ${resource.title}`,
    "",
    `Category: ${resource.category}`,
    `Type: ${resource.format}`,
    `Tags: ${resource.tags.join(", ")}`,
    "",
    resource.summary,
    "",
    ...resource.downloadSections.flatMap((section) => [
      `## ${section.heading}`,
      "",
      ...section.items.map((item) => `- ${item}`),
      ""
    ]),
    "## Next step",
    "",
    "Share photos, measurements, location, timeline, and preferred service scope when contacting KMD Decor.",
    "",
    `Open online: ${window.location.origin}${resource.href}`
  ].join("\n");
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function ResourceIcon({ format }: { format: ResourceItem["format"] }) {
  const Icon = format === "Checklist" ? ClipboardCheck : BookOpenCheck;

  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-red text-white">
      <Icon className="h-5 w-5" />
    </span>
  );
}

function SegmentedControl({
  label,
  onChange,
  options,
  value
}: {
  label: string;
  onChange: (value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <div>
      <div className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-ink-700">{label}</div>
      <div className="flex max-w-full gap-1 overflow-x-auto rounded-md border border-sand-400 bg-sand-50 p-1">
        {options.map((option) => (
          <button
            key={option}
            className={`shrink-0 rounded px-3 py-2 text-xs font-semibold transition ${
              value === option ? "bg-brand-red text-white" : "text-ink-700 hover:bg-sand-200 hover:text-ink-900"
            }`}
            onClick={() => onChange(option)}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
