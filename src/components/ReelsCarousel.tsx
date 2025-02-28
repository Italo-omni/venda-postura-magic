
import React from 'react';
import { VideoReel } from './reels/VideoReel';
import { ReelControls } from './reels/ReelControls';
import { useReelCarousel } from './reels/useReelCarousel';

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
  const {
    currentIndex,
    isMuted,
    isTransitioning,
    videoRefs,
    nextVideo,
    prevVideo,
    toggleMute,
    getPositionClass,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleVideoTransition
  } = useReelCarousel(videos);

  return (
    <section className="py-0 md:py-16 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-0 md:px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-4 md:mb-8 px-4">
          Veja o ActiveFit™ em Ação
        </h2>
        
        <div className="relative mx-auto" style={{ maxWidth: '100%' }}>
          <div 
            className="flex justify-center items-center h-screen md:h-[80vh]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {videos.map((video, index) => {
              const { className, style } = getPositionClass(index);
              return (
                <VideoReel
                  key={index}
                  ref={el => videoRefs.current[index] = el}
                  url={video.url}
                  title={video.title}
                  description={video.description}
                  tags={video.tags}
                  duration={video.duration}
                  isMuted={isMuted}
                  isActive={index === currentIndex}
                  className={className}
                  style={style}
                />
              );
            })}
          </div>

          <ReelControls
            currentIndex={currentIndex}
            totalVideos={videos.length}
            isMuted={isMuted}
            isTransitioning={isTransitioning}
            onPrev={prevVideo}
            onNext={nextVideo}
            onToggleMute={toggleMute}
            onVideoSelect={handleVideoTransition}
          />
        </div>
      </div>
    </section>
  );
};
