
import { Phone, Shield, Truck } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-100">
      {/* Top bar */}
      <div className="bg-primary/5 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary" />
                <span>Frete Grátis Brasil</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Garantia de 30 dias</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              <a 
                href="https://wa.me/5527992758442" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Suporte via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            VoltaraTech
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-primary transition-colors">
              Início
            </Link>
            <a 
              href="https://wa.me/5527992758442" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Contato
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
