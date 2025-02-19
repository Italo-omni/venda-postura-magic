
import { Gallery } from "../Gallery";
import { Shield, Truck, Clock, Star } from "lucide-react";

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
          <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-100">
            <div className="flex items-center gap-2 text-green-700">
              <Star className="w-5 h-5 fill-green-500" />
              <span className="font-medium">4.8/5</span>
              <span className="text-sm">(2.547 avaliações)</span>
            </div>
          </div>
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
            <p className="text-3xl font-bold text-primary">12x R$ 16,42</p>
            <p className="text-sm text-gray-500">ou R$ 197,00 à vista</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="flex items-start gap-2 p-3 bg-white rounded-lg border border-gray-100">
              <Shield className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="font-medium text-sm">Compra Segura</p>
                <p className="text-xs text-gray-500">Pagamento processado com criptografia</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 bg-white rounded-lg border border-gray-100">
              <Truck className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="font-medium text-sm">Envio Imediato</p>
                <p className="text-xs text-gray-500">Produto em estoque</p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-100">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <p className="text-sm text-orange-700">
                <span className="font-medium">Oferta por tempo limitado:</span> Últimas 7 unidades em estoque
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="font-semibold mb-4">Clientes Satisfeitos:</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms178bv8b86.webp",
            "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms178d9sr2e.webp",
            "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms178923fbe.webp",
            "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3xms1787niz6b.webp"
          ].map((img, index) => (
            <div key={index} className="relative group">
              <img 
                src={img}
                alt={`Almofada Ergonômica - Imagem ${index + 1}`}
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                <p className="text-white text-sm font-medium">Ver mais</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
        <h4 className="font-medium mb-3">Por que comprar conosco?</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm">Garantia de 30 dias</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            <span className="text-sm">+50 mil clientes satisfeitos</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-primary" />
            <span className="text-sm">Entrega para todo Brasil</span>
          </div>
        </div>
      </div>
    </div>
  );
};
