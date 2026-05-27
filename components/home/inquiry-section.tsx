"use client";

import { services } from "@/lib/homepage-data";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export function InquirySection() {
  return (
    <Suspense fallback={<InquiryForm inquiryType="service" />}>
      <InquirySectionWithParams />
    </Suspense>
  );
}

function InquirySectionWithParams() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service");
  const productId = searchParams.get("product");
  const imageSearch = searchParams.get("imageSearch");
  const service = services.find((item) => item.id === serviceId);
  const inquiryType = productId ? "product" : serviceId ? "service" : imageSearch ? "project" : "service";
  const contextLabel = service
    ? `${service.title} quote`
    : productId
      ? `Product request: ${productId}`
      : imageSearch
        ? "Photo search quote"
        : null;
  const defaultMessage = service
    ? `I need a quote for ${service.title}. Project location, size, and preferred timeline:`
    : productId
      ? `I need help with product ${productId}. Quantity, delivery location, and timeline:`
      : imageSearch
        ? "I used photo search. I want KMD to recommend materials or service based on my photo. Project size/location:"
        : "";

  return <InquiryForm contextLabel={contextLabel} defaultMessage={defaultMessage} inquiryType={inquiryType} />;
}

function InquiryForm({
  contextLabel = null,
  defaultMessage = "",
  inquiryType
}: {
  contextLabel?: string | null;
  defaultMessage?: string;
  inquiryType: string;
}) {
  return (
    <section id="contact" className="section-shell">
      <div className="surface-card grid gap-8 p-8 lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
        <div>
          <p className="eyebrow">Quotation Request</p>
          <h2 className="section-title">Send product needs, project details, or a material list.</h2>
          <p className="section-copy mt-4">
            Keep the first step simple. The team can follow up with availability, package options, delivery details,
            and service recommendations.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-ink-700 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-lg border border-sand-400 bg-sand-50 p-4">Phone: +855 XX XXX XXX</div>
            <div className="rounded-lg border border-sand-400 bg-sand-50 p-4">Email: hello@kimmexdecor.com</div>
            <div className="rounded-lg border border-sand-400 bg-sand-50 p-4">Location: Phnom Penh, Cambodia</div>
          </div>
        </div>
        <form className="grid gap-4 md:grid-cols-2">
          {contextLabel ? (
            <div className="md:col-span-2 rounded-lg border border-brand-red/40 bg-brand-red/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">Request context</p>
              <p className="mt-1 text-sm font-semibold text-ink-900">{contextLabel}</p>
            </div>
          ) : null}
          <label className="control-label">
            Name
            <input className="field" placeholder="Your name" type="text" />
          </label>
          <label className="control-label">
            Phone
            <input className="field" placeholder="+855..." type="tel" />
          </label>
          <label className="control-label md:col-span-2">
            Location
            <input className="field" placeholder="Project location or delivery area" type="text" />
          </label>
          <label className="control-label md:col-span-2">
            Inquiry Type
            <select className="select-field" defaultValue={inquiryType}>
              <option value="service">Service consultation</option>
              <option value="product">Product request</option>
              <option value="project">Project support</option>
              <option value="package">Project package quote</option>
            </select>
          </label>
          <label className="control-label">
            Estimated Budget
            <select className="select-field" defaultValue="">
              <option value="" disabled>
                Select range
              </option>
              <option value="under-500">Under $500</option>
              <option value="500-2000">$500 - $2,000</option>
              <option value="2000-plus">$2,000+</option>
              <option value="not-sure">Not sure yet</option>
            </select>
          </label>
          <label className="control-label">
            Timeline
            <select className="select-field" defaultValue="">
              <option value="" disabled>
                Select timeline
              </option>
              <option value="urgent">Urgent</option>
              <option value="this-month">This month</option>
              <option value="planning">Planning stage</option>
            </select>
          </label>
          <label className="control-label md:col-span-2">
            Message
            <textarea className="textarea-field" defaultValue={defaultMessage} placeholder="Tell us what materials, service, or package you need." />
          </label>
          <label className="control-label md:col-span-2">
            Photo or BOQ
            <span className="rounded-lg border border-dashed border-sand-400 bg-sand-50 p-4 text-sm text-ink-700">
              <input accept="image/*,.pdf,.xls,.xlsx" className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-brand-red file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white" type="file" />
              <span className="mt-3 block text-xs leading-5">Attach a room photo, material sample, BOQ, drawing, or screenshot for faster recommendations.</span>
            </span>
          </label>
          <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
            <p className="text-xs leading-5 text-ink-700">For photo search results, include room size, delivery area, and preferred contact method.</p>
            <button className="action-commerce border-0" type="submit">
              Send Quote Request
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
