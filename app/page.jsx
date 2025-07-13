import { HeroSection } from "@/components/ui/hero-section";
import { FeaturesSection } from "@/components/ui/features-section";
import { PricingSection } from "@/components/ui/pricing-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
    </main>
  );
}
