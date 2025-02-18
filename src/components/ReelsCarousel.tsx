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
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  useEffect(() => {
    // Tenta reproduzir o vídeo atual
    const playCurrentVideo = async () => {
      try {
        const currentVideo = videoRefs.current[currentIndex];
        if (currentVideo) {
          await currentVideo.play();
        }
      } catch (error) {
        console.error('Erro ao reproduzir vídeo:', error);
      }
    };

    // Pausa todos os vídeos exceto o atual
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          playCurrentVideo();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });

    const interval = setInterval(nextVideo, 7000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
          Veja o ActiveFit™ em Ação
        </h2>
        
        <div className="relative mx-auto max-w-md md:max-w-xl">
          <div className="relative overflow-hidden rounded-2xl">
            {videos.map((video, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-all duration-500 ${
                  index === currentIndex 
                    ? 'opacity-100 z-10 transform-none' 
                    : 'opacity-0 z-0 scale-95'
                }`}
              >
                <div className="aspect-[9/16] relative">
                  <video
                    ref={el => videoRefs.current[index] = el}
                    className="absolute inset-0 w-full h-full object-cover"
                    playsInline
                    muted
                    loop
                    autoPlay={index === currentIndex}
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
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors z-20"
            aria-label="Vídeo anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextVideo}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors z-20"
            aria-label="Próximo vídeo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicadores */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-white' 
                    : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Ir para vídeo ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 