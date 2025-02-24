import { useEffect, useState } from 'react';

export const LiveActivity = () => {
  const [viewers, setViewers] = useState(0);
  
  useEffect(() => {
    // Simula número de visualizadores entre 20-45
    setViewers(Math.floor(Math.random() * 25) + 20);
    
    const interval = setInterval(() => {
      setViewers(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(20, Math.min(45, prev + change));
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-2 flex items-center gap-2 animate-pulse">
      <div className="w-2 h-2 bg-red-500 rounded-full" />
      <span className="text-sm text-red-700">
        {viewers} pessoas estão vendo este produto agora
      </span>
    </div>
  );
}; 