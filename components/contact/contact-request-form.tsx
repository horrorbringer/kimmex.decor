"use client";

import { ArrowRight, CheckCircle2, Info, Paperclip } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import { buildInquiryPayload, submitInquiry } from "@/lib/api-inquiries";
import { useFormValidation } from "@/lib/use-form-validation";
import { projectPackages, projects, services as fallbackServices } from "@/lib/homepage-data";
import type { ProductItem, ServiceItem } from "@/lib/homepage-data";

type RequestContext = {
  checklist: string[];
  helper: string;
  label: string | null;
  message: string;
  quantity: string;
  type: string;
};

type LocalInquiryRequest = {
  contextLabel: string | null;
  createdAt: string;
  id: string;
  message: string;
  projectLocation: string | null;
  projectSize: string | null;
  status: string;
  type: string | null;
};

type ContactRequestFormProps = {
  portfolioProjects?: Array<{
    id: string;
    title: string;
    projectType: string;
  }>;
  products: ProductItem[];
  services?: ServiceItem[];
};

const topicLabels: Record<string, string> = {
  "delivery-installation": "Delivery and installation support",
  "portfolio-reference": "Project reference request",
  "project-advice": "Project advice"
};
const localInquiryKey = "kmd-last-contact-request";
const requestChecklists: Record<string, string[]> = {
  delivery: ["Delivery area or site address", "Preferred date or timing", "Access notes for truck or installer"],
  package: ["Room or area size", "Materials or finish direction", "Budget range or priority"],
  product: ["Quantity or material list", "Delivery area", "Needed timing or stock deadline"],
  project: ["Reference or desired result", "Room size and location", "Changes needed for your space"],
  service: ["Approximate room size", "Site condition or current stage", "Preferred finish and timeline"],
};
const defaultRequestContext: RequestContext = {
  checklist: requestChecklists.project,
  helper: "",
  label: null,
  message: "",
  quantity: "",
  type: "project",
};

function productSlug(product: ProductItem) {
  return product.href.replace("/products/", "");
}

function checklistFor(type: string) {
  return requestChecklists[type] ?? requestChecklists.project;
}

export function ContactRequestForm({ portfolioProjects = [], products, services = fallbackServices }: ContactRequestFormProps) {
  return (
    <Suspense fallback={<RequestForm context={defaultRequestContext} />}>
      <RequestFormWithParams portfolioProjects={portfolioProjects} products={products} services={services} />
    </Suspense>
  );
}

function RequestFormWithParams({ portfolioProjects = [], products, services = fallbackServices }: ContactRequestFormProps) {
  const searchParams = useSearchParams();
  return <RequestForm context={getRequestContext(searchParams, products, portfolioProjects, services)} />;
}

function getRequestContext(
  searchParams: URLSearchParams,
  products: ProductItem[],
  portfolioProjects: NonNullable<ContactRequestFormProps["portfolioProjects"]>,
  services: ServiceItem[]
): RequestContext {
  const serviceId = searchParams.get("service");
  const productId = searchParams.get("product");
  const packageId = searchParams.get("package");
  const projectId = searchParams.get("project");
  const requestType = searchParams.get("type");
  const topic = searchParams.get("topic");
  const imageSearch = searchParams.get("imageSearch");
  const quantity = searchParams.get("quantity");

  const service = services.find((item) => item.id === serviceId || item.href.replace("/services/", "") === serviceId);
  if (service) {
    return {
      checklist: checklistFor("service"),
      helper: "KMD can review site condition, timing, and suitable materials for this service.",
      label: service.title,
      message: `I would like to discuss ${service.title}. Approximate size, location, and preferred timeline:`,
      quantity: "",
      type: "service"
    };
  }

  const product = products.find((item) => item.id === productId || productSlug(item) === productId);
  if (product) {
    return {
      checklist: checklistFor("product"),
      helper: `${product.stockStatus}. Include quantity and delivery area so KMD can confirm availability.`,
      label: product.name,
      message: `I need help with ${product.name}.${quantity ? ` Required quantity: ${quantity} ${product.unit}${Number(quantity) === 1 ? "" : "s"}.` : ""} Delivery location and timing:`,
      quantity: quantity ? `${quantity} ${product.unit}${Number(quantity) === 1 ? "" : "s"}` : "",
      type: "product"
    };
  }

  const projectPackage = projectPackages.find((item) => item.id === packageId);
  if (projectPackage) {
    return {
      checklist: checklistFor("package"),
      helper: "Package requests work best with approximate area, room type, and expected timeline.",
      label: projectPackage.title,
      message: `I would like a quote for ${projectPackage.title}. Project size, location, and preferred timeline:`,
      quantity: "",
      type: "package"
    };
  }

  const project = portfolioProjects.find((item) => item.id === projectId) ?? projects.find((item) => item.id === projectId);
  if (project) {
    return {
      checklist: checklistFor("project"),
      helper: "Use this reference as direction. Add your own room size, location, and preferred finish.",
      label: `Inspired by: ${project.title}`,
      message: `I am interested in planning work similar to ${project.title}. My space, size, and preferred direction:`,
      quantity: "",
      type: "project"
    };
  }

  if (imageSearch) {
    return {
      checklist: checklistFor("project"),
      helper: "Attach your reference image again if possible so KMD can review it with the inquiry.",
      label: "Photo-based material request",
      message: "I would like a product or service recommendation based on my reference photo. Project size and location:",
      quantity: "",
      type: "project"
    };
  }

  if (requestType === "order-request") {
    return {
      checklist: checklistFor("product"),
      helper: "Cart requests are reviewed for stock, quantity, delivery, and final pricing before payment.",
      label: "Cart and order request",
      message: "I would like help reviewing product availability, quantities, and delivery for my order:",
      quantity: "",
      type: "product"
    };
  }

  if (requestType === "package") {
    return {
      checklist: checklistFor("package"),
      helper: "KMD can help combine materials and service scope into a practical package.",
      label: "Project package",
      message: "I would like help preparing a project package. Materials, approximate size, and location:",
      quantity: "",
      type: "package"
    };
  }

  if (topic && topicLabels[topic]) {
    const type = topic === "delivery-installation" ? "delivery" : "project";

    return {
      checklist: checklistFor(type),
      helper: topic === "portfolio-reference" ? "Tell KMD what you like about the reference and what should change for your space." : "Add the practical details KMD needs for a first review.",
      label: topicLabels[topic],
      message: `I would like help with ${topicLabels[topic].toLowerCase()}. Project details:`,
      quantity: "",
      type
    };
  }

  return defaultRequestContext;
}

