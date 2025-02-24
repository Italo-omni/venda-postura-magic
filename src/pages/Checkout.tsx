
import { useNavigate } from "react-router-dom";
import { CheckoutForm } from "@/components/CheckoutForm";
import { useEffect } from "react";
import { trackEvent } from "@/utils/metaPixel";
import { CheckoutTimer } from "@/components/checkout/CheckoutTimer";

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

  const onCheckoutSuccess = () => {
    navigate('/success', { state: { fromCheckout: true } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <CheckoutTimer />
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Finalizar Pedido
            </h1>
            <p className="text-red-600 font-medium">
              ⚡ Aproveite! Você tem 15 minutos para garantir sua oferta exclusiva!
            </p>
          </div>
          <CheckoutForm onSuccess={onCheckoutSuccess} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
