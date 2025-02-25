
import { Shield, Award } from "lucide-react";

export const PurchaseGuarantee = () => {
  return (
    <div className="mt-8 bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="font-semibold text-lg mb-4">Compra 100% Segura</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-start gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium text-sm">Garantia de 30 dias</p>
            <p className="text-xs text-gray-600">Devolução garantida</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Award className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium text-sm">Produto Original</p>
            <p className="text-xs text-gray-600">Qualidade garantida</p>
          </div>
        </div>
      </div>
    </div>
  );
};
