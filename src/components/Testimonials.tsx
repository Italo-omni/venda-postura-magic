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

const TestimonialCard = ({ testimonial }) => (
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
          <Star 
            key={i} 
            className="w-6 h-6 fill-yellow-400 text-yellow-400" 
          />
        ))}
      </div>
      
      <p className="text-gray-700 leading-relaxed text-lg">
        {testimonial.content}
      </p>
    </div>
  </div>
);

const testimonials = [
  {
    name: "Dona Helena",
    role: "Aposentada, 67 anos",
    content: "Depois que minha filha me deu essa almofada, minha vida mudou! Eu sofria muito com dores nas costas, principalmente quando ficava sentada assistindo TV ou fazendo crochê. Agora consigo passar mais tempo com meus hobbies sem sentir aquele desconforto terrível. É muito fácil de usar e o tecido é bem macio.",
    rating: 5,
    imageSrc: "https://amenteemaravilhosa.com.br/wp-content/uploads/2017/06/mulher-idosa.jpg"
  },
  {
    name: "Dona Maria José",
    role: "Professora aposentada, 70 anos",
    content: "Que benção encontrar esse produto! Minhas dores nas costas melhoraram muito e agora consigo participar dos eventos da igreja com mais conforto. A almofada é leve, fácil de carregar e me ajuda a manter a postura correta. Indico para todas as minhas amigas do grupo da terceira idade.",
    rating: 5,
    imageSrc: "https://thumbs.dreamstime.com/b/idosa-africana-rindo-negra-com-cabelo-grisalho-sentada-digna-e-orgulhosa-de-fundo-negro-220563586.jpg"
  },
  {
    name: "Dona Marisa",
    role: "Artesã, 65 anos",
    content: "Maravilhosa! Tenho artrose e sempre sofri com dores ao ficar sentada fazendo meus trabalhos manuais. Desde que comecei a usar essa almofada, as dores diminuíram muito. Uso todos os dias e já notei uma grande diferença na minha qualidade de vida. O investimento valeu cada centavo!",
    rating: 5,
    imageSrc: "https://brecha.com.uy/wp-content/uploads/2024/04/27-Mariyse-Conde-w-680x1024.jpg"
  }
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
