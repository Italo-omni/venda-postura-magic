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
  const [autoPlay, setAutoPlay] = useState(true);
  const [direction, setDirection] = useState(0); // -1 para esquerda, 1 para direita
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const transitionTimeoutRef = useRef<NodeJS.Timeout>();
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout>();

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
    const totalVideos = videos.length;
    // Garante que o índice sempre fique dentro do intervalo válido
    return ((index % totalVideos) + totalVideos) % totalVideos;
  };

  const handleVideoTransition = (newIndex: number, transitionDirection: number) => {
    if (isTransitioning) return;
    
    // Limpa o timeout de autoplay quando há interação manual
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    setAutoPlay(false);
    
    setDirection(transitionDirection);
    setIsTransitioning(true);
    
    const nextIndex = getCircularIndex(newIndex);
    setCurrentIndex(nextIndex);

    // Pré-carrega o próximo vídeo
    const nextVideo = videoRefs.current[nextIndex];
    if (nextVideo) {
      nextVideo.load();
    }

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
          currentVideo.muted = isMuted;
          await currentVideo.play();
          
          // Configura o próximo vídeo apenas se autoPlay estiver ativo
          if (autoPlay) {
            autoPlayTimeoutRef.current = setTimeout(() => {
              nextVideo();
            }, 7000);
          }
        }
      } catch (error) {
        console.error('Erro ao reproduzir vídeo:', error);
        setIsMuted(true);
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

    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [currentIndex, isMuted, autoPlay]);

  // Adiciona botão para controlar reprodução automática
  const toggleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  const getPositionClass = (index: number) => {
    const position = index - currentIndex;
    const totalVideos = videos.length;
    let normalizedPosition = position;

    // Ajusta a posição para criar o efeito de loop
    if (position < -(totalVideos - 1) / 2) normalizedPosition += totalVideos;
    if (position > totalVideos / 2) normalizedPosition -= totalVideos;

    return {
      className: `transition-all duration-700 ease-out relative ${
        normalizedPosition === 0
          ? 'w-[92vw] md:w-[800px] z-30 scale-100 opacity-100'
          : normalizedPosition === -1 || normalizedPosition === (totalVideos - 1)
          ? 'w-[80vw] md:w-[600px] z-20 scale-[0.92] opacity-75 -translate-x-1/4'
          : normalizedPosition === 1 || normalizedPosition === -(totalVideos - 1)
          ? 'w-[80vw] md:w-[600px] z-20 scale-[0.92] opacity-75 translate-x-1/4'
          : 'w-[70vw] md:w-[500px] z-10 scale-[0.85] opacity-50'
      } ${isTransitioning ? 'pointer-events-none' : ''}`,
      style: {
        transform: `
          perspective(1000px)
          rotateY(${normalizedPosition * (window.innerWidth < 768 ? 5 : 12)}deg)
          translateZ(${normalizedPosition === 0 ? '0' : '-50px'})
          translateX(${normalizedPosition * (window.innerWidth < 768 ? 2 : 4)}%)
        `,
        transition: 'all 0.7s cubic-bezier(0.4, 0.0, 0.2, 1)',
        transformStyle: 'preserve-3d',
      }
    };
  };

  return (
    <section className="py-0 md:py-16 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-0 md:px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-6 md:mb-8 px-4">
          Veja o ActiveFit™ em Ação
        </h2>
        
        <div className="relative mx-auto" style={{ maxWidth: '100%' }}>
          <div 
            className="flex justify-center items-center perspective-1000 min-h-[calc(100vh-160px)] md:min-h-0 py-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {videos.map((video, index) => {
              const { className, style } = getPositionClass(index);
              return (
                <div key={index} className={className} style={style}>
                  <div className="relative bg-black overflow-hidden rounded-[24px] shadow-2xl h-full border border-white/10">
                    <div className="w-full pb-[177.77%]" />
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

                    {/* Gradiente mais suave */}
                    <div 
                      className={`absolute inset-0 transition-opacity duration-700 rounded-[24px] ${
                        index === currentIndex 
                          ? 'opacity-0' 
                          : 'opacity-90 bg-gradient-to-b from-black/40 via-black/60 to-black/90'
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

          {/* Indicadores mais visíveis */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => handleVideoTransition(index, index > currentIndex ? 1 : -1)}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  index === currentIndex 
                    ? 'w-12 bg-white scale-110' 
                    : 'w-2.5 bg-white/40 hover:bg-white/60 active:scale-105'
                }`}
                aria-label={`Ir para vídeo ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Adiciona controles de reprodução automática */}
        <div className="absolute top-4 left-4 z-30">
          <button
            onClick={toggleAutoPlay}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300"
            aria-label={autoPlay ? "Pausar reprodução automática" : "Ativar reprodução automática"}
          >
            {autoPlay ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}; 