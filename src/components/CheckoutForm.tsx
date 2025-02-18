import { useState } from "react";
import { Input } from "@/components/ui/input";
import { trackEvent } from "@/utils/metaPixel";
import { ProductSummary } from "./checkout/ProductSummary";
import { FormActions } from "./checkout/FormActions";
import { toast } from "sonner";

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
  quantidade: number;
}

interface CheckoutFormProps {
  onSuccess?: () => void;
}

export const CheckoutForm = ({ onSuccess }: CheckoutFormProps) => {
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
    quantidade: 1,
  });
  const [hasTrackedPaymentInfo, setHasTrackedPaymentInfo] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Track AddPaymentInfo only once when the first field is filled
    if (!hasTrackedPaymentInfo && value !== "") {
      trackEvent('AddPaymentInfo', {
        content_name: 'Almofada Ergonômica Corretora de Postura',
        content_ids: ['ALMOFADA001'],
        value: 197.00,
        currency: 'BRL'
      });
      setHasTrackedPaymentInfo(true);
    }
  };

  const sendEmail = async (data: FormData) => {
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_sqf0scb',
          template_id: 'template_zift7dh',
          user_id: 'OTDb0AsWpTzo3EDas',
          template_params: {
            to_email: 'voltaratech2024@gmail.com',
            from_name: data.nome,
            from_email: data.email,
            message: `Novo pedido recebido:
              Nome: ${data.nome}
              Email: ${data.email}
              Telefone: ${data.telefone}
              Endereço: ${data.endereco}, ${data.numero}
              Complemento: ${data.complemento}
              Bairro: ${data.bairro}
              Cidade: ${data.cidade}
              Estado: ${data.estado}
              CEP: ${data.cep}`
          }
        })
      });

      if (response.ok) {
        toast.success("Pedido recebido com sucesso!");
      } else {
        console.error("Erro ao enviar email");
      }
    } catch (error) {
      console.error("Erro ao enviar email:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    trackEvent('Lead', {
      content_name: 'Almofada Ergonômica Corretora de Postura',
      content_category: 'form',
      value: 197.00,
      currency: 'BRL'
    });
    
    trackEvent("Purchase", {
      content_name: "Almofada Ergonômica Corretora de Postura",
      content_type: "product",
      content_ids: ["ALMOFADA001"],
      value: 197.0,
      currency: "BRL",
    });
    await sendEmail(formData);
    window.open('https://mpago.la/2QBV6p5', "_self");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ProductSummary />
      
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
            Email *
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantidade *
          </label>
          <select
            name="quantidade"
            value={formData.quantidade}
            onChange={handleInputChange}
            className="w-full rounded-md border border-input bg-background px-3 py-2"
            required
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "unidade" : "unidades"} - R$ {(197 * num).toFixed(2)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <FormActions />
    </form>
  );
};
