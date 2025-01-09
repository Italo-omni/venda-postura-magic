import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const FormActions = () => {
  const navigate = useNavigate();
  
  return (
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
        Finalizar Pagamento
      </Button>
    </div>
  );
};