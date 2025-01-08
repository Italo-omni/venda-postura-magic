import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-secondary py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-left">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Transforme sua Postura e Viva sem Dores
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              A almofada ergonômica que o Brasil ama, ideal para escritório, casa ou viagens.
              Suporte perfeito para quadril e lombar.
            </p>
            <button 
              onClick={() => navigate("/checkout")}
              className="cta-button inline-flex items-center gap-2">
              Peça Agora e Transforme Sua Postura! <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1">
            <img 
              src="https://down-br.img.susercontent.com/file/sg-11134201-7rfig-m3dxdqyiqs7idc.webp"
              alt="Almofada Ergonômica"
              className="rounded-lg shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};