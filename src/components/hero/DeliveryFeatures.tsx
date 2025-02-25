
import { Truck, Clock } from "lucide-react";

export const DeliveryFeatures = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
      <div className="flex items-center gap-3 text-gray-700">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
          <Truck className="w-4 h-4 text-green-600" />
        </div>
        <span>Frete Grátis</span>
      </div>
      <div className="flex items-center gap-3 text-gray-700">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <Clock className="w-4 h-4 text-primary" />
        </div>
        <span>Envio em 24h</span>
      </div>
    </div>
  );
};
