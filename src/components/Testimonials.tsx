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
  content: string;
  rating: number;
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

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-500 opacity-20" />
        <div className="flex items-center gap-4 mb-6">
          <div>
            <p className="font-bold text-xl">{testimonial.name}</p>
            <p className="text-gray-600 text-sm">{testimonial.location}</p>
          </div>
        </div>
        <div className="flex mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-gray-700 leading-relaxed">
          {expanded ? testimonial.content : `${testimonial.content.slice(0, 150)}...`}
        </p>
        {testimonial.content.length > 150 && (
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
    content: "Depois de anos sofrendo com dores nas costas devido ao trabalho no escritório, o ActiveFit mudou completamente minha vida. Em apenas 3 semanas, notei uma melhora significativa na minha postura e as dores diminuíram consideravelmente.",
    rating: 5
  },
  {
    name: "Ana Paula Silva",
    location: "Rio de Janeiro, RJ",
    content: "Sou professora e passava horas corrigindo trabalhos. As dores no pescoço eram constantes até conhecer o ActiveFit. Agora consigo trabalhar sem desconforto e minha qualidade de vida melhorou muito!",
    rating: 5
  },
  {
    name: "Marcelo Santos",
    location: "Curitiba, PR",
    content: "Produto excepcional! Como programador, passo muitas horas sentado e tinha sérios problemas de postura. O ActiveFit me ajudou a manter uma postura correta naturalmente. Recomendo a todos os profissionais que trabalham sentados.",
    rating: 5
  },
  {
    name: "Fernanda Lima",
    location: "Belo Horizonte, MG",
    content: "Comprei com um pouco de receio, mas superou todas as expectativas. A diferença na minha postura é visível e as dores nas costas praticamente desapareceram. O suporte ao cliente também é excelente!",
    rating: 4
  },
  {
    name: "Ricardo Oliveira",
    location: "Brasília, DF",
    content: "Investimento que vale cada centavo. Uso há 2 meses e já percebo uma diferença enorme na minha postura. Meu fisioterapeuta inclusive notou a melhora e perguntou o que eu estava fazendo diferente!",
    rating: 5
  }
];

