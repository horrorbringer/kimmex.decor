"use client";

"use client";

import { ArrowRight, CheckCircle2, Paperclip } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import { buildInquiryPayload, submitInquiry } from "@/lib/api-inquiries";
import { useFormValidation } from "@/lib/use-form-validation";
import { projectPackages, projects, services } from "@/lib/homepage-data";
import type { ProductItem } from "@/lib/homepage-data";

type RequestContext = {
  label: string | null;
  message: string;
  type: string;
};

type ContactRequestFormProps = {
  products: ProductItem[];
};

const topicLabels: Record<string, string> = {
  "delivery-installation": "Delivery and installation support",
  "portfolio-reference": "Project reference request",
  "project-advice": "Project advice"
};

function productSlug(product: ProductItem) {
  return product.href.replace("/products/", "");
}

export function ContactRequestForm({ products }: ContactRequestFormProps) {
  return (
    <Suspense fallback={<RequestForm context={{ label: null, message: "", type: "project" }} />}>
      <RequestFormWithParams products={products} />
    </Suspense>
  );
}

function RequestFormWithParams({ products }: ContactRequestFormProps) {
  const searchParams = useSearchParams();
  return <RequestForm context={getRequestContext(searchParams, products)} />;
}

function getRequestContext(searchParams: URLSearchParams, products: ProductItem[]): RequestContext {
  const serviceId = searchParams.get("service");
  const productId = searchParams.get("product");
  const packageId = searchParams.get("package");
  const projectId = searchParams.get("project");
  const requestType = searchParams.get("type");
  const topic = searchParams.get("topic");
  const imageSearch = searchParams.get("imageSearch");
  const quantity = searchParams.get("quantity");

  const service = services.find((item) => item.id === serviceId);
  if (service) {
    return {
      label: service.title,
      message: `I would like to discuss ${service.title}. Approximate size, location, and preferred timeline:`,
      type: "service"
    };
  }

  const product = products.find((item) => item.id === productId || productSlug(item) === productId);
  if (product) {
    return {
      label: product.name,
      message: `I need help with ${product.name}.${quantity ? ` Required quantity: ${quantity} ${product.unit}${Number(quantity) === 1 ? "" : "s"}.` : ""} Delivery location and timing:`,
      type: "product"
    };
  }

  const projectPackage = projectPackages.find((item) => item.id === packageId);
  if (projectPackage) {
    return {
      label: projectPackage.title,
      message: `I would like a quote for ${projectPackage.title}. Project size, location, and preferred timeline:`,
      type: "package"
    };
  }

  const project = projects.find((item) => item.id === projectId);
  if (project) {
    return {
      label: `Inspired by: ${project.title}`,
      message: `I am interested in planning work similar to ${project.title}. My space, size, and preferred direction:`,
      type: "project"
    };
  }

  if (imageSearch) {
    return {
      label: "Photo-based material request",
      message: "I would like a product or service recommendation based on my reference photo. Project size and location:",
      type: "project"
    };
  }

  if (requestType === "order-request") {
    return {
      label: "Cart and order request",
      message: "I would like help reviewing product availability, quantities, and delivery for my order:",
      type: "product"
    };
  }

  if (requestType === "package") {
    return {
      label: "Project package",
      message: "I would like help preparing a project package. Materials, approximate size, and location:",
      type: "package"
    };
  }

  if (topic && topicLabels[topic]) {
    return {
      label: topicLabels[topic],
      message: `I would like help with ${topicLabels[topic].toLowerCase()}. Project details:`,
      type: topic === "delivery-installation" ? "delivery" : "project"
    };
  }

  return { label: null, message: "", type: "project" };
}

function RequestForm({ context }: { context: RequestContext }) {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState("");
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

        {context.label ? (
          <div className="mt-6 flex items-start gap-3 rounded-lg border border-brand-red/25 bg-brand-red/5 p-4">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-red">Request selected</p>
              <p className="mt-1 text-sm font-semibold text-ink-900">{context.label}</p>
            </div>
          </div>
        ) : null}
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
          <input className="field" name="quantity" placeholder="Example: 80 m² or 20 sheets" type="text" />
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
          <p>By submitting, you agree that our team may contact you about this request.</p>
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
