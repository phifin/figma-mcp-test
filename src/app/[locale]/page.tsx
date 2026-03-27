import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import CTASection from "@/components/sections/CTASection";
import FeatureSection from "@/components/sections/FeatureSection";
import HeroSection from "@/components/sections/HeroSection";
import IndustrySection from "@/components/sections/IndustrySection";
import IntelligenceSection from "@/components/sections/IntelligenceSection";
import PricingSection from "@/components/sections/PricingSection";
import ProductShowcaseSection from "@/components/sections/ProductShowcaseSection";
import SecuritySection from "@/components/sections/SecuritySection";
import StepSliderSection from "@/components/sections/StepSliderSection";
import VideoSection from "@/components/sections/VideoSection";
import { locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLocaleFromParam } from "@/i18n/routing";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = getLocaleFromParam(locale);
  const dictionary = await getDictionary(currentLocale);

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
  };
}

export default async function Home({ params }: LocalePageProps) {
  const { locale } = await params;
  const currentLocale = getLocaleFromParam(locale);
  const dictionary = await getDictionary(currentLocale);

  return (
    <main className="bg-white text-[var(--text-primary)]">
      <HeroSection locale={currentLocale} content={dictionary.hero} />
      <FeatureSection content={dictionary.feature} />
      <IntelligenceSection content={dictionary.intelligence} />
      <ProductShowcaseSection content={dictionary.productShowcase} />
      <VideoSection />
      <IndustrySection content={dictionary.industries} />
      <StepSliderSection content={dictionary.steps} />
      <PricingSection content={dictionary.pricing} />
      <SecuritySection content={dictionary.security} />
      <CTASection content={dictionary.cta} />
      <Footer content={dictionary.footer} />
    </main>
  );
}
