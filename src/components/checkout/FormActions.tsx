
import { Button } from "@/components/ui/button";
import { Shield, CreditCard, Phone } from "lucide-react";

interface FormActionsProps {
  formData: {
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    quantidadePorCor: Record<string, number>;
  };
  isValid: boolean;
}

export const FormActions = ({ formData, isValid }: FormActionsProps) => {
  const generateWhatsAppMessage = () => {
    // Gera o resumo das cores selecionadas
    const coresSelecionadas = Object.entries(formData.quantidadePorCor)
      .filter(([_, quantidade]) => quantidade > 0)
      .map(([cor, quantidade]) => `• ${cor.charAt(0).toUpperCase() + cor.slice(1)}: ${quantidade}`)
      .join('\n');

    const valorTotal = Object.values(formData.quantidadePorCor).reduce((total, qtd) => total + (qtd * 197), 0);

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
• Cores e Quantidades:
${coresSelecionadas}
• Quantidade Total: ${Object.values(formData.quantidadePorCor).reduce((a: number, b: number) => a + b, 0)}
• Valor Total: *R$ ${valorTotal.toFixed(2)}*

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
        <div className="flex flex-col gap-2 mb-4">
          <p className="text-sm text-gray-600">✓ Cartão de Crédito</p>
          <p className="text-sm text-gray-600">✓ Boleto Bancário</p>
          <p className="text-sm text-gray-600">✓ PIX</p>
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
        <Phone className="w-6 h-6 mr-2" />
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