const additionalTestimonials: Testimonial[] = [
  {
    name: "Juliana Costa",
    location: "Salvador, BA",
    content: "Como dentista, minha postura era péssima durante os atendimentos. O ActiveFit foi recomendado por uma colega e fez toda diferença. Agora consigo manter uma postura adequada durante os procedimentos mais longos.",
    rating: 5
  },
  {
    name: "Pedro Mendes",
    location: "Florianópolis, SC",
    content: "Trabalho em home office e as dores nas costas estavam me impedindo de ser produtivo. O ActiveFit resolveu esse problema em poucas semanas. A qualidade do produto é impressionante!",
    rating: 5
  },
  {
    name: "Luciana Almeida",
    location: "Recife, PE",
    content: "Produto incrível! Uso há 3 meses e as dores crônicas que tinha na lombar diminuíram significativamente. Vale cada centavo investido na nossa saúde.",
    rating: 4
  },
  {
    name: "Gabriel Santos",
    location: "Porto Alegre, RS",
    content: "Como desenvolvedor, passo muitas horas sentado. O ActiveFit me ajudou não só com a postura, mas também com a consciência corporal. Recomendo fortemente!",
    rating: 5
  },
  {
    name: "Beatriz Lima",
    location: "Manaus, AM",
    content: "Estava cética no início, mas os resultados são reais. Minha postura melhorou muito e as dores no pescoço praticamente sumiram. O produto é muito bem feito e confortável.",
    rating: 5
  },
  {
    name: "Roberto Campos",
    location: "Goiânia, GO",
    content: "Excelente produto! Uso durante meu trabalho como arquiteto e notei uma grande diferença na minha postura. As dores nas costas diminuíram consideravelmente.",
    rating: 5
  },
  {
    name: "Mariana Costa",
    location: "Fortaleza, CE",
    content: "Comprei após recomendação do meu fisioterapeuta e foi a melhor decisão. Ajudou muito na minha recuperação e agora uso diariamente para manter a boa postura.",
    rating: 5
  },
  {
    name: "Thiago Oliveira",
    location: "Vitória, ES",
    content: "Como contador, passo horas na frente do computador. O ActiveFit tem sido fundamental para manter uma boa postura durante o trabalho. Recomendo!",
    rating: 4
  },
  {
    name: "Carolina Martins",
    location: "Natal, RN",
    content: "Produto de excelente qualidade! Ajudou muito com minhas dores nas costas e pescoço. O suporte da empresa também é muito bom.",
    rating: 5
  },
  {
    name: "Fernando Silva",
    location: "Campo Grande, MS",
    content: "Estava tendo problemas sérios de postura e o ActiveFit me ajudou muito. A diferença é notável já nas primeiras semanas de uso.",
    rating: 5
  },
  {
    name: "Amanda Souza",
    location: "João Pessoa, PB",
    content: "Ótimo investimento! Como designer, passo muito tempo sentada e o ActiveFit tem sido essencial para manter uma boa postura durante o trabalho.",
    rating: 5
  },
  {
    name: "Rafael Moreira",
    location: "Cuiabá, MT",
    content: "Produto fantástico! Ajudou muito com minhas dores lombares. A qualidade do material é excelente e o conforto é surpreendente.",
    rating: 4
  },
  {
    name: "Isabela Santos",
    location: "Aracaju, SE",
    content: "Recomendo totalmente! Melhorou muito minha qualidade de vida no trabalho. As dores nas costas diminuíram significativamente.",
    rating: 5
  },
  {
    name: "Lucas Pereira",
    location: "Teresina, PI",
    content: "Excelente produto! Como engenheiro, passo muito tempo na frente do computador e o ActiveFit tem sido fundamental para manter uma boa postura.",
    rating: 5
  },
  {
    name: "Daniela Costa",
    location: "Maceió, AL",
    content: "Superou minhas expectativas! O produto é muito bem feito e realmente ajuda a manter uma postura correta durante o dia todo.",
    rating: 5
  },
  {
    name: "Vinícius Rocha",
    location: "Belém, PA",
    content: "Ótimo custo-benefício! O produto é durável, confortável e realmente funciona. Minhas dores nas costas melhoraram muito.",
    rating: 4
  },
  {
    name: "Patricia Nunes",
    location: "São Luís, MA",
    content: "Comprei há 2 meses e já notei uma diferença incrível na minha postura. O produto é muito confortável e fácil de usar.",
    rating: 5
  },
  {
    name: "Henrique Lima",
    location: "Macapá, AP",
    content: "Como profissional de TI, o ActiveFit tem sido essencial no meu dia a dia. Ajudou muito a melhorar minha postura durante as longas horas de trabalho.",
    rating: 5
  },
  {
    name: "Camila Rodrigues",
    location: "Boa Vista, RR",
    content: "Produto de alta qualidade! Ajudou muito com minhas dores cervicais. Recomendo para todos que trabalham muito tempo sentados.",
    rating: 5
  },
  {
    name: "Bruno Carvalho",
    location: "Palmas, TO",
    content: "Investimento que valeu muito a pena! O produto é confortável, durável e realmente ajuda a manter uma boa postura durante o trabalho.",
    rating: 5
  },
  {
    name: "Renata Alves",
    location: "Rio Branco, AC",
    content: "Excelente produto! Uso há 3 meses e as melhorias na minha postura são visíveis. Recomendo para todos que têm problemas posturais.",
    rating: 5
  }
];

export const Testimonials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-4">
          Histórias Reais de Clientes
        </h2>
        <p className="text-gray-600 text-center mb-12 text-xl">
          Mais de 50 mil pessoas já melhoraram sua postura com o ActiveFit™
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