function RequestForm({ context }: { context: RequestContext }) {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState("");
  const selectedTypeLabel = {
    delivery: "Delivery or installation",
    package: "Material package",
    product: "Product and material",
    project: "Project consultation",
    service: "Interior service",
  }[context.type] ?? "Project consultation";
  const { errors, validate, clearError } = useFormValidation({
    name: { required: true, minLength: 2 },
    phone: { required: true, pattern: /^\+?[\d\s\-()]{7,}$/, patternMessage: "Enter a valid phone number" },
    message: { required: true, minLength: 10 },
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    if (!validate(formData)) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await submitInquiry(buildInquiryPayload(formData, context.label));
      saveLocalInquiry(formData, context.label, response.data.id, response.data.status);
      setSubmittedId(response.data.id);
      event.currentTarget.reset();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "KMD could not receive this request.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submittedId) {
    return (
      <div className="overflow-hidden rounded-lg border border-sand-400 bg-white shadow-soft">
        <div className="grid gap-5 p-6 text-center md:p-8">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-red/10 text-brand-red">
            <CheckCircle2 className="h-7 w-7" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">Request received</p>
            <h2 className="mt-2 font-serif text-3xl text-ink-900 md:text-4xl">KMD has your inquiry.</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-ink-700">
              Reference {submittedId.slice(0, 8)}. The team will review your request and contact details before replying.
            </p>
          </div>
          <div className="mx-auto flex flex-col gap-3 sm:flex-row">
            <a className="action-commerce gap-2" href="tel:+85516927683">
              Call KMD
              <ArrowRight className="h-4 w-4" />
            </a>
            <button className="action-secondary" onClick={() => setSubmittedId("")} type="button">
              Send another request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="overflow-hidden rounded-lg border border-sand-400 bg-white shadow-soft" onSubmit={handleSubmit}>
      <div className="border-b border-sand-400 p-6 md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-red">Project inquiry</p>
            <h2 className="mt-2 font-serif text-3xl text-ink-900 md:text-4xl">Share your request.</h2>
          </div>
          <span className="w-fit rounded-full bg-sand-100 px-3 py-1.5 text-xs font-semibold text-ink-700">Usually starts with a short review</span>
        </div>

        <div className="mt-6 rounded-lg border border-brand-red/25 bg-brand-red/5 p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-red">
                {context.label ? "Request selected" : "Request guide"}
              </p>
              <p className="mt-1 text-sm font-semibold text-ink-900">
                {context.label ?? selectedTypeLabel}
              </p>
              <p className="mt-2 text-xs leading-5 text-ink-700">
                {context.helper || "Share the essentials below so KMD can route your request to the right team."}
              </p>
            </div>
          </div>
          <div className="contact-context-checklist mt-4">
            <p>Helpful to include</p>
            <div>
              {context.checklist.map((item) => (
                <span key={item}>
                  <CheckCircle2 aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-6 md:grid-cols-2 md:p-8">
        <label className={`control-label ${errors.name ? "has-error" : ""}`}>
          Name <span className="sr-only">required</span>
          <input autoComplete="name" className="field" name="name" onChange={() => clearError("name")} placeholder="Your name" required type="text" />
          {errors.name ? <span className="text-xs font-semibold text-brand-red">{errors.name}</span> : null}
        </label>
        <label className={`control-label ${errors.phone ? "has-error" : ""}`}>
          Phone <span className="sr-only">required</span>
          <input autoComplete="tel" className="field" name="phone" onChange={() => clearError("phone")} placeholder="+855..." required type="tel" />
          {errors.phone ? <span className="text-xs font-semibold text-brand-red">{errors.phone}</span> : null}
        </label>
        <label className="control-label">
          Email
          <input autoComplete="email" className="field" name="email" placeholder="Optional, for documents or BOQ replies" type="email" />
        </label>
        <label className="control-label">
          Company or organization
          <input autoComplete="organization" className="field" name="company" placeholder="Optional" type="text" />
        </label>
        <label className="control-label">
          Request type
          <select className="select-field" defaultValue={context.type} name="requestType">
            <option value="product">Product and material</option>
            <option value="service">Interior service</option>
            <option value="project">Project consultation</option>
            <option value="package">Material package</option>
            <option value="delivery">Delivery or installation</option>
          </select>
        </label>
        <label className="control-label md:col-span-2">
          Project or delivery location
          <input className="field" name="location" placeholder="Area, district, or project address" type="text" />
        </label>
        <label className="control-label">
          Preferred timing
          <select className="select-field" defaultValue="" name="timeline">
            <option disabled value="">Select timing</option>
            <option value="urgent">As soon as possible</option>
            <option value="month">Within one month</option>
            <option value="quarter">Within three months</option>
            <option value="planning">Early planning stage</option>
          </select>
        </label>
        <label className="control-label">
          Approximate size or quantity
          <input className="field" defaultValue={context.quantity} name="quantity" placeholder="Example: 80 m² or 20 sheets" type="text" />
        </label>
        <label className={`control-label md:col-span-2 ${errors.message ? "has-error" : ""}`}>
          What do you need help with? <span className="sr-only">required</span>
          <textarea
            className="textarea-field min-h-40"
            defaultValue={context.message}
            name="message"
            onChange={() => clearError("message")}
            placeholder="Describe the product, room, service, finish, quantity, or result you need."
            required
          />
          {errors.message ? <span className="text-xs font-semibold text-brand-red">{errors.message}</span> : null}
        </label>
        <label className="control-label md:col-span-2">
          Photos, drawing, or BOQ
          <span className="group rounded-lg border border-dashed border-sand-400 bg-sand-100/60 p-5 transition hover:border-brand-red/50">
            <span className="flex items-center gap-3 text-sm font-semibold text-ink-900">
              <Paperclip className="h-4 w-4 text-brand-red" />
              Add supporting files
            </span>
            <input
              accept="image/*,.pdf,.xls,.xlsx"
              className="mt-3 block w-full text-xs text-ink-700 file:mr-3 file:rounded-md file:border-0 file:bg-white file:px-3 file:py-2 file:text-base sm:file:text-xs file:font-semibold file:text-ink-900"
              multiple
              name="attachments"
              type="file"
            />
          <span className="mt-2 block text-xs leading-5 text-ink-700">Images, PDF, Excel, or a material list can help us understand the request.</span>
          </span>
        </label>
      </div>

      <div className="flex flex-col gap-4 border-t border-sand-400 bg-sand-100/60 px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <div className="max-w-md text-xs leading-5 text-ink-700">
          <p className="flex items-start gap-2"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-red" />By submitting, you agree that our team may contact you about this request.</p>
          {error ? <p className="mt-2 font-semibold text-brand-red">{error}</p> : null}
        </div>
        <button className="action-commerce shrink-0 gap-2 border-0 disabled:cursor-not-allowed disabled:opacity-60" disabled={submitting} type="submit">
          {submitting ? "Sending..." : "Send Request"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}

function saveLocalInquiry(formData: FormData, contextLabel: string | null, id: string, status: string) {
  if (typeof window === "undefined") return;

  const request: LocalInquiryRequest = {
    contextLabel,
    createdAt: new Date().toISOString(),
    id,
    message: String(formData.get("message") || ""),
    projectLocation: String(formData.get("location") || "") || null,
    projectSize: String(formData.get("quantity") || "") || null,
    status,
    type: String(formData.get("requestType") || "") || null
  };

  window.localStorage.setItem(localInquiryKey, JSON.stringify(request));
  window.dispatchEvent(new CustomEvent("kmd-inquiry-updated"));
}
