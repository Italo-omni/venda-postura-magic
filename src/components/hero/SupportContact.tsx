
import { Phone } from "lucide-react";

export const SupportContact = () => {
  return (
    <div className="flex items-center gap-3 text-gray-700 mb-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
        <Phone className="w-4 h-4 text-white" />
      </div>
      <a 
        href="https://wa.me/5527992758442" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-green-600 hover:text-green-700"
      >
        Suporte via WhatsApp
      </a>
    </div>
  );
};
