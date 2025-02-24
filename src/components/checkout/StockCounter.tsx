import { useEffect, useState } from 'react';

export const StockCounter = () => {
  const [stock, setStock] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setStock((prev) => {
        if (prev <= 5) return prev;
        return prev - 1;
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-50 border border-red-100 rounded-md p-3 mb-4">
      <div className="flex items-center gap-2">
        <svg
          className="w-5 h-5 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-sm text-red-700 font-medium">
          Apenas <span className="font-bold">{stock} unidades</span> em estoque!
        </p>
      </div>
    </div>
  );
}; 