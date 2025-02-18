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
          <div className="flex justify-center items-center perspective-1000">
            {videos.map((video, index) => {
              const position = index - currentIndex;
              return (
                <div 
                  key={index}
                  className={`transition-all duration-700 ease-out relative ${
                    position === 0
                      ? 'w-[85vw] md:w-[600px] z-20 scale-100 opacity-100'
                      : position === -1
                      ? 'hidden md:block md:w-[400px] z-10 scale-90 opacity-85 -translate-x-1/3'
                      : position === 1
                      ? 'hidden md:block md:w-[400px] z-10 scale-90 opacity-85 translate-x-1/3'
                      : 'hidden md:block md:w-[300px] z-0 scale-80 opacity-40'
                  } ${isTransitioning ? 'pointer-events-none' : ''}`}
                  style={{
                    transform: `perspective(1000px) 
                              rotateY(${position * 15}deg) 
                              translateZ(${position === 0 ? '0' : '-150px'})
                              translateX(${position * 5}%)`,
                    transition: 'all 0.7s cubic-bezier(0.4, 0.0, 0.2, 1)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="relative rounded-xl md:rounded-2xl bg-black overflow-hidden shadow-2xl">
                    <div className="w-full pb-[177.77%]" />
                    <video
                      ref={el => videoRefs.current[index] = el}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                        isTransitioning ? 'scale-110' : 'scale-100'
                      }`}
                      playsInline
                      muted={index !== currentIndex || isMuted}
                      loop
                      autoPlay={index === currentIndex}
                      preload="auto"
                    >
                      <source src={video.url} type="video/mp4" />
                    </video>

                    {/* Gradiente radiante para vídeos adjacentes */}
                    <div 
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        position === 0 
                          ? 'opacity-0' 
                          : position === -1 
                          ? 'opacity-60 bg-gradient-to-r from-black via-transparent to-transparent' 
                          : position === 1 
                          ? 'opacity-60 bg-gradient-to-l from-black via-transparent to-transparent'
                          : 'opacity-80 bg-black'
                      }`}
                    />

                    {/* Gradiente base para texto */}
                    <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 transition-opacity duration-700 ${
                      isTransitioning ? 'opacity-90' : 'opacity-70'
                    }`} />
                    
                    {position === 0 && (
                      <button
                        onClick={toggleMute}
                        className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300 z-30 transform hover:scale-110 hover:rotate-3"
                        aria-label={isMuted ? "Ativar som" : "Desativar som"}
                      >
                        {isMuted ? (
                          <VolumeX className="w-6 h-6" />
                        ) : (
                          <Volume2 className="w-6 h-6" />
                        )}
                      </button>
                    )}
                    
                    <div className={`absolute bottom-0 left-0 right-0 p-4 md:p-6 transform transition-all duration-700 ${
                      isTransitioning ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
                    }`}>
                      <h3 className="text-white font-semibold text-lg md:text-xl">{video.title}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Botões de navegação com efeito hover */}
          <button
            onClick={prevVideo}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 z-30 items-center justify-center hover:scale-110 hover:-translate-x-1"
            aria-label="Vídeo anterior"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={nextVideo}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 z-30 items-center justify-center hover:scale-110 hover:translate-x-1"
            aria-label="Próximo vídeo"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Indicadores com animação suave */}
          <div className="absolute -bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => handleVideoTransition(index)}
                className={`h-2 md:h-1.5 rounded-full transition-all duration-500 ${
                  index === currentIndex 
                    ? 'w-10 md:w-8 bg-white scale-110' 
                    : 'w-2 bg-white/40 hover:bg-white/60 hover:scale-105'
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