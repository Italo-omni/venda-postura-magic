import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const ShippingCalculator = () => {
  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);

  const calculateShipping = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.length !== 8) {
      toast.error("Por favor, digite um CEP válido");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        toast.error("CEP não encontrado");
        return;
      }

      toast.success(`Entrega para ${data.localidade}/${data.uf} em até 7 dias úteis`);
    } catch (error) {
      toast.error("Erro ao calcular o frete. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 bg-secondary">
      <div className="container mx-auto max-w-6xl">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8">
            Calcule o Prazo de Entrega
          </h2>
          <form onSubmit={calculateShipping} className="flex gap-4 justify-center">
            <input
              type="text"
              placeholder="Digite seu CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
              maxLength={8}
              className="flex-1 max-w-[200px] px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Calcular"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};