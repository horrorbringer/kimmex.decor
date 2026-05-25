# Homepage Component Spec

## Stack Assumption
This spec assumes a `Next.js + React + Tailwind CSS` frontend for **Kimmex Decor** with a light, architectural visual style.

## Page Wrapper
Component: `HomePage`

Responsibilities:
- compose all homepage sections
- load featured services, products, brands, and projects
- keep section spacing consistent
- support Khmer and English content later

## 1. Header
Component: `SiteHeader`

Elements:
- logo
- primary nav
- search trigger
- account trigger
- cart trigger
- contact CTA

Behavior:
- sticky on scroll
- mobile menu drawer on small screens

## 2. Hero Section
Component: `HeroSection`

Elements:
- headline
- supporting text
- primary CTA: `Explore Services`
- secondary CTA: `View Products`
- featured image
- optional trust highlights

Layout:
- desktop: two-column
- mobile: stacked

## 3. About Preview
Component: `AboutPreviewSection`

Elements:
- section label
- short introduction
- short mission or value statement
- supporting image or stat block

Goal:
- establish brand credibility quickly without turning the homepage into a full company profile

## 4. Services Overview
Component: `ServicesOverviewSection`

Child component: `ServiceCard`

Card fields:
- image
- title
- short description
- detail URL

Expected items:
- Finished Ceiling Decor
- Partition and Wall Decor
- Furniture Decor
- Smart Home Control

## 5. Product Showcase
Component: `ProductShowcaseSection`

Child component: `ProductCard`

Card fields:
- image
- product name
- short descriptor
- brand
- detail URL

Optional controls:
- category tabs
- featured-only filtering

## 6. Featured Projects
Component: `FeaturedProjectsSection`

Child component: `ProjectCard`

Card fields:
- image
- project title
- project type
- short caption
- detail URL

Layout:
- editorial asymmetrical grid on desktop
- stacked cards on mobile

## 7. Why Choose Us
Component: `TrustHighlightsSection`

Child component: `TrustItem`

Recommended content:
- Multi-brand material expertise
- Custom decor solutions
- Technical execution and support

## 8. Brands Strip
Component: `BrandsSection`

Child component: `BrandLogoCard`

Fields:
- logo
- brand name
- brand URL

Layout:
- horizontal logo row or clean responsive grid

## 9. Inquiry CTA
Component: `InquirySection`

Child component: `InquiryForm`

Fields:
- name
- phone
- location
- inquiry type
- message

Behavior:
- client validation
- success and error states
- optional submit-to-email or API endpoint

## 10. Footer
Component: `SiteFooter`

Elements:
- quick links
- service links
- product links
- contact details
- social links

## Data Shape Suggestions
`ServiceCard`
- `id`
- `title`
- `slug`
- `summary`
- `imageUrl`

`ProductCard`
- `id`
- `name`
- `slug`
- `brandName`
- `imageUrl`
- `shortDescription`

`ProjectCard`
- `id`
- `title`
- `slug`
- `projectType`
- `imageUrl`
- `caption`

## Styling Rules
- use warm light backgrounds
- keep cards lightly bordered
- prefer large images and short copy
- avoid crowded promo blocks
- keep buttons refined, not oversized

## Suggested Build Order
1. `SiteHeader`
2. `HeroSection`
3. `ServicesOverviewSection`
4. `ProductShowcaseSection`
5. `FeaturedProjectsSection`
6. `TrustHighlightsSection`
7. `InquirySection`
8. `SiteFooter`
9. integrate into `HomePage`
