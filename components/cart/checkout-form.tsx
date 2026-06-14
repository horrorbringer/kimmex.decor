"use client";

import { clearCart, getCartSubtotal, readCart } from "@/lib/cart-store";
import type { CartItem } from "@/lib/cart-store";
import { formatCambodianPhone, getInternationalCambodianPhone, isValidCambodianPhone } from "@/lib/phone";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  PackageCheck,
  Phone,
  ShoppingBag,
  Store,
  Truck
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type CheckoutDetails = {
  name: string;
  phone: string;
  email: string;
  area: string;
  address: string;
  mapLink: string;
  deliveryMethod: "delivery" | "pickup";
  timing: "standard" | "urgent" | "scheduled";
  preferredDate: string;
  support: "none" | "unloading" | "installation";
  notes: string;
};

const initialDetails: CheckoutDetails = {
  name: "",
  phone: "",
  email: "",
  area: "",
  address: "",
  mapLink: "",
  deliveryMethod: "delivery",
  timing: "standard",
  preferredDate: "",
  support: "none",
  notes: ""
};

const steps = ["Contact & location", "Delivery options", "Review request"];

function formatMoney(value: number) {
  return `$${value.toFixed(2)}`;
}

function buildRequest(details: CheckoutDetails, items: CartItem[], subtotal: number) {
  const itemLines = items.length
    ? items.map((item) => `- ${item.name} (${item.sku}) x ${item.quantity}: ${formatMoney(item.price * item.quantity)}`)
    : ["- No products selected. Please contact me about my request."];

  return [
    "KMD Decor order request",
    "",
    `Customer: ${details.name}`,
    `Phone: ${getInternationalCambodianPhone(details.phone)}`,
    `Email: ${details.email || "Not provided"}`,
    `Method: ${details.deliveryMethod === "delivery" ? "KMD delivery" : "Pickup from KMD"}`,
    `Area: ${details.deliveryMethod === "delivery" ? details.area : "KMD showroom pickup"}`,
    `Address: ${details.deliveryMethod === "delivery" ? details.address : "Not required"}`,
    `Map: ${details.mapLink || "Not provided"}`,
    `Timing: ${details.timing}`,
    `Preferred date: ${details.preferredDate || "Flexible"}`,
    `Support: ${details.support}`,
    "",
    "Items:",
    ...itemLines,
    "",
    `Estimated subtotal: ${formatMoney(subtotal)}`,
    "Delivery and final total: To be confirmed by KMD",
    `Notes: ${details.notes || "None"}`
  ].join("\n");
}

