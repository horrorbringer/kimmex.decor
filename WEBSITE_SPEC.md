# KMD Website Specification

## Purpose
This document converts the brainstorm workbook into a usable website specification for KMD's construction e-commerce frontend. It separates scope, content, and unresolved business decisions.

## Project Goal
Build a bilingual website that presents KMD as both:
- a construction and interior service provider
- a seller of building materials and decor products

The site should support lead generation, product discovery, and future e-commerce checkout.

## Core Audiences
- B2B buyers such as contractors, developers, and project teams
- Commercial and residential customers looking for decor or smart-home services
- Buyers researching brands, materials, and technical product options

## Site Structure
- Home
- Services
- Service detail pages
- Products
- Product category pages
- Product detail pages
- Search
- Cart
- Checkout
- Account area
- Brand or supplier pages
- Portfolio or gallery
- Blog or content pages
- FAQ
- About
- Contact

## Homepage Sections
- Hero banner with two CTAs: `Explore Services` and `View Products`
- About KMD with history, mission, and vision
- Services overview with four primary blocks
- Product showcase by category
- Portfolio or gallery of featured projects
- Why choose us
- Contact section with inquiry form, map, phone, and email

## Service Taxonomy
- Finished Ceiling Decor
- Partition and Wall Decor
- Furniture Decor
- Smart Home Control
- Glass Doors and Windows
- Exterior works

Examples from the workbook include stretch ceilings, reflective ceilings, eco block ceilings, smart board systems, and custom furniture.

## Product Taxonomy
- Gypsum board
- Ceiling and partition frame
- Decor materials such as MDF, WPC, plywood, and related boards
- Sanitary ware

## Functional Scope
- Product listing, filtering, sorting, and comparison
- Product detail pages with gallery, specs, reviews, and related items
- Search with autocomplete
- Cart and checkout
- User account area with orders, wishlist, and profile
- Brand or supplier landing pages
- Portfolio and content pages

## Open Decisions
- Confirm exact product catalog KMD wants to sell first
- Confirm the priority audience: B2B-first, retail-first, or mixed launch
- Finalize homepage messaging and Khmer/English terminology
- Select 3 main differentiators for the `Why Choose Us` section
- Confirm which projects and images can be used in the portfolio

## Recommended Delivery Order
1. Finalize product and service taxonomy
2. Lock sitemap and homepage content
3. Design wireframes for home, catalog, PDP, and service pages
4. Build the PostgreSQL-backed web application
