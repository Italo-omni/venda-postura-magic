
import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const [direction, setDirection] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const transitionTimeoutRef = useRef<NodeJS.Timeout>();
  const isMobile = useIsMobile();

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
    const threshold = 50;

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

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const getPositionClass = (index: number) => {
    const position = index - currentIndex;
    const normalizedPosition = position < -1 ? videos.length - 1 : position > 1 ? -(videos.length - 1) : position;

    // Aumentando o tamanho base dos vídeos
    const baseWidth = isMobile ? '95vw' : '1000px';
    const sideWidth = isMobile ? '90vw' : '800px';
    const farWidth = isMobile ? '85vw' : '700px';

    return {
      className: `transition-all duration-700 ease-out relative ${
        normalizedPosition === 0
          ? `w-[${baseWidth}] z-30 scale-100 opacity-100`
          : normalizedPosition === -1 || normalizedPosition === (videos.length - 1)
          ? `w-[${sideWidth}] z-20 scale-[0.9] opacity-80 -translate-x-1/4`
          : normalizedPosition === 1 || normalizedPosition === -(videos.length - 1)
          ? `w-[${sideWidth}] z-20 scale-[0.9] opacity-80 translate-x-1/4`
          : `w-[${farWidth}] z-10 scale-[0.8] opacity-60`
      } ${isTransitioning ? 'pointer-events-none' : ''}`,
      style: {
        transform: `
          perspective(1000px)
          rotateY(${normalizedPosition * (isMobile ? 5 : 12)}deg)
          translateZ(${normalizedPosition === 0 ? '0' : '-100px'})
          translateX(${normalizedPosition * (isMobile ? 1 : 4)}%)
        `,
        transition: 'all 0.7s cubic-bezier(0.4, 0.0, 0.2, 1)',
        transformStyle: 'preserve-3d' as const,
        width: normalizedPosition === 0 ? baseWidth : 
               (normalizedPosition === -1 || normalizedPosition === 1) ? sideWidth : farWidth
      }
    };
  };

  return (
    <section className="py-4 md:py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-0 md:px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 text-center mb-4 md:mb-8 px-4">
          Veja o ActiveFit™ em Ação
        </h2>
        
        <div className="relative mx-auto" style={{ maxWidth: '100%' }}>
          <div 
            className="flex justify-center items-center perspective-1000 min-h-[800px] md:min-h-[1000px]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {videos.map((video, index) => {
              const { className, style } = getPositionClass(index);
              return (
                <div key={index} className={className} style={style}>
                  <div className="relative rounded-lg md:rounded-2xl bg-black overflow-hidden shadow-2xl">
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

                    <div 
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        index === currentIndex 
                          ? 'opacity-0' 
                          : 'opacity-70 md:opacity-60 bg-gradient-radial from-transparent to-black/90'
                      }`}
                    />

                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 transition-opacity duration-700" />
                    
                    {index === currentIndex && (
                      <button
                        onClick={toggleMute}
                        className="absolute top-3 right-3 md:top-6 md:right-6 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 active:scale-95 transition-all duration-300 z-30 transform hover:scale-110"
                        aria-label={isMuted ? "Ativar som" : "Desativar som"}
                      >
                        {isMuted ? (
                          <VolumeX className="w-6 h-6 md:w-8 md:h-8" />
                        ) : (
                          <Volume2 className="w-6 h-6 md:w-8 md:h-8" />
                        )}
                      </button>
                    )}
                    
                    <div className={`absolute bottom-0 left-0 right-0 p-6 md:p-8 transform transition-all duration-700 ${
                      isTransitioning ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
                    }`}>
                      <h3 className="text-white font-semibold text-lg md:text-2xl">{video.title}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Indicadores móveis melhorados */}
          <div className="absolute -bottom-4 md:-bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-30">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => handleVideoTransition(index, 0)}
                className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${
                  index === currentIndex 
                    ? 'w-8 md:w-10 bg-primary scale-110' 
                    : 'w-1.5 md:w-2 bg-primary/40 hover:bg-primary/60 active:scale-105'
                }`}
                aria-label={`Ir para vídeo ${index + 1}`}
              />
            ))}
          </div>

          {/* Navegação por touch melhorada */}
          <button
            onClick={prevVideo}
            className="absolute left-0 top-0 bottom-0 w-1/4 z-20 md:hidden"
            aria-label="Vídeo anterior"
          />
          <button
            onClick={nextVideo}
            className="absolute right-0 top-0 bottom-0 w-1/4 z-20 md:hidden"
            aria-label="Próximo vídeo"
          />
        </div>
      </div>
    </section>
  );
};
