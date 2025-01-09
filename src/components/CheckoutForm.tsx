import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/utils/metaPixel";

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export const CheckoutForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Track AddPaymentInfo when user starts filling the form
    if (Object.values(formData).every(val => val === "") && value !== "") {
      trackEvent('AddPaymentInfo', {
        content_name: 'Almofada Ergonômica Corretora de Postura',
        content_ids: ['ALMOFADA001'],
        value: 197.00,
        currency: 'BRL'
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track Lead
    trackEvent('Lead', {
      content_name: 'Almofada Ergonômica Corretora de Postura',
      content_category: 'form',
      value: 197.00,
      currency: 'BRL'
    });

    // Monta a mensagem para o WhatsApp
    const message = `
🛍️ *NOVO PEDIDO - ALMOFADA ERGONÔMICA*

*Dados do Cliente:*
Nome: ${formData.nome}
Email: ${formData.email}
Telefone: ${formData.telefone}

*Endereço de Entrega:*
${formData.endereco}, ${formData.numero}
${formData.complemento ? `Complemento: ${formData.complemento}` : ""}
${formData.bairro} - ${formData.cidade}/${formData.estado}
CEP: ${formData.cep}

*Produto:*
Almofada Ergonômica Corretora de Postura
Valor: R$ 197,00

*Observações:*
✅ Produto em estoque
🚚 Envio imediato
⭐ Mais de 50.000 clientes satisfeitos
`.trim();

    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp in a new window and navigate to success page
    window.open(`https://api.whatsapp.com/send?phone=5527992758442&text=${encodedMessage}`, "_blank");
    navigate("/success");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome Completo *
          </label>
          <Input
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telefone *
          </label>
          <Input
            name="telefone"
            value={formData.telefone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CEP *
          </label>
          <Input
            name="cep"
            value={formData.cep}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Endereço *
        </label>
        <Input
          name="endereco"
          value={formData.endereco}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número *
          </label>
          <Input
            name="numero"
            value={formData.numero}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Complemento
          </label>
          <Input
            name="complemento"
            value={formData.complemento}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bairro *
          </label>
          <Input
            name="bairro"
            value={formData.bairro}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cidade *
          </label>
          <Input
            name="cidade"
            value={formData.cidade}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado *
          </label>
          <Input
            name="estado"
            value={formData.estado}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/")}
          className="flex-1"
        >
          Voltar
        </Button>
        <Button type="submit" className="flex-1 bg-cta hover:bg-cta/90">
          Finalizar Pedido no WhatsApp
        </Button>
      </div>
    </form>
  );
};
