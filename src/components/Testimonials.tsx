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
    name: "Maria Silva",
    role: "34 anos",
    content: "Excelente produto! Melhorou muito minha postura durante o trabalho.",
    rating: 4,
    imageSrc: "URL_DA_IMAGEM"
  },
  // ... add more real testimonials (total of 9) ...
];

export const Testimonials = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, 9);

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
          {displayedTestimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
        
        {testimonials.length > 9 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              {showAll ? "Ver Menos" : "Ver Mais Depoimentos"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
