# Frontend + Backend Integration Guide

## Architecture Overview

```
Next.js Frontend (kimmex.decor:3000)
         ↓
API Helpers (lib/api-*.ts)
         ↓
Laravel API (localhost:8000/api)
         ↓
PostgreSQL Database
```

## Setup Instructions

### 1. Start Laravel API (in a terminal)
```bash
cd /home/vanny/projects/km-decor/km-decor-api
php artisan serve
```
Server runs at: `http://localhost:8000`

### 2. Start Next.js Frontend (in another terminal)
```bash
cd /home/vanny/projects/km-decor/kimmex.decor
npm run dev
```
Frontend runs at: `http://localhost:3000`

### 3. Environment Configuration
Frontend `.env.local` should have:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## API Integration Files

### Product Catalog
**File:** `lib/api-catalog.ts`
- `getCatalogProducts()` - Fetch all products with pagination
- `getCatalogProduct(slug)` - Fetch single product
- `getCatalogCategories()` - Fetch product categories
- Handles type conversion from Laravel API to frontend format
- Falls back to mock data if API unavailable

### Services
**File:** `lib/api-services.ts`
- `getCatalogServices()` - Fetch all services
- `getCatalogService(slug)` - Fetch single service
- Converts Laravel service response to ServiceItem

### Components Using Real Data
- `ServicesOverviewSection` - Now fetches from `/api/services`
- `ProductShowcaseSection` - Fetches from `/api/products`
- Can be extended for more sections

## API Endpoints

### Public Endpoints (No Auth Required)

**Products**
```
GET /api/products?per_page=100
GET /api/products/{slug}
```

**Services**
```
GET /api/services
GET /api/services/{slug}
```

**Categories**
```
GET /api/categories
```

**Brands**
```
GET /api/brands
```

**Contact & Inquiries**
```
POST /api/contact
POST /api/inquiries
```

**Search**
```
GET /api/search?q={term}
```

### Protected Endpoints (Requires Auth Token)

**Authentication**
```
POST /api/register
POST /api/login
POST /api/logout
GET /api/me
```

**Customer Account**
```
GET /api/addresses
POST /api/addresses
PATCH /api/profile
```

**Cart & Orders**
```
GET /api/cart
POST /api/cart/items
GET /api/orders
POST /api/checkout
```

See `/home/vanny/projects/km-decor/km-decor-api/README.md` for complete API documentation.

## Data Type Conversions

The frontend expects data in this format (from `lib/homepage-data.ts`):

### ProductItem
```typescript
{
  id: string
  name: string
  descriptor: string
  brand: string
  category: string
  sku: string
  price: number
  unit: string
  stockStatus: "In stock" | "Low stock" | "Preorder"
  rating: number
  reviewCount: number
  badge?: string
  specs: string[]
  moq: string
  leadTime: string
  delivery: string
  quoteRecommended: boolean
  customerGoal: string
  keyFeatures: string[]
  href: string
  imageUrl: string
  galleryImages: string[]
}
```

The Laravel API returns a different structure, so `api-catalog.ts` adapts it using the `adaptProduct()` function.

## Adding More Real Data

To replace more mock data with API data:

### 1. Create API helper
```typescript
// lib/api-something.ts
export async function getSomething() {
  try {
    const response = await fetchJson<ApiCollectionResponse<ApiSomething>>("/something");
    return response.data.map(adapt);
  } catch {
    return fallbackData;
  }
}
```

### 2. Update component to be async
```typescript
// Component must be marked async
export async function MySection() {
  const data = await getSomething();
  return <div>{/* render data */}</div>;
}
```

### 3. Add to page (already async-compatible)
Pages in Next.js 13+ can await async components.

## Error Handling & Fallbacks

If the API is unavailable:
- API calls catch errors and return mock data
- Frontend works with fallback data from `lib/homepage-data.ts`
- Users see consistent experience either way
- No broken pages or missing sections

## Testing

### Test API Response
```bash
curl http://localhost:8000/api/products?per_page=2
curl http://localhost:8000/api/services
curl http://localhost:8000/api/categories
```

### Test Frontend
1. Open http://localhost:3000
2. Check Network tab in DevTools
3. Should see requests to http://localhost:8000/api/*
4. Products and services should display with real data

## Troubleshooting

### Frontend can't reach API
- Check Laravel is running: `curl http://localhost:8000/api/products`
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check CORS headers if frontend is on different domain

### API not running
```bash
cd km-decor-api
php artisan migrate  # Setup database if needed
php artisan serve
```

### No products showing
- Check database has data: `php artisan tinker`
- Run seeder if needed: `php artisan db:seed`
- Verify products are published: `is_published = true`

## Next Steps

1. ✅ Products API integrated
2. ✅ Services API integrated  
3. ⏳ Integrate Categories/Brands
4. ⏳ Add search functionality
5. ⏳ Build authentication flows
6. ⏳ Implement cart/checkout

## Documentation References

- Laravel API: `/home/vanny/projects/km-decor/km-decor-api/README.md`
- Frontend Structure: `/home/vanny/projects/km-decor/kimmex.decor/`
- Specification: `/home/vanny/projects/km-decor/E_commerce_+_Service_Showcase_Project_Stack_37e4136c24d78104813febb8590deeda.md`
