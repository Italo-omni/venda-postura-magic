import { HeroSection } from "@/components/HeroSection";
import { Benefits } from "@/components/Benefits";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { ShippingCalculator } from "@/components/ShippingCalculator";
import { FloatingCTA } from "@/components/FloatingCTA";

const Index = () => {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <Benefits />
      <Gallery />
      <Testimonials />
      <ShippingCalculator />
      <FloatingCTA />
    </main>
  );
};

export default Index;