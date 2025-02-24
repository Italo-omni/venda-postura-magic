import { HeroSection } from "@/components/HeroSection";
import { Benefits } from "@/components/Benefits";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { ShippingCalculator } from "@/components/ShippingCalculator";
import { RecentSales } from "@/components/RecentSales";
import { useEffect } from "react";
import { trackEvent } from "@/utils/metaPixel";

const Index = () => {
  useEffect(() => {
    // ViewContent event
    trackEvent('ViewContent', {
      content_name: 'Almofada Ergonômica Corretora de Postura',
      content_type: 'product',
      content_ids: ['ALMOFADA001'],
      value: 197.00,
      currency: 'BRL'
    });
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <Benefits />
      <Gallery />
      <Testimonials />
      <ShippingCalculator />
      {/* <RecentSales /> */}
    </main>
  );
};

export default Index;