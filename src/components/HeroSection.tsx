import { ArrowRight, ShieldCheck, Truck, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
export const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="relative bg-gradient-to-b from-primary/5 via-white to-white py-8 md:py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col-reverse md:flex-row items-center gap-6 md:gap-12">
          <div className="flex-1 text-left w-full">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 animate-fade-in">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm font-semibold">Garantia de 30 dias + Frete Grátis</span>
            </div>
            
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Corretor Postural ActiveFit™ <br />
              <span className="text-primary">Por Apenas R$ 197,00</span>
            </h1>
            
            <div className="text-lg md:text-xl text-gray-700 mb-6 space-y-2">
              <p>✓ Ou 12x de R$ 16,42 sem juros</p>
              <p>✓ Entrega Expressa para Todo Brasil</p>
              <p>✓ Mais de 50.000 clientes satisfeitos</p>
              <p>✓ Disponível em 3 cores: Preto, Bege e Rosa</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 text-gray-700">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Truck className="w-4 h-4 text-green-600" />
                </div>
                <span>Frete Grátis</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <span>Envio em 24h</span>
              </div>
            </div>

            <button onClick={() => navigate("/checkout")} className="w-full sm:w-auto cta-button group">
              Comprar Agora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="flex-1 w-full">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <div className="aspect-video">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full" 
                  src="https://www.youtube.com/embed/NOVO_ID_DO_VIDEO?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&controls=0"
                  allow="autoplay; encrypted-media">
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};