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
          <iframe width="560" height="315" src="https://www.youtube.com/embed/j01yGLRxKNY?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=j01yGLRxKNY&controls=0&showinfo=0&fs=0&iv_load_policy=3&autohide=1&cc_load_policy=0&playsinline=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

          </div>
        </div>
      </div>
    </div>
  );
};