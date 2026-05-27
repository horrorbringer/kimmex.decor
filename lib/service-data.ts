import { products, services } from "@/lib/homepage-data";

export type ServiceDetail = {
  overview?: string;
  photoCta: string;
  quotePrep: string[];
  scope: string[];
  materials: string[];
  cta: string;
  bestFor: string[];
  visuals: Array<{ title: string; caption: string; imageUrl: string }>;
  quoteFactors: string[];
  timeline: string;
  outcomes: string[];
  deliverables: string[];
  relatedProductIds: string[];
  faqs: Array<{ question: string; answer: string }>;
};

export const serviceDetails: Record<string, ServiceDetail> = {
  ceiling: {
    overview:
      "Transforming your ceiling with a finished decor service can elevate the entire aesthetic of a room, adding elegance and architectural interest. Hand-painted finishes, decorative medallions, coffered designs, and custom ceiling tiles are among the top choices for high-impact interior upgrades. These services often include custom finishes to match existing fixtures and can be tailored to both traditional and modern spaces.",
    photoCta: "Send ceiling photos",
    quotePrep: ["Ceiling or room photos", "Approximate room size", "Preferred ceiling style", "Supply-only or install"],
    scope: ["Finished ceiling layout", "Board and profile selection", "Lighting and detail coordination"],
    materials: ["Gypsum board", "Eco block ceiling board", "Cline 4M"],
    cta: "Request Ceiling Quote",
    bestFor: ["Living rooms and bedrooms", "Commercial ceiling refresh", "Reflective or LED ceiling features"],
    visuals: [
      {
        title: "Finished ceiling mood",
        caption: "Clean ceiling lines for living and commercial interiors.",
        imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80"
      },
      {
        title: "Board and profile planning",
        caption: "Match ceiling board, cline, and installation accessories.",
        imageUrl: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=900&q=80"
      },
      {
        title: "Feature ceiling reference",
        caption: "Use photo references to explain lighting and feature details.",
        imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
      }
    ],
    quoteFactors: ["Room size and ceiling height", "Ceiling style and lighting details", "Board/profile choice and installation scope"],
    timeline: "Most ceiling quotes can be reviewed after photos, size, location, and finish reference are provided.",
    outcomes: ["Cleaner ceiling lines", "Better material planning", "Coordinated lighting and finish details"],
    deliverables: ["Ceiling requirement review", "Recommended board/profile list", "Supply or install quote direction"],
    relatedProductIds: ["gypsum-board", "cline-4m", "eco-block-ceiling-board", "installation-kit"],
    faqs: [
      {
        question: "What should I send for a ceiling quote?",
        answer: "Send room photos, approximate size, ceiling reference style, location, and whether you need supply-only or installation."
      },
      {
        question: "Can KMD recommend materials before installation?",
        answer: "Yes. KMD can suggest boards, profiles, and accessories based on the ceiling type and project condition."
      }
    ]
  },
  partition: {
    overview:
      "Partition and wall decor services help divide rooms, improve privacy, and create cleaner interior zones without losing the overall design direction of the space. KMD can help customers think through frame systems, board selection, acoustic needs, wall finishing, and delivery planning for residential, retail, and commercial interiors.",
    photoCta: "Send wall dimensions",
    quotePrep: ["Wall area photos", "Length and height", "Sound-control needs", "Delivery or install access"],
    scope: ["Room division planning", "Wall finish recommendation", "Sound-control options"],
    materials: ["Partition frame", "Acoustic board", "Gypsum board"],
    cta: "Request Wall Quote",
    bestFor: ["Office room division", "Bedroom or rental unit partitions", "Meeting rooms needing sound control"],
    visuals: [
      {
        title: "Partition planning",
        caption: "Frame and board choices depend on wall height and use.",
        imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80"
      },
      {
        title: "Commercial fit-out",
        caption: "Partition work can support offices, meeting rooms, and project spaces.",
        imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80"
      },
      {
        title: "Frame and site material",
        caption: "Delivery and handling matter for frame and board quantities.",
        imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80"
      }
    ],
    quoteFactors: ["Wall length and height", "Sound-control requirement", "Frame/board type and delivery access"],
    timeline: "Early advice can start from wall length, photos, and whether the space needs acoustic treatment.",
    outcomes: ["Clear room separation", "Better acoustic planning", "Coordinated frame and board quantities"],
    deliverables: ["Partition requirement review", "Frame and board recommendations", "Delivery and quote guidance"],
    relatedProductIds: ["partition-frame-stick", "acoustic-board", "gypsum-board", "installation-kit"],
    faqs: [
      {
        question: "Can KMD help with sound-control partitions?",
        answer: "Yes. Share the room use and wall target so acoustic board and frame options can be reviewed."
      },
      {
        question: "Do I need drawings for partition work?",
        answer: "Drawings help, but photos, approximate wall length, height, and location are enough for early advice."
      }
    ]
  },
  furniture: {
    overview:
      "Furniture decor service supports built-in cabinets, counters, shelving, display areas, and custom interior features where material choice has a direct impact on the final look and durability. KMD can help review finish references, board type, thickness, hardware needs, and installation expectations before preparing a quote direction.",
    photoCta: "Send cabinet reference",
    quotePrep: ["Reference photo or sketch", "Approximate dimensions", "Board finish preference", "Hardware or install needs"],
    scope: ["Built-in cabinet planning", "Counter and shelving support", "Decor board selection"],
    materials: ["MDF / WPC / plywood", "Cabinet decor board", "Smart lock options"],
    cta: "Request Furniture Quote",
    bestFor: ["Built-in cabinets", "Counters and display shelves", "Custom storage and feature walls"],
    visuals: [
      {
        title: "Built-in furniture direction",
        caption: "Use room photos and measurements to guide board and finish choices.",
        imageUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1400&q=80"
      },
      {
        title: "Cabinet material reference",
        caption: "Confirm board finish, thickness, edge treatment, and hardware.",
        imageUrl: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=900&q=80"
      },
      {
        title: "Counter and shelving work",
        caption: "Project quotes depend on size, finish, and installation scope.",
        imageUrl: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=900&q=80"
      }
    ],
    quoteFactors: ["Furniture dimensions", "Board finish and thickness", "Hardware, edge treatment, and installation needs"],
    timeline: "Furniture quotes depend on measurements, finish references, and hardware expectations.",
    outcomes: ["Better board selection", "Cleaner built-in planning", "Coordinated finish and hardware choices"],
    deliverables: ["Furniture requirement review", "Recommended board and finish direction", "Quote support for custom scope"],
    relatedProductIds: ["decor-board", "cabinet-board", "smart-lock", "installation-kit"],
    faqs: [
      {
        question: "Can I request a specific board finish?",
        answer: "Yes. Send the finish reference, color, thickness preference, or sample photo for material matching."
      },
      {
        question: "Is furniture work quoted as standard pricing?",
        answer: "Custom furniture depends on size, finish, hardware, and installation scope, so quote review is recommended."
      }
    ]
  },
  "smart-home": {
    overview:
      "Smart home control services focus on practical upgrades such as smart locks, access control, and convenience features that need compatibility review before purchase. KMD can help check door type, lock condition, hardware requirements, and installation needs so customers avoid choosing products that do not fit the site.",
    photoCta: "Send door photo",
    quotePrep: ["Door and lock photos", "Door thickness or type", "Access-control needs", "Installation preference"],
    scope: ["Smart lock and access planning", "Control point recommendation", "Compatibility check"],
    materials: ["Smart lock set", "Door hardware", "Control accessories"],
    cta: "Request Smart Home Quote",
    bestFor: ["Home entrance upgrades", "Rental units and small offices", "Doors needing access-control review"],
    visuals: [
      {
        title: "Smart access upgrade",
        caption: "Door photos help confirm smart lock compatibility.",
        imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1400&q=80"
      },
      {
        title: "Modern living control",
        caption: "Smart-home planning works best when usage needs are clear.",
        imageUrl: "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=900&q=80"
      },
      {
        title: "Lock and hardware review",
        caption: "Door type, lock size, and installation condition affect quote direction.",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80"
      }
    ],
    quoteFactors: ["Door type and thickness", "Existing lock condition", "Installation and compatibility requirements"],
    timeline: "Smart-home advice usually starts with door photos, current lock details, and usage needs.",
    outcomes: ["Clear compatibility review", "Better door and control planning", "Simpler upgrade path for homes or offices"],
    deliverables: ["Door or control requirement review", "Recommended smart product direction", "Installation and compatibility notes"],
    relatedProductIds: ["smart-lock", "cabinet-board", "decor-board", "sanitary"],
    faqs: [
      {
        question: "What should I check before choosing a smart lock?",
        answer: "Confirm the door type, existing lock size, door thickness, and whether installation support is needed."
      },
      {
        question: "Can smart-home products be bundled with other work?",
        answer: "Yes. Smart access and controls can be quoted with furniture, doors, or renovation support."
      }
    ]
  }
};

export function getServiceDetail(serviceId: string) {
  return serviceDetails[serviceId];
}

export function getRelatedServiceProducts(serviceId: string) {
  const detail = getServiceDetail(serviceId);
  if (!detail) return [];

  return detail.relatedProductIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is (typeof products)[number] => Boolean(product));
}

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.id === slug);
}
