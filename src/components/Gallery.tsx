const images = [
  
  "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms178agnv19.webp",
  "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms178bv8b86.webp",
  "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms178d9sr2e.webp",
  "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms178923fbe.webp",
  "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms1787niz6b.webp",
  "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xojmw3iz3pfd.webp",
  "https://down-br.img.susercontent.com/file/sg-11134201-7rfig-m3dxdqyiqs7idc.webp",
  "https://ae-pic-a1.aliexpress-media.com/kf/S671649c8778f4ca3857e75e53ff2d418p.jpg_960x960q75.jpg_.avif",
  "https://ae-pic-a1.aliexpress-media.com/kf/Sd61262ef2ba747f58258fcfe25b40965N.jpg_960x960q75.jpg_.avif",
  "https://ae-pic-a1.aliexpress-media.com/kf/S2a2bd90baeda4ffd9f9e69adbbe98254f.png_960x960.png_.avif",
  "https://ae-pic-a1.aliexpress-media.com/kf/S3135926ec955494295f3c9ed97f4f4f1n.png_960x960.png_.avif",
  "https://ae-pic-a1.aliexpress-media.com/kf/S1f7158a0ed7a44a093320de440fabca3K.jpg_960x960q75.jpg_.avif",
  "https://ae-pic-a1.aliexpress-media.com/kf/S356676af4f26488dbee1e4753762a20f3.jpg_960x960q75.jpg_.avif"
  
  ];
  
  

export const Gallery = () => {
  return (
    <section className="py-20 px-4 bg-secondary">
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
          Conheça Cada Detalhe
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="aspect-square overflow-hidden rounded-lg">
              <img 
                src={image} 
                alt={`Almofada Ergonômica - Imagem ${index + 1}`}
                className="gallery-image"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};