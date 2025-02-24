import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { trackEvent } from "@/utils/metaPixel";

export const FloatingCTA = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    trackEvent('AddToCart', {
      content_name: 'Almofada Ergonômica Corretora de Postura',
      content_type: 'product',
      content_ids: ['ALMOFADA001'],
      value: 197.00,
      currency: 'BRL'
    });
    
    // InitiateCheckout event
    trackEvent('InitiateCheckout', {
      content_name: 'Almofada Ergonômica Corretora de Postura',
      content_ids: ['ALMOFADA001'],
      value: 197.00,
      currency: 'BRL'
    });
    
    navigate("/checkout");
  };

  return (
    <div className="floating-cta fixed bottom-4 right-4 z-50">
      <button
        id="comprar"
        onClick={handleClick}
        className="cta-button inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out"
      >
        <ShoppingCart className="w-6 h-6" />
        Comprar Agora
      </button>
    </div>
  );
};