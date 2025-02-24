import { Mail, MapPin, Phone, Shield, Star, Truck, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Link 
          to="/checkout" 
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
        >
          <ShoppingCart className="w-5 h-5" />
          Comprar Agora
        </Link>
      </div>
      <footer className="bg-gray-50 pt-12 pb-6">
        <div className="container mx-auto px-4">
          {/* Trust indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="flex flex-col items-center text-center p-4">
              <Shield className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Compra Segura</h3>
              <p className="text-sm text-gray-600">Seus dados estão protegidos</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Truck className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Frete Grátis Brasil</h3>
              <p className="text-sm text-gray-600">Entrega para todo país</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Star className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">+50 mil clientes</h3>
              <p className="text-sm text-gray-600">Satisfação garantida</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Shield className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Garantia de 30 dias</h3>
              <p className="text-sm text-gray-600">Devolução garantida</p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">VoltaraTech</h3>
              <p className="text-gray-600 text-sm mb-4">
                Especialistas em produtos ergonômicos para melhorar sua postura e qualidade de vida.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link to="/" className="hover:text-primary transition-colors">
                    Início
                  </Link>
                </li>
                <li>
                  <Link to="/checkout" className="hover:text-primary transition-colors">
                    Comprar Agora
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <a 
                    href="https://wa.me/5527992758442" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>suporte@voltaratech.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Linhares, ES</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Formas de Pagamento</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white p-2 rounded border">
                  <img 
                    src="https://logodownload.org/wp-content/uploads/2014/07/mastercard-logo.png"
                    alt="Mastercard"
                    className="w-full h-auto"
                  />
                </div>
                <div className="bg-white p-2 rounded border">
                  <img 
                    src="https://logodownload.org/wp-content/uploads/2016/10/visa-logo.png"
                    alt="Visa"
                    className="w-full h-auto"
                  />
                </div>
                <div className="bg-white p-2 rounded border">
                  <img 
                    src="https://logopng.com.br/logos/pix-106.png"
                    alt="PIX"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="text-center text-sm text-gray-600">
              <p>&copy; {new Date().getFullYear()} VoltaraTech. Todos os direitos reservados.</p>
              <p className="mt-2">
                CNPJ: 45.320.297/0001-00 | Centro - Linhares, ES
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
