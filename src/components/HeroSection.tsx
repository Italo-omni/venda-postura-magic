import { ArrowRight, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ReelsCarousel } from "./ReelsCarousel";
import { LiveActivity } from './LiveActivity';
import { FloatingCTA } from './FloatingCTA';
import { TrustBadges } from './hero/TrustBadges';
import { PriceDisplay } from './hero/PriceDisplay';
import { DeliveryFeatures } from './hero/DeliveryFeatures';
import { SupportContact } from './hero/SupportContact';
import { PurchaseGuarantee } from './hero/PurchaseGuarantee';
import { MainVideo } from './hero/MainVideo';

const mainVideo = {
  id: "PXPLbt7Q5yA",
  title: "Como o ActiveFit™ funciona"
};

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
              <TrustBadges />
              
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

              <PriceDisplay />
              
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

              <DeliveryFeatures />
              <SupportContact />

              <button 
                onClick={() => navigate("/checkout")} 
                className="w-full sm:w-auto cta-button group text-lg"
              >
                Comprar Agora em 12x de R$ 16,42
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <PurchaseGuarantee />
            </div>
            
            <div className="flex-1 w-full">
              <MainVideo videoId={mainVideo.id} title={mainVideo.title} />
            </div>
          </div>
        </div>
      </div>
      
      <ReelsCarousel videos={reelsVideos} />
      <FloatingCTA />
    </>
  );
};
