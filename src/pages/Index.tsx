import { HeroSection } from "@/components/HeroSection";
import { Benefits } from "@/components/Benefits";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { ShippingCalculator } from "@/components/ShippingCalculator";
import { RecentSales } from "@/components/RecentSales";
import { useEffect } from "react";
import { trackEvent } from "@/utils/metaPixel";
import { ShoppingBag } from "lucide-react";

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

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <a
          href="/checkout"
          className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full shadow-lg transform transition-transform hover:scale-105 flex items-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" />
          Comprar Agora
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm ml-2">
            R$ 197,00
          </span>
        </a>
      </div>
    </main>
  );
};

export default Index;