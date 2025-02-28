
import React from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

interface ReelControlsProps {
  currentIndex: number;
  totalVideos: number;
  isMuted: boolean;
  isTransitioning: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToggleMute: (e: React.MouseEvent) => void;
  onVideoSelect: (index: number, direction: number) => void;
}

export const ReelControls = ({
  currentIndex,
  totalVideos,
  isMuted,
  isTransitioning,
  onPrev,
  onNext,
  onToggleMute,
  onVideoSelect
}: ReelControlsProps) => {
  return (
    <>
      {/* Audio toggle button */}
      {isMuted ? (
        <button
          onClick={onToggleMute}
          className="p-3 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-all absolute top-4 right-4 z-30"
          aria-label="Ativar som"
        >
          <VolumeX className="w-6 h-6" />
        </button>
      ) : (
        <button
          onClick={onToggleMute}
          className="p-3 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-all absolute top-4 right-4 z-30"
          aria-label="Desativar som"
        >
          <Volume2 className="w-6 h-6" />
        </button>
      )}

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {Array.from({ length: totalVideos }).map((_, index) => (
          <button
            key={index}
            onClick={() => onVideoSelect(index, index > currentIndex ? 1 : -1)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentIndex 
                ? 'w-8 bg-white' 
                : 'w-1.5 bg-white/40'
            }`}
            aria-label={`Ir para vídeo ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
};
