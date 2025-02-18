import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

interface ReelsCarouselProps {
  videos: {
    url: string;
    title: string;
    description: string;
    tags?: string[];
    duration: string;
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
    return ((index % totalVideos) + totalVideos) % totalVideos;
  };

  const handleVideoTransition = (newIndex: number, transitionDirection: number) => {
    if (isTransitioning) return;
    
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    setAutoPlay(false);
    
    setDirection(transitionDirection);
    setIsTransitioning(true);
    
    const nextIndex = getCircularIndex(newIndex);
    setCurrentIndex(nextIndex);

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
        await currentVideo.play();
        currentVideo.muted = false;
        setIsMuted(false);
      } else {
        currentVideo.muted = true;
        setIsMuted(true);
      }
    } catch (error) {
      console.error('Erro ao controlar áudio:', error);
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

  const toggleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  const getPositionClass = (index: number) => {
    const position = index - currentIndex;
    const normalizedPosition = position < -1 ? videos.length - 1 : position > 1 ? -(videos.length - 1) : position;

    return {
      className: `transition-all duration-700 ease-out relative ${
        normalizedPosition === 0
          ? 'w-full h-[calc(100vh-100px)] md:w-[800px] md:h-auto z-30 scale-100 opacity-100' // Tela cheia em mobile
          : normalizedPosition === -1 || normalizedPosition === (videos.length - 1)
          ? 'w-[25vw] md:w-[600px] z-20 scale-[0.85] opacity-60 -translate-x-1/4 hidden md:block'
          : normalizedPosition === 1 || normalizedPosition === -(videos.length - 1)
          ? 'w-[25vw] md:w-[600px] z-20 scale-[0.85] opacity-60 translate-x-1/4 hidden md:block'
          : 'hidden'
      } ${isTransitioning ? 'pointer-events-none' : ''}`,
      style: {
        transform: `
          perspective(1000px)
          rotateY(${normalizedPosition * (window.innerWidth < 768 ? 0 : 12)}deg)
          translateZ(${normalizedPosition === 0 ? '0' : '-100px'})
          translateX(${normalizedPosition * (window.innerWidth < 768 ? 0 : 4)}%)
        `,
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
            className="flex justify-center items-center min-h-screen md:min-h-0"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {videos.map((video, index) => {
              const { className, style } = getPositionClass(index);
              return (
                <div key={index} className={className} style={style}>
                  <div className="relative bg-black h-full">
                    <video
                      ref={el => videoRefs.current[index] = el}
                      className="w-full h-full object-cover"
                      playsInline
                      muted={index !== currentIndex || isMuted}
                      loop
                      autoPlay={index === currentIndex}
                      preload="auto"
                    >
                      <source src={video.url} type="video/mp4" />
                    </video>

                    {/* Overlay com informações */}
                    <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6">
                      {/* Cabeçalho */}
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                            {video.title}
                          </h3>
                          <p className="text-white/80 text-sm md:text-base">
                            {video.description}
                          </p>
                        </div>
                        
                        {index === currentIndex && (
                          <button
                            onClick={toggleMute}
                            className="p-3 rounded-full bg-black/50 text-white backdrop-blur-sm"
                            aria-label={isMuted ? "Ativar som" : "Desativar som"}
                          >
                            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                          </button>
                        )}
                      </div>

                      {/* Tags e duração */}
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {video.tags?.map((tag, i) => (
                          <span key={i} className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                            {tag}
                          </span>
                        ))}
                        <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm ml-auto">
                          {video.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Indicadores de navegação */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => handleVideoTransition(index, index > currentIndex ? 1 : -1)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === currentIndex 
                    ? 'w-8 bg-white' 
                    : 'w-1.5 bg-white/40'
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
