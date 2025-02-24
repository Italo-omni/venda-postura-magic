import { ArrowRight, ShieldCheck, Truck, Clock, Phone, Shield, Award, ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ReelsCarousel } from "./ReelsCarousel";
import { LiveActivity } from './LiveActivity';

// Apenas um vídeo principal
const mainVideo = {
  id: "PXPLbt7Q5yA",
  title: "Como o ActiveFit™ funciona"
};

// Reels videos permanecem os mesmos
const reelsVideos = [
  {
    url: "https://firebasestorage.googleapis.com/v0/b/peca-ja-a8ba4.appspot.com/o/VoltaraTech%2Fsnapdouyin.app-hd-1736618626591.mp4?alt=media&token=47d12d78-fa8c-471b-8a4f-e01b9704156d",
    title: "Depoimentos Reais",
    thumbnail: "https://firebasestorage.googleapis.com/v0/b/peca-ja-a8ba4.appspot.com/o/thumbnails%2Fdepoimentos.jpg?alt=media",
    duration: "0:45",
    aspectRatio: "9:16",
    description: "Veja como o ActiveFit™ mudou a vida de muitas pessoas",
    previewImage: "https://down-br.img.susercontent.com/file/sg-11134201-7rfig-m3dxdqyiqs7idc.webp",
    tags: ["Depoimentos", "Resultados", "Clientes Satisfeitos"]
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/peca-ja-a8ba4.appspot.com/o/VoltaraTech%2Fsnapdouyin.app-hd-1736618376516.mp4?alt=media&token=12205df3-59f0-4364-b280-3894a403c38a",
    title: "Guia de Uso",
    thumbnail: "https://firebasestorage.googleapis.com/v0/b/peca-ja-a8ba4.appspot.com/o/thumbnails%2Fcomo_usar.jpg?alt=media",
    duration: "0:30",
    aspectRatio: "9:16",
    description: "Aprenda a usar corretamente",
    previewImage: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms178d9sr2e.webp",
    tags: ["Tutorial", "Passo a Passo", "Dicas"]
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/peca-ja-a8ba4.appspot.com/o/VoltaraTech%2Fsnapdouyin.app-hd-1736619151195.mp4?alt=media&token=c2678058-adcf-43a4-9317-1a84e6cdd7fe",
    title: "Demonstração do produto",
    thumbnail: "https://firebasestorage.googleapis.com/v0/b/peca-ja-a8ba4.appspot.com/o/thumbnails%2Fresultados.jpg?alt=media",
    duration: "0:35",
    aspectRatio: "9:16",
    description: "Transformações reais de nossos clientes",
    previewImage: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms1787niz6b.webp",
    tags: ["Resultados", "Transformação", "Antes e Depois"]
  }
].map(video => ({
  ...video,
  // Configurações otimizadas para mobile
  playbackOptions: {
    autoplay: true,
    muted: true,
    loop: true,
    playsInline: true,
    preload: "auto",
    controls: false,
  },
  // Configurações de qualidade e performance
  videoOptions: {
    quality: "720p",
    bufferSize: "large",
    optimizeForMobile: true,
    loadingPriority: "high",
  },
  // Configurações de UI
  uiOptions: {
    showControls: true,
    showProgress: true,
    enableFullscreen: true,
    swipeToNavigate: true,
    doubleTapToSeek: true,
    tapToPlayPause: true,
  }
}));

export const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Logo flutuante com animação */}
      <div className="fixed top-3 left-3 z-50 animate-fade-in">
        <h1 className="text-xs font-sans font-bold text-white bg-black/90 px-2.5 py-1 rounded-full shadow-md hover:bg-black transition-colors duration-300">
          VoltaraTech
        </h1>
      </div>

      <div className="relative bg-gradient-to-b from-primary/5 via-white to-white py-8 md:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col-reverse md:flex-row items-center gap-6 md:gap-12">
            <div className="flex-1 text-left w-full">
              {/* Badges de confiança */}
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-semibold">Garantia de 30 dias</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
                  <Award className="w-4 h-4" />
                  <span className="text-sm font-semibold">Mais Vendido</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">50mil+ clientes</span>
                </div>
              </div>

              {/* Live Activity */}
              <div className="mb-6">
                <LiveActivity />
              </div>

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
                  Entrega Expressa para Todo o Mundo
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

              <div className="flex items-center gap-3 text-gray-700 mb-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <a 
                  href="https://wa.me/5527992758442" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-green-600 hover:text-green-700"
                >
                  Suporte via WhatsApp
                </a>
              </div>

              <button 
                onClick={() => navigate("/checkout")} 
                className="w-full sm:w-auto cta-button group text-lg"
              >
                Comprar Agora em 12x de R$ 16,42
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Adicionar seção de garantias */}
              <div className="mt-8 bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-lg mb-4">Compra 100% Segura</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Garantia de 30 dias</p>
                      <p className="text-xs text-gray-600">Devolução garantida</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Produto Original</p>
                      <p className="text-xs text-gray-600">Qualidade garantida</p>
                    </div>
                  </div>
                </div>
              </div>
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
