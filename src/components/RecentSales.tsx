import { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';

const recentSales = [
  { name: 'Maria S.', location: 'São Paulo, SP', time: '2 minutos' },
  { name: 'João P.', location: 'Rio de Janeiro, RJ', time: '5 minutos' },
  { name: 'Ana L.', location: 'Curitiba, PR', time: '8 minutos' },
  { name: 'Carlos M.', location: 'Salvador, BA', time: '12 minutos' },
  { name: 'Fernanda R.', location: 'Belo Horizonte, MG', time: '15 minutos' },
  { name: 'Pedro H.', location: 'Brasília, DF', time: '18 minutos' },
];

export const RecentSales = () => {
  const [currentSale, setCurrentSale] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Intervalo entre notificações: 8 a 12 segundos
    const interval = Math.floor(Math.random() * (12000 - 8000) + 8000);
    
    // Duração da notificação: 4 segundos
    const duration = 4000;
    
    const timer = setInterval(() => {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        setCurrentSale((prev) => (prev + 1) % recentSales.length);
      }, duration);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const sale = recentSales[currentSale];

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 transform transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="bg-white rounded-full shadow-lg border border-gray-100 py-2 px-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-sm">
            <span className="font-medium">{sale.name}</span> de {sale.location}
          </p>
          <p className="text-xs text-gray-500">
            há {sale.time}
          </p>
        </div>
      </div>
    </div>
  );
}; 