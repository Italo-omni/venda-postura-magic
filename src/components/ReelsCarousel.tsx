import React, { useRef, useEffect } from 'react';

interface ReelsCarouselProps {
  videos: {
    id: string;
    title: string;
  }[];
}

export const ReelsCarousel = ({ videos }: ReelsCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollWidth = container.scrollWidth - container.clientWidth;
    let scrollPos = 0;
    let direction = 1;

    const animate = () => {
      if (!container) return;

      scrollPos += direction * 0.5; // Velocidade do scroll

      // Inverte a direção quando chega nas extremidades
      if (scrollPos >= scrollWidth) {
        direction = -1;
      } else if (scrollPos <= 0) {
        direction = 1;
      }

      container.scrollLeft = scrollPos;
      requestAnimationFrame(animate);
    };

    const animation = requestAnimationFrame(animate);

    // Pausa a animação quando o mouse está sobre o carrossel
    container.addEventListener('mouseenter', () => {
      cancelAnimationFrame(animation);
    });

    container.addEventListener('mouseleave', () => {
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
          Veja o ActiveFit™ em Ação
        </h2>
        
        <div 
          ref={containerRef}
          className="flex gap-4 overflow-x-hidden relative scroll-smooth"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {videos.map((video, index) => (
            <div 
              key={index}
              className="flex-none w-[300px] relative rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105"
            >
              <div className="aspect-[9/16]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=0&mute=1&rel=0&modestbranding=1&loop=1&controls=1`}
                  allow="autoplay; encrypted-media"
                  title={video.title}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-white font-semibold">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 