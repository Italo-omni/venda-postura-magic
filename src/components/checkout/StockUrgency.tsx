import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

export const StockUrgency = () => {
  const [stock, setStock] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setStock(prev => Math.max(5, prev - 1));
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-red-500" />
        <div>
          <p className="text-red-700 font-medium">Estoque baixo!</p>
          <p className="text-sm text-red-600">
            Apenas {stock} unidades disponíveis
          </p>
        </div>
      </div>
    </div>
  );
}; 