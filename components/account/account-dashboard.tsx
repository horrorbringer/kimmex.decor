"use client";

import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { useLanguage } from "@/components/language-provider";
import { getCartSubtotal, readCart } from "@/lib/cart-store";
import type { CartItem } from "@/lib/cart-store";
import { products } from "@/lib/homepage-data";
import { formatCambodianPhone, getInternationalCambodianPhone, isValidCambodianPhone } from "@/lib/phone";
import { readWishlist } from "@/lib/wishlist-store";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  CircleUserRound,
  Clock3,
  Heart,
  Home,
  Mail,
  MapPin,
  PackageCheck,
  Phone,
  Save,
  ShoppingBag,
  Store,
  Truck
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type View = "overview" | "orders" | "saved" | "profile";
type Profile = { name: string; phone: string; email: string; area: string };
type CheckoutRequest = {
  createdAt?: string;
  details?: { name?: string; phone?: string; email?: string; area?: string; address?: string; deliveryMethod?: string };
  form?: { customerName?: string; phone?: string; email?: string; deliveryArea?: string; fullAddress?: string; deliveryMethod?: string };
  items?: CartItem[];
  subtotal?: number;
};

const profileKey = "kmd-customer-profile";
const emptyProfile: Profile = { name: "", phone: "", email: "", area: "" };

function readJson<T>(key: string): T | null {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}

function formatMoney(value: number) {
  return `$${value.toFixed(2)}`;
}

