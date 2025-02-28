
import { useState, useRef, useEffect } from 'react';

interface ReelVideo {
  url: string;
  title: string;
  description: string;
  tags?: string[];
  duration: string;
}

export const useReelCarousel = (videos: ReelVideo[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [direction, setDirection] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const transitionTimeoutRef = useRef<NodeJS.Timeout>();
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout>();

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

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

  const toggleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  const getPositionClass = (index: number) => {
    const position = index - currentIndex;
    const normalizedPosition = position < -1 ? videos.length - 1 : position > 1 ? -(videos.length - 1) : position;

    return {
      className: `transition-all duration-700 ease-out relative ${
        normalizedPosition === 0
          ? 'w-full h-[100vh] md:h-[80vh] z-30 scale-100 opacity-100' 
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
        `
      }
    };
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
  }, [currentIndex, isMuted, autoPlay, videos.length]);

  return {
    currentIndex,
    isMuted,
    isTransitioning,
    autoPlay,
    direction,
    videoRefs,
    nextVideo,
    prevVideo,
    toggleMute,
    toggleAutoPlay,
    getPositionClass,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleVideoTransition
  };
};
