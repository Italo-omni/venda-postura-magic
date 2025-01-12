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
    <div className="floating-cta">
      <button
        id="comprar"
        onClick={handleClick}
        className="cta-button inline-flex items-center gap-2"
      >
        <ShoppingCart className="w-5 h-5" />
        Comprar Agora por R$ 197,00
      </button>
    </div>
  );
};