import { Truck, Package, Clock, Shield } from "lucide-react";

export const DeliveryInfo = () => {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">
          Informações de Entrega
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
            <Truck className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-bold mb-2">Frete Grátis</h3>
            <p className="text-gray-600">Para todo o Brasil</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
            <Package className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-bold mb-2">Envio Seguro</h3>
            <p className="text-gray-600">Embalagem discreta e protegida</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
            <Clock className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-bold mb-2">Entrega Rápida</h3>
            <p className="text-gray-600">3-7 dias úteis</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
            <Shield className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-bold mb-2">Garantia</h3>
            <p className="text-gray-600">30 dias de garantia</p>
          </div>
        </div>
      </div>
    </section>
  );
}; 