export function AccountDashboard() {
  const { language, text } = useLanguage();
  const [view, setView] = useState<View>("overview");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [request, setRequest] = useState<CheckoutRequest | null>(null);
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [profileSaved, setProfileSaved] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const lastRequest = readJson<CheckoutRequest>("kmd-last-checkout-request");
    const savedProfile = readJson<Profile>(profileKey);
    const requestContact = lastRequest?.details || lastRequest?.form;
    setCart(readCart());
    setSavedIds(readWishlist());
    setRequest(lastRequest);
    const nextProfile = savedProfile || {
      name: "name" in (requestContact || {}) ? lastRequest?.details?.name || "" : lastRequest?.form?.customerName || "",
      phone: formatCambodianPhone(requestContact?.phone || ""),
      email: requestContact?.email || "",
      area: "area" in (requestContact || {}) ? lastRequest?.details?.area || "" : lastRequest?.form?.deliveryArea || ""
    };
    setProfile({ ...nextProfile, phone: formatCambodianPhone(nextProfile.phone) });
    setLoaded(true);
  }, []);

  const cartCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);
  const cartSubtotal = useMemo(() => getCartSubtotal(cart), [cart]);
  const savedProducts = useMemo(() => {
    const byId = new Map(products.map((product) => [product.id, product]));
    return savedIds.map((id) => byId.get(id)).filter((product) => product !== undefined);
  }, [savedIds]);
  const requestDetails = request?.details;
  const legacyDetails = request?.form;
  const customerName = profile.name || requestDetails?.name || legacyDetails?.customerName || text("Customer", "អតិថិជន");
  const firstName = customerName.trim().split(/\s+/)[0] || text("Customer", "អតិថិជន");
  const localizedDate = (value?: string) => value
    ? new Intl.DateTimeFormat(language === "km" ? "km-KH" : "en", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value))
    : text("Not available", "មិនមានទិន្នន័យ");

  const saveProfile = () => {
    setPhoneTouched(true);
    if (profile.phone && !isValidCambodianPhone(profile.phone)) return;
    const normalizedProfile = { ...profile, phone: profile.phone ? getInternationalCambodianPhone(profile.phone) : "" };
    window.localStorage.setItem(profileKey, JSON.stringify(normalizedProfile));
    setProfile({ ...profile, phone: formatCambodianPhone(profile.phone) });
    setProfileSaved(true);
    window.setTimeout(() => setProfileSaved(false), 1800);
  };

  if (!loaded) return <div className="account-loading" />;

  return (
    <div className="account-workspace">
      <aside className="account-rail">
        <div className="account-person">
          <span>{profile.name ? profile.name.trim().charAt(0).toUpperCase() : <CircleUserRound />}</span>
          <div><strong>{customerName}</strong><small>{profile.phone || text("Customer workspace", "ផ្នែកអតិថិជន")}</small></div>
        </div>
        <nav aria-label={text("Account sections", "ផ្នែកគណនី")}>
          <RailButton active={view === "overview"} icon={<Home />} label={text("Overview", "ទិដ្ឋភាពទូទៅ")} onClick={() => setView("overview")} />
          <RailButton active={view === "orders"} badge={request ? "1" : undefined} icon={<PackageCheck />} label={text("Orders", "ការបញ្ជាទិញ")} onClick={() => setView("orders")} />
          <RailButton active={view === "saved"} badge={savedIds.length ? String(savedIds.length) : undefined} icon={<Heart />} label={text("Saved", "បានរក្សាទុក")} onClick={() => setView("saved")} />
          <RailButton active={view === "profile"} icon={<CircleUserRound />} label={text("Profile", "ប្រវត្តិរូប")} onClick={() => setView("profile")} />
        </nav>
        <a className="account-rail-cart" href="/cart"><ShoppingBag /><span>{text("Cart", "កន្ត្រក")}</span><b>{cartCount}</b></a>
        <p>{text("Private workspace stored on this device.", "ផ្នែកឯកជនដែលរក្សាទុកលើឧបករណ៍នេះ។")}</p>
      </aside>

      <main className="account-content">
        {view === "overview" ? (
          <>
            <ViewHeader eyebrow={text("My account", "គណនីរបស់ខ្ញុំ")} title={text(`Hello, ${firstName}.`, `សួស្តី ${firstName}។`)} copy={text("Manage orders, saved products, and contact details.", "គ្រប់គ្រងការបញ្ជាទិញ ផលិតផលដែលបានរក្សាទុក និងព័ត៌មានទំនាក់ទំនង។")} action={<a className="action-commerce gap-2" href="/products">{text("Shop products", "ទិញផលិតផល")}<ArrowRight /></a>} />

            <section className="account-focus">
              <div className="account-focus-status"><span><Clock3 /></span><div><p>{text("Current status", "ស្ថានភាពបច្ចុប្បន្ន")}</p><h3>{request ? text("Your order request is under review", "សំណើបញ្ជាទិញរបស់អ្នកកំពុងត្រូវបានពិនិត្យ") : cartCount ? text("Your cart is ready to finish", "កន្ត្រករបស់អ្នករួចរាល់សម្រាប់បញ្ចប់") : text("Ready for your next project", "រួចរាល់សម្រាប់គម្រោងបន្ទាប់របស់អ្នក")}</h3><small>{request ? text("KMD is checking stock, delivery, and final pricing.", "KMD កំពុងពិនិត្យស្តុក ការដឹកជញ្ជូន និងតម្លៃចុងក្រោយ។") : cartCount ? text(`${cartCount} items, estimated at ${formatMoney(cartSubtotal)}.`, `${cartCount} មុខទំនិញ តម្លៃប៉ាន់ស្មាន ${formatMoney(cartSubtotal)}។`) : text("Browse products or save materials to compare later.", "មើលផលិតផល ឬរក្សាទុកសម្ភារៈសម្រាប់ប្រៀបធៀបពេលក្រោយ។")}</small></div></div>
              <div className="account-focus-action">{request ? <button onClick={() => setView("orders")} type="button">{text("View request", "មើលសំណើ")}<ArrowRight /></button> : cartCount ? <a href="/checkout">{text("Continue checkout", "បន្តការទូទាត់")}<ArrowRight /></a> : <a href="/products">{text("Browse catalog", "មើលកាតាឡុក")}<ArrowRight /></a>}</div>
            </section>

            <div className="account-numbers">
              <button onClick={() => setView("orders")} type="button"><span>{text("Requests", "សំណើ")}</span><strong>{request ? "1" : "0"}</strong><small>{request ? text("In review", "កំពុងពិនិត្យ") : text("No activity", "មិនមានសកម្មភាព")}</small></button>
              <button onClick={() => setView("saved")} type="button"><span>{text("Saved products", "ផលិតផលបានរក្សាទុក")}</span><strong>{savedIds.length}</strong><small>{text("Project shortlist", "បញ្ជីគម្រោង")}</small></button>
              <a href="/cart"><span>{text("Cart value", "តម្លៃកន្ត្រក")}</span><strong>{formatMoney(cartSubtotal)}</strong><small>{text(`${cartCount} items`, `${cartCount} មុខទំនិញ`)}</small></a>
            </div>

            <div className="account-overview-grid">
              <section className="account-activity">
                <div className="account-section-title"><div><p>{text("Recent activity", "សកម្មភាពថ្មីៗ")}</p><h3>{text("Latest order request", "សំណើបញ្ជាទិញចុងក្រោយ")}</h3></div><PackageCheck /></div>
                {request ? <div className="account-activity-row"><div><b>{text("Waiting for KMD confirmation", "កំពុងរង់ចាំការបញ្ជាក់ពី KMD")}</b><span>{localizedDate(request.createdAt)} · {request.items?.length || 0} {text("products", "ផលិតផល")}</span></div><strong>{formatMoney(request.subtotal || 0)}</strong><button aria-label={text("View request", "មើលសំណើ")} onClick={() => setView("orders")} type="button"><ArrowRight /></button></div> : <EmptyLine copy={text("Submitted requests will appear here.", "សំណើដែលបានដាក់នឹងបង្ហាញនៅទីនេះ។")} />}
              </section>

              <section className="account-contact-strip">
                <div><p>{text("Project support", "ការគាំទ្រគម្រោង")}</p><h3>{text("Need a quick answer?", "ត្រូវការចម្លើយរហ័ស?")}</h3><span>{text("Talk with KMD about stock, delivery, or installation.", "ពិភាក្សាជាមួយ KMD អំពីស្តុក ការដឹកជញ្ជូន ឬការដំឡើង។")}</span></div>
                <div><a href="tel:+85516927683"><Phone /> +855 16 92 76 83</a><a href="/contact"><Mail /> {text("Send inquiry", "ផ្ញើសំណួរ")}</a></div>
              </section>
            </div>
          </>
        ) : null}

        {view === "orders" ? (
          <>
            <ViewHeader eyebrow={text("Orders", "ការបញ្ជាទិញ")} title={text("Your order requests", "សំណើបញ្ជាទិញរបស់អ្នក")} copy={text("Every request is confirmed by KMD before payment.", "រាល់សំណើត្រូវបានបញ្ជាក់ដោយ KMD មុនបង់ប្រាក់។")} action={<a className="action-secondary gap-2" href="/products">{text("New order", "បញ្ជាទិញថ្មី")}<ArrowRight /></a>} />
            {request ? <OrderDetail localizedDate={localizedDate} request={request} text={text} /> : <AccountEmpty action={text("Browse products", "មើលផលិតផល")} copy={text("Your submitted order requests will appear here.", "សំណើបញ្ជាទិញរបស់អ្នកនឹងបង្ហាញនៅទីនេះ។")} href="/products" icon={<PackageCheck />} title={text("No requests yet", "មិនទាន់មានសំណើ")} />}
          </>
        ) : null}

        {view === "saved" ? (
          <>
            <ViewHeader eyebrow={text("Saved", "បានរក្សាទុក")} title={text("Products for your project", "ផលិតផលសម្រាប់គម្រោងរបស់អ្នក")} copy={text("Compare your shortlist and move ready items to the cart.", "ប្រៀបធៀបបញ្ជីរបស់អ្នក និងដាក់ផលិតផលរួចរាល់ទៅកន្ត្រក។")} action={<a className="action-secondary gap-2" href="/wishlist">{text("Open full wishlist", "បើកបញ្ជីពេញ")}<ArrowRight /></a>} />
            {savedProducts.length ? <div className="account-saved-list">{savedProducts.map((product) => <article key={product.id}><a href={product.href}><img alt={product.name} src={product.imageUrl} /></a><div><p>{product.brand} · {product.category}</p><h3><a href={product.href}>{product.name}</a></h3><span>{product.stockStatus} · {product.leadTime}</span></div><strong>{formatMoney(product.price)}<small>/ {product.unit}</small></strong><div>{product.stockStatus === "In stock" ? <AddToCartButton className="action-commerce gap-2" compact product={product} /> : <a className="action-secondary" href={`/contact?product=${product.id}`}>{text("Check stock", "ពិនិត្យស្តុក")}</a>}</div></article>)}</div> : <AccountEmpty action={text("Browse products", "មើលផលិតផល")} copy={text("Use the heart on products to build a project shortlist.", "ចុចរូបបេះដូងលើផលិតផលដើម្បីបង្កើតបញ្ជីគម្រោង។")} href="/products" icon={<Heart />} title={text("Nothing saved yet", "មិនទាន់មានផលិតផលបានរក្សាទុក")} />}
          </>
        ) : null}

        {view === "profile" ? (
          <>
            <ViewHeader eyebrow={text("Profile", "ប្រវត្តិរូប")} title={text("Your contact details", "ព័ត៌មានទំនាក់ទំនងរបស់អ្នក")} copy={text("Saved locally for a faster checkout next time.", "រក្សាទុកក្នុងឧបករណ៍សម្រាប់ការទូទាត់លឿននៅពេលក្រោយ។")} />
            <section className="account-profile-sheet">
              <div className="account-profile-intro"><span><CircleUserRound /></span><div><h3>{text("Customer information", "ព័ត៌មានអតិថិជន")}</h3><p>{text("KMD uses this only to contact you about orders and requests.", "KMD ប្រើព័ត៌មាននេះសម្រាប់ទាក់ទងអ្នកអំពីការបញ្ជាទិញ និងសំណើប៉ុណ្ណោះ។")}</p></div></div>
              <div className="account-profile-fields">
                <label className="control-label">{text("Full name", "ឈ្មោះពេញ")}<input autoComplete="name" className="field" onChange={(event) => setProfile({ ...profile, name: event.target.value })} placeholder={text("Your name", "ឈ្មោះរបស់អ្នក")} value={profile.name} /></label>
                <label className={`control-label ${phoneTouched && profile.phone && !isValidCambodianPhone(profile.phone) ? "has-error" : ""}`}>
                  <span>{text("Phone number", "លេខទូរស័ព្ទ")} <em>{text("Cambodia", "កម្ពុជា")}</em></span>
                  <span className="phone-field">
                    <span className="phone-country" aria-hidden="true"><Phone /> +855</span>
                    <input
                      aria-describedby="account-phone-help"
                      aria-invalid={Boolean(phoneTouched && profile.phone && !isValidCambodianPhone(profile.phone))}
                      autoComplete="tel-national"
                      inputMode="numeric"
                      maxLength={18}
                      onBlur={() => setPhoneTouched(true)}
                      onChange={(event) => {
                        setProfile({ ...profile, phone: formatCambodianPhone(event.target.value) });
                        setProfileSaved(false);
                      }}
                      placeholder="12 345 678"
                      type="tel"
                      value={profile.phone}
                    />
                    {isValidCambodianPhone(profile.phone) ? <CheckCircle2 aria-label={text("Valid phone number", "លេខទូរស័ព្ទត្រឹមត្រូវ")} className="phone-valid" /> : null}
                  </span>
                  <small className={phoneTouched && profile.phone && !isValidCambodianPhone(profile.phone) ? "phone-help is-error" : "phone-help"} id="account-phone-help">
                    {phoneTouched && profile.phone && !isValidCambodianPhone(profile.phone)
                      ? text("Enter a valid 8 or 9 digit Cambodian number.", "បញ្ចូលលេខទូរស័ព្ទកម្ពុជាដែលមាន 8 ឬ 9 ខ្ទង់។")
                      : text("Enter the number without the first 0.", "បញ្ចូលលេខដោយមិនដាក់លេខ 0 ខាងមុខ។")}
                  </small>
                </label>
                <label className="control-label">{text("Email address", "អ៊ីមែល")}<input autoComplete="email" className="field" onChange={(event) => setProfile({ ...profile, email: event.target.value })} placeholder="name@example.com" type="email" value={profile.email} /></label>
                <label className="control-label">{text("City / area", "ទីក្រុង / តំបន់")}<input className="field" onChange={(event) => setProfile({ ...profile, area: event.target.value })} placeholder={text("Phnom Penh", "ភ្នំពេញ")} value={profile.area} /></label>
              </div>
              <div className="account-profile-save"><button className="action-commerce gap-2" onClick={saveProfile} type="button"><Save />{profileSaved ? text("Saved", "បានរក្សាទុក") : text("Save details", "រក្សាទុកព័ត៌មាន")}</button>{profileSaved ? <span><CheckCircle2 />{text("Details updated", "ព័ត៌មានបានធ្វើបច្ចុប្បន្នភាព")}</span> : null}</div>
            </section>
          </>
        ) : null}
      </main>
    </div>
  );
}

