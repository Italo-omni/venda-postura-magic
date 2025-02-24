import { useEffect, useState } from 'react';
import { ShoppingBag, X } from 'lucide-react';

const products = [
  'Almofada Ergonômica',
  'Suporte para Notebook',
  'Mouse Pad Ergonômico',
  'Apoio para Pés',
  'Suporte para Monitor',
  'Teclado Ergonômico',
  'Cadeira Home Office',
  'Suporte para Tablet',
  'Kit Ergonômico Completo',
  'Apoio para Punho',
  'Mesa Ajustável',
  'Luminária de Mesa LED',
];

const cities = [
  { city: 'São Paulo', state: 'SP' },
  { city: 'Rio de Janeiro', state: 'RJ' },
  { city: 'Belo Horizonte', state: 'MG' },
  { city: 'Salvador', state: 'BA' },
  { city: 'Brasília', state: 'DF' },
  { city: 'Curitiba', state: 'PR' },
  { city: 'Fortaleza', state: 'CE' },
  { city: 'Recife', state: 'PE' },
  { city: 'Porto Alegre', state: 'RS' },
  { city: 'Manaus', state: 'AM' },
  { city: 'Florianópolis', state: 'SC' },
  { city: 'Vitória', state: 'ES' },
  { city: 'Goiânia', state: 'GO' },
  { city: 'Belém', state: 'PA' },
  { city: 'Campinas', state: 'SP' },
];

const firstNames = [
  'Maria', 'João', 'Ana', 'Pedro', 'Julia', 'Lucas', 'Beatriz', 'Carlos',
  'Laura', 'Paulo', 'Isabella', 'Gabriel', 'Mariana', 'Rafael', 'Camila',
  'Bruno', 'Amanda', 'Felipe', 'Larissa', 'Thiago', 'Fernanda', 'Diego',
  'Letícia', 'Gustavo', 'Carolina', 'Ricardo', 'Daniela', 'André', 'Patricia'
];

const lastNames = [
  'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves',
  'Lima', 'Pereira', 'Costa', 'Carvalho', 'Gomes', 'Martins', 'Araújo',
  'Melo', 'Barbosa', 'Cardoso', 'Ribeiro', 'Mendes', 'Dias', 'Cruz',
  'Nascimento', 'Andrade', 'Moreira', 'Nunes', 'Marques', 'Machado', 'Pinto'
];

const times = [
  '2 minutos', '5 minutos', '8 minutos', '10 minutos', '15 minutos',
  '20 minutos', '25 minutos', '30 minutos', 'alguns minutos',
  'poucos minutos', '1 hora', '2 horas'
];

// Gera 120 vendas aleatórias
const generateSales = () => {
  const sales = [];
  for (let i = 0; i < 120; i++) {
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const initial = lastName.charAt(0);
    
    sales.push({
      name: `${firstName} ${initial}.`,
      city: randomCity.city,
      state: randomCity.state,
      time: times[Math.floor(Math.random() * times.length)],
      product: products[Math.floor(Math.random() * products.length)]
    });
  }
  return sales;
};

const sales = generateSales();

export const SalesNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSale, setCurrentSale] = useState(0);

  useEffect(() => {
    const showNotification = () => {
      // Escolhe uma venda aleatória ao invés de sequencial
      const randomIndex = Math.floor(Math.random() * sales.length);
      setCurrentSale(randomIndex);
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    // Mostra a primeira notificação após 3 segundos
    const initialTimeout = setTimeout(showNotification, 3000);

    // Configura o intervalo para mostrar notificações a cada 15 segundos
    const interval = setInterval(showNotification, 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const sale = sales[currentSale];

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-sm transform transition-all duration-500 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              {sale.name} de {sale.city}/{sale.state}
            </p>
            <p className="text-sm text-gray-500">
              Comprou {sale.product} há {sale.time}
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 text-gray-400 hover:text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}; 