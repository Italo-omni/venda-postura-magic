const images = [
  "https://down-br.img.susercontent.com/file/sg-11134201-7rfig-m3dxdqyiqs7idc.webp",
  "https://down-br.img.susercontent.com/file/sg-11134201-7rfgy-m3dxdgc6a942d8.webp",
  "https://down-br.img.susercontent.com/file/sg-11134201-7rfg4-m3dxdi9jgqsi4c.webp",
  "https://down-br.img.susercontent.com/file/sg-11134201-7rffq-m3dxdk1wuktj8d.webp",
  "https://down-br.img.susercontent.com/file/sg-11134201-7rffh-m3dxdm2bwm6m19.webp",
  "https://down-br.img.susercontent.com/file/sg-11134201-7rfgv-m3dxdnco0r5419.webp",
  "https://down-br.img.susercontent.com/file/sg-11134201-7rffg-m3dxdoh6dixzf1.webp",
  "https://down-br.img.susercontent.com/file/sg-11134201-7rff5-m3dxdt4hkopz12.webp"
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