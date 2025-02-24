import { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';

const recentSales = [
  { name: 'Maria S.', location: 'São Paulo, SP', time: '2 minutos' },
  { name: 'João P.', location: 'Rio de Janeiro, RJ', time: '5 minutos' },
  { name: 'Ana L.', location: 'Curitiba, PR', time: '8 minutos' },
  { name: 'Carlos M.', location: 'Salvador, BA', time: '12 minutos' },
  { name: 'Fernanda R.', location: 'Belo Horizonte, MG', time: '15 minutos' },
  { name: 'Pedro H.', location: 'Brasília, DF', time: '18 minutos' },
  { name: 'Juliana M.', location: 'Fortaleza, CE', time: '20 minutos' },
  { name: 'Roberto S.', location: 'Recife, PE', time: '22 minutos' },
  { name: 'Amanda C.', location: 'Porto Alegre, RS', time: '25 minutos' },
  { name: 'Lucas O.', location: 'Manaus, AM', time: '28 minutos' },
  { name: 'Beatriz L.', location: 'Florianópolis, SC', time: '30 minutos' },
  { name: 'Gabriel T.', location: 'Vitória, ES', time: '32 minutos' },
  { name: 'Carolina P.', location: 'Natal, RN', time: '35 minutos' },
  { name: 'Marcelo R.', location: 'João Pessoa, PB', time: '38 minutos' },
  { name: 'Isabela S.', location: 'Campo Grande, MS', time: '40 minutos' },
  { name: 'Thiago M.', location: 'Goiânia, GO', time: '42 minutos' },
  { name: 'Larissa C.', location: 'Belém, PA', time: '45 minutos' },
  { name: 'Ricardo N.', location: 'Maceió, AL', time: '48 minutos' },
  { name: 'Camila A.', location: 'São Luís, MA', time: '50 minutos' },
  { name: 'Felipe S.', location: 'Aracaju, SE', time: '52 minutos' }
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
      <div className="bg-black/90 backdrop-blur-lg text-white rounded-xl shadow-lg py-2.5 px-4 flex items-center gap-3">
        <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
          <ShoppingBag className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-medium">
            {sale.name} • {sale.location}
          </p>
          <p className="text-xs text-gray-400">
            comprou há {sale.time}
          </p>
        </div>
      </div>
    </div>
  );
}; 