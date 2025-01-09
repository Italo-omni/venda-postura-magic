import { useNavigate } from "react-router-dom";
import { CheckoutForm } from "@/components/CheckoutForm";
import { useEffect } from "react";
import { trackEvent } from "@/utils/metaPixel";

const Checkout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ViewContent event for checkout page
    trackEvent('ViewContent', {
      content_name: 'Checkout - Almofada Ergonômica',
      content_type: 'checkout',
      content_ids: ['ALMOFADA001'],
      value: 197.00,
      currency: 'BRL'
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Finalizar Pedido
          </h1>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h2 className="font-semibold text-lg mb-2">Almofada Ergonômica Corretora de Postura</h2>
            <p className="text-gray-600 mb-2">✨ Produto Premium com Garantia de Satisfação</p>
            <p className="text-gray-600 mb-2">🚚 Entrega para Todo Brasil</p>
            <p className="text-gray-600 mb-2">⭐ Mais de 50.000 clientes satisfeitos</p>
            <p className="text-xl font-bold text-primary mt-2">R$ 197,00</p>
          </div>

          <CheckoutForm />
        </div>
      </div>
    </div>
  );
};

export default Checkout;