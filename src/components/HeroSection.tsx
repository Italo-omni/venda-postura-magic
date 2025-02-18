import { ArrowRight, ShieldCheck, Truck, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ReelsCarousel } from "./ReelsCarousel";

// Apenas um vídeo principal
const mainVideo = {
  id: "wLv2QMC_GyQ",
  title: "Como o ActiveFit™ funciona"
};

// Reels videos permanecem os mesmos
const reelsVideos = [
  {
    url: "https://firebasestorage.googleapis.com/v0/b/peca-ja-a8ba4.appspot.com/o/VoltaraTech%2FStories%20legenda%20acima.mp4?alt=media&token=644833ca-02aa-4d11-83cd-def651d1d056",
    title: "Depoimentos"
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/peca-ja-a8ba4.appspot.com/o/VoltaraTech%2Fsnapdouyin.app-hd-1736618376516.mp4?alt=media&token=12205df3-59f0-4364-b280-3894a403c38a",
    title: "Como Usar"
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/peca-ja-a8ba4.appspot.com/o/VoltaraTech%2Fsnapdouyin.app-hd-1736618626591.mp4?alt=media&token=47d12d78-fa8c-471b-8a4f-e01b9704156d",
    title: "Resultados Reais"
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/peca-ja-a8ba4.appspot.com/o/VoltaraTech%2FFeed2%201080.mp4?alt=media&token=1f40ed72-cc21-421f-b19e-6f7947fb2f10",
    title: "Benefícios"
  }
];

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
                Corretor Postural ActiveFit™
              </h1>

              <div className="bg-primary/5 p-4 rounded-xl mb-6">
                <p className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  12x de R$ 16,42
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-gray-500 line-through">De R$ 397,00</p>
                  <p className="text-gray-700">Por R$ 197,00 à vista</p>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  ou PIX com 5% de desconto: R$ 187,15
                </p>
              </div>
              
              <div className="text-lg md:text-xl text-gray-700 mb-6 space-y-2">
                <p className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span>
                  Entrega Expressa para Todo Brasil
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span>
                  Mais de 50.000 clientes satisfeitos
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span>
                  Disponível em 3 cores: Preto, Bege e Rosa
                </p>
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

              <button 
                onClick={() => navigate("/checkout")} 
                className="w-full sm:w-auto cta-button group text-lg"
              >
                Comprar Agora em 12x de R$ 16,42
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="flex-1 w-full">
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <div className="aspect-video">
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full" 
                    src={`https://www.youtube.com/embed/${mainVideo.id}?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&controls=0`}
                    allow="autoplay; encrypted-media"
                    title={mainVideo.title}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ReelsCarousel videos={reelsVideos} />
    </>
  );
};