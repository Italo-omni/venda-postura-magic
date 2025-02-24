import React, { useState } from 'react';
import { Star, Quote, X } from "lucide-react";

const TestimonialImage = ({ src, name }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <img
      src={imageError ? `/api/placeholder/100/100` : src}
      alt={`Foto de ${name}`}
      className="w-20 h-20 rounded-full object-cover border-2 border-gray-100"
      onError={() => setImageError(true)}
    />
  );
};

interface Testimonial {
  name: string;
  location: string;
  content?: string;
  text?: string;
  rating: number;
  image?: string;
  date?: string;
  verified?: boolean;
  highlight?: boolean;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

interface TestimonialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  testimonials: Testimonial[];
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const content = testimonial.content || testimonial.text || '';

  return (
    <div className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 ${
      testimonial.highlight ? 'border-2 border-primary/20' : ''
    }`}>
      <div className="relative">
        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-500 opacity-20" />
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-2">
            <p className="font-bold text-xl">{testimonial.name}</p>
            {testimonial.verified && (
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                Compra verificada
              </span>
            )}
          </div>
          <div>
            <p className="text-gray-600 text-sm">{testimonial.location}</p>
            {testimonial.date && (
              <p className="text-gray-500 text-xs mt-1">{testimonial.date}</p>
            )}
          </div>
          <div className="flex mb-2">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>

        {/* Foto do produto enviada pelo cliente */}
        {testimonial.image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <div className="relative group">
              <img
                src={testimonial.image}
                alt={`Produto recebido por ${testimonial.name}`}
                className="w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-2 left-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Foto do produto recebido
              </span>
            </div>
          </div>
        )}

        <p className="text-gray-700 leading-relaxed">
          {expanded ? content : content.length > 150 ? `${content.slice(0, 150)}...` : content}
        </p>
        {content.length > 150 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-500 mt-2 hover:underline"
          >
            {expanded ? "Ver menos" : "Ver mais"}
          </button>
        )}
      </div>
    </div>
  );
};

const TestimonialsModal = ({ isOpen, onClose, testimonials }: TestimonialsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-2xl font-bold mb-6">Mais Depoimentos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

const testimonials: Testimonial[] = [
  {
    name: "Carlos Roberto",
    location: "São Paulo, SP",
    content: "Recebi na cor errada, mas o suporte trocou rapidamente. Agora uso todo dia e as dores nas costas sumiram!",
    rating: 4
  },
  {
    name: "Ana Paula Silva",
    location: "Rio de Janeiro, RJ",
    content: "Demorei pra me acostumar, mas depois de 3 dias ficou perfeito. Minhas dores no pescoço melhoraram muito.",
    rating: 5
  },
  {
    name: "Marcelo Santos",
    location: "Curitiba, PR",
    content: "Preço um pouco alto, mas vale cada centavo. Minha postura melhorou 100%.",
    rating: 4
  },
  {
    name: "Fernanda Lima",
    location: "Belo Horizonte, MG",
    content: "Produto excelente! Resolveu minhas dores nas costas em 2 semanas.",
    rating: 5
  },
  {
    name: "Ricardo Oliveira",
    location: "Brasília, DF",
    content: "O manual poderia ser mais claro, mas o produto é ótimo. Recomendo!",
    rating: 4
  },
  {
    name: "Maria Silva",
    location: "Linhares, ES",
    rating: 5,
    date: "15/03/2024",
    image: "https://down-br.img.susercontent.com/file/sg-11134201-7rfig-m3dxdqyiqs7idc.webp",
    text: "Recebi minha almofada ActiveFit™ exatamente como mostrado nas fotos! A qualidade é impressionante e já estou sentindo a diferença na minha postura. O material é super confortável e resistente. Recomendo muito para quem passa muito tempo sentado, seja no trabalho ou em casa. A entrega foi rápida e o produto veio muito bem embalado. Valeu cada centavo!",
    verified: true,
    highlight: true
  }
];

const additionalTestimonials: Testimonial[] = [
  {
    name: "Juliana Costa",
    location: "Salvador, BA",
    content: "Achei o material um pouco duro no início, mas depois de uma semana ficou perfeito. Como dentista, ajudou muito na minha postura durante os atendimentos.",
    rating: 4
  },
  {
    name: "Pedro Mendes",
    location: "Florianópolis, SC",
    content: "Entrega atrasou, mas valeu a espera. Ótimo produto!",
    rating: 4
  },
  {
    name: "Luciana Almeida",
    location: "Recife, PE",
    content: "Comprei com dúvida, mas superou expectativas.",
    rating: 5
  },
  {
    name: "Gabriel Santos",
    location: "Porto Alegre, RS",
    content: "Pedi tamanho errado, troquei fácil. Agora tá perfeito!",
    rating: 4
  },
  {
    name: "Beatriz Lima",
    location: "Manaus, AM",
    content: "Funciona mesmo. Minhas dores sumiram em 2 semanas.",
    rating: 5
  },
  {
    name: "Roberto Campos",
    location: "Goiânia, GO",
    content: "Meio caro, mas resolve o problema. Recomendo.",
    rating: 4
  },
  {
    name: "Mariana Costa",
    location: "Fortaleza, CE",
    content: "Veio com pequeno defeito, mas trocaram na hora. Agora tá perfeito!",
    rating: 4
  },
  {
    name: "Thiago Oliveira",
    location: "Vitória, ES",
    content: "Ajuste complicado no início, mas depois fica fácil.",
    rating: 4
  },
  {
    name: "Carolina Martins",
    location: "Natal, RN",
    content: "Melhor investimento que fiz pra minha coluna!",
    rating: 5
  },
  {
    name: "Fernando Silva",
    location: "Campo Grande, MS",
    content: "Cor diferente do site, mas gostei até mais. Produto excelente.",
    rating: 4
  },
  {
    name: "Amanda Souza",
    location: "João Pessoa, PB",
    content: "Resolveu minhas dores nas costas. Recomendo muito!",
    rating: 5
  },
  {
    name: "Rafael Moreira",
    location: "Cuiabá, MT",
    content: "Demorei pra me adaptar, mas valeu a pena.",
    rating: 4
  },
  {
    name: "Vinícius Rocha",
    location: "Belém, PA",
    content: "Produto bom, entrega rápida. Satisfeito!",
    rating: 5
  },
  {
    name: "Patricia Nunes",
    location: "São Luís, MA",
    content: "Achei caro no início, mas vale cada centavo.",
    rating: 4
  },
  {
    name: "Henrique Lima",
    location: "Macapá, AP",
    content: "Uso todo dia no trabalho. Não tenho mais dores.",
    rating: 5
  },
  {
    name: "Camila Rodrigues",
    location: "Boa Vista, RR",
    content: "Chegou rápido e funciona muito bem!",
    rating: 5
  },
  {
    name: "Bruno Carvalho",
    location: "Palmas, TO",
    content: "Manual confuso, mas o suporte ajudou. Produto ótimo!",
    rating: 4
  },
  {
    name: "Renata Alves",
    location: "Rio Branco, AC",
    content: "Tive que ajustar várias vezes, mas depois ficou perfeito.",
    rating: 4
  },
  {
    name: "Paulo Mendes",
    location: "Porto Velho, RO",
    content: "Qualidade excelente. Recomendo!",
    rating: 5
  },
  {
    name: "Sandra Costa",
    location: "Maceió, AL",
    content: "Resolveu meu problema de postura. Muito bom!",
    rating: 5
  },
  {
    name: "João Silva",
    location: "Teresina, PI",
    content: "Preço justo pelo benefício. Satisfeito.",
    rating: 4
  }
];

export const Testimonials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-4">
          Comentários de Clientes
        </h2>
        <p className="text-gray-600 text-center mb-12 text-xl">
          Mais de 2 mil pessoas já melhoraram sua postura com o ActiveFit™
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
        
        <div className="text-center mt-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Ver Mais Depoimentos
          </button>
        </div>

        <TestimonialsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          testimonials={additionalTestimonials}
        />
      </div>
    </section>
  );
};
