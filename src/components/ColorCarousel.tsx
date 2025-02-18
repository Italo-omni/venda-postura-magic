import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const colors = [
  {
    name: "Preto",
    image: "URL_DA_IMAGEM_PRETA",
    price: "R$ 197,00",
  },
  {
    name: "Bege",
    image: "URL_DA_IMAGEM_BEGE",
    price: "R$ 197,00",
  },
  {
    name: "Rosa",
    image: "URL_DA_IMAGEM_ROSA",
    price: "R$ 197,00",
  },
];

export const ColorCarousel = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-8">
          Escolha sua Cor Favorita
        </h2>
        
        <Carousel className="w-full max-w-xs mx-auto sm:max-w-2xl">
          <CarouselContent>
            {colors.map((color, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <div className="rounded-xl overflow-hidden border bg-white p-4">
                    <img
                      src={color.image}
                      alt={`Corretor Postural - ${color.name}`}
                      className="w-full h-auto rounded-lg"
                    />
                    <div className="mt-4 text-center">
                      <h3 className="font-semibold">{color.name}</h3>
                      <p className="text-primary font-bold">{color.price}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}; 