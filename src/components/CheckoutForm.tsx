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
      const valorTotal = Object.values(data.quantidadePorCor).reduce((total, qtd) => total + (qtd * 197), 0);
      const quantidadeTotal = Object.values(data.quantidadePorCor).reduce((a, b) => a + b, 0);

      const colorSummary = Object.entries(data.quantidadePorCor)
        .filter(([_, qty]) => qty > 0)
        .map(([cor, qty]) => `              • ${cores.find(c => c.id === cor)?.nome}: ${qty} unidade${qty > 1 ? 's' : ''}`)
        .join('\n');

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
            message: `NOVO PEDIDO RECEBIDO
            
━━━━━━━━━━━━━━━━
DADOS DO CLIENTE
━━━━━━━━━━━━━━━━
                Nome: ${data.nome}
                Email: ${data.email}
                Telefone: ${data.telefone}

━━━━━━━━━━━━━━━━
ENDEREÇO DE ENTREGA
━━━━━━━━━━━━━━━━
                Endereço: ${data.endereco}, ${data.numero}
                ${data.complemento ? `Complemento: ${data.complemento}\n                ` : ''}Bairro: ${data.bairro}
                Cidade: ${data.cidade}/${data.estado}
                CEP: ${data.cep}

━━━━━━━━━━━━━━━━
DETALHES DO PEDIDO
━━━━━━━━━━━━━━━━
                Produto: Almofada Ergonômica Corretora de Postura
                
                Cores e Quantidades:
${colorSummary}

                Quantidade Total: ${quantidadeTotal} unidade${quantidadeTotal > 1 ? 's' : ''}
                Valor Total: R$ ${valorTotal.toFixed(2)}`
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

      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold">Entrega Garantida</h4>
              <p className="text-sm text-gray-600">Enviamos para todo Brasil</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold">Pagamento Seguro</h4>
              <p className="text-sm text-gray-600">Via Mercado Pago</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold">Garantia de 30 dias</h4>
              <p className="text-sm text-gray-600">Satisfação garantida</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Selecione as cores e quantidades</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Produto original</span>
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
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
        <div className="mt-4 bg-blue-50 p-4 rounded-md border border-blue-200">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm text-blue-800 font-medium">Promoção por tempo limitado!</p>
              <p className="text-sm text-blue-600">Aproveite o frete grátis para todo Brasil</p>
            </div>
          </div>
        </div>
        <div className="mt-4 text-right">
          <p className="text-sm text-gray-600">
            Total selecionado: {getTotalQuantidade()} {getTotalQuantidade() === 1 ? "unidade" : "unidades"}
          </p>
          <p className="text-lg font-semibold">
            Total: R$ {(197 * getTotalQuantidade()).toFixed(2)}
          </p>
          <p className="text-sm text-green-600">Em até 12x no cartão</p>
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

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Avaliações dos Clientes</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4 pb-4 border-b">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-medium">MA</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium">Maria A.</h4>
                <div className="flex text-yellow-400">
                  {"★".repeat(5)}
                </div>
              </div>
              <p className="text-gray-600 mt-1">Produto excelente! Melhorou muito minha postura no trabalho.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-medium">JP</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium">João P.</h4>
                <div className="flex text-yellow-400">
                  {"★".repeat(5)}
                </div>
              </div>
              <p className="text-gray-600 mt-1">Entrega rápida e produto de qualidade. Recomendo!</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
