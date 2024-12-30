import { ShoppingCart } from "lucide-react";

export const FloatingCTA = () => {
  return (
    <div className="floating-cta">
      <button
        id="comprar"
        onClick={() => window.open("#", "_blank")}
        className="cta-button inline-flex items-center gap-2"
      >
        <ShoppingCart className="w-5 h-5" />
        Comprar Agora por R$ 197,00
      </button>
    </div>
  );
};