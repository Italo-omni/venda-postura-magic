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
  const [direction, setDirection] = useState(0); // -1 para esquerda, 1 para direita
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const transitionTimeoutRef = useRef<NodeJS.Timeout>();

  // Adiciona handler para gestos touch
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // Sensibilidade do swipe

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextVideo();
      } else {
        prevVideo();
      }
    }
  };

  const getCircularIndex = (index: number) => {
    if (index < 0) return videos.length - 1;
    if (index >= videos.length) return 0;
    return index;
  };

  const handleVideoTransition = (newIndex: number, transitionDirection: number) => {
    if (isTransitioning) return;
    setDirection(transitionDirection);
    setIsTransitioning(true);
    setCurrentIndex(getCircularIndex(newIndex));

    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

  const nextVideo = () => {
    handleVideoTransition(currentIndex + 1, 1);
  };

  const prevVideo = () => {
    handleVideoTransition(currentIndex - 1, -1);
  };

  const toggleMute = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const currentVideo = videoRefs.current[currentIndex];
    if (!currentVideo) return;

    try {
      if (isMuted) {
        // Tenta reproduzir com áudio primeiro (necessário para iOS)
        await currentVideo.play();
        currentVideo.muted = false;
        setIsMuted(false);
      } else {
        currentVideo.muted = true;
        setIsMuted(true);
      }
    } catch (error) {
      console.error('Erro ao controlar áudio:', error);
      // Fallback: força mudo se houver erro
      currentVideo.muted = true;
      setIsMuted(true);
    }
  };

  useEffect(() => {
    const playCurrentVideo = async () => {
      try {
        const currentVideo = videoRefs.current[currentIndex];
        if (currentVideo) {
          // Mantém o estado do áudio ao trocar de vídeo
          currentVideo.muted = isMuted;
          await currentVideo.play();
        }
      } catch (error) {
        console.error('Erro ao reproduzir vídeo:', error);
        // Força mudo se houver erro de reprodução
        setIsMuted(true);
      }
    };

    // Pausa todos os vídeos e configura o atual
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

    // Limpa o intervalo anterior
    const interval = setInterval(nextVideo, 7000);
    return () => {
      clearInterval(interval);
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [currentIndex, isMuted]);

  const getPositionClass = (index: number) => {
    const position = index - currentIndex;
    const normalizedPosition = position < -1 ? videos.length - 1 : position > 1 ? -(videos.length - 1) : position;

    return {
      className: `transition-all duration-700 ease-out relative ${
        normalizedPosition === 0
          ? 'w-screen md:w-[800px] z-30 scale-100 opacity-100'
          : normalizedPosition === -1 || normalizedPosition === (videos.length - 1)
          ? 'w-[25vw] md:w-[600px] z-20 scale-[0.85] opacity-60 -translate-x-1/4 hidden md:block'
          : normalizedPosition === 1 || normalizedPosition === -(videos.length - 1)
          ? 'w-[25vw] md:w-[600px] z-20 scale-[0.85] opacity-60 translate-x-1/4 hidden md:block'
          : 'hidden md:block md:w-[500px] z-10 scale-[0.8] opacity-40'
      } ${isTransitioning ? 'pointer-events-none' : ''}`,
      style: {
        transform: `
          perspective(1000px)
          rotateY(${normalizedPosition * (window.innerWidth < 768 ? 0 : 12)}deg)
          translateZ(${normalizedPosition === 0 ? '0' : '-100px'})
          translateX(${normalizedPosition * (window.innerWidth < 768 ? 0 : 4)}%)
        `,
        transition: 'all 0.7s cubic-bezier(0.4, 0.0, 0.2, 1)',
        transformStyle: 'preserve-3d',
      }
    };
  };

  return (
    <section className="py-0 md:py-16 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-0 md:px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-4 md:mb-8 px-4">
          Veja o ActiveFit™ em Ação
        </h2>
        
        <div className="relative mx-auto" style={{ maxWidth: '100%' }}>
          <div 
            className="flex justify-center items-center perspective-1000 min-h-[calc(100vh-120px)] md:min-h-0"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {videos.map((video, index) => {
              const { className, style } = getPositionClass(index);
              return (
                <div key={index} className={className} style={style}>
                  <div className="relative bg-black overflow-hidden shadow-2xl h-full">
                    <div className="w-full pb-[177.77%] md:pb-[177.77%]" />
                    <video
                      ref={el => videoRefs.current[index] = el}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
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

                    <div 
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        index === currentIndex 
                          ? 'opacity-0' 
                          : 'opacity-80 md:opacity-60 bg-gradient-radial from-transparent to-black'
                      }`}
                    />

                    {index === currentIndex && (
                      <button
                        onClick={toggleMute}
                        className="absolute top-6 right-6 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 active:scale-95 transition-all duration-300 z-30 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
                        aria-label={isMuted ? "Ativar som" : "Desativar som"}
                      >
                        {isMuted ? (
                          <VolumeX className="w-6 h-6 md:w-7 md:h-7" />
                        ) : (
                          <Volume2 className="w-6 h-6 md:w-7 md:h-7" />
                        )}
                        <span className="sr-only">
                          {isMuted ? "Ativar som" : "Desativar som"}
                        </span>
                      </button>
                    )}
                    
                    <div className={`absolute bottom-0 left-0 right-0 p-6 md:p-8 transform transition-all duration-700 ${
                      isTransitioning ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
                    }`}>
                      <h3 className="text-white font-semibold text-xl md:text-2xl">{video.title}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Indicadores maiores e mais espaçados em mobile */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => handleVideoTransition(index, 0)}
                className={`h-2 md:h-2.5 rounded-full transition-all duration-500 ${
                  index === currentIndex 
                    ? 'w-10 md:w-12 bg-white scale-110' 
                    : 'w-2 md:w-2.5 bg-white/40 hover:bg-white/60 active:scale-105'
                }`}
                aria-label={`Ir para vídeo ${index + 1}`}
              />
            ))}
          </div>

          {/* Áreas de toque maiores para navegação em mobile */}
          <button
            onClick={prevVideo}
            className="md:hidden absolute left-0 top-0 bottom-0 w-1/3 z-20"
            aria-label="Vídeo anterior"
          />
          <button
            onClick={nextVideo}
            className="md:hidden absolute right-0 top-0 bottom-0 w-1/3 z-20"
            aria-label="Próximo vídeo"
          />
        </div>
      </div>
    </section>
  );
}; 