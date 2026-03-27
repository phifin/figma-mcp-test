import type { Locale } from "@/i18n/config";

export type NavItem = {
  label: string;
};

export type TextPair = {
  title: string;
  description: string;
};

export type PricingPlan = {
  name: string;
  description: string;
  price: string;
  unit: string;
  suffix: string;
  cta: string;
  featured?: boolean;
};

export type StepItem = {
  number: string;
  title: string;
  description: string;
};

export type FooterGroup = {
  title: string;
  links: string[];
};

export type Dictionary = {
  locale: Locale;
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    heroWords: [string, string];
    titleSuffix: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    nav: NavItem[];
    login: string;
    startNow: string;
    switchLocaleLabel: string;
  };
  feature: {
    eyebrow: string;
    title: string;
    description: string;
    learnMore: string;
    items: TextPair[];
  };
  intelligence: {
    eyebrow: string;
    title: string;
    description: string;
    imageAlt: string;
    items: TextPair[];
  };
  productShowcase: {
    title: string;
    description: string;
    viewDetails: string;
    previousLabel: string;
    nextLabel: string;
    slides: TextPair[];
  };
  industries: {
    eyebrow: string;
    title: string;
    items: TextPair[];
  };
  steps: {
    title: string;
    description: string;
    previousLabel: string;
    nextLabel: string;
    items: StepItem[];
  };
  pricing: {
    eyebrow: string;
    title: string;
    featuredBadge: string;
    plans: PricingPlan[];
  };
  security: {
    title: string;
    description: string;
  };
  cta: {
    title: string;
    primaryCta: string;
    secondaryCta: string;
  };
  footer: {
    companyName: string;
    address: string;
    contact: string;
    groups: FooterGroup[];
    legalLinks: string[];
  };
};
