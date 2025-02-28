
import React, { forwardRef } from 'react';

interface VideoReelProps {
  url: string;
  title: string;
  description: string;
  tags?: string[];
  duration: string;
  isMuted: boolean;
  isActive: boolean;
  className: string;
  style: React.CSSProperties;
}

export const VideoReel = forwardRef<HTMLVideoElement, VideoReelProps>(
  ({ url, title, description, tags, duration, isMuted, isActive, className, style }, ref) => {
    return (
      <div className={className} style={style}>
        <div className="relative w-full h-full bg-black">
          <video
            ref={ref}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            muted={!isActive || isMuted}
            loop
            autoPlay={isActive}
            preload="auto"
          >
            <source src={url} type="video/mp4" />
          </video>

          {/* Gradiente de sobreposição para melhor legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

          {/* Overlay com informações */}
          <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6 z-10">
            {/* Cabeçalho */}
            <div className="flex justify-between items-start">
              <div className="max-w-[80%]">
                <h3 className="text-white text-xl md:text-2xl font-bold mb-2 drop-shadow-lg">
                  {title}
                </h3>
                <p className="text-white/90 text-sm md:text-base drop-shadow">
                  {description}
                </p>
              </div>
            </div>

            {/* Tags e duração */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {tags?.map((tag, i) => (
                <span key={i} className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm shadow-lg">
                  {tag}
                </span>
              ))}
              <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm ml-auto shadow-lg">
                {duration}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

VideoReel.displayName = 'VideoReel';
