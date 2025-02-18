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

const TestimonialCard = ({ testimonial }) => {
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

const TestimonialsModal = ({ isOpen, onClose, testimonials }) => {
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

const testimonials = [
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

const additionalTestimonials = [
  // ... 21 more testimonials with similar structure ...
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
