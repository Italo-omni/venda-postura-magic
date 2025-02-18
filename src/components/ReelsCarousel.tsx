import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ReelsCarouselProps {
  videos: {
    url: string;
    title: string;
  }[];
}

export const ReelsCarousel = ({ videos }: ReelsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Função para ir para o próximo vídeo
  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  // Função para ir para o vídeo anterior
  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  // Efeito para controlar a reprodução automática e transição
  useEffect(() => {
    const interval = setInterval(nextVideo, 7000); // Muda a cada 7 segundos

    // Pausa todos os vídeos
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
          Veja o ActiveFit™ em Ação
        </h2>
        
        <div className="relative">
          <div 
            ref={containerRef}
            className="flex gap-4 overflow-hidden relative"
          >
            {videos.map((video, index) => (
              <div 
                key={index}
                className={`flex-none w-full md:w-[400px] transition-all duration-500 transform ${
                  index === currentIndex 
                    ? 'scale-100 opacity-100' 
                    : 'scale-95 opacity-40'
                }`}
                style={{
                  transform: `translateX(calc(-${currentIndex * 100}% + ${currentIndex * 1}rem))`
                }}
              >
                <div className="aspect-[9/16] relative rounded-2xl overflow-hidden">
                  <video
                    ref={el => videoRefs.current[index] = el}
                    className="absolute inset-0 w-full h-full object-cover"
                    playsInline
                    muted
                    loop
                    preload="auto"
                  >
                    <source src={video.url} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-lg">{video.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botões de navegação */}
          <button
            onClick={prevVideo}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors z-10"
            aria-label="Vídeo anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextVideo}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors z-10"
            aria-label="Próximo vídeo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicadores de progresso */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {videos.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-500 ${
                  index === currentIndex 
                    ? 'w-8 bg-white' 
                    : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 