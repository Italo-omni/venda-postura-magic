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
  cor: string;
  quantidadePorCor: {
    [key: string]: number;
  };
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
    cor: "",
    quantidadePorCor: {},
  });
  const [hasTrackedPaymentInfo, setHasTrackedPaymentInfo] = useState(false);

  const cores = [
    {
      id: "preto",
      nome: "Preto",
      hex: "#000000",
      imagem: "https://ae-pic-a1.aliexpress-media.com/kf/S6b3df0d68ea143e6a59d4b6002105e82a.jpg_960x960q75.jpg_.avif"
    },
    {
      id: "cinza",
      nome: "Cinza",
      hex: "#808080",
      imagem: "https://ae-pic-a1.aliexpress-media.com/kf/Sf5183730eda847ac82f05459feeff412X.jpg_960x960q75.jpg_.avif"
    },
    {
      id: "verde",
      nome: "Verde",
      hex: "#2E8B57",
      imagem: "https://ae-pic-a1.aliexpress-media.com/kf/Sa665eb02590043ec88c65173e254106cf.jpg_960x960q75.jpg_.avif"
    },
    {
      id: "azul",
      nome: "Azul",
      hex: "#4169E1",
      imagem: "https://ae-pic-a1.aliexpress-media.com/kf/S36b27239a3bf402c96ff509896e78bbe1.jpg_960x960q75.jpg_.avif"
    },
    {
      id: "rosa",
      nome: "Rosa",
      hex: "#FF69B4",
      imagem: "https://ae-pic-a1.aliexpress-media.com/kf/Se4b724038c6e4328a38aeaddf1902dc9E.jpg_960x960q75.jpg_.avif"
    }
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
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

  const handleColorQuantityChange = (cor: string, quantidade: number) => {
    setFormData((prev) => ({
      ...prev,
      quantidadePorCor: {
        ...prev.quantidadePorCor,
        [cor]: quantidade,
      },
    }));
  };

  const getTotalQuantidade = () => {
    return Object.values(formData.quantidadePorCor).reduce((a, b) => a + b, 0);
  };

  const sendEmail = async (data: FormData) => {
    try {
      const colorSummary = Object.entries(data.quantidadePorCor)
        .filter(([_, qty]) => qty > 0)
        .map(([cor, qty]) => `${cores.find(c => c.id === cor)?.nome}: ${qty}`)
        .join('\n              ');

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
              CEP: ${data.cep}
              Quantidades por cor:
              ${colorSummary}
              Total: ${getTotalQuantidade()} unidades`
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
    
    if (getTotalQuantidade() === 0) {
      toast.error("Selecione pelo menos uma unidade");
      return;
    }

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
      value: 197.0 * getTotalQuantidade(),
      currency: "BRL",
    });

    await sendEmail(formData);

    const paymentLinks = {
      1: 'https://mpago.la/134EhTT',
      2: 'https://mpago.la/1VGHtrM',
      3: 'https://mpago.la/2uCYHUx',
      4: 'https://mpago.la/1gXywPx',
      5: 'https://mpago.la/21o4JXA'
    };

    window.open(paymentLinks[getTotalQuantidade() as keyof typeof paymentLinks], "_self");
  };

  const isFormValid = () => {
    const requiredFields = ['nome', 'email', 'telefone', 'cep', 'endereco', 'numero', 'bairro', 'cidade', 'estado'];
    return requiredFields.every(field => formData[field as keyof FormData]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ProductSummary />

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Selecione as cores e quantidades</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cores.map((cor) => (
            <div key={cor.id} className="bg-white p-4 rounded-md border border-gray-200">
              <div className="flex flex-col gap-2 mb-2">
                <img 
                  src={cor.imagem} 
                  alt={`Almofada ${cor.nome}`} 
                  className="w-full h-40 object-cover rounded-md"
                />
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: cor.hex }}
                  />
                  <span className="font-medium">{cor.nome}</span>
                </div>
              </div>
              <select
                value={formData.quantidadePorCor[cor.id] || 0}
                onChange={(e) => handleColorQuantityChange(cor.id, Number(e.target.value))}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                {[0, 1, 2, 3, 4, 5].map((num) => (
                  <option
                    key={num}
                    value={num}
                    disabled={num + getTotalQuantidade() - (formData.quantidadePorCor[cor.id] || 0) > 5}
                  >
                    {num} {num === 1 ? "unidade" : "unidades"}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="mt-4 text-right">
          <p className="text-sm text-gray-600">
            Total selecionado: {getTotalQuantidade()} {getTotalQuantidade() === 1 ? "unidade" : "unidades"}
          </p>
          <p className="text-lg font-semibold">
            Total: R$ {(197 * getTotalQuantidade()).toFixed(2)}
          </p>
        </div>
      </div>

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

      <FormActions formData={formData} isValid={isFormValid()} />
    </form>
  );
};
