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

export default function Home() {
  return (
    <main className="bg-white text-[var(--text-primary)]">
      <HeroSection />
      <FeatureSection />
      <IntelligenceSection />
      <ProductShowcaseSection />
      <VideoSection />
      <IndustrySection />
      <StepSliderSection />
      <PricingSection />
      <SecuritySection />
      <CTASection />
      <Footer />
    </main>
  );
}
