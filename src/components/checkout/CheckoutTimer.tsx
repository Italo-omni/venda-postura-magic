
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";

export const CheckoutTimer = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos em segundos
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-red-50 border border-red-100 rounded-lg p-4 shadow-lg animate-pulse">
        <div className="flex items-center gap-2 text-red-600 font-semibold mb-2">
          <Clock className="w-5 h-5" />
          <span>Oferta por tempo limitado!</span>
        </div>
        <div className="text-2xl font-bold text-red-700">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>
        <p className="text-sm text-red-600 mt-1">
          Esta oferta expira em breve!
        </p>
      </div>
    </div>
  );
};
