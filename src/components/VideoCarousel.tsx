import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VideoCarouselProps {
  videos: {
    id: string;
    title: string;
  }[];
}

export const VideoCarousel = ({ videos }: VideoCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <div className="relative rounded-xl overflow-hidden shadow-2xl group">
      <div className="aspect-video">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videos[currentIndex].id}?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&controls=0`}
          allow="autoplay; encrypted-media"
          title={videos[currentIndex].title}
        />
      </div>

      {/* Navegação */}
      <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={prevVideo}
          className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          aria-label="Vídeo anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextVideo}
          className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          aria-label="Próximo vídeo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-white w-4' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Ir para vídeo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}; 