import { products, projects, services } from "@/lib/homepage-data";

export type ProjectDetail = {
  overview: string;
  setting: string;
  focus: string;
  goal: string;
  challenge: string;
  response: string;
  scope: string[];
  outcomes: string[];
  process: Array<{ title: string; copy: string }>;
  gallery: Array<{ title: string; caption: string; imageUrl: string }>;
  serviceIds: string[];
  productIds: string[];
};

export const projectDetails: Record<string, ProjectDetail> = {
  "residential-suite": {
    overview:
      "A residential ceiling direction built around warm finishes, clean perimeter lines, and integrated lighting. The reference shows how ceiling materials and lighting details can work together without making the living area feel visually heavy.",
    setting: "Residential interior",
    focus: "Ceiling and lighting",
    goal: "Create a warmer, more refined living area with a ceiling design that supports both ambient and feature lighting.",
    challenge:
      "The ceiling needed enough visual detail to define the room while maintaining a calm, open feeling across the main living space.",
    response:
      "A restrained ceiling composition, coordinated edge profiles, and warm lighting zones create a clear focal point while preserving visual continuity.",
    scope: ["Ceiling layout direction", "Board and perimeter profile planning", "Lighting detail coordination", "Finish and material alignment"],
    outcomes: ["Cleaner ceiling lines", "Warmer room atmosphere", "Coordinated lighting zones"],
    process: [
      { title: "Read the room", copy: "Review room proportions, existing light, furniture placement, and the intended visual mood." },
      { title: "Define the ceiling", copy: "Set the ceiling lines, feature areas, lighting positions, and suitable board system." },
      { title: "Coordinate the finish", copy: "Align profiles, accessories, lighting details, and installation requirements." }
    ],
    gallery: [
      {
        title: "Warm living atmosphere",
        caption: "A balanced ceiling direction supports the room without competing with furniture and finishes.",
        imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=85"
      },
      {
        title: "Integrated ceiling detail",
        caption: "Perimeter lines and lighting are considered as one connected composition.",
        imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85"
      },
      {
        title: "Material and light balance",
        caption: "Neutral surfaces allow warm light and interior textures to carry the visual character.",
        imageUrl: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=1200&q=85"
      }
    ],
    serviceIds: ["ceiling"],
    productIds: ["gypsum-board", "cline-4m", "eco-block-ceiling-board"]
  },
  "workspace-fitout": {
    overview:
      "A commercial workspace direction using partitions, acoustic considerations, and restrained finishes to create focus without isolating the team. The reference connects room planning with practical wall systems and material coordination.",
    setting: "Commercial workspace",
    focus: "Partitions and acoustics",
    goal: "Create focused work zones and meeting areas while keeping the office connected, bright, and easy to navigate.",
    challenge:
      "The workspace needed clearer separation for concentration and meetings without losing daylight or creating a closed, fragmented environment.",
    response:
      "Partition placement, acoustic board options, and consistent finish choices define functional zones while maintaining a coherent visual rhythm.",
    scope: ["Workspace zoning", "Partition system planning", "Acoustic material direction", "Wall and finish coordination"],
    outcomes: ["Clearer work zones", "Improved privacy planning", "Consistent workspace finishes"],
    process: [
      { title: "Map the workflow", copy: "Identify focus areas, meeting spaces, circulation routes, and shared team zones." },
      { title: "Plan the partitions", copy: "Define wall positions, heights, acoustic needs, and suitable frame and board systems." },
      { title: "Unify the interior", copy: "Coordinate wall finishes, lighting, furniture direction, and service access." }
    ],
    gallery: [
      {
        title: "Connected workspace",
        caption: "Clear zones support different work modes while preserving an open office character.",
        imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85"
      },
      {
        title: "Meeting and focus zones",
        caption: "Partition placement balances visual connection with privacy and acoustic requirements.",
        imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85"
      },
      {
        title: "Material continuity",
        caption: "Consistent wall, ceiling, and furniture finishes make separate areas feel connected.",
        imageUrl: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=85"
      }
    ],
    serviceIds: ["partition", "furniture"],
    productIds: ["partition-frame-stick", "acoustic-board", "gypsum-board"]
  },
  "smart-home": {
    overview:
      "A smart-living direction focused on useful control points, compatible door access, and technology that remains visually quiet. The reference prioritizes daily convenience and finish coordination over unnecessary complexity.",
    setting: "Modern residence",
    focus: "Access and controls",
    goal: "Introduce practical smart access and control features without disrupting the interior design or everyday routines.",
    challenge:
      "Smart products needed to fit existing doors, finishes, and user habits rather than becoming disconnected devices added after the interior work.",
    response:
      "Compatibility checks, restrained control placement, and coordinated hardware finishes create a simpler upgrade path for the home.",
    scope: ["Smart access review", "Door and hardware compatibility", "Control-point planning", "Finish coordination"],
    outcomes: ["Simpler daily access", "Cleaner device integration", "Better hardware compatibility"],
    process: [
      { title: "Understand the routine", copy: "Identify who uses the space, how access works, and which controls add practical value." },
      { title: "Check compatibility", copy: "Review door type, lock dimensions, power needs, connectivity, and installation conditions." },
      { title: "Integrate the details", copy: "Coordinate product selection, placement, finish, and installation requirements." }
    ],
    gallery: [
      {
        title: "Technology kept quiet",
        caption: "Smart features support the interior rather than becoming its dominant visual element.",
        imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=85"
      },
      {
        title: "Connected daily living",
        caption: "Useful controls are selected around real routines and the needs of the household.",
        imageUrl: "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=1200&q=85"
      },
      {
        title: "Compatible smart access",
        caption: "Door construction and existing hardware are reviewed before choosing the lock set.",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=85"
      }
    ],
    serviceIds: ["smart-home", "furniture"],
    productIds: ["smart-lock", "cabinet-board", "decor-board"]
  }
};

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.id === slug);
}

export function getProjectDetail(slug: string) {
  return projectDetails[slug];
}

export function getProjectServices(slug: string) {
  const detail = getProjectDetail(slug);
  if (!detail) return [];

  return detail.serviceIds
    .map((id) => services.find((service) => service.id === id))
    .filter((service): service is (typeof services)[number] => Boolean(service));
}

export function getProjectProducts(slug: string) {
  const detail = getProjectDetail(slug);
  if (!detail) return [];

  return detail.productIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is (typeof products)[number] => Boolean(product));
}
