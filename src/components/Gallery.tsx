import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
/*
const images = [
  "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms178agnv19.webp",
  "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms178bv8b86.webp",
  "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms178d9sr2e.webp",
  "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms178923fbe.webp",
  "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms1787niz6b.webp",
  "https://down-br.img.susercontent.com/file/sg-11134201-7rfig-m3dxdqyiqs7idc.webp",
  "https://ae-pic-a1.aliexpress-media.com/kf/S671649c8778f4ca3857e75e53ff2d418p.jpg_960x960q75.jpg_.avif",
  "https://ae-pic-a1.aliexpress-media.com/kf/Sd61262ef2ba747f58258fcfe25b40965N.jpg_960x960q75.jpg_.avif",
  "https://ae-pic-a1.aliexpress-media.com/kf/S2a2bd90baeda4ffd9f9e69adbbe98254f.png_960x960.png_.avif",
  "https://ae-pic-a1.aliexpress-media.com/kf/S3135926ec955494295f3c9ed97f4f4f1n.png_960x960.png_.avif",
  "https://ae-pic-a1.aliexpress-media.com/kf/S1f7158a0ed7a44a093320de440fabca3K.jpg_960x960q75.jpg_.avif",
  "https://ae-pic-a1.aliexpress-media.com/kf/S356676af4f26488dbee1e4753762a20f3.jpg_960x960q75.jpg_.avif"
];*/

const images = [
  "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms178923fbe.webp",
  "https://ae-pic-a1.aliexpress-media.com/kf/S2a2bd90baeda4ffd9f9e69adbbe98254f.png_960x960.png_.avif",
  "https://ae-pic-a1.aliexpress-media.com/kf/S3135926ec955494295f3c9ed97f4f4f1n.png_960x960.png_.avif",
  "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms178d9sr2e.webp",
  "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms1787niz6b.webp",
];

export const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-12 md:py-20 px-0 md:px-4 bg-secondary overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 px-4">
          Conheça Cada Detalhe
        </h2>
        
        <div className="relative">
          <Swiper
            modules={[Autoplay, EffectCoverflow, Navigation, Pagination]}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            initialSlide={2}
            loop={true}
            coverflowEffect={{
              rotate: 5,
              stretch: 0,
              depth: 150,
              modifier: 2,
              slideShadows: false,
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
              dynamicMainBullets: 3,
            }}
            navigation={{
              enabled: true,
              hideOnClick: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="!overflow-visible py-12 px-4"
            style={{
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-color': '#fff',
              '--swiper-navigation-size': '32px',
            } as React.CSSProperties}
          >
            {images.map((image, index) => (
              <SwiperSlide
                key={index}
                className="w-[280px] sm:w-[350px] md:w-[500px] transition-all duration-500"
                style={{
                  opacity: activeIndex === index ? '1' : '0.5',
                  transform: `scale(${activeIndex === index ? '1.05' : '0.85'})`,
                  filter: activeIndex === index ? 'brightness(1)' : 'brightness(0.7)',
                }}
              >
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-black">
                    <div className="aspect-[4/3]">
                      <img
                        src={image}
                        alt={`Almofada Ergonômica - Imagem ${index + 1}`}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Gradiente overlay sempre presente mas mais forte no hover */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-300"
                    />
                    
                    {/* Borda brilhante no hover */}
                    <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/20 transition-all duration-300" />
                    
                    {/* Número da imagem com efeito de glassmorphism */}
                    <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-medium text-white border border-white/20 shadow-lg transform group-hover:scale-110 transition-all duration-300">
                      {index + 1}/{images.length}
                    </div>

                    {/* Indicador de zoom em mobile */}
                    <div className="absolute top-4 right-4 md:hidden">
                      <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Reflexo melhorado */}
                  <div 
                    className="absolute -bottom-12 left-1/2 right-0 h-12 w-[90%] -translate-x-1/2 bg-gradient-to-b from-black/30 to-transparent transform scale-y-[-1] blur-md opacity-40 rounded-full"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Decoração de fundo animada */}
          <div className="absolute -inset-4 bg-gradient-radial from-white/10 to-transparent -z-10 blur-3xl animate-pulse" />
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 -z-10 blur-2xl animate-gradient" />
        </div>

        {/* Indicador de interação */}
        <div className="text-center mt-8 text-sm text-gray-400 hidden md:block">
          <span className="inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            Arraste para navegar ou clique para ampliar
          </span>
        </div>
      </div>
    </section>
  );
};
