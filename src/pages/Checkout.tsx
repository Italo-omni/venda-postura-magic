import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.nome || !formData.telefone || !formData.endereco) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

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

    // Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Abre o WhatsApp em nova aba
    window.open(`https://api.whatsapp.com/send?phone=5527992758442&text=${encodedMessage}`, "_blank");
  };

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
        </div>
      </div>
    </div>
  );
};

export default Checkout;