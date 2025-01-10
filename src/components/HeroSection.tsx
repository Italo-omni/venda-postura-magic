import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-secondary py-8 md:py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col-reverse md:flex-row items-center gap-6 md:gap-8">
          <div className="flex-1 text-left w-full">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
              Elimine as Dores nas Costas em 30 Dias!
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-4">
              🌟 +50.000 brasileiros já conquistaram uma vida sem dor
            </p>
            <ul className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 md:mb-8 space-y-2">
              <li className="flex items-center gap-2">
                ✅ Alívio imediato
              </li>
              <li className="flex items-center gap-2">
                ✅ Tecnologia premium
              </li>
              <li className="flex items-center gap-2">
                ✅ Dinheiro de volta garantido
              </li>
              <li className="flex items-center gap-2">
                ✅ Frete Grátis
              </li>
            </ul>
            <button 
              onClick={() => navigate("/checkout")}
              className="w-full sm:w-auto cta-button inline-flex items-center justify-center gap-2">
              50% OFF - Compre Agora! <ArrowRight className="w-5 h-5" />
            </button>
            <p className="mt-4 text-xs sm:text-sm text-gray-600 font-medium">
              🔒 Compra Segura | ⚡ Envio Imediato
            </p>
          </div>
          <div className="flex-1 w-full">
            <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/wLv2QMC_GyQ?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&controls=0&showinfo=0&fs=0&iv_load_policy=3&autohide=1&cc_load_policy=0&playsinline=1" 
                allow="autoplay; encrypted-media"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};