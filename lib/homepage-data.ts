export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  imageUrl: string;
};

export type ProductItem = {
  id: string;
  name: string;
  descriptor: string;
  brand: string;
  category: string;
  sku: string;
  price: number;
  comparePrice?: number;
  unit: string;
  stockStatus: "In stock" | "Preorder" | "Low stock";
  rating: number;
  reviewCount: number;
  badge?: string;
  specs: string[];
  moq: string;
  leadTime: string;
  delivery: string;
  quoteRecommended?: boolean;
  customerGoal: string;
  keyFeatures: string[];
  compatibleProductIds: string[];
  applications: string[];
  materialNotes: string[];
  href: string;
  imageUrl: string;
  galleryImages: string[];
};

export type ProjectItem = {
  id: string;
  title: string;
  projectType: string;
  caption: string;
  href: string;
  imageUrl: string;
};

export type BrandItem = {
  id: string;
  name: string;
  href: string;
};

export type ProjectPackage = {
  id: string;
  title: string;
  summary: string;
  startingPrice: number;
  includes: string[];
  href: string;
  imageUrl: string;
};

export type UseCaseItem = {
  id: string;
  title: string;
  summary: string;
  categories: string[];
  href: string;
};

export const shopCategories = [
  "Gypsum Board",
  "Eco Block Ceiling Board",
  "Cline & Partition Frame",
  "Sanitary Ware",
  "Decor Materials",
  "Smart Home",
  "Furniture Decor",
  "Wall Systems",
  "Installation Tools"
];

export const services: ServiceItem[] = [
  {
    id: "ceiling",
    title: "Finished Ceiling Decor",
    description: "Stretch, reflective, and feature ceilings for residential and commercial interiors.",
    href: "/services/ceiling",
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "partition",
    title: "Partition and Wall Decor",
    description: "Wall systems and partition solutions designed for durability, acoustics, and finish quality.",
    href: "/services/partition",
    imageUrl:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "furniture",
    title: "Furniture Decor",
    description: "Built-in counters, cabinets, shelving, and finish carpentry for project-ready spaces.",
    href: "/services/furniture",
    imageUrl:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "smart-home",
    title: "Smart Home Control",
    description: "Integrated controls for lighting, locks, and convenience features in modern interiors.",
    href: "/services/smart-home",
    imageUrl:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80"
  }
];

const temporaryProductImages = {
  gypsumBoard: "/products/gypsum_board.webp",
  partitionFrame: "/products/partition.webp",
  ceilingProfile: "/products/cline.webp",
  decorBoard: "/products/wood.webp",
  sanitaryWare: "/products/sanitery_ware.webp",
  smartLock: "/products/smart_lock_door.webp",
  acousticBoard: "/products/wood.webp",
  ceilingBoard: "/products/cline_detail.webp",
  cabinetBoard: "/products/wood.webp",
  installationKit: "/products/gypsum_board_cline.webp"
};

