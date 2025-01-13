import React, { useState } from 'react';
import { Star, Quote } from "lucide-react";

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
          <TestimonialImage src={testimonial.imageSrc} name={testimonial.name} />
          <div>
            <p className="font-bold text-xl">{testimonial.name}</p>
            <p className="text-gray-600 text-lg">{testimonial.role}</p>
          </div>
        </div>
        <div className="flex mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-gray-700 leading-relaxed text-lg">
          {expanded ? testimonial.content : `${testimonial.content.slice(0, 100)}...`}
        </p>
        {testimonial.content.length > 100 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-500 mt-2 underline"
          >
            {expanded ? "Ver Menos" : "Ver Mais"}
          </button>
        )}
      </div>
    </div>
  );
};

const testimonials = [
  {
    name: "Carlos",
    role: "Estudante universitário, 22 anos",
    content: "Com a almofada Postura Magic, consigo passar horas estudando sem sentir dores nas costas. É super confortável e fácil de levar para a biblioteca. Recomendo demais!",
    rating: 5,
    imageSrc: "https://example.com/image-carlos.jpg"
  },
  {
    name: "Mariana",
    role: "Designer, 28 anos",
    content: "Trabalhar de casa nunca foi tão confortável! Essa almofada é incrível para manter a postura durante as longas horas de trabalho. Valeu cada centavo.",
    rating: 5,
    imageSrc: "https://example.com/image-mariana.jpg"
  },
  {
    name: "Lucas",
    role: "Gamer, 19 anos",
    content: "Passo horas jogando e essa almofada mudou minha vida. Antes tinha muita dor nas costas, agora fico tranquilo. Melhor aquisição do ano!",
    rating: 5,
    imageSrc: "https://example.com/image-lucas.jpg"
  },
  {
    name: "Ana Clara",
    role: "Professora, 32 anos",
    content: "Dou aula online e fico sentada por horas. A almofada ajudou muito com a minha postura e dores nas costas. Super prática e confortável!",
    rating: 5,
    imageSrc: "https://example.com/image-ana.jpg"
  },
];

export const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-4">
          Histórias de Quem Já Usa
        </h2>
        <p className="text-gray-600 text-center mb-12 text-xl">
          Veja como a Postura Magic está melhorando a qualidade de vida de milhares de pessoas
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};
