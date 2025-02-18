import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

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
];

export const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 px-4 bg-secondary overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
          Conheça Cada Detalhe
        </h2>
        
        <div className="relative">
          <Swiper
            modules={[Autoplay, EffectCoverflow, Navigation, Pagination]}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full py-12 px-4"
            style={{
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-color': '#fff',
            } as React.CSSProperties}
          >
            {images.map((image, index) => (
              <SwiperSlide
                key={index}
                className="w-[300px] md:w-[500px] transition-all duration-300"
                style={{
                  opacity: activeIndex === index ? '1' : '0.4',
                  transform: `scale(${activeIndex === index ? '1' : '0.85'})`,
                }}
              >
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <div className="aspect-[4/3]">
                      <img
                        src={image}
                        alt={`Almofada Ergonômica - Imagem ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Gradiente overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Número da imagem */}
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-900">
                      {index + 1}/{images.length}
                    </div>
                  </div>

                  {/* Reflexo embaixo da imagem */}
                  <div className="absolute -bottom-12 left-0 right-0 h-12 bg-gradient-to-b from-black/20 to-transparent transform scale-y-[-1] blur-sm opacity-50" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Decoração de fundo */}
          <div className="absolute -inset-4 bg-gradient-radial from-white/5 to-transparent -z-10 blur-3xl" />
        </div>

        {/* Indicador de zoom */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Passe o mouse sobre as imagens para ampliar
        </div>
      </div>
    </section>
  );
};