function RailButton({ active, badge, icon, label, onClick }: { active: boolean; badge?: string; icon: React.ReactNode; label: string; onClick: () => void }) {
  return <button aria-current={active ? "page" : undefined} className={active ? "is-active" : ""} onClick={onClick} type="button">{icon}<span>{label}</span>{badge ? <b>{badge}</b> : null}</button>;
}

function ViewHeader({ action, copy, eyebrow, title }: { action?: React.ReactNode; copy: string; eyebrow: string; title: string }) {
  return <header className="account-content-header"><div><p>{eyebrow}</p><h2>{title}</h2><span>{copy}</span></div>{action}</header>;
}

function EmptyLine({ copy }: { copy: string }) {
  return <div className="account-empty-line"><Check />{copy}</div>;
}

function OrderDetail({ localizedDate, request, text }: { localizedDate: (value?: string) => string; request: CheckoutRequest; text: (english: string, khmer: string) => string }) {
  const details = request.details;
  const legacy = request.form;
  const area = details?.area || legacy?.deliveryArea || text("To be confirmed", "នឹងបញ្ជាក់ពេលក្រោយ");
  const address = details?.address || legacy?.fullAddress || text("To be confirmed", "នឹងបញ្ជាក់ពេលក្រោយ");
  return <section className="account-order-sheet"><div className="account-order-summary"><div><p>{text("Request status", "ស្ថានភាពសំណើ")}</p><h3>{text("Waiting for KMD confirmation", "កំពុងរង់ចាំការបញ្ជាក់ពី KMD")}</h3><span>{localizedDate(request.createdAt)}</span></div><b><Clock3 />{text("In review", "កំពុងពិនិត្យ")}</b></div><div className="account-order-timeline"><span className="is-done"><CheckCircle2 />{text("Request saved", "បានរក្សាទុកសំណើ")}</span><i /><span className="is-current"><PackageCheck />{text("KMD review", "KMD ពិនិត្យ")}</span><i /><span><Truck />{text("Delivery confirmed", "បញ្ជាក់ការដឹកជញ្ជូន")}</span></div><div className="account-order-body"><div><p>{text("Products", "ផលិតផល")}</p>{request.items?.length ? request.items.map((item) => <div className="account-order-product" key={item.id}><img alt="" src={item.imageUrl} /><span><strong>{item.name}</strong><small>{item.quantity} x {formatMoney(item.price)}</small></span><b>{formatMoney(item.quantity * item.price)}</b></div>) : <span>{text("General product request", "សំណើផលិតផលទូទៅ")}</span>}</div><dl><p>{text("Delivery", "ការដឹកជញ្ជូន")}</p><div><dt><MapPin />{text("Area", "តំបន់")}</dt><dd>{area}</dd></div><div><dt><Store />{text("Method", "វិធីសាស្ត្រ")}</dt><dd>{details?.deliveryMethod || legacy?.deliveryMethod || text("Confirm with KMD", "បញ្ជាក់ជាមួយ KMD")}</dd></div><div><dt><Truck />{text("Address", "អាសយដ្ឋាន")}</dt><dd>{address}</dd></div></dl></div><div className="account-order-footer"><span>{text("Estimated subtotal", "តម្លៃប៉ាន់ស្មាន")}<small>{text("Delivery confirmed separately", "ថ្លៃដឹកជញ្ជូនបញ្ជាក់ដោយឡែក")}</small></span><strong>{formatMoney(request.subtotal || 0)}</strong></div></section>;
}

function AccountEmpty({ action, copy, href, icon, title }: { action: string; copy: string; href: string; icon: React.ReactNode; title: string }) {
  return <div className="account-empty"><span>{icon}</span><h3>{title}</h3><p>{copy}</p><a className="action-commerce gap-2" href={href}>{action}<ArrowRight /></a></div>;
}
