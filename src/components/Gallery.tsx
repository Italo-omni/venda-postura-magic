const images = [
  
  "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms178agnv19.webp",
  "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms178bv8b86.webp",
  "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms178d9sr2e.webp",
  "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms178923fbe.webp",
  "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms1787niz6b.webp",
  "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xojmw3hkj9fb.webp",
  "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xojmw3iz3pfd.webp",
  "https://down-br.img.susercontent.com/file/sg-11134201-7rfig-m3dxdqyiqs7idc.webp"
  
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