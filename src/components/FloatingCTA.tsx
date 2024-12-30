import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const FloatingCTA = () => {
  const navigate = useNavigate();

  return (
    <div className="floating-cta">
      <button
        id="comprar"
        onClick={() => navigate("/checkout")}
        className="cta-button inline-flex items-center gap-2"
      >
        <ShoppingCart className="w-5 h-5" />
        Comprar Agora por R$ 197,00
      </button>
    </div>
  );
};