
import { Shield, Award, ThumbsUp } from "lucide-react";

export const TrustBadges = () => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
        <Shield className="w-4 h-4" />
        <span className="text-sm font-semibold">Garantia de 30 dias</span>
      </div>
      <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
        <Award className="w-4 h-4" />
        <span className="text-sm font-semibold">Mais Vendido</span>
      </div>
      <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
        <ThumbsUp className="w-4 h-4" />
        <span className="text-sm font-semibold">50mil+ clientes</span>
      </div>
    </div>
  );
};
