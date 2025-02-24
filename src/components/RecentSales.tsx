import { useEffect, useState } from 'react';

const recentSales = [
  { name: 'Maria S.', location: 'São Paulo, SP', time: '2 minutos atrás', quantity: 1 },
  { name: 'João P.', location: 'Rio de Janeiro, RJ', time: '5 minutos atrás', quantity: 2 },
  { name: 'Ana L.', location: 'Curitiba, PR', time: '8 minutos atrás', quantity: 1 },
  { name: 'Carlos M.', location: 'Salvador, BA', time: '12 minutos atrás', quantity: 3 },
];

export const RecentSales = () => {
  const [currentSale, setCurrentSale] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showNotification = () => {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentSale((prev) => (prev + 1) % recentSales.length);
        }, 300);
      }, 4000);
    };

    const interval = setInterval(showNotification, 10000);
    showNotification();

    return () => clearInterval(interval);
  }, []);

  const sale = recentSales[currentSale];

  return (
    <div
      className={`fixed bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 transition-all duration-300 transform z-50 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-green-600 text-sm font-medium">{sale.quantity}x</span>
        </div>
        <div>
          <p className="text-sm">
            <span className="font-medium">{sale.name}</span> de {sale.location}
          </p>
          <p className="text-xs text-gray-500">
            Comprou {sale.quantity} {sale.quantity > 1 ? 'unidades' : 'unidade'} {sale.time}
          </p>
        </div>
      </div>
    </div>
  );
}; 