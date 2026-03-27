import type { Dictionary } from "@/i18n/types";

const en = {
  locale: "en",
  metadata: {
    title: "Unipay",
    description:
      "Payment and business operations in one unified platform.",
  },
  hero: {
    eyebrow: "• Point of Sale & Operations •",
    heroWords: ["Selling", "Payments"],
    titleSuffix: "made smarter with Unipay",
    description:
      "UniPay embeds AI directly into selling, payments, and operations to help Vietnamese businesses run more efficiently every day on a single platform.",
    primaryCta: "Start with UniPay",
    secondaryCta: "Contact sales",
    nav: [
      { label: "Unipay Solutions" },
      { label: "Industry Solutions" },
      { label: "Devices" },
      { label: "About Us" },
    ],
    login: "Log in",
    startNow: "Get started",
    switchLocaleLabel: "Switch language",
  },
  feature: {
    eyebrow: "Point of Sale & Operations",
    title: "Everything you need to run operations, connected in one platform.",
    description:
      "Manage sales, payments, customers, and reporting in one unified, streamlined interface.",
    learnMore: "Learn more",
    items: [
      {
        title: "Accept payments",
        description:
          "Sell in-store or online with a flexible POS platform that supports wallets, cards, QR, and bank transfer with strong security.",
      },
      {
        title: "Smart inventory operations",
        description:
          "Track inventory, process orders, and assign staff in real time.",
      },
      {
        title: "Omnichannel selling",
        description:
          "Sync orders from your website, marketplaces, and in-store POS so you can sell everywhere and manage in one place.",
      },
      {
        title: "Business performance tracking",
        description:
          "Revenue, cost, and staff performance reports help you make faster decisions.",
      },
      {
        title: "Connected business apps",
        description:
          "Integrate accounting, marketing, CRM, and shipping tools to extend operations without disrupting current workflows.",
      },
    ],
  },
  intelligence: {
    eyebrow: "UniPay Intelligence",
    title: "Run your business with data",
    description:
      "From sales and inventory to invoicing and multi-location operations, deeply integrated AI helps businesses make sharper decisions every day.",
    imageAlt: "Business data",
    items: [
      {
        title: "Smart Analytics / Business Intelligence",
        description:
          "Turn operational data into real-time insights, alerts, and action recommendations.",
      },
      {
        title: "Demand & inventory forecasting",
        description:
          "Plan purchasing proactively, reduce overstock, and avoid stockouts during peak hours.",
      },
      {
        title: "Tax, invoicing & compliance",
        description:
          "Automate invoicing workflows and standardize operations in line with current regulations.",
      },
      {
        title: "Vietnamese AI assistant",
        description:
          "Ask questions in Vietnamese to get instant reports, operational recommendations, and key metrics.",
      },
    ],
  },
  productShowcase: {
    title: "Built to last, crafted with precision",
    description:
      "Minimal hardware and premium materials designed for precision in every interaction.",
    viewDetails: "View details",
    previousLabel: "Previous product",
    nextLabel: "Next product",
    slides: [
      {
        title: "Handheld POS",
        description:
          "Compact, flexible, and highly mobile so staff can take orders and payments right at the table.",
      },
      {
        title: "All-in-One dual-screen POS",
        description:
          "A modern checkout design with dual high-resolution displays integrated into one clean device.",
      },
      {
        title: "Self-service kiosk",
        description:
          "Let customers place orders and pay on their own, reducing pressure on the counter during rush hours.",
      },
      {
        title: "QR Display - Soundbox Aisino Q190",
        description:
          "A clear QR display and loud payment confirmation help sellers verify incoming funds instantly with confidence.",
      },
      {
        title: "Kitchen display",
        description:
          "Digitize kitchen operations to speed up order preparation and reduce service errors.",
      },
    ],
  },
  industries: {
    eyebrow: "Built for every industry",
    title: "One platform tailored to many industries",
    items: [
      {
        title: "Retail",
        description:
          "Manage sales, inventory, loyalty, and customer care on a single platform.",
      },
      {
        title: "F&B",
        description:
          "From ordering and payment to kitchen operations, serve faster during peak hours.",
      },
      {
        title: "Education & Training",
        description:
          "Manage classes, students, and tuition payments more intelligently to reduce operational burden.",
      },
      {
        title: "Hotels & Hospitality",
        description:
          "From booking and check-in to online payments and PMS, all in one seamless operational flow.",
      },
    ],
  },
  steps: {
    title: "Choose the best way to get started for your business",
    description:
      "From a single store to a multi-location chain, UniPay helps you start quickly, deploy simply, and scale as your business grows.",
    previousLabel: "Previous step",
    nextLabel: "Next step",
    items: [
      {
        number: "1.",
        title: "Choose the right model",
        description:
          "Select the software and device setup that best fits your scale and industry.",
      },
      {
        number: "2.",
        title: "Set up the system",
        description:
          "Connect software, hardware, and payment methods for your point of sale.",
      },
      {
        number: "3.",
        title: "Start operating",
        description:
          "Launch your store with sales, management, and reporting on a single platform.",
      },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Plans built for businesses",
    featuredBadge: "MOST POPULAR",
    plans: [
      {
        name: "Starter",
        description:
          "For new stores or small points of sale that need to launch quickly with core sales features.",
        price: "0",
        unit: "VND/month",
        suffix: "per location",
        cta: "Start with Starter",
      },
      {
        name: "Pro",
        description:
          "Ideal for growing businesses that need inventory, loyalty, and multi-touchpoint operations.",
        price: "1.2M",
        unit: "VND/month",
        suffix: "per location",
        cta: "Choose Pro",
        featured: true,
      },
      {
        name: "Enterprise",
        description:
          "For chains, large brands, or businesses that need deep integrations, industry-specific customization, and dedicated rollout support.",
        price: "4.8M",
        unit: "VND/month",
        suffix: "per location",
        cta: "Choose Enterprise",
      },
    ],
  },
  security: {
    title: "Bank-grade security",
    description:
      "PCI DSS and ISO certifications help ensure UniPay infrastructure keeps data and payments secure, transparent, and available 24/7 on cloud infrastructure.",
  },
  cta: {
    title: "Ready with UniPay.",
    primaryCta: "Start with UniPay",
    secondaryCta: "Contact sales",
  },
  footer: {
    companyName: "UNIPAY PAYMENT SOLUTIONS JOINT STOCK COMPANY",
    address:
      "2nd Floor, Saigon Paragon Building, 03 Nguyen Luong Bang Street, Tan My Ward, Ho Chi Minh City, Vietnam",
    contact: "contact@unipay.net.vn · 02873096667",
    groups: [
      {
        title: "Unipay Solutions",
        links: [
          "Payment solutions",
          "Business management solutions",
          "Payment device solutions",
        ],
      },
      {
        title: "Industry Solutions",
        links: ["F&B", "Retail", "Services", "Education"],
      },
      {
        title: "Devices",
        links: [
          "Smart handheld POS",
          "Duo Screen POS",
          "QR display device",
          "Soundbox",
        ],
      },
      {
        title: "Company",
        links: ["About us", "Contact"],
      },
    ],
    legalLinks: [
      "© Unipay Ltd 2025",
      "Terms & Conditions",
      "Privacy Policy",
      "Cookies Policy",
    ],
  },
} satisfies Dictionary;

export default en;