export function CheckoutForm() {
  const [step, setStep] = useState(0);
  const [items, setItems] = useState<CartItem[]>([]);
  const [details, setDetails] = useState<CheckoutDetails>(initialDetails);
  const [showErrors, setShowErrors] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => setItems(readCart()), []);

  const subtotal = useMemo(() => getCartSubtotal(items), [items]);
  const itemCount = useMemo(() => items.reduce((total, item) => total + item.quantity, 0), [items]);
  const phoneReady = isValidCambodianPhone(details.phone);
  const contactReady = details.name.trim().length > 1 && phoneReady;
  const locationReady =
    details.deliveryMethod === "pickup" || (details.area.trim().length > 1 && details.address.trim().length > 5);
  const stepReady = contactReady && locationReady;
  const request = useMemo(() => buildRequest(details, items, subtotal), [details, items, subtotal]);
  const whatsappHref = `https://wa.me/85516927683?text=${encodeURIComponent(request)}`;
  const emailHref = `mailto:hello@kimmexdecor.com?subject=${encodeURIComponent("KMD Decor order request")}&body=${encodeURIComponent(request)}`;

  const update = <K extends keyof CheckoutDetails>(field: K, value: CheckoutDetails[K]) => {
    setDetails((current) => ({ ...current, [field]: value }));
    setShowErrors(false);
  };

  const continueFlow = () => {
    if (step === 0 && !stepReady) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setStep((current) => Math.min(current + 1, 2));
  };

  const submit = () => {
    if (!stepReady) {
      setStep(0);
      setShowErrors(true);
      return;
    }
    window.localStorage.setItem(
      "kmd-last-checkout-request",
      JSON.stringify({ createdAt: new Date().toISOString(), details, items, subtotal })
    );
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="checkout-success">
        <div className="checkout-success-icon"><CheckCircle2 /></div>
        <p className="eyebrow">Request ready</p>
        <h2 className="font-serif text-4xl text-ink-900 md:text-5xl">Send it to KMD for confirmation.</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-ink-700">
          Your request is saved on this device. Choose WhatsApp for the fastest response, or send it by email.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a className="action-commerce gap-2" href={whatsappHref} rel="noreferrer" target="_blank">
            <MessageCircle className="h-4 w-4" /> Send with WhatsApp
          </a>
          <a className="action-secondary gap-2" href={emailHref}>
            <Mail className="h-4 w-4" /> Send by Email
          </a>
        </div>
        {items.length > 0 ? (
          <button className="mt-6 text-sm font-semibold text-ink-700 underline" onClick={() => { clearCart(); setItems([]); }} type="button">
            Clear submitted cart
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <div className="checkout-layout">
      <section className="checkout-panel">
        <div className="checkout-progress" aria-label="Checkout progress">
          {steps.map((label, index) => (
            <button
              aria-current={step === index ? "step" : undefined}
              className={`checkout-progress-step ${step === index ? "is-active" : ""} ${step > index ? "is-complete" : ""}`}
              key={label}
              onClick={() => index < step && setStep(index)}
              type="button"
            >
              <span>{step > index ? <Check className="h-4 w-4" /> : index + 1}</span>
              <strong>{label}</strong>
            </button>
          ))}
        </div>

        <div className="checkout-form-body">
          {step === 0 ? (
            <div className="grid gap-7">
              <div>
                <p className="eyebrow">Step 1 of 3</p>
                <h2 className="font-serif text-3xl text-ink-900 md:text-4xl">Where should we contact and deliver?</h2>
                <p className="mt-2 text-sm leading-6 text-ink-700">Only your name and phone are required for contact.</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Full name" required error={showErrors && details.name.trim().length < 2}>
                  <input autoComplete="name" className="field" onChange={(event) => update("name", event.target.value)} placeholder="Your name" value={details.name} />
                </Field>
                <label className={`control-label ${showErrors && !phoneReady ? "has-error" : ""}`}>
                  <span>Phone number <em>Required</em></span>
                  <span className="phone-field">
                    <span className="phone-country" aria-hidden="true"><Phone /> +855</span>
                    <input
                      aria-describedby="checkout-phone-help"
                      aria-invalid={showErrors && !phoneReady}
                      autoComplete="tel-national"
                      inputMode="numeric"
                      maxLength={18}
                      onChange={(event) => update("phone", formatCambodianPhone(event.target.value))}
                      placeholder="12 345 678"
                      type="tel"
                      value={details.phone}
                    />
                    {phoneReady ? <CheckCircle2 aria-label="Valid phone number" className="phone-valid" /> : null}
                  </span>
                  <small className={showErrors && !phoneReady ? "phone-help is-error" : "phone-help"} id="checkout-phone-help">
                    {showErrors && !phoneReady ? "Enter a valid 8 or 9 digit Cambodian phone number." : "Cambodia number, without the first 0."}
                  </small>
                </label>
                <Field label="Email (optional)">
                  <input autoComplete="email" className="field" onChange={(event) => update("email", event.target.value)} placeholder="name@example.com" type="email" value={details.email} />
                </Field>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-ink-900">How will you receive the order?</p>
                <div className="option-grid sm:grid-cols-2">
                  <OptionButton active={details.deliveryMethod === "delivery"} icon={<Truck />} label="KMD delivery" copy="We confirm the delivery fee" onClick={() => update("deliveryMethod", "delivery")} />
                  <OptionButton active={details.deliveryMethod === "pickup"} icon={<Store />} label="Pick up" copy="Collect from KMD" onClick={() => update("deliveryMethod", "pickup")} />
                </div>
              </div>

              {details.deliveryMethod === "delivery" ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="City / area" required error={showErrors && details.area.trim().length < 2}>
                    <input autoComplete="address-level2" className="field" onChange={(event) => update("area", event.target.value)} placeholder="Phnom Penh, Siem Reap..." value={details.area} />
                  </Field>
                  <Field label="Google Maps link (optional)">
                    <input className="field" onChange={(event) => update("mapLink", event.target.value)} placeholder="Paste shared location" type="url" value={details.mapLink} />
                  </Field>
                  <Field label="Delivery address" required error={showErrors && details.address.trim().length < 6} className="md:col-span-2">
                    <textarea autoComplete="street-address" className="textarea-field min-h-28" onChange={(event) => update("address", event.target.value)} placeholder="House, street, borey, building, floor, and landmark" value={details.address} />
                  </Field>
                </div>
              ) : (
                <div className="checkout-note"><MapPin className="h-5 w-5" /> KMD will send pickup location and collection time after confirming stock.</div>
              )}

              {showErrors && !stepReady ? <p className="field-error-summary">Please complete the highlighted required fields.</p> : null}
            </div>
          ) : null}

          {step === 1 ? (
            <div className="grid gap-7">
              <div>
                <p className="eyebrow">Step 2 of 3</p>
                <h2 className="font-serif text-3xl text-ink-900 md:text-4xl">Choose what works for your project.</h2>
                <p className="mt-2 text-sm leading-6 text-ink-700">These preferences are optional and can be changed when KMD calls.</p>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold text-ink-900">Timing</p>
                <div className="option-grid sm:grid-cols-3">
                  <OptionButton active={details.timing === "standard"} icon={<Clock3 />} label="Flexible" copy="Best available date" onClick={() => update("timing", "standard")} />
                  <OptionButton active={details.timing === "urgent"} icon={<Truck />} label="Urgent" copy="As soon as possible" onClick={() => update("timing", "urgent")} />
                  <OptionButton active={details.timing === "scheduled"} icon={<CheckCircle2 />} label="Set a date" copy="Request a specific day" onClick={() => update("timing", "scheduled")} />
                </div>
              </div>
              {details.timing === "scheduled" ? (
                <Field label="Preferred date" className="max-w-sm"><input className="field" min={new Date().toISOString().slice(0, 10)} onChange={(event) => update("preferredDate", event.target.value)} type="date" value={details.preferredDate} /></Field>
              ) : null}
              <div>
                <p className="mb-3 text-sm font-semibold text-ink-900">Extra support</p>
                <div className="option-grid sm:grid-cols-3">
                  <OptionButton active={details.support === "none"} icon={<PackageCheck />} label="No support" copy="Delivery or pickup only" onClick={() => update("support", "none")} />
                  <OptionButton active={details.support === "unloading"} icon={<ShoppingBag />} label="Unloading" copy="Help unload materials" onClick={() => update("support", "unloading")} />
                  <OptionButton active={details.support === "installation"} icon={<CheckCircle2 />} label="Installation" copy="Request an install quote" onClick={() => update("support", "installation")} />
                </div>
              </div>
              <Field label="Order notes (optional)">
                <textarea className="textarea-field min-h-28" onChange={(event) => update("notes", event.target.value)} placeholder="Access limits, room size, invoice needs, substitutions, or anything KMD should know" value={details.notes} />
              </Field>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-6">
              <div>
                <p className="eyebrow">Step 3 of 3</p>
                <h2 className="font-serif text-3xl text-ink-900 md:text-4xl">Review and send your request.</h2>
                <p className="mt-2 text-sm leading-6 text-ink-700">No payment is taken now. KMD confirms availability, delivery, and final price first.</p>
              </div>
              <div className="review-grid">
                <ReviewBlock title="Contact" onEdit={() => setStep(0)}>
                  <strong>{details.name}</strong><span>{getInternationalCambodianPhone(details.phone)}</span>{details.email ? <span>{details.email}</span> : null}
                </ReviewBlock>
                <ReviewBlock title={details.deliveryMethod === "delivery" ? "Delivery" : "Pickup"} onEdit={() => setStep(0)}>
                  {details.deliveryMethod === "delivery" ? <><strong>{details.area}</strong><span>{details.address}</span></> : <span>Pickup details will be confirmed by KMD.</span>}
                </ReviewBlock>
                <ReviewBlock title="Preferences" onEdit={() => setStep(1)}>
                  <strong className="capitalize">{details.timing}</strong><span className="capitalize">Support: {details.support}</span>{details.preferredDate ? <span>{details.preferredDate}</span> : null}
                </ReviewBlock>
              </div>
              <div className="checkout-note"><CheckCircle2 className="h-5 w-5" /> Submitting saves the request, then you choose WhatsApp or email to send it to KMD.</div>
            </div>
          ) : null}
        </div>

        <div className="checkout-actions">
          {step > 0 ? <button className="action-secondary gap-2" onClick={() => setStep((current) => current - 1)} type="button"><ArrowLeft className="h-4 w-4" /> Back</button> : <a className="action-secondary gap-2" href="/cart"><ArrowLeft className="h-4 w-4" /> Cart</a>}
          {step < 2 ? <button className="action-commerce gap-2" onClick={continueFlow} type="button">Continue <ArrowRight className="h-4 w-4" /></button> : <button className="action-commerce gap-2" onClick={submit} type="button"><CheckCircle2 className="h-4 w-4" /> Submit request</button>}
        </div>
      </section>

      <OrderSummary items={items} itemCount={itemCount} subtotal={subtotal} />
    </div>
  );
}

function Field({ children, className = "", error = false, label, required = false }: { children: React.ReactNode; className?: string; error?: boolean; label: string; required?: boolean }) {
  return <label className={`control-label ${className} ${error ? "has-error" : ""}`}><span>{label}{required ? <em>Required</em> : null}</span>{children}</label>;
}

function OptionButton({ active, copy, icon, label, onClick }: { active: boolean; copy: string; icon: React.ReactNode; label: string; onClick: () => void }) {
  return <button aria-pressed={active} className={`checkout-option ${active ? "is-selected" : ""}`} onClick={onClick} type="button"><span className="checkout-option-icon">{icon}</span><span><strong>{label}</strong><small>{copy}</small></span>{active ? <Check className="checkout-option-check" /> : null}</button>;
}

function ReviewBlock({ children, onEdit, title }: { children: React.ReactNode; onEdit: () => void; title: string }) {
  return <div className="review-block"><div><p>{title}</p><button onClick={onEdit} type="button">Edit</button></div><section>{children}</section></div>;
}

function OrderSummary({ itemCount, items, subtotal }: { itemCount: number; items: CartItem[]; subtotal: number }) {
  return (
    <aside className="checkout-summary">
      <div className="flex items-center justify-between"><div><p className="eyebrow mb-1">Your order</p><h2 className="font-serif text-2xl text-ink-900">{itemCount} {itemCount === 1 ? "item" : "items"}</h2></div><ShoppingBag className="h-6 w-6 text-brand-red" /></div>
      <div className="checkout-summary-items">
        {items.length ? items.map((item) => <div className="checkout-summary-item" key={item.id}><img alt="" src={item.imageUrl} /><div><strong>{item.name}</strong><span>{item.quantity} x {formatMoney(item.price)}</span></div><b>{formatMoney(item.price * item.quantity)}</b></div>) : <p className="text-sm leading-6 text-ink-700">Your cart is empty. You can still send KMD a general request.</p>}
      </div>
      <div className="checkout-total"><span>Estimated subtotal</span><strong>{formatMoney(subtotal)}</strong></div>
      <div className="checkout-summary-note"><Truck className="h-4 w-4" /><span>Delivery fee and final total are confirmed before payment.</span></div>
      <a className="mt-4 inline-flex text-sm font-semibold text-ink-700 underline" href="/cart">Edit cart</a>
    </aside>
  );
}
