import { useEffect, useState } from 'react';

const recentPurchases = [
  { name: 'Maria S.', city: 'São Paulo', state: 'SP', timeAgo: '2 minutos' },
  { name: 'João P.', city: 'Rio de Janeiro', state: 'RJ', timeAgo: '5 minutos' },
  { name: 'Ana L.', city: 'Curitiba', state: 'PR', timeAgo: '8 minutos' },
  { name: 'Carlos M.', city: 'Salvador', state: 'BA', timeAgo: '12 minutos' },
];

export const RecentPurchaseNotification = () => {
  const [currentPurchase, setCurrentPurchase] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showNotification = () => {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentPurchase((prev) => (prev + 1) % recentPurchases.length);
        }, 300);
      }, 4000);
    };

    const interval = setInterval(showNotification, 8000);
    showNotification();

    return () => clearInterval(interval);
  }, []);

  const purchase = recentPurchases[currentPurchase];

  return (
    <div
      className={`fixed bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 transition-all duration-300 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-6 h-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm">
            <span className="font-medium">{purchase.name}</span> de{' '}
            {purchase.city}/{purchase.state}
          </p>
          <p className="text-xs text-gray-500">
            Comprou há {purchase.timeAgo}
          </p>
        </div>
      </div>
    </div>
  );
}; 