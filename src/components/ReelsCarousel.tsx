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
    <section className="py-16 bg-gray-900 overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
          Veja o ActiveFit™ em Ação
        </h2>
        
        <div className="relative mx-auto" style={{ maxWidth: '1200px' }}>
          <div className="flex justify-center items-center gap-4">
            {videos.map((video, index) => {
              const position = index - currentIndex;
              return (
                <div 
                  key={index}
                  className={`transition-all duration-500 relative ${
                    position === 0
                      ? 'w-[400px] z-20 scale-100 opacity-100'
                      : position === -1 || position === 1
                      ? 'w-[300px] z-10 scale-90 opacity-70'
                      : 'w-[200px] z-0 scale-80 opacity-40'
                  }`}
                  style={{
                    transform: `translateX(${position === -1 ? '-25%' : position === 1 ? '25%' : '0%'})`,
                  }}
                >
                  <div className="relative rounded-2xl bg-black overflow-hidden">
                    <div className="w-full pb-[177.77%]" /> {/* Aspect ratio 9:16 */}
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
              );
            })}
          </div>

          {/* Botões de navegação */}
          <button
            onClick={prevVideo}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors z-30"
            aria-label="Vídeo anterior"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={nextVideo}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors z-30"
            aria-label="Próximo vídeo"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Indicadores */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
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