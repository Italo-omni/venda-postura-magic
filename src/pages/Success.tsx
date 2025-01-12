import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, ThumbsUp } from "lucide-react";
import { trackEvent } from "@/utils/metaPixel";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Track successful purchase view only if coming from checkout
    if (location.state?.fromCheckout) {
      trackEvent('Purchase', {
        content_name: 'Almofada Ergonômica Corretora de Postura',
        content_type: 'product',
        content_ids: ['ALMOFADA001'],
        value: 197.00,
        currency: 'BRL'
      });
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-8">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Compra Realizada com Sucesso!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Agradecemos pela sua confiança! Em breve você receberá mais informações sobre seu pedido.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 rounded-xl p-6">
              <Package className="mx-auto h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Envio Rápido</h3>
              <p className="text-gray-600">Seu pedido será processado e enviado o mais breve possível</p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-6">
              <ThumbsUp className="mx-auto h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Garantia de Satisfação</h3>
              <p className="text-gray-600">Sua satisfação é nossa prioridade</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Você receberá um e-mail com os detalhes do seu pedido
            </p>
            
            <Button
              onClick={() => navigate("/")}
              className="bg-primary hover:bg-primary/90"
            >
              Voltar para a Página Inicial
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;