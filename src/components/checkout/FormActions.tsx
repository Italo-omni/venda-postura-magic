
import { Button } from "@/components/ui/button";
import { Shield, CreditCard, WhatsappLogo } from "lucide-react";

interface FormActionsProps {
  formData: any;
  isValid: boolean;
}

export const FormActions = ({ formData, isValid }: FormActionsProps) => {
  const generateWhatsAppMessage = () => {
    const message = `🛍️ *NOVO PEDIDO*

━━━━━━━━━━━━━━━━
👤 *DADOS DO CLIENTE*
━━━━━━━━━━━━━━━━
• Nome: ${formData.nome}
• Email: ${formData.email}
• Telefone: ${formData.telefone}

📍 *ENDEREÇO DE ENTREGA*
━━━━━━━━━━━━━━━━
• ${formData.endereco}, ${formData.numero}
${formData.complemento ? `• Complemento: ${formData.complemento}\n` : ''}• Bairro: ${formData.bairro}
• Cidade: ${formData.cidade}/${formData.estado}
• CEP: ${formData.cep}

🛒 *DETALHES DO PEDIDO*
━━━━━━━━━━━━━━━━
• Produto: Almofada Ergonômica Corretora de Postura
• Quantidade: ${formData.quantidade}
• Valor Total: *R$ ${(197 * formData.quantidade).toFixed(2)}*

_Agradecemos pela preferência!_ ✨`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppOrder = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5527992758442&text=${generateWhatsAppMessage()}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-primary" />
          <h3 className="font-medium">Pagamento 100% Seguro</h3>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <img src="/visa.png" alt="Visa" className="h-6 object-contain" />
          <img src="/mastercard.png" alt="Mastercard" className="h-6 object-contain" />
          <img src="/elo.png" alt="Elo" className="h-6 object-contain" />
        </div>
        <p className="text-sm text-gray-600 mb-4">
          🔒 Seus dados estão protegidos com criptografia de ponta a ponta
        </p>
      </div>

      <Button
        type="submit"
        className="w-full bg-primary text-white hover:bg-primary/90 h-14 text-lg"
        disabled={!isValid}
      >
        <CreditCard className="w-5 h-5 mr-2" />
        Finalizar Compra Segura
      </Button>
      
      <Button
        type="button"
        onClick={handleWhatsAppOrder}
        className="w-full bg-green-500 hover:bg-green-600 text-white h-14 text-lg"
        disabled={!isValid}
      >
        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Comprar pelo WhatsApp
      </Button>
      
      <div className="text-center space-y-2">
        <p className="text-sm text-gray-500">
          Ao finalizar a compra, você concorda com nossos termos de serviço
        </p>
        <p className="text-xs text-gray-400">
          Em caso de dúvidas, entre em contato pelo WhatsApp
        </p>
      </div>
    </div>
  );
};
