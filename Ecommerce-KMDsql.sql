CREATE TABLE "users" (
  "id" uuid PRIMARY KEY DEFAULT (uuid()),
  "full_name" varchar(255) NOT NULL,
  "email" varchar(255) UNIQUE NOT NULL,
  "phone" varchar(20) NOT NULL,
  "password_hash" varchar(255),
  "avatar_url" varchar(500),
  "role" varchar(20) NOT NULL DEFAULT 'customer',
  "email_verified_at" timestamp,
  "is_active" boolean NOT NULL DEFAULT true,
  "last_login_at" timestamp,
  "google_id" varchar(255),
  "facebook_id" varchar(255),
  "remember_token" varchar(100),
  "deleted_at" timestamp,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "b2b_profiles" (
  "id" uuid PRIMARY KEY DEFAULT (uuid()),
  "user_id" uuid UNIQUE NOT NULL,
  "company_name" varchar(255) NOT NULL,
  "company_logo_url" varchar(500),
  "tax_id" varchar(100) NOT NULL,
  "business_type" varchar(100) NOT NULL,
  "credit_limit" decimal(12,2) NOT NULL DEFAULT 0,
  "credit_used" decimal(12,2) NOT NULL DEFAULT 0,
  "discount_rate" decimal(5,2) NOT NULL DEFAULT 0,
  "is_verified" boolean NOT NULL DEFAULT false,
  "verified_at" timestamp,
  "notes" text,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "addresses" (
  "id" uuid PRIMARY KEY DEFAULT (uuid()),
  "user_id" uuid NOT NULL,
  "label" varchar(100) NOT NULL,
  "recipient_name" varchar(255) NOT NULL,
  "recipient_phone" varchar(20) NOT NULL,
  "street_address" varchar(500) NOT NULL,
  "sangkat" varchar(100) NOT NULL,
  "khan" varchar(100) NOT NULL,
  "city" varchar(100) NOT NULL,
  "province" varchar(100) NOT NULL,
  "postal_code" varchar(20),
  "country" varchar(100) NOT NULL DEFAULT 'Cambodia',
  "latitude" decimal(10,7) NOT NULL,
  "longitude" decimal(10,7) NOT NULL,
  "map_url" varchar(500),
  "delivery_notes" text,
  "is_default" boolean NOT NULL DEFAULT false,
  "is_active" boolean NOT NULL DEFAULT true,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "notifications" (
  "id" uuid PRIMARY KEY DEFAULT (uuid()),
  "user_id" uuid NOT NULL,
  "type" varchar(50) NOT NULL,
  "title" varchar(255) NOT NULL,
  "message" text NOT NULL,
  "reference_type" varchar(50) NOT NULL,
  "reference_id" uuid NOT NULL,
  "action_url" varchar(500) NOT NULL,
  "channel" varchar(20) NOT NULL,
  "is_read" boolean NOT NULL DEFAULT false,
  "read_at" timestamp,
  "sent_at" timestamp,
  "failed_at" timestamp,
  "data" json,
  "expires_at" timestamp,
  "created_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "categories" (
  "id" uuid PRIMARY KEY DEFAULT (uuid()),
  "parent_id" uuid,
  "name" varchar(255) NOT NULL,
  "name_kh" varchar(255) NOT NULL,
  "slug" varchar(255) UNIQUE NOT NULL,
  "description" text,
  "type" varchar(20) NOT NULL,
  "icon" varchar(100) NOT NULL,
  "image_url" varchar(500) NOT NULL,
  "color" varchar(20),
  "sort_order" int NOT NULL DEFAULT 0,
  "meta_title" varchar(255) NOT NULL,
  "meta_description" varchar(500) NOT NULL,
  "is_active" boolean NOT NULL DEFAULT true,
  "is_featured" boolean NOT NULL DEFAULT false,
  "product_count" int NOT NULL DEFAULT 0,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "brands" (
  "id" uuid PRIMARY KEY DEFAULT (uuid()),
  "name" varchar(255) UNIQUE NOT NULL,
  "name_kh" varchar(255),
  "slug" varchar(255) UNIQUE NOT NULL,
  "description" text,
  "description_kh" text,
  "logo_url" varchar(500) NOT NULL,
  "banner_url" varchar(500),
  "website_url" varchar(500),
  "country_of_origin" varchar(100) NOT NULL,
  "brand_type" varchar(30) NOT NULL,
  "is_exclusive" boolean NOT NULL DEFAULT false,
  "warranty_info" text,
  "meta_title" varchar(255) NOT NULL,
  "meta_description" varchar(500) NOT NULL,
  "product_count" int NOT NULL DEFAULT 0,
  "sort_order" int NOT NULL DEFAULT 0,
  "is_active" boolean NOT NULL DEFAULT true,
  "is_featured" boolean NOT NULL DEFAULT false,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "products" (
  "id" uuid PRIMARY KEY DEFAULT (uuid()),
  "category_id" uuid NOT NULL,
  "brand_id" uuid NOT NULL,
  "name" varchar(255) NOT NULL,
  "name_kh" varchar(255) NOT NULL,
  "slug" varchar(255) UNIQUE NOT NULL,
  "sku" varchar(100) UNIQUE NOT NULL,
  "short_description" varchar(500) NOT NULL,
  "short_description_kh" varchar(500) NOT NULL,
  "description" longtext NOT NULL,
  "description_kh" longtext NOT NULL,
  "specifications" json NOT NULL,
  "installation_guide_url" varchar(500),
  "datasheet_url" varchar(500),
  "video_url" varchar(500),
  "unit" varchar(50) NOT NULL,
  "min_order_qty" int NOT NULL DEFAULT 1,
  "max_order_qty" int,
  "requires_installation" boolean NOT NULL DEFAULT false,
  "is_fragile" boolean NOT NULL DEFAULT false,
  "warranty_months" int,
  "is_featured" boolean NOT NULL DEFAULT false,
  "is_new" boolean NOT NULL DEFAULT false,
  "is_best_seller" boolean NOT NULL DEFAULT false,
  "sort_order" int,
  "tags" json NOT NULL,
  "related_product_ids" json,
  "avg_rating" decimal(3,2) NOT NULL DEFAULT 0,
  "review_count" int NOT NULL DEFAULT 0,
  "meta_title" varchar(255) NOT NULL,
  "meta_description" varchar(500) NOT NULL,
  "status" varchar(20) NOT NULL DEFAULT 'draft',
  "published_at" timestamp,
  "deleted_at" timestamp,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "product_variants" (
  "id" uuid PRIMARY KEY DEFAULT (uuid()),
  "product_id" uuid NOT NULL,
  "sku" varchar(100) UNIQUE NOT NULL,
  "barcode" varchar(100),
  "label" varchar(100) NOT NULL,
  "label_kh" varchar(100) NOT NULL,
  "sort_order" int NOT NULL DEFAULT 0,
  "price" decimal(10,2) NOT NULL,
  "compare_price" decimal(10,2) NOT NULL,
  "cost_price" decimal(10,2) NOT NULL,
  "b2b_price" decimal(10,2) NOT NULL,
  "currency" varchar(10) NOT NULL DEFAULT 'USD',
  "stock_qty" int NOT NULL DEFAULT 0,
  "reserved_qty" int NOT NULL DEFAULT 0,
  "low_stock_threshold" int NOT NULL DEFAULT 10,
  "allow_backorder" boolean NOT NULL DEFAULT false,
  "backorder_eta" date,
  "track_inventory" boolean NOT NULL DEFAULT true,
  "weight_kg" decimal(8,3) NOT NULL,
  "length_cm" decimal(8,2) NOT NULL,
  "width_cm" decimal(8,2) NOT NULL,
  "height_cm" decimal(8,2) NOT NULL,
  "is_active" boolean NOT NULL DEFAULT true,
  "is_default" boolean NOT NULL DEFAULT false,
  "deleted_at" timestamp,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "product_images" (
  "id" uuid PRIMARY KEY DEFAULT (uuid()),
  "product_id" uuid NOT NULL,
  "image_url" varchar(500) NOT NULL,
  "alt_text" varchar(255),
  "is_primary" boolean NOT NULL DEFAULT false,
  "sort_order" int NOT NULL DEFAULT 0,
  "created_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "reviews" (
  "id" uuid PRIMARY KEY DEFAULT (uuid()),
  "user_id" uuid NOT NULL,
  "product_id" uuid NOT NULL,
  "rating" tinyint NOT NULL,
  "comment" text,
  "is_verified" boolean NOT NULL DEFAULT false,
  "is_approved" boolean NOT NULL DEFAULT false,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "wishlists" (
  "id" uuid PRIMARY KEY DEFAULT (uuid()),
  "user_id" uuid NOT NULL,
  "product_id" uuid NOT NULL,
  "added_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "services" (
  "id" uuid PRIMARY KEY DEFAULT (uuid()),
  "category_id" uuid NOT NULL,
  "name" varchar(255) NOT NULL,
  "name_kh" varchar(255) NOT NULL,
  "slug" varchar(255) UNIQUE NOT NULL,
  "description" text NOT NULL,
  "description_kh" text NOT NULL,
  "short_description" varchar(500) NOT NULL,
  "short_description_kh" varchar(500) NOT NULL,
  "inquiry_type" varchar(50) NOT NULL,
  "portfolio_images" json,
  "faqs" json,
  "meta_title" varchar(255) NOT NULL,
  "meta_description" varchar(500) NOT NULL,
  "sort_order" int NOT NULL DEFAULT 0,
  "is_active" boolean NOT NULL DEFAULT true,
  "is_featured" boolean NOT NULL DEFAULT false,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "service_inquiries" (
  "id" uuid PRIMARY KEY DEFAULT (uuid()),
  "user_id" uuid NOT NULL,
  "service_id" uuid NOT NULL,
  "project_name" varchar(255),
  "project_location" varchar(500),
  "project_size" varchar(100),
  "budget_range" varchar(100),
  "preferred_date" date,
  "message" text NOT NULL,
  "attachments" json,
  "status" varchar(20) NOT NULL DEFAULT 'pending',
  "admin_notes" text,
  "quoted_price" decimal(12,2),
  "replied_at" timestamp,
  "submitted_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "carts" (
  "id" uuid PRIMARY KEY DEFAULT (uuid()),
  "user_id" uuid UNIQUE NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "cart_items" (
  "id" uuid PRIMARY KEY DEFAULT (uuid()),
  "cart_id" uuid NOT NULL,
  "variant_id" uuid NOT NULL,
  "quantity" int NOT NULL DEFAULT 1,
  "unit_price" decimal(10,2) NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "coupons" (
  "id" uuid PRIMARY KEY DEFAULT (uuid()),
  "code" varchar(50) UNIQUE NOT NULL,
  "discount_type" varchar(20) NOT NULL,
  "discount_value" decimal(10,2) NOT NULL,
  "min_order_amount" decimal(10,2) NOT NULL DEFAULT 0,
  "max_uses" int,
  "used_count" int NOT NULL DEFAULT 0,
  "max_uses_per_user" int DEFAULT 1,
  "applicable_to" varchar(20) NOT NULL DEFAULT 'all',
  "expires_at" timestamp,
  "is_active" boolean NOT NULL DEFAULT true,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "orders" (
  "id" uuid PRIMARY KEY DEFAULT (uuid()),
  "user_id" uuid NOT NULL,
  "address_id" uuid NOT NULL,
  "coupon_id" uuid,
  "order_number" varchar(50) UNIQUE NOT NULL,
  "subtotal" decimal(12,2) NOT NULL,
  "discount_amount" decimal(12,2) NOT NULL DEFAULT 0,
  "delivery_fee" decimal(10,2) NOT NULL DEFAULT 0,
  "total_amount" decimal(12,2) NOT NULL,
  "currency" varchar(10) NOT NULL DEFAULT 'USD',
  "status" varchar(20) NOT NULL DEFAULT 'pending',
  "payment_status" varchar(20) NOT NULL DEFAULT 'unpaid',
  "notes" text,
  "admin_notes" text,
  "ordered_at" timestamp NOT NULL DEFAULT (now()),
  "confirmed_at" timestamp,
  "shipped_at" timestamp,
  "delivered_at" timestamp,
  "cancelled_at" timestamp,
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "order_items" (
  "id" uuid PRIMARY KEY DEFAULT (uuid()),
  "order_id" uuid NOT NULL,
  "variant_id" uuid NOT NULL,
  "quantity" int NOT NULL,
  "unit_price" decimal(10,2) NOT NULL,
  "total_price" decimal(10,2) NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "payments" (
  "id" uuid PRIMARY KEY DEFAULT (uuid()),
  "order_id" uuid NOT NULL,
  "method" varchar(30) NOT NULL,
  "amount" decimal(12,2) NOT NULL,
  "currency" varchar(10) NOT NULL DEFAULT 'USD',
  "status" varchar(20) NOT NULL,
  "transaction_ref" varchar(255),
  "gateway_response" json,
  "paid_at" timestamp,
  "refunded_at" timestamp,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE UNIQUE INDEX ON "users" ("email");

CREATE INDEX ON "users" ("role");

CREATE INDEX ON "users" ("is_active");

CREATE INDEX ON "users" ("deleted_at");

CREATE UNIQUE INDEX ON "b2b_profiles" ("user_id");

CREATE INDEX ON "b2b_profiles" ("is_verified");

CREATE INDEX ON "addresses" ("user_id");

CREATE INDEX ON "addresses" ("is_default");

CREATE INDEX ON "addresses" ("is_active");

CREATE INDEX ON "notifications" ("user_id");

CREATE INDEX ON "notifications" ("type");

CREATE INDEX ON "notifications" ("is_read");

CREATE INDEX ON "notifications" ("channel");

CREATE INDEX ON "notifications" ("created_at");

CREATE INDEX ON "categories" ("parent_id");

CREATE UNIQUE INDEX ON "categories" ("slug");

CREATE INDEX ON "categories" ("type");

CREATE INDEX ON "categories" ("is_active");

CREATE INDEX ON "categories" ("is_featured");

CREATE INDEX ON "categories" ("sort_order");

CREATE UNIQUE INDEX ON "brands" ("slug");

CREATE INDEX ON "brands" ("brand_type");

CREATE INDEX ON "brands" ("is_active");

CREATE INDEX ON "brands" ("is_featured");

CREATE INDEX ON "products" ("category_id");

CREATE INDEX ON "products" ("brand_id");

CREATE UNIQUE INDEX ON "products" ("slug");

CREATE UNIQUE INDEX ON "products" ("sku");

CREATE INDEX ON "products" ("status");

CREATE INDEX ON "products" ("is_featured");

CREATE INDEX ON "products" ("is_best_seller");

CREATE INDEX ON "products" ("deleted_at");

CREATE INDEX ON "products" ("published_at");

CREATE INDEX ON "product_variants" ("product_id");

CREATE UNIQUE INDEX ON "product_variants" ("sku");

CREATE INDEX ON "product_variants" ("is_active");

CREATE INDEX ON "product_variants" ("is_default");

CREATE INDEX ON "product_variants" ("deleted_at");

CREATE INDEX ON "product_images" ("product_id");

CREATE INDEX ON "product_images" ("is_primary");

CREATE INDEX ON "product_images" ("sort_order");

CREATE INDEX ON "reviews" ("user_id");

CREATE INDEX ON "reviews" ("product_id");

CREATE INDEX ON "reviews" ("rating");

CREATE INDEX ON "reviews" ("is_approved");

CREATE UNIQUE INDEX ON "wishlists" ("user_id", "product_id");

CREATE INDEX ON "wishlists" ("product_id");

CREATE INDEX ON "services" ("category_id");

CREATE UNIQUE INDEX ON "services" ("slug");

CREATE INDEX ON "services" ("inquiry_type");

CREATE INDEX ON "services" ("is_active");

CREATE INDEX ON "services" ("is_featured");

CREATE INDEX ON "service_inquiries" ("user_id");

CREATE INDEX ON "service_inquiries" ("service_id");

CREATE INDEX ON "service_inquiries" ("status");

CREATE INDEX ON "service_inquiries" ("submitted_at");

CREATE UNIQUE INDEX ON "carts" ("user_id");

CREATE INDEX ON "cart_items" ("cart_id");

CREATE INDEX ON "cart_items" ("variant_id");

CREATE UNIQUE INDEX ON "cart_items" ("cart_id", "variant_id");

CREATE UNIQUE INDEX ON "coupons" ("code");

CREATE INDEX ON "coupons" ("is_active");

CREATE INDEX ON "coupons" ("expires_at");

CREATE INDEX ON "orders" ("user_id");

CREATE UNIQUE INDEX ON "orders" ("order_number");

CREATE INDEX ON "orders" ("status");

CREATE INDEX ON "orders" ("payment_status");

CREATE INDEX ON "orders" ("ordered_at");

CREATE INDEX ON "order_items" ("order_id");

CREATE INDEX ON "order_items" ("variant_id");

CREATE INDEX ON "payments" ("order_id");

CREATE INDEX ON "payments" ("status");

CREATE INDEX ON "payments" ("method");

CREATE INDEX ON "payments" ("transaction_ref");

COMMENT ON TABLE "users" IS 'Central user table. Covers customers, B2B buyers, staff, and admins.';

COMMENT ON COLUMN "users"."password_hash" IS 'Nullable for OAuth users';

COMMENT ON COLUMN "users"."role" IS 'customer | b2b_buyer | staff | admin | super_admin';

COMMENT ON TABLE "b2b_profiles" IS 'One-to-one with USERS where role = b2b_buyer. Stores wholesale and credit info.';

COMMENT ON COLUMN "b2b_profiles"."business_type" IS 'contractor | architect | developer | retailer';

COMMENT ON COLUMN "b2b_profiles"."discount_rate" IS 'Wholesale % discount applied at checkout';

COMMENT ON COLUMN "b2b_profiles"."notes" IS 'Internal staff notes — never shown to customer';

COMMENT ON TABLE "addresses" IS 'Cambodia-specific address structure with sangkat/khan levels and GPS coordinates.';

COMMENT ON COLUMN "addresses"."label" IS 'e.g. Home | Office | Construction Site 1';

COMMENT ON COLUMN "addresses"."sangkat" IS 'Commune/Sangkat — Cambodia address level';

COMMENT ON COLUMN "addresses"."khan" IS 'District/Khan — used for delivery zone routing';

COMMENT ON COLUMN "addresses"."latitude" IS 'GPS — critical in Cambodia where many streets have no name';

COMMENT ON COLUMN "addresses"."map_url" IS 'Google Maps share link';

COMMENT ON COLUMN "addresses"."delivery_notes" IS 'Driver instructions e.g. call before arrival';

COMMENT ON TABLE "notifications" IS 'In-app and external notifications. One row per channel per event.';

COMMENT ON COLUMN "notifications"."type" IS 'order_update | inquiry_reply | promotion | back_in_stock | account | system';

COMMENT ON COLUMN "notifications"."reference_type" IS 'order | service_inquiry | product | user';

COMMENT ON COLUMN "notifications"."channel" IS 'in_app | email | sms | telegram';

COMMENT ON COLUMN "notifications"."data" IS 'Extra dynamic payload e.g. order total, tracking code';

COMMENT ON TABLE "categories" IS 'Self-referencing hierarchy. Max 3 levels: parent → child → grandchild.';

COMMENT ON COLUMN "categories"."parent_id" IS 'Self-join — null = top-level category';

COMMENT ON COLUMN "categories"."name_kh" IS 'Khmer language name — required for Cambodian market';

COMMENT ON COLUMN "categories"."type" IS 'product | service | both';

COMMENT ON COLUMN "categories"."icon" IS 'Tabler icon class e.g. ti-building';

COMMENT ON COLUMN "categories"."color" IS 'Hex color for category card background';

COMMENT ON COLUMN "categories"."product_count" IS 'Cached count — updated by background job';

COMMENT ON TABLE "brands" IS 'Brands KMD carries: Ziet (gypsum), Arrow (sanitary), multi-brand, future own label.';

COMMENT ON COLUMN "brands"."brand_type" IS 'distributor | manufacturer | own_brand';

COMMENT ON COLUMN "brands"."is_exclusive" IS 'KMD is exclusive distributor in Cambodia';

COMMENT ON TABLE "products" IS 'Master product record. Price and stock live in PRODUCT_VARIANTS. No price stored here.';

COMMENT ON COLUMN "products"."sku" IS 'Base SKU — variants extend this e.g. ZT-001-9MM';

COMMENT ON COLUMN "products"."specifications" IS 'Key-value technical specs e.g. fire_rating, moisture_resistant';

COMMENT ON COLUMN "products"."unit" IS 'sheet | piece | m2 | box | set';

COMMENT ON COLUMN "products"."requires_installation" IS 'Triggers service upsell at checkout';

COMMENT ON COLUMN "products"."warranty_months" IS 'Overrides brand-level warranty if set';

COMMENT ON COLUMN "products"."tags" IS 'Array of search keywords';

COMMENT ON COLUMN "products"."related_product_ids" IS 'Array of UUIDs for You may also like section';

COMMENT ON COLUMN "products"."status" IS 'draft | active | archived | out_of_production';

COMMENT ON TABLE "product_variants" IS 'Each row is a purchasable unit. Cart and orders always reference variant not product.';

COMMENT ON COLUMN "product_variants"."sku" IS 'e.g. ZT-001-9MM';

COMMENT ON COLUMN "product_variants"."label" IS 'e.g. 9mm | 12mm | CL-01 | White';

COMMENT ON COLUMN "product_variants"."compare_price" IS 'Original price — used for strikethrough and % off badge';

COMMENT ON COLUMN "product_variants"."cost_price" IS 'NEVER expose in API. Used for margin reporting only.';

COMMENT ON COLUMN "product_variants"."b2b_price" IS 'Wholesale price shown to b2b_buyer role';

COMMENT ON COLUMN "product_variants"."reserved_qty" IS 'Held in carts/pending orders. Available = stock_qty - reserved_qty';

COMMENT ON COLUMN "product_variants"."is_default" IS 'Pre-selected variant on product detail page';

COMMENT ON TABLE "product_images" IS 'Multiple images per product. is_primary marks the catalog thumbnail.';

COMMENT ON TABLE "reviews" IS 'avg_rating and review_count are cached in PRODUCTS table via background job.';

COMMENT ON COLUMN "reviews"."rating" IS '1 to 5 stars';

COMMENT ON COLUMN "reviews"."is_verified" IS 'Verified purchase review';

COMMENT ON COLUMN "reviews"."is_approved" IS 'Admin must approve before showing';

COMMENT ON TABLE "wishlists" IS 'Junction table. Triggers back_in_stock notification when wishlisted product restocks.';

COMMENT ON TABLE "services" IS 'KMD services: Ceiling, Partition, Furniture, Smart Home, Glass, Exterior. No price — quote only.';

COMMENT ON COLUMN "services"."inquiry_type" IS 'ceiling | partition | furniture | smart_home | glass | exterior';

COMMENT ON COLUMN "services"."portfolio_images" IS 'Array of before/after image URLs for this service';

COMMENT ON COLUMN "services"."faqs" IS 'Array of {question, answer} objects';

COMMENT ON TABLE "service_inquiries" IS 'Quote requests from customers. Staff review via admin dashboard and reply with price + schedule.';

COMMENT ON COLUMN "service_inquiries"."project_size" IS 'e.g. 120 m²';

COMMENT ON COLUMN "service_inquiries"."attachments" IS 'Array of uploaded file URLs — floor plans, photos';

COMMENT ON COLUMN "service_inquiries"."status" IS 'pending | reviewing | quoted | accepted | rejected | closed';

COMMENT ON COLUMN "service_inquiries"."admin_notes" IS 'Internal notes — never shown to customer';

COMMENT ON TABLE "carts" IS 'One cart per user. Persists between sessions. Created on registration.';

COMMENT ON TABLE "cart_items" IS 'References variant not product. unit_price frozen at add-to-cart time.';

COMMENT ON COLUMN "cart_items"."unit_price" IS 'Price at time of adding to cart — may differ from current price';

COMMENT ON TABLE "coupons" IS 'Discount codes for flash sales and campaigns. Supports % off and fixed amount.';

COMMENT ON COLUMN "coupons"."discount_type" IS 'percentage | fixed_amount';

COMMENT ON COLUMN "coupons"."max_uses" IS 'Null = unlimited uses';

COMMENT ON COLUMN "coupons"."applicable_to" IS 'all | products_only | b2b_only';

COMMENT ON TABLE "orders" IS 'Confirmed purchase. Created after payment confirmed. Tracks full lifecycle timestamps.';

COMMENT ON COLUMN "orders"."order_number" IS 'Human-readable e.g. KMD-2026-00123';

COMMENT ON COLUMN "orders"."status" IS 'pending | confirmed | processing | shipped | delivered | cancelled | refunded';

COMMENT ON COLUMN "orders"."payment_status" IS 'unpaid | partial | paid | refunded';

COMMENT ON COLUMN "orders"."notes" IS 'Customer notes for the order';

COMMENT ON TABLE "order_items" IS 'Snapshot of each variant in a confirmed order. Prices frozen for order history integrity.';

COMMENT ON COLUMN "order_items"."unit_price" IS 'Frozen at purchase time — never changes';

COMMENT ON TABLE "payments" IS 'One order can have multiple payment rows — supports ABA Pay, KHQR, refunds, installments.';

COMMENT ON COLUMN "payments"."method" IS 'aba_pay | khqr | wing | bank_transfer | cash';

COMMENT ON COLUMN "payments"."status" IS 'pending | success | failed | refunded';

COMMENT ON COLUMN "payments"."transaction_ref" IS 'Payment gateway reference ID for reconciliation';

COMMENT ON COLUMN "payments"."gateway_response" IS 'Raw response from payment gateway';

ALTER TABLE "b2b_profiles" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "addresses" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "notifications" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "categories" ADD FOREIGN KEY ("parent_id") REFERENCES "categories" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "products" ADD FOREIGN KEY ("brand_id") REFERENCES "brands" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "product_variants" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "product_images" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "reviews" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "reviews" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "wishlists" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "wishlists" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "services" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "service_inquiries" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "service_inquiries" ADD FOREIGN KEY ("service_id") REFERENCES "services" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "carts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "cart_items" ADD FOREIGN KEY ("cart_id") REFERENCES "carts" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "cart_items" ADD FOREIGN KEY ("variant_id") REFERENCES "product_variants" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "orders" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "orders" ADD FOREIGN KEY ("address_id") REFERENCES "addresses" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "orders" ADD FOREIGN KEY ("coupon_id") REFERENCES "coupons" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "order_items" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "order_items" ADD FOREIGN KEY ("variant_id") REFERENCES "product_variants" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "payments" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id") DEFERRABLE INITIALLY IMMEDIATE;