export const products: ProductItem[] = [
  {
    id: "gypsum-board",
    name: "Gypsum Board (Zeit) STD Size",
    descriptor: "A smooth, practical gypsum board for interior ceilings and partition walls. Suitable for homes, offices, and renovation projects when you need a clean surface that is easy to frame, finish, and paint.",
    brand: "Zeit",
    category: "Gypsum Board",
    sku: "ZTG-STD-1220",
    price: 8.5,
    comparePrice: 10,
    unit: "sheet",
    stockStatus: "In stock",
    rating: 4.8,
    reviewCount: 28,
    badge: "Best seller",
    specs: ["1220mm board", "Interior ceiling", "Standard finish"],
    moq: "10 sheets",
    leadTime: "Ready stock",
    delivery: "Delivery available",
    customerGoal: "Cover ceiling or partition surfaces with a standard interior board that is easy to plan and order.",
    keyFeatures: ["Standard Zeit board size", "Smooth interior finish", "Suitable for ceiling and partition work", "Works with frame and fixing accessories"],
    compatibleProductIds: ["partition-frame-stick", "cline-4m", "installation-kit"],
    applications: ["Ceiling lining", "Partition wall surface", "Residential renovation"],
    materialNotes: ["Standard board size for common ceiling work", "Best ordered with framing and fixing accessories", "Confirm moisture or fire rating before wet-area use"],
    href: "/products/gypsum-board",
    imageUrl: temporaryProductImages.gypsumBoard,
    galleryImages: [
      temporaryProductImages.gypsumBoard,
      "/products/gypsum_board_ziet_brand.webp"
    ]
  },
  {
    id: "partition-frame-stick",
    name: "Partition Frame Stick 4M",
    descriptor: "A 4-meter steel profile used to create the supporting structure for gypsum and acoustic partition walls. Designed for straight, stable framing in residential rooms, offices, and commercial fit-outs.",
    brand: "ISI Steel",
    category: "Cline & Partition Frame",
    sku: "ISI-PF-4M",
    price: 3.2,
    unit: "stick",
    stockStatus: "In stock",
    rating: 4.7,
    reviewCount: 19,
    badge: "Contractor pick",
    specs: ["4m length", "Partition frame", "Steel profile"],
    moq: "20 sticks",
    leadTime: "Ready stock",
    delivery: "Truck delivery",
    customerGoal: "Build partition wall structure before installing boards or wall finishes.",
    keyFeatures: ["4M stick length", "Steel profile support", "Suitable for partition framing", "Useful for contractor bulk orders"],
    compatibleProductIds: ["gypsum-board", "acoustic-board", "installation-kit"],
    applications: ["Partition framing", "Room division", "Commercial fit-out"],
    materialNotes: ["Four-meter profile for project installation", "Pair with wall board and fixing kit", "Delivery planning recommended for larger quantities"],
    href: "/products/partition-frame-stick",
    imageUrl: temporaryProductImages.partitionFrame,
    galleryImages: [temporaryProductImages.partitionFrame]
  },
  {
    id: "cline-4m",
    name: "Cline 4M",
    descriptor: "A 4-meter ceiling profile that helps form straight perimeter lines and neat edge details. Use it with ceiling boards and framing accessories to achieve a cleaner, more consistent finish.",
    brand: "Multi-brand",
    category: "Cline & Partition Frame",
    sku: "KMD-CLN-4M",
    price: 2.8,
    unit: "stick",
    stockStatus: "In stock",
    rating: 4.5,
    reviewCount: 13,
    badge: "Ceiling line",
    specs: ["4m length", "Ceiling line", "Edge finishing"],
    moq: "20 sticks",
    leadTime: "Ready stock",
    delivery: "Truck delivery",
    customerGoal: "Create a clean ceiling edge or line detail before finishing ceiling work.",
    keyFeatures: ["4M cline profile", "Useful for ceiling perimeter", "Supports cleaner ceiling finish", "Pairs with ceiling board systems"],
    compatibleProductIds: ["gypsum-board", "eco-block-ceiling-board", "installation-kit"],
    applications: ["Ceiling edge line", "Ceiling perimeter finish", "Interior ceiling detail"],
    materialNotes: ["Confirm ceiling design before ordering", "Best paired with ceiling board and install accessories", "Bulk delivery recommended for project quantities"],
    href: "/products/cline-4m",
    imageUrl: temporaryProductImages.ceilingProfile,
    galleryImages: [temporaryProductImages.ceilingProfile, "/products/cline_detail.webp"]
  },
  {
    id: "decor-board",
    name: "Decor Materials Board",
    descriptor: "A flexible selection of MDF, WPC, and plywood panels for cabinets, counters, shelving, and feature walls. Choose the material, thickness, color, and finish according to the room style and moisture conditions.",
    brand: "Multi-brand",
    category: "Decor Materials",
    sku: "KMD-BOARD-MIX",
    price: 18,
    unit: "panel",
    stockStatus: "Preorder",
    rating: 4.6,
    reviewCount: 12,
    badge: "Multi-brand",
    specs: ["MDF/WPC/Plywood", "Furniture grade", "Panel material"],
    moq: "5 panels",
    leadTime: "3-7 days",
    delivery: "Quote delivery",
    quoteRecommended: true,
    customerGoal: "Select decorative board materials for furniture, wall features, counters, and interior finish work.",
    keyFeatures: ["Multi-material options", "Furniture and wall finish use", "Project quote recommended", "Supports custom finish selection"],
    compatibleProductIds: ["cabinet-board", "installation-kit", "gypsum-board"],
    applications: ["Cabinet fabrication", "Feature wall finish", "Counter and shelving work"],
    materialNotes: ["Material selection depends on finish and moisture exposure", "Confirm thickness and surface color before quote", "Best handled through project quote for mixed materials"],
    href: "/products/decor-board",
    imageUrl: temporaryProductImages.decorBoard,
    galleryImages: [
      temporaryProductImages.decorBoard,
      "/products/wood.webp"
    ]
  },
  {
    id: "sanitary",
    name: "Sanitary Ware",
    descriptor: "A coordinated range of bathroom fixtures for new construction, renovation, and replacement work. Select individual pieces or request a matching set based on your bathroom layout, preferred style, and available stock.",
    brand: "Arrow",
    category: "Sanitary Ware",
    sku: "ARW-SAN-COL",
    price: 42,
    comparePrice: 48,
    unit: "piece",
    stockStatus: "Low stock",
    rating: 4.9,
    reviewCount: 31,
    badge: "Premium",
    specs: ["Bathroom fixture", "Arrow brand", "Project supply"],
    moq: "1 piece",
    leadTime: "Check stock",
    delivery: "Delivery available",
    quoteRecommended: true,
    customerGoal: "Choose bathroom fixtures for renovation, replacement, or project supply with stock confirmation.",
    keyFeatures: ["Arrow brand fixture options", "Suitable for bathroom upgrades", "Low-stock confirmation", "Quote support for matching sets"],
    compatibleProductIds: ["installation-kit", "smart-lock", "decor-board"],
    applications: ["Bathroom renovation", "Hotel and apartment supply", "Fixture replacement"],
    materialNotes: ["Confirm model, color, and matching accessories", "Low stock items should be checked before checkout", "Project buyers can request matching fixture sets"],
    href: "/products/sanitary",
    imageUrl: temporaryProductImages.sanitaryWare,
    galleryImages: [
      temporaryProductImages.sanitaryWare,
      "/products/sanitery_ware.webp"
    ]
  },
  {
    id: "smart-lock",
    name: "Smart Lock Set",
    descriptor: "A modern door-locking solution that adds convenient, keyless access to homes, rental units, and small offices. Door type and dimensions should be confirmed before ordering to ensure correct installation.",
    brand: "KMD Smart",
    category: "Smart Home",
    sku: "KMD-SL-100",
    price: 95,
    comparePrice: 115,
    unit: "set",
    stockStatus: "In stock",
    rating: 4.5,
    reviewCount: 16,
    badge: "New",
    specs: ["Door access", "Smart control", "Set package"],
    moq: "1 set",
    leadTime: "Ready stock",
    delivery: "Delivery available",
    customerGoal: "Upgrade door access with a smart lock set for homes, rental units, or small offices.",
    keyFeatures: ["Smart access control", "Set package", "Home and office use", "Compatibility check recommended"],
    compatibleProductIds: ["decor-board", "cabinet-board", "sanitary"],
    applications: ["Home entrance upgrade", "Rental unit access", "Small office door control"],
    materialNotes: ["Confirm door type and lock compatibility", "Installation advice recommended before purchase", "Useful for smart home starter packages"],
    href: "/products/smart-lock",
    imageUrl: temporaryProductImages.smartLock,
    galleryImages: [
      temporaryProductImages.smartLock,
      "/products/smart_lock_door.webp"
    ]
  },
  {
    id: "acoustic-board",
    name: "Acoustic Smart Board",
    descriptor: "An acoustic wall panel for partitions and interior spaces where improved sound control is important. A practical choice for bedrooms, meeting rooms, offices, and other areas that need a clean finish with reduced noise transfer.",
    brand: "Multi-brand",
    category: "Wall Systems",
    sku: "KMD-ACB-2440",
    price: 24,
    unit: "panel",
    stockStatus: "Preorder",
    rating: 4.4,
    reviewCount: 9,
    specs: ["Sound control", "Wall system", "Preorder"],
    moq: "10 panels",
    leadTime: "7-14 days",
    delivery: "Quote delivery",
    quoteRecommended: true,
    customerGoal: "Improve room sound control while keeping a clean wall or partition finish.",
    keyFeatures: ["Sound-control board", "Partition and wall use", "Preorder planning", "Best quoted with framing"],
    compatibleProductIds: ["partition-frame-stick", "gypsum-board", "installation-kit"],
    applications: ["Meeting room partition", "Bedroom sound control", "Office acoustic upgrade"],
    materialNotes: ["Preorder timing depends on selected board type", "Confirm acoustic target and wall system", "Best quoted with framing and installation scope"],
    href: "/products/acoustic-board",
    imageUrl: temporaryProductImages.acousticBoard,
    galleryImages: [
      temporaryProductImages.acousticBoard,
      "/products/wood.webp"
    ]
  },
  {
    id: "eco-block-ceiling-board",
    name: "Eco Block Ceiling Board",
    descriptor: "A decorative ceiling board for eco-block patterns, reflected ceiling details, and integrated LED designs. Best suited to feature ceilings where the final layout, lighting, framing, and installation need to be planned together.",
    brand: "KMD Supply",
    category: "Eco Block Ceiling Board",
    sku: "KMD-ECO-CL",
    price: 16,
    unit: "board",
    stockStatus: "Preorder",
    rating: 4.5,
    reviewCount: 11,
    badge: "Service fit",
    specs: ["Eco block board", "Ceiling decor", "LED-ready option"],
    moq: "5 boards",
    leadTime: "5-10 days",
    delivery: "Quote delivery",
    quoteRecommended: true,
    customerGoal: "Create decorative ceiling features such as reflect, eco-block, or LED ceiling layouts.",
    keyFeatures: ["Eco block ceiling use", "LED-ready option", "Decor ceiling fit", "Quote recommended for design scope"],
    compatibleProductIds: ["cline-4m", "gypsum-board", "installation-kit"],
    applications: ["Reflect ceiling work", "LED ceiling decor", "Interior feature ceiling"],
    materialNotes: ["Confirm ceiling design before quote", "Best paired with KMD ceiling service", "Delivery and installation scope should be checked"],
    href: "/products/eco-block-ceiling-board",
    imageUrl: temporaryProductImages.ceilingBoard,
    galleryImages: [
      temporaryProductImages.ceilingBoard,
      "/products/cline_detail.webp"
    ]
  },
  {
    id: "cabinet-board",
    name: "Cabinet Decor Board",
    descriptor: "A furniture-grade decorative panel for cabinet doors, shelving, counters, and custom built-ins. Confirm the thickness, surface color, edge finish, and available quantity before starting fabrication.",
    brand: "An Cuong",
    category: "Furniture Decor",
    sku: "ACG-CAB-18",
    price: 32,
    unit: "panel",
    stockStatus: "Low stock",
    rating: 4.7,
    reviewCount: 22,
    badge: "Project grade",
    specs: ["18mm panel", "Cabinet finish", "Furniture decor"],
    moq: "3 panels",
    leadTime: "Check stock",
    delivery: "Delivery available",
    quoteRecommended: true,
    customerGoal: "Prepare furniture-grade panels for cabinet, shelving, counter, or built-in interior work.",
    keyFeatures: ["18mm panel option", "Furniture finish use", "Built-in project fit", "Stock check recommended"],
    compatibleProductIds: ["decor-board", "installation-kit", "smart-lock"],
    applications: ["Cabinet doors", "Built-in shelving", "Furniture finish panels"],
    materialNotes: ["Confirm finish color, edge treatment, and thickness", "Low stock should be verified before production planning", "Useful for built-in furniture packages"],
    href: "/products/cabinet-board",
    imageUrl: temporaryProductImages.cabinetBoard,
    galleryImages: [
      temporaryProductImages.cabinetBoard,
      "/products/wood.webp"
    ]
  },
  {
    id: "installation-kit",
    name: "Ceiling Install Kit",
    descriptor: "A convenient set of basic fixing accessories for ceiling installation, repair, and small renovation work. Pair it with the selected board and frame system, and confirm the required quantity from the project area.",
    brand: "KMD",
    category: "Installation Tools",
    sku: "KMD-KIT-CL",
    price: 12,
    unit: "kit",
    stockStatus: "In stock",
    rating: 4.3,
    reviewCount: 14,
    specs: ["Fixing kit", "Ceiling install", "Accessory set"],
    moq: "1 kit",
    leadTime: "Ready stock",
    delivery: "Pickup or delivery",
    customerGoal: "Prepare basic fixing accessories for small ceiling jobs, repairs, or installation support.",
    keyFeatures: ["Accessory starter kit", "Ceiling installation support", "Pickup or delivery", "Pairs with board and frame"],
    compatibleProductIds: ["gypsum-board", "partition-frame-stick", "cline-4m"],
    applications: ["Ceiling repair", "Small installation work", "Accessory preparation"],
    materialNotes: ["Best paired with gypsum board, cline, or partition frame", "Confirm required quantity by room size", "Useful as a starter kit for small jobs"],
    href: "/products/installation-kit",
    imageUrl: temporaryProductImages.installationKit,
    galleryImages: [temporaryProductImages.installationKit, "/products/gypsum_board_cline.webp"]
  }
];

