import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

interface ReelsCarouselProps {
  videos: {
    url: string;
    title: string;
  }[];
}

export const ReelsCarousel = ({ videos }: ReelsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const transitionTimeoutRef = useRef<NodeJS.Timeout>();

  const handleVideoTransition = (newIndex: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(newIndex);

    // Limpa o timeout anterior se existir
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    // Define um novo timeout para a transição
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Duração da transição
  };

  const nextVideo = () => {
    handleVideoTransition((currentIndex + 1) % videos.length);
  };

  const prevVideo = () => {
    handleVideoTransition((currentIndex - 1 + videos.length) % videos.length);
  };

  const toggleMute = () => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.muted = !currentVideo.muted;
      setIsMuted(currentVideo.muted);
    }
  };

  useEffect(() => {
    const playCurrentVideo = async () => {
      try {
        const currentVideo = videoRefs.current[currentIndex];
        if (currentVideo) {
          currentVideo.muted = isMuted;
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
          video.muted = true;
        }
      }
    });

    const interval = setInterval(nextVideo, 7000);
    return () => {
      clearInterval(interval);
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [currentIndex, isMuted]);

  return (
    <section className="py-8 md:py-16 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-2 md:px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-6 md:mb-8">
          Veja o ActiveFit™ em Ação
        </h2>
        
        <div className="relative mx-auto" style={{ maxWidth: '100%' }}>
          <div className="flex justify-center items-center">
            {videos.map((video, index) => {
              const position = index - currentIndex;
              return (
                <div 
                  key={index}
                  className={`transition-all duration-500 relative ${
                    position === 0
                      ? 'w-[85vw] md:w-[600px] z-20 scale-100 opacity-100'
                      : position === -1
                      ? 'hidden md:block md:w-[400px] z-10 scale-90 opacity-70 -translate-x-1/4'
                      : position === 1
                      ? 'hidden md:block md:w-[400px] z-10 scale-90 opacity-70 translate-x-1/4'
                      : 'hidden md:block md:w-[300px] z-0 scale-80 opacity-40'
                  } ${isTransitioning ? 'pointer-events-none' : ''}`}
                  style={{
                    transform: `perspective(1000px) rotateY(${position * 10}deg) translateZ(${position === 0 ? '0' : '-100px'})`,
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <div className="relative rounded-xl md:rounded-2xl bg-black overflow-hidden shadow-2xl">
                    <div className="w-full pb-[177.77%]" />
                    <video
                      ref={el => videoRefs.current[index] = el}
                      className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
                        isTransitioning ? 'scale-105' : 'scale-100'
                      }`}
                      playsInline
                      muted={index !== currentIndex || isMuted}
                      loop
                      autoPlay={index === currentIndex}
                      preload="auto"
                    >
                      <source src={video.url} type="video/mp4" />
                    </video>
                    <div className={`absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 transition-opacity duration-500 ${
                      isTransitioning ? 'opacity-80' : 'opacity-60'
                    }`} />
                    
                    {position === 0 && (
                      <button
                        onClick={toggleMute}
                        className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300 z-30 transform hover:scale-110"
                        aria-label={isMuted ? "Ativar som" : "Desativar som"}
                      >
                        {isMuted ? (
                          <VolumeX className="w-6 h-6" />
                        ) : (
                          <Volume2 className="w-6 h-6" />
                        )}
                      </button>
                    )}
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                      <h3 className="text-white font-semibold text-lg md:text-xl">{video.title}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Botões de navegação - Escondidos em mobile */}
          <button
            onClick={prevVideo}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors z-30 items-center justify-center"
            aria-label="Vídeo anterior"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={nextVideo}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors z-30 items-center justify-center"
            aria-label="Próximo vídeo"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Indicadores - Maiores em mobile */}
          <div className="absolute -bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 md:h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-10 md:w-8 bg-white' 
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