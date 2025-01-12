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
    <div
      className="floating-cta fixed bottom-0 left-0 right-0 flex justify-center items-center z-50"
      style={{
        pointerEvents: "none", // Evita clique fora do botão
      }}
    >
      <button
        id="comprar"
        onClick={handleClick}
        className="cta-button inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-all text-sm sm:text-base"
        style={{
          pointerEvents: "auto", // Permite clique no botão
        }}
      >
        <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
        Comprar Agora
      </button>
    </div>
  );
  
  
  
};