export const projectPackages: ProjectPackage[] = [
  {
    id: "ceiling-package",
    title: "Ceiling Installation Package",
    summary: "Boards, frames, accessories, and installation consultation for finished ceiling work.",
    startingPrice: 280,
    includes: ["Gypsum board", "Cline or frame", "Install kit", "Service quote"],
    href: "/contact",
    imageUrl:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "partition-package",
    title: "Partition Wall Package",
    summary: "Wall board, framing, acoustic options, and project delivery support for room partitions.",
    startingPrice: 360,
    includes: ["Smart board", "Steel frame", "Acoustic option", "Site advice"],
    href: "/contact",
    imageUrl:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "bathroom-package",
    title: "Bathroom Upgrade Package",
    summary: "Sanitaryware product bundle with quote support for residential and commercial bathrooms.",
    startingPrice: 520,
    includes: ["Sanitaryware", "Fixture selection", "Delivery quote", "Project support"],
    href: "/contact",
    imageUrl:
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80"
  }
];

export const useCases: UseCaseItem[] = [
  {
    id: "home-renovation",
    title: "Renovating a Home",
    summary: "Ceiling boards, decor panels, sanitaryware, and smart lock options for residential upgrades.",
    categories: ["Gypsum Board", "Decor Materials", "Sanitary Ware"],
    href: "/products"
  },
  {
    id: "office-fitout",
    title: "Commercial Office Fit-Out",
    summary: "Partition frames, acoustic boards, and material packages for workspace projects.",
    categories: ["Cline & Partition Frame", "Wall Systems", "Installation Tools"],
    href: "/products"
  },
  {
    id: "bathroom-upgrade",
    title: "Bathroom Upgrade",
    summary: "Sanitaryware and accessory sourcing with quote support for project quantities.",
    categories: ["Sanitary Ware", "Installation Tools"],
    href: "/products"
  },
  {
    id: "smart-upgrade",
    title: "Smart Home Starter",
    summary: "Entry smart controls and lock sets for homeowners and developers.",
    categories: ["Smart Home"],
    href: "/products"
  }
];

export const projects: ProjectItem[] = [
  {
    id: "residential-suite",
    title: "Private Residence Ceiling Upgrade",
    projectType: "Residential",
    caption: "Warm reflective finishes with clean line detailing for a modern family living area.",
    href: "/portfolio/residential-suite",
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "workspace-fitout",
    title: "Commercial Workspace Fit-Out",
    projectType: "Commercial",
    caption: "Partition systems and acoustic material planning for a focused office environment.",
    href: "/portfolio/workspace-fitout",
    imageUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "smart-home",
    title: "Smart Living Upgrade",
    projectType: "Smart Home",
    caption: "Integrated control points and finish coordination for a cleaner daily experience.",
    href: "/portfolio/smart-home",
    imageUrl:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80"
  }
];

export const brands: BrandItem[] = [
  { id: "zeit", name: "Zeit", href: "/products" },
  { id: "isi", name: "ISI Steel", href: "/products" },
  { id: "arrow", name: "Arrow", href: "/products" },
  { id: "multi", name: "Multi-brand", href: "/products" }
];

export const trustPoints = [
  "Multi-brand material expertise",
  "Custom decor and project solutions",
  "Technical execution and support"
];
