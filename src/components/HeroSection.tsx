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
            <div className="relative w-full">
              {/* Container do vídeo com máscara */}
              <div className="relative w-full pt-[56.25%]"> {/* Mantém aspect ratio 16:9 */}
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/j01yGLRxKNY?autoplay=1&mute=1&rel=0&modestbranding=1" 
                  frameBorder="0" 
                  allow="autoplay; encrypted-media" 
                  allowFullScreen
                />
                {/* Máscara para o nome do canal */}
                <div className="absolute top-0 left-0 w-32 h-8 bg-secondary z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};