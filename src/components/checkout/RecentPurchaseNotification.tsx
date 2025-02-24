import { useEffect, useState } from 'react';
import { ShoppingBag, X } from 'lucide-react';

const recentPurchases = [
  { name: 'Maria S.', city: 'São Paulo', state: 'SP', timeAgo: '2 minutos', quantity: 2 },
  { name: 'João P.', city: 'Rio de Janeiro', state: 'RJ', timeAgo: '4 minutos', quantity: 1 },
  { name: 'Ana L.', city: 'Curitiba', state: 'PR', timeAgo: '7 minutos', quantity: 3 },
  { name: 'Carlos M.', city: 'Salvador', state: 'BA', timeAgo: '9 minutos', quantity: 1 },
  { name: 'Fernanda R.', city: 'Belo Horizonte', state: 'MG', timeAgo: '11 minutos', quantity: 2 },
  { name: 'Pedro H.', city: 'Brasília', state: 'DF', timeAgo: '13 minutos', quantity: 1 },
  { name: 'Juliana M.', city: 'Fortaleza', state: 'CE', timeAgo: '15 minutos', quantity: 2 },
  { name: 'Roberto S.', city: 'Recife', state: 'PE', timeAgo: '18 minutos', quantity: 1 },
  { name: 'Amanda C.', city: 'Porto Alegre', state: 'RS', timeAgo: '20 minutos', quantity: 3 },
  { name: 'Lucas O.', city: 'Manaus', state: 'AM', timeAgo: '22 minutos', quantity: 1 },
  { name: 'Beatriz L.', city: 'Florianópolis', state: 'SC', timeAgo: '25 minutos', quantity: 2 },
  { name: 'Gabriel T.', city: 'Vitória', state: 'ES', timeAgo: '27 minutos', quantity: 1 },
  { name: 'Carolina P.', city: 'Natal', state: 'RN', timeAgo: '30 minutos', quantity: 2 },
  { name: 'Marcelo R.', city: 'João Pessoa', state: 'PB', timeAgo: '32 minutos', quantity: 1 },
  { name: 'Isabela S.', city: 'Campo Grande', state: 'MS', timeAgo: '35 minutos', quantity: 2 },
  { name: 'Thiago M.', city: 'Teresina', state: 'PI', timeAgo: '38 minutos', quantity: 1 },
  { name: 'Larissa C.', city: 'Goiânia', state: 'GO', timeAgo: '40 minutos', quantity: 3 },
  { name: 'Ricardo N.', city: 'Belém', state: 'PA', timeAgo: '42 minutos', quantity: 1 },
  { name: 'Camila A.', city: 'Maceió', state: 'AL', timeAgo: '45 minutos', quantity: 2 },
  { name: 'Felipe S.', city: 'São Luís', state: 'MA', timeAgo: '48 minutos', quantity: 1 },
  { name: 'Mariana B.', city: 'Aracaju', state: 'SE', timeAgo: '50 minutos', quantity: 2 },
  { name: 'Daniel R.', city: 'Cuiabá', state: 'MT', timeAgo: '52 minutos', quantity: 1 },
  { name: 'Patrícia M.', city: 'Porto Velho', state: 'RO', timeAgo: '55 minutos', quantity: 2 },
  { name: 'Henrique L.', city: 'Rio Branco', state: 'AC', timeAgo: '58 minutos', quantity: 1 },
  { name: 'Renata S.', city: 'Macapá', state: 'AP', timeAgo: '1 hora', quantity: 2 },
  { name: 'Bruno C.', city: 'Boa Vista', state: 'RR', timeAgo: '1 hora', quantity: 1 },
  { name: 'Vanessa M.', city: 'Palmas', state: 'TO', timeAgo: '1 hora', quantity: 2 },
  { name: 'Leonardo R.', city: 'Joinville', state: 'SC', timeAgo: '1 hora', quantity: 1 },
  { name: 'Débora A.', city: 'Ribeirão Preto', state: 'SP', timeAgo: '1 hora', quantity: 3 },
  { name: 'Gustavo P.', city: 'Uberlândia', state: 'MG', timeAgo: '1 hora', quantity: 1 },
  { name: 'Tatiana S.', city: 'Londrina', state: 'PR', timeAgo: '1 hora', quantity: 2 },
  { name: 'Rafael M.', city: 'Niterói', state: 'RJ', timeAgo: '1 hora', quantity: 1 },
  { name: 'Eduarda L.', city: 'Santos', state: 'SP', timeAgo: '2 horas', quantity: 2 },
  { name: 'Alexandre C.', city: 'Vila Velha', state: 'ES', timeAgo: '2 horas', quantity: 1 },
  { name: 'Bianca R.', city: 'Campinas', state: 'SP', timeAgo: '2 horas', quantity: 2 },
  { name: 'Diego S.', city: 'São Bernardo', state: 'SP', timeAgo: '2 horas', quantity: 1 },
  { name: 'Natália M.', city: 'Osasco', state: 'SP', timeAgo: '2 horas', quantity: 3 },
  { name: 'Victor H.', city: 'Guarulhos', state: 'SP', timeAgo: '2 horas', quantity: 1 },
  { name: 'Letícia B.', city: 'Sorocaba', state: 'SP', timeAgo: '2 horas', quantity: 2 },
  { name: 'Marcos V.', city: 'Juiz de Fora', state: 'MG', timeAgo: '3 horas', quantity: 1 }
];

export const RecentPurchaseNotification = () => {
  const [currentPurchase, setCurrentPurchase] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Intervalo entre notificações: 2 a 4 minutos
    const getRandomInterval = () => Math.floor(Math.random() * (240000 - 120000) + 120000);
    
    // Duração da notificação: 6 a 10 segundos
    const getRandomDuration = () => Math.floor(Math.random() * (10000 - 6000) + 6000);
    
    // Delay inicial: 15 a 45 segundos
    const getInitialDelay = () => Math.floor(Math.random() * (45000 - 15000) + 15000);
    
    const getRandomPurchase = () => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * recentPurchases.length);
      } while (newIndex === currentPurchase);
      return newIndex;
    };

    const showNotification = () => {
      if (Math.random() < 0.4 && !isDismissed) {
        setIsVisible(true);
        setCurrentPurchase(getRandomPurchase());
        
        setTimeout(() => {
          setIsVisible(false);
        }, getRandomDuration());
      }
      
      setTimeout(showNotification, getRandomInterval());
    };

    const timeout = setTimeout(showNotification, getInitialDelay());

    return () => clearTimeout(timeout);
  }, [currentPurchase, isDismissed]);

  const purchase = recentPurchases[currentPurchase];

  if (isDismissed) return null;

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 max-w-sm w-full mx-4 transform transition-all duration-300 z-50 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="bg-black/90 backdrop-blur-lg text-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex items-start p-4">
          {/* App Icon */}
          <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>

          {/* Content */}
          <div className="ml-4 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-sm">VoltaraTech</h3>
                <p className="text-xs text-gray-300 mt-0.5">agora mesmo</p>
              </div>
              <button 
                onClick={() => setIsDismissed(true)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="mt-1 text-sm">
              {purchase.name} de {purchase.city}/{purchase.state} acabou de comprar {purchase.quantity} {purchase.quantity > 1 ? 'unidades' : 'unidade'}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-primary/20">
          <div className="h-full bg-primary origin-left animate-shrink" />
        </div>
      </div>
    </div>
  );
}; 