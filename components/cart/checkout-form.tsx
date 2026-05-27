"use client";

import { clearCart, getCartSubtotal, readCart } from "@/lib/cart-store";
import type { CartItem } from "@/lib/cart-store";
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCopy,
  CreditCard,
  Mail,
  MapPin,
  MessageSquareText,
  PackageCheck,
  Save,
  Send,
  ShoppingCart,
  Truck
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type CheckoutFormState = {
  customerName: string;
  phone: string;
  email: string;
  deliveryArea: string;
  addressLabel: string;
  addressType: string;
  recipientName: string;
  recipientPhone: string;
  fullAddress: string;
  mapLink: string;
  siteAccess: string;
  deliveryMethod: string;
  deliverySpeed: string;
  preferredDate: string;
  deliveryWindow: string;
  unloadingSupport: string;
  deliveryNotes: string;
  orderType: string;
  paymentMethod: string;
  notes: string;
};

type SavedAddress = {
  id: string;
  label: string;
  recipientName: string;
  recipientPhone: string;
  deliveryArea: string;
  addressType: string;
  fullAddress: string;
  mapLink: string;
  siteAccess: string;
  isDefault: boolean;
};

const savedAddressesKey = "kmd-saved-addresses";

const steps = [
  { label: "Cart", copy: "Confirm items" },
  { label: "Address", copy: "Delivery place" },
  { label: "Delivery", copy: "Method and timing" },
  { label: "Contact", copy: "Customer info" },
  { label: "Review", copy: "Check request" },
  { label: "Submit", copy: "Send request" }
] as const;

const initialFormState: CheckoutFormState = {
  customerName: "",
  phone: "",
  email: "",
  deliveryArea: "",
  addressLabel: "",
  addressType: "home",
  recipientName: "",
  recipientPhone: "",
  fullAddress: "",
  mapLink: "",
  siteAccess: "",
  deliveryMethod: "kmd-delivery",
  deliverySpeed: "standard",
  preferredDate: "",
  deliveryWindow: "",
  unloadingSupport: "confirm",
  deliveryNotes: "",
  orderType: "product-order",
  paymentMethod: "confirm-later",
  notes: ""
};

const addressTypeLabels: Record<string, string> = {
  home: "Home",
  condo: "Condo / Apartment",
  shop: "Shop / Showroom",
  site: "Construction site",
  warehouse: "Warehouse",
  office: "Office"
};

const orderTypeLabels: Record<string, string> = {
  "product-order": "Product order",
  "project-quote": "Project quote",
  "package-request": "Package request",
  "service-support": "Service support"
};

const deliveryMethodLabels: Record<string, string> = {
  "kmd-delivery": "KMD delivery",
  pickup: "Customer pickup",
  "customer-truck": "Customer truck",
  "install-team": "Delivery with installation team"
};

const deliverySpeedLabels: Record<string, string> = {
  standard: "Standard",
  urgent: "Urgent",
  scheduled: "Scheduled date"
};

const deliveryWindowLabels: Record<string, string> = {
  "": "Confirm with KMD",
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  "business-hours": "Business hours"
};

const unloadingSupportLabels: Record<string, string> = {
  confirm: "Confirm with KMD",
  yes: "Need unloading support",
  no: "No unloading support needed",
  installation: "Need installation team"
};

const paymentMethodLabels: Record<string, string> = {
  "confirm-later": "Confirm after KMD review",
  aba: "ABA transfer",
  cash: "Cash on delivery",
  invoice: "Business invoice"
};

function formatMoney(value: number) {
  return `$${value.toFixed(2)}`;
}

function createAddressId() {
  return `addr-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function readSavedAddresses() {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(savedAddressesKey);
    return stored ? (JSON.parse(stored) as SavedAddress[]) : [];
  } catch {
    return [];
  }
}

function saveSavedAddresses(addresses: SavedAddress[]) {
  window.localStorage.setItem(savedAddressesKey, JSON.stringify(addresses));
}

function addressFromForm(form: CheckoutFormState, isDefault: boolean): SavedAddress {
  return {
    id: createAddressId(),
    label: form.addressLabel.trim() || `${addressTypeLabels[form.addressType]} - ${form.deliveryArea}`,
    recipientName: form.recipientName,
    recipientPhone: form.recipientPhone,
    deliveryArea: form.deliveryArea,
    addressType: form.addressType,
    fullAddress: form.fullAddress,
    mapLink: form.mapLink,
    siteAccess: form.siteAccess,
    isDefault
  };
}

function applyAddressToForm(form: CheckoutFormState, address: SavedAddress): CheckoutFormState {
  return {
    ...form,
    addressLabel: address.label,
    recipientName: address.recipientName,
    recipientPhone: address.recipientPhone,
    deliveryArea: address.deliveryArea,
    addressType: address.addressType,
    fullAddress: address.fullAddress,
    mapLink: address.mapLink,
    siteAccess: address.siteAccess
  };
}

function getOrderMessage(form: CheckoutFormState, items: CartItem[], subtotal: number) {
  const itemLines = items.length
    ? items.map((item) => `- ${item.name} (${item.sku}) x ${item.quantity}: ${formatMoney(item.price * item.quantity)}`).join("\n")
    : "- No cart items. Customer will describe the request in notes.";

  return [
    "KMD order request",
    "",
    `Customer: ${form.customerName || "Not provided"}`,
    `Phone: ${form.phone || "Not provided"}`,
    `Email: ${form.email || "Not provided"}`,
    `Recipient: ${form.recipientName || form.customerName || "Not provided"}`,
    `Recipient phone: ${form.recipientPhone || form.phone || "Not provided"}`,
    `Delivery area: ${form.deliveryArea || "Not provided"}`,
    `Address type: ${addressTypeLabels[form.addressType]}`,
    `Address: ${form.fullAddress || "Not provided"}`,
    `Map link: ${form.mapLink || "Not provided"}`,
    `Site access: ${form.siteAccess || "Not provided"}`,
    `Delivery method: ${deliveryMethodLabels[form.deliveryMethod]}`,
    `Delivery timing: ${deliverySpeedLabels[form.deliverySpeed]}`,
    `Preferred date: ${form.preferredDate || "Not provided"}`,
    `Delivery window: ${deliveryWindowLabels[form.deliveryWindow] || "Not provided"}`,
    `Unloading support: ${unloadingSupportLabels[form.unloadingSupport]}`,
    `Delivery notes: ${form.deliveryNotes || "None"}`,
    `Order type: ${orderTypeLabels[form.orderType]}`,
    `Payment method: ${paymentMethodLabels[form.paymentMethod]}`,
    "",
    "Items:",
    itemLines,
    "",
    `Estimated subtotal: ${formatMoney(subtotal)}`,
    "Delivery: Confirm with KMD",
    "Final payment: After KMD confirmation",
    "",
    `Notes: ${form.notes || "None"}`
  ].join("\n");
}

export function CheckoutForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [items, setItems] = useState<CartItem[]>([]);
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [addressMode, setAddressMode] = useState<"saved" | "form">("form");
  const [saveAddressForLater, setSaveAddressForLater] = useState(true);
  const [makeDefaultAddress, setMakeDefaultAddress] = useState(false);
  const [addressSavedMessage, setAddressSavedMessage] = useState("");
  const [form, setForm] = useState<CheckoutFormState>(initialFormState);
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const addresses = readSavedAddresses();
    const defaultAddress = addresses.find((address) => address.isDefault) || addresses[0];

    setItems(readCart());
    setSavedAddresses(addresses);

    if (defaultAddress) {
      setSelectedAddressId(defaultAddress.id);
      setAddressMode("saved");
      setMakeDefaultAddress(defaultAddress.isDefault);
      setForm((current) => applyAddressToForm(current, defaultAddress));
    }
  }, []);

  const subtotal = useMemo(() => getCartSubtotal(items), [items]);
  const itemCount = useMemo(() => items.reduce((count, item) => count + item.quantity, 0), [items]);
  const orderMessage = useMemo(() => getOrderMessage(form, items, subtotal), [form, items, subtotal]);
  const addressReady = form.deliveryArea.trim().length > 1 && form.fullAddress.trim().length > 5;
  const contactReady = form.customerName.trim().length > 1 && form.phone.trim().length > 5;
  const requestReady = addressReady && contactReady;
  const nextActionLabel =
    activeStep === 0 ? "Choose Address" : activeStep === 1 ? "Set Delivery" : activeStep === 2 ? "Add Contact" : "Review Request";
  const encodedMessage = encodeURIComponent(orderMessage);
  const mailHref = `mailto:hello@kimmexdecor.com?subject=${encodeURIComponent("KMD order request")}&body=${encodedMessage}`;
  const whatsappHref = `https://wa.me/?text=${encodedMessage}`;

  const updateField = (field: keyof CheckoutFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setSubmittedMessage("");
    setAddressSavedMessage("");

    if (["deliveryArea", "addressLabel", "addressType", "recipientName", "recipientPhone", "fullAddress", "mapLink", "siteAccess"].includes(field)) {
      setAddressMode("form");
    }
  };

  const selectSavedAddress = (addressId: string) => {
    setSelectedAddressId(addressId);
    setAddressSavedMessage("");
    setSubmittedMessage("");

    if (!addressId) {
      setAddressMode("form");
      setMakeDefaultAddress(false);
      setForm((current) => ({
        ...current,
        addressLabel: "",
        recipientName: "",
        recipientPhone: "",
        deliveryArea: "",
        addressType: "home",
        fullAddress: "",
        mapLink: "",
        siteAccess: ""
      }));
      return;
    }

    const address = savedAddresses.find((item) => item.id === addressId);
    if (!address) return;

    setAddressMode("saved");
    setMakeDefaultAddress(address.isDefault);
    setForm((current) => applyAddressToForm(current, address));
  };

  const addNewAddress = () => {
    setSelectedAddressId("");
    setAddressMode("form");
    setMakeDefaultAddress(savedAddresses.length === 0);
    setAddressSavedMessage("");
    setSubmittedMessage("");
    setForm((current) => ({
      ...current,
      addressLabel: "",
      recipientName: "",
      recipientPhone: "",
      deliveryArea: "",
      addressType: "home",
      fullAddress: "",
      mapLink: "",
      siteAccess: ""
    }));
  };

  const editSelectedAddress = () => {
    setAddressMode("form");
    setAddressSavedMessage("");
    setSubmittedMessage("");
  };

  const saveCurrentAddress = () => {
    if (!addressReady) return;

    const nextAddress = addressFromForm(form, makeDefaultAddress);
    const existingAddressId = selectedAddressId || "";
    const withoutExisting = savedAddresses.filter((address) => address.id !== existingAddressId);
    const nextAddresses = [nextAddress, ...withoutExisting].map((address, index) => ({
      ...address,
      isDefault: makeDefaultAddress ? address.id === nextAddress.id : address.isDefault && index !== 0
    }));

    saveSavedAddresses(nextAddresses);
    setSavedAddresses(nextAddresses);
    setSelectedAddressId(nextAddress.id);
    setAddressMode("saved");
    setAddressSavedMessage("Address saved for next checkout.");
  };

  const goNext = () => {
    if (activeStep === 1 && !addressReady) return;
    if (activeStep === 3 && !contactReady) return;
    setActiveStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const goBack = () => {
    setActiveStep((current) => Math.max(current - 1, 0));
  };

  const submitRequest = () => {
    if (!requestReady) return;

    if (saveAddressForLater) {
      saveCurrentAddress();
    }

    const request = {
      createdAt: new Date().toISOString(),
      form,
      items,
      subtotal
    };

    window.localStorage.setItem("kmd-last-checkout-request", JSON.stringify(request));
    setSubmittedMessage(orderMessage);
    setActiveStep(5);
  };

  const copyRequest = async () => {
    await navigator.clipboard.writeText(orderMessage);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const clearSubmittedCart = () => {
    clearCart();
    setItems([]);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_390px] lg:items-start">
      <section className="surface-card overflow-hidden">
        <div className="border-b border-sand-400 p-5 md:p-6">
          <p className="eyebrow">Checkout Flow</p>
          <h2 className="font-serif text-3xl leading-tight text-ink-900 md:text-4xl">Complete the request in order.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-700">
            Cart, address, delivery, contact, review, then submit. Payment happens after KMD confirms the request.
          </p>
          <div className="mt-6 grid gap-2 sm:grid-cols-3 xl:grid-cols-6">
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const isDone = index < activeStep;
              const canOpenStep =
                index <= activeStep ||
                (addressReady && index <= 3) ||
                (requestReady && index <= 4) ||
                (submittedMessage.length > 0 && index === 5);

              return (
                <button
                  className={`rounded-md border p-3 text-left text-sm font-semibold transition ${
                    isActive || isDone ? "border-brand-red bg-brand-red/10 text-ink-900" : "border-sand-400 bg-sand-50 text-ink-700"
                  }`}
                  key={step.label}
                  onClick={() => {
                    if (canOpenStep) setActiveStep(index);
                  }}
                  type="button"
                >
                  <span className="mb-2 flex h-7 w-7 items-center justify-center rounded-md bg-white text-xs text-brand-red">
                    {isDone ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                  </span>
                  <span className="block">{step.label}</span>
                  <span className="mt-1 block text-xs font-normal text-ink-700">{step.copy}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-5 md:p-6">
          {activeStep === 0 ? (
            <CartReview items={items} itemCount={itemCount} subtotal={subtotal} />
          ) : activeStep === 1 ? (
            <AddressStep
              addressMode={addressMode}
              addressReady={addressReady}
              addressSavedMessage={addressSavedMessage}
              form={form}
              makeDefaultAddress={makeDefaultAddress}
              onAddNewAddress={addNewAddress}
              onEditSelectedAddress={editSelectedAddress}
              onMakeDefaultChange={setMakeDefaultAddress}
              onSaveAddress={saveCurrentAddress}
              onSaveForLaterChange={setSaveAddressForLater}
              onSelectAddress={selectSavedAddress}
              savedAddresses={savedAddresses}
              saveForLater={saveAddressForLater}
              selectedAddressId={selectedAddressId}
              updateField={updateField}
            />
          ) : activeStep === 2 ? (
            <DeliveryStep form={form} updateField={updateField} />
          ) : activeStep === 3 ? (
            <ContactStep contactReady={contactReady} form={form} updateField={updateField} />
          ) : activeStep === 4 ? (
            <ReviewStep form={form} items={items} subtotal={subtotal} />
          ) : (
            <SendStep
              copied={copied}
              itemsLength={items.length}
              mailHref={mailHref}
              onClearCart={clearSubmittedCart}
              onCopy={copyRequest}
              submittedMessage={submittedMessage}
              whatsappHref={whatsappHref}
            />
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-sand-400 p-5 md:flex-row md:items-center md:justify-between md:p-6">
          <div className="grid gap-2 text-xs leading-5 text-ink-700 sm:grid-cols-3">
            <span className="inline-flex items-center gap-2">
              <PackageCheck className="h-4 w-4 text-brand-red" />
              Stock checked by KMD
            </span>
            <span className="inline-flex items-center gap-2">
              <Truck className="h-4 w-4 text-brand-red" />
              Delivery quoted later
            </span>
            <span className="inline-flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-brand-red" />
              Payment after confirmation
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {activeStep > 0 ? (
              <button className="action-secondary gap-2" onClick={goBack} type="button">
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
            ) : null}
            {activeStep < 4 ? (
              <button className="action-commerce border-0 gap-2" disabled={(activeStep === 1 && !addressReady) || (activeStep === 3 && !contactReady)} onClick={goNext} type="button">
                {nextActionLabel}
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : activeStep === 4 ? (
              <button className="action-commerce border-0 gap-2" disabled={!requestReady} onClick={submitRequest} type="button">
                <Send className="h-4 w-4" />
                Submit Request
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <aside className="grid gap-5">
        <OrderSummary items={items} itemCount={itemCount} subtotal={subtotal} />
        <div className="surface-card p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">Saved Address</p>
          <div className="mt-4 rounded-md border border-sand-400 bg-sand-50 p-4">
            <p className="text-sm font-semibold text-ink-900">{form.addressLabel || form.deliveryArea || "No address selected"}</p>
            <p className="mt-2 text-xs leading-5 text-ink-700">{form.fullAddress || "Add delivery area and full address during checkout."}</p>
          </div>
        </div>
        <div className="surface-card p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">Delivery</p>
          <div className="mt-4 grid gap-2 rounded-md border border-sand-400 bg-sand-50 p-4 text-xs leading-5 text-ink-700">
            <p className="font-semibold text-ink-900">{deliveryMethodLabels[form.deliveryMethod]}</p>
            <p>{deliverySpeedLabels[form.deliverySpeed]}</p>
            <p>{deliveryWindowLabels[form.deliveryWindow]}</p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function CartReview({ itemCount, items, subtotal }: { itemCount: number; items: CartItem[]; subtotal: number }) {
  return (
    <div>
      <h3 className="font-serif text-3xl text-ink-900">Review cart items.</h3>
      <p className="mt-3 text-sm leading-6 text-ink-700">
        Confirm the product list before adding delivery details. Quantity changes can still be made on the cart page.
      </p>
      <div className="mt-5">
        <OrderSummary items={items} itemCount={itemCount} subtotal={subtotal} />
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <a className="action-secondary" href="/cart">
          Edit Cart
        </a>
        <a className="resource-action" href="/products">
          Add More Products
        </a>
      </div>
    </div>
  );
}

function AddressStep({
  addressMode,
  addressReady,
  addressSavedMessage,
  form,
  makeDefaultAddress,
  onAddNewAddress,
  onEditSelectedAddress,
  onMakeDefaultChange,
  onSaveAddress,
  onSaveForLaterChange,
  onSelectAddress,
  savedAddresses,
  saveForLater,
  selectedAddressId,
  updateField
}: {
  addressMode: "saved" | "form";
  addressReady: boolean;
  addressSavedMessage: string;
  form: CheckoutFormState;
  makeDefaultAddress: boolean;
  onAddNewAddress: () => void;
  onEditSelectedAddress: () => void;
  onMakeDefaultChange: (value: boolean) => void;
  onSaveAddress: () => void;
  onSaveForLaterChange: (value: boolean) => void;
  onSelectAddress: (addressId: string) => void;
  savedAddresses: SavedAddress[];
  saveForLater: boolean;
  selectedAddressId: string;
  updateField: (field: keyof CheckoutFormState, value: string) => void;
}) {
  const showAddressForm = savedAddresses.length === 0 || addressMode === "form";
  const selectedAddress = savedAddresses.find((address) => address.id === selectedAddressId);

  return (
    <form className="grid gap-6" onSubmit={(event) => event.preventDefault()}>
      <div>
        <h3 className="font-serif text-3xl text-ink-900">{savedAddresses.length > 0 ? "Select delivery address." : "Add delivery address."}</h3>
        <p className="mt-3 text-sm leading-6 text-ink-700">
          {savedAddresses.length > 0
            ? "Choose a saved address, or add a new one only when the delivery location changes."
            : "Add the first delivery address. It can be saved on this device for faster checkout later."}
        </p>
      </div>

      {savedAddresses.length > 0 ? (
        <div className="grid gap-4">
          <label className="control-label">
            Saved Address
            <select className="select-field" onChange={(event) => onSelectAddress(event.target.value)} value={selectedAddressId}>
              <option value="">Add a new address</option>
              {savedAddresses.map((address) => (
                <option key={address.id} value={address.id}>
                  {address.label}
                  {address.isDefault ? " (Default)" : ""}
                </option>
              ))}
            </select>
          </label>

          {selectedAddress && addressMode === "saved" ? (
            <div className="rounded-lg border border-sand-400 bg-sand-50 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">
                    {selectedAddress.isDefault ? "Default Address" : "Selected Address"}
                  </p>
                  <h4 className="mt-2 font-serif text-2xl text-ink-900">{selectedAddress.label}</h4>
                  <p className="mt-2 text-sm leading-6 text-ink-700">{selectedAddress.fullAddress}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-ink-700">
                    <span className="rounded-md border border-sand-400 bg-white px-2.5 py-1">{selectedAddress.deliveryArea}</span>
                    <span className="rounded-md border border-sand-400 bg-white px-2.5 py-1">{addressTypeLabels[selectedAddress.addressType]}</span>
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <button className="resource-action" onClick={onEditSelectedAddress} type="button">
                    Edit
                  </button>
                  <button className="action-secondary" onClick={onAddNewAddress} type="button">
                    Add New
                  </button>
                </div>
              </div>
              {selectedAddress.siteAccess ? <p className="mt-3 text-xs leading-5 text-ink-700">Access: {selectedAddress.siteAccess}</p> : null}
            </div>
          ) : null}
        </div>
      ) : null}

      {showAddressForm ? (
        <div className="grid gap-5">
          {savedAddresses.length > 0 ? (
            <div className="flex items-center justify-between gap-3 rounded-md border border-sand-400 bg-sand-50 p-4">
              <p className="text-sm font-semibold text-ink-900">{selectedAddressId ? "Edit selected address" : "Add new address"}</p>
              {selectedAddressId ? (
                <button className="resource-action" onClick={() => onSelectAddress(selectedAddressId)} type="button">
                  Cancel
                </button>
              ) : null}
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2">
            <label className="control-label">
              Address Label
              <input className="field" onChange={(event) => updateField("addressLabel", event.target.value)} placeholder="Home, Site 1, Showroom..." type="text" value={form.addressLabel} />
            </label>
            <label className="control-label">
              Address Type
              <select className="select-field" onChange={(event) => updateField("addressType", event.target.value)} value={form.addressType}>
                {Object.entries(addressTypeLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="control-label">
              Delivery Area
              <input className="field" onChange={(event) => updateField("deliveryArea", event.target.value)} placeholder="Phnom Penh, Siem Reap..." type="text" value={form.deliveryArea} />
            </label>
            <label className="control-label">
              Map Link
              <input className="field" onChange={(event) => updateField("mapLink", event.target.value)} placeholder="Google Maps or shared location link" type="url" value={form.mapLink} />
            </label>
            <label className="control-label">
              Receiver Name
              <input className="field" onChange={(event) => updateField("recipientName", event.target.value)} placeholder="If different from customer" type="text" value={form.recipientName} />
            </label>
            <label className="control-label">
              Receiver Phone
              <input className="field" onChange={(event) => updateField("recipientPhone", event.target.value)} placeholder="+855..." type="tel" value={form.recipientPhone} />
            </label>
            <label className="control-label md:col-span-2">
              Full Address
              <textarea
                className="textarea-field"
                onChange={(event) => updateField("fullAddress", event.target.value)}
                placeholder="House number, street, borey, floor, landmark, shop name, construction site details..."
                value={form.fullAddress}
              />
            </label>
            <label className="control-label md:col-span-2">
              Site Access
              <textarea
                className="textarea-field"
                onChange={(event) => updateField("siteAccess", event.target.value)}
                placeholder="Truck can enter, small road only, stairs, elevator, parking, delivery time limits, installation access..."
                value={form.siteAccess}
              />
            </label>
          </div>

          <div className="grid gap-3 rounded-md border border-sand-400 bg-sand-50 p-4 text-sm text-ink-900 sm:grid-cols-2">
            <label className="flex items-center gap-3 font-semibold">
              <input checked={saveForLater} onChange={(event) => onSaveForLaterChange(event.target.checked)} type="checkbox" />
              Save this address for later
            </label>
            <label className="flex items-center gap-3 font-semibold">
              <input checked={makeDefaultAddress} onChange={(event) => onMakeDefaultChange(event.target.checked)} type="checkbox" />
              Make default address
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button className="action-secondary gap-2" disabled={!addressReady} onClick={onSaveAddress} type="button">
              <Save className="h-4 w-4" />
              Save Address
            </button>
            {addressSavedMessage ? <p className="text-sm font-semibold text-brand-red">{addressSavedMessage}</p> : null}
          </div>

          {!addressReady ? (
            <div className="flex items-start gap-3 rounded-md border border-brand-red/30 bg-brand-red/10 p-4 text-sm leading-6 text-ink-900">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
              Add delivery area and full address before continuing.
            </div>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}

function DeliveryStep({
  form,
  updateField
}: {
  form: CheckoutFormState;
  updateField: (field: keyof CheckoutFormState, value: string) => void;
}) {
  return (
    <form className="grid gap-6" onSubmit={(event) => event.preventDefault()}>
      <div>
        <h3 className="font-serif text-3xl text-ink-900">Set delivery preference.</h3>
        <p className="mt-3 text-sm leading-6 text-ink-700">
          Delivery cost is confirmed by KMD, but these details help the team quote the right truck, timing, and support.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="control-label">
          Delivery Method
          <select className="select-field" onChange={(event) => updateField("deliveryMethod", event.target.value)} value={form.deliveryMethod}>
            {Object.entries(deliveryMethodLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="control-label">
          Timing
          <select className="select-field" onChange={(event) => updateField("deliverySpeed", event.target.value)} value={form.deliverySpeed}>
            {Object.entries(deliverySpeedLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="control-label">
          Preferred Date
          <input className="field" onChange={(event) => updateField("preferredDate", event.target.value)} type="date" value={form.preferredDate} />
        </label>
        <label className="control-label">
          Delivery Window
          <select className="select-field" onChange={(event) => updateField("deliveryWindow", event.target.value)} value={form.deliveryWindow}>
            <option value="">Confirm with KMD</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="business-hours">Business hours</option>
          </select>
        </label>
        <label className="control-label md:col-span-2">
          Unloading or Installation Support
          <select className="select-field" onChange={(event) => updateField("unloadingSupport", event.target.value)} value={form.unloadingSupport}>
            {Object.entries(unloadingSupportLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="control-label md:col-span-2">
          Delivery Notes
          <textarea
            className="textarea-field"
            onChange={(event) => updateField("deliveryNotes", event.target.value)}
            placeholder="Truck size limits, unload location, preferred contact on arrival, delivery restrictions, floor level, or special handling."
            value={form.deliveryNotes}
          />
        </label>
      </div>
    </form>
  );
}

function ContactStep({
  contactReady,
  form,
  updateField
}: {
  contactReady: boolean;
  form: CheckoutFormState;
  updateField: (field: keyof CheckoutFormState, value: string) => void;
}) {
  return (
    <form className="grid gap-6" onSubmit={(event) => event.preventDefault()}>
      <div>
        <h3 className="font-serif text-3xl text-ink-900">Add contact and request details.</h3>
        <p className="mt-3 text-sm leading-6 text-ink-700">
          Name and phone are required so KMD can confirm availability, delivery, and payment direction.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="control-label">
          Customer Name
          <input className="field" onChange={(event) => updateField("customerName", event.target.value)} placeholder="Full name" type="text" value={form.customerName} />
        </label>
        <label className="control-label">
          Phone
          <input className="field" onChange={(event) => updateField("phone", event.target.value)} placeholder="+855..." type="tel" value={form.phone} />
        </label>
        <label className="control-label md:col-span-2">
          Email
          <input className="field" onChange={(event) => updateField("email", event.target.value)} placeholder="name@example.com" type="email" value={form.email} />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="control-label">
          Order Type
          <select className="select-field" onChange={(event) => updateField("orderType", event.target.value)} value={form.orderType}>
            <option value="product-order">Product order</option>
            <option value="project-quote">Project quote</option>
            <option value="package-request">Package request</option>
            <option value="service-support">Service support</option>
          </select>
        </label>
        <label className="control-label">
          Payment Method
          <select className="select-field" onChange={(event) => updateField("paymentMethod", event.target.value)} value={form.paymentMethod}>
            <option value="confirm-later">Confirm after KMD review</option>
            <option value="aba">ABA transfer</option>
            <option value="cash">Cash on delivery</option>
            <option value="invoice">Business invoice</option>
          </select>
        </label>
        <label className="control-label md:col-span-2">
          Notes
          <textarea
            className="textarea-field"
            onChange={(event) => updateField("notes", event.target.value)}
            placeholder="Room size, BOQ notes, substitutions, installation needs, invoice details, or other request details."
            value={form.notes}
          />
        </label>
      </div>

      {!contactReady ? (
        <div className="flex items-start gap-3 rounded-md border border-brand-red/30 bg-brand-red/10 p-4 text-sm leading-6 text-ink-900">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
          Add customer name and phone number before continuing.
        </div>
      ) : null}
    </form>
  );
}

function ReviewStep({ form, items, subtotal }: { form: CheckoutFormState; items: CartItem[]; subtotal: number }) {
  return (
    <div>
      <h3 className="font-serif text-3xl text-ink-900">Review request before sending.</h3>
      <p className="mt-3 text-sm leading-6 text-ink-700">
        This is the request KMD will use to confirm availability, delivery, service scope, and payment instruction.
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <ReviewItem label="Customer" value={form.customerName} />
        <ReviewItem label="Phone" value={form.phone} />
        <ReviewItem label="Delivery Area" value={form.deliveryArea} />
        <ReviewItem label="Address Type" value={addressTypeLabels[form.addressType]} />
        <ReviewItem label="Recipient" value={form.recipientName || form.customerName || "Confirm by phone"} />
        <ReviewItem label="Recipient Phone" value={form.recipientPhone || form.phone || "Confirm by phone"} />
        <ReviewItem label="Delivery Method" value={deliveryMethodLabels[form.deliveryMethod]} />
        <ReviewItem label="Delivery Timing" value={deliverySpeedLabels[form.deliverySpeed]} />
        <ReviewItem label="Preferred Date" value={form.preferredDate || "Confirm later"} />
        <ReviewItem label="Delivery Window" value={deliveryWindowLabels[form.deliveryWindow]} />
        <ReviewItem label="Support" value={unloadingSupportLabels[form.unloadingSupport]} />
        <ReviewItem label="Payment" value={paymentMethodLabels[form.paymentMethod]} />
      </div>
      <div className="mt-4 rounded-md border border-sand-400 bg-sand-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-700">Full Address</p>
        <p className="mt-2 text-sm leading-6 text-ink-900">{form.fullAddress}</p>
        {form.mapLink ? (
          <a className="mt-3 inline-flex text-sm font-semibold text-brand-red" href={form.mapLink} rel="noreferrer" target="_blank">
            Open map link
          </a>
        ) : null}
      </div>
      {form.siteAccess ? (
        <div className="mt-4 rounded-md border border-sand-400 bg-sand-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-700">Site Access</p>
          <p className="mt-2 text-sm leading-6 text-ink-900">{form.siteAccess}</p>
        </div>
      ) : null}
      {form.deliveryNotes ? (
        <div className="mt-4 rounded-md border border-sand-400 bg-sand-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-700">Delivery Notes</p>
          <p className="mt-2 text-sm leading-6 text-ink-900">{form.deliveryNotes}</p>
        </div>
      ) : null}
      {form.notes ? (
        <div className="mt-4 rounded-md border border-sand-400 bg-sand-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-700">Notes</p>
          <p className="mt-2 text-sm leading-6 text-ink-900">{form.notes}</p>
        </div>
      ) : null}
      <div className="mt-5">
        <OrderSummary items={items} itemCount={items.reduce((count, item) => count + item.quantity, 0)} subtotal={subtotal} />
      </div>
      <div className="mt-5 flex items-start gap-3 rounded-md border border-brand-red/30 bg-brand-red/10 p-4 text-sm leading-6 text-ink-900">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
        KMD will confirm delivery cost, stock status, and payment instruction before the order is final.
      </div>
    </div>
  );
}

function SendStep({
  copied,
  itemsLength,
  mailHref,
  onClearCart,
  onCopy,
  submittedMessage,
  whatsappHref
}: {
  copied: boolean;
  itemsLength: number;
  mailHref: string;
  onClearCart: () => void;
  onCopy: () => void;
  submittedMessage: string;
  whatsappHref: string;
}) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-brand-red" />
        <div>
          <h3 className="font-serif text-3xl text-ink-900">{submittedMessage ? "Request submitted." : "Submit the request first."}</h3>
          <p className="mt-3 text-sm leading-6 text-ink-700">
            {submittedMessage
              ? "Your order request is ready to share with KMD. After KMD receives it, the request is waiting for stock, delivery, and payment confirmation."
              : "Return to the review step and submit the request before choosing a sharing option."}
          </p>
        </div>
      </div>

      {submittedMessage ? (
        <>
          <div className="mt-5 rounded-md border border-brand-red/30 bg-brand-red/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">Request Status</p>
            <p className="mt-2 text-sm font-semibold text-ink-900">Waiting for KMD confirmation</p>
            <p className="mt-2 text-xs leading-5 text-ink-700">KMD should confirm final total, delivery cost, availability, and payment instruction before the order is final.</p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <a className="action-commerce gap-2" href={mailHref}>
            <Mail className="h-4 w-4" />
            Email
          </a>
          <a className="action-secondary gap-2" href={whatsappHref} rel="noreferrer" target="_blank">
            <MessageSquareText className="h-4 w-4" />
            WhatsApp
          </a>
          <button className="action-secondary gap-2" onClick={onCopy} type="button">
            <ClipboardCopy className="h-4 w-4" />
            {copied ? "Copied" : "Copy"}
          </button>
          </div>
        </>
      ) : (
        <p className="mt-5 rounded-md border border-sand-400 bg-sand-50 p-4 text-sm leading-6 text-ink-700">
          Go back to review and submit the request before choosing a sharing option.
        </p>
      )}

      {itemsLength > 0 && submittedMessage ? (
        <button className="mt-5 text-sm font-semibold text-ink-700" onClick={onClearCart} type="button">
          Clear submitted cart
        </button>
      ) : null}
    </div>
  );
}

function OrderSummary({ itemCount, items, subtotal }: { itemCount: number; items: CartItem[]; subtotal: number }) {
  return (
    <div className="rounded-lg border border-sand-400 bg-sand-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-red">Order Summary</p>
          <p className="mt-1 text-sm text-ink-700">{itemCount} item(s) prepared for review</p>
        </div>
        <ShoppingCart className="h-6 w-6 text-brand-red" />
      </div>

      {items.length === 0 ? (
        <p className="mt-4 rounded-md border border-sand-400 bg-white p-4 text-sm leading-6 text-ink-700">
          The cart is empty. You can still submit a request if the product list is included in the notes.
        </p>
      ) : (
        <div className="mt-4 grid gap-3">
          {items.map((item) => (
            <div key={item.id} className="grid gap-1 border-b border-sand-400 pb-3 last:border-b-0 last:pb-0">
              <div className="flex justify-between gap-3 text-sm">
                <span className="font-semibold text-ink-900">{item.name}</span>
                <span className="font-semibold text-brand-red">{formatMoney(item.price * item.quantity)}</span>
              </div>
              <div className="text-xs text-ink-700">
                {item.quantity} x {formatMoney(item.price)} / {item.unit}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex justify-between gap-3 border-t border-sand-400 pt-4">
        <span className="font-semibold text-ink-900">Estimated subtotal</span>
        <span className="text-xl font-semibold text-brand-red">{formatMoney(subtotal)}</span>
      </div>
      <div className="mt-3 grid gap-2 text-xs leading-5 text-ink-700">
        <p>Delivery: Confirm with KMD</p>
        <p>Payment: After confirmation</p>
      </div>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-sand-400 bg-sand-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-700">{label}</p>
      <p className="mt-2 text-sm font-semibold text-ink-900">{value}</p>
    </div>
  );
}
