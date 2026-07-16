"use client";

import { Heart, LockKeyhole, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function AccountHeading() {
  const { text } = useLanguage();
  return <section className="account-heading"><div className="content-shell py-10 md:py-14"><div><p className="eyebrow">{text("Customer space", "ផ្នែកអតិថិជន")}</p><h1 className="max-w-3xl font-serif text-4xl leading-tight text-ink-900 md:text-5xl">{text("Everything for your next order, in one place.", "អ្វីគ្រប់យ៉ាងសម្រាប់ការបញ្ជាទិញបន្ទាប់របស់អ្នក នៅកន្លែងតែមួយ។")}</h1><p className="mt-4 max-w-2xl text-base leading-7 text-ink-700">{text("Review your latest request, continue an order, and keep contact details ready for faster checkout.", "ពិនិត្យសំណើចុងក្រោយ បន្តការបញ្ជាទិញ និងរក្សាព័ត៌មានទំនាក់ទំនងសម្រាប់ការទូទាត់លឿនជាងមុន។")}</p></div><div className="account-trust"><span><LockKeyhole /> {text("Stored on this device", "រក្សាទុកលើឧបករណ៍នេះ")}</span><span><ShieldCheck /> {text("No payment details saved", "មិនរក្សាទុកព័ត៌មានបង់ប្រាក់")}</span><span><RefreshCw /> {text("Updates automatically", "ធ្វើបច្ចុប្បន្នភាពស្វ័យប្រវត្តិ")}</span></div></div></section>;
}

export function WishlistHeading() {
  const { text } = useLanguage();
  return <section className="wishlist-heading"><div className="content-shell py-10 md:py-14"><div className="wishlist-heading-copy"><p className="eyebrow">{text("Saved products", "ផលិតផលដែលបានរក្សាទុក")}</p><h1 className="font-serif text-4xl leading-tight text-ink-900 md:text-5xl">{text("Your project shortlist.", "បញ្ជីផលិតផលសម្រាប់គម្រោងរបស់អ្នក។")}</h1><p>{text("Keep products together, compare key details, and move ready-stock items directly to your cart.", "រក្សាផលិតផលជាក្រុម ប្រៀបធៀបព័ត៌មានសំខាន់ៗ និងដាក់ផលិតផលមានស្តុកទៅកន្ត្រកដោយផ្ទាល់។")}</p></div><div className="wishlist-benefits"><span><Heart /> {text("Saved for comparison", "រក្សាទុកសម្រាប់ប្រៀបធៀប")}</span><span><RefreshCw /> {text("Account sync when signed in", "ធ្វើសមកាលកម្មពេលចូលគណនី")}</span><span><ShieldCheck /> {text("Stock confirmed before payment", "បញ្ជាក់ស្តុកមុនបង់ប្រាក់")}</span></div></div></section>;
}
