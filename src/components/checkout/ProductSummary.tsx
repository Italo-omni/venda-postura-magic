import { Gallery } from "../Gallery";

export const ProductSummary = () => {
  return (
    <div className="bg-blue-50 p-6 rounded-lg mb-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <img 
            src="https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms178agnv19.webp"
            alt="Almofada Ergonômica"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="md:w-2/3">
          <h2 className="font-heading text-2xl font-bold mb-4">Almofada Ergonômica Corretora de Postura</h2>
          <div className="space-y-3">
            <p className="text-gray-600">✨ Produto Premium com Garantia de Satisfação</p>
            <p className="text-gray-600">🚚 Entrega Expressa para Todo Brasil</p>
            <p className="text-gray-600">⭐ Mais de 50.000 clientes satisfeitos</p>
            <p className="text-gray-600">✅ Material de alta qualidade e durabilidade</p>
            <p className="text-gray-600">✅ Garantia de 30 dias</p>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-primary">R$ 197,00</p>
            <p className="text-sm text-gray-500">ou 12x de R$ 16,42 sem juros</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Mais imagens do produto:</h3>
        <div className="grid grid-cols-4 gap-2">
          {[
            "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms178bv8b86.webp",
            "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms178d9sr2e.webp",
            "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms178923fbe.webp",
            "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms1787niz6b.webp"
          ].map((img, index) => (
            <img 
              key={index}
              src={img}
              alt={`Almofada Ergonômica - Imagem ${index + 1}`}
              className="w-full h-auto rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};