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
    content: "Essa almofada transformou meu dia a dia! Consigo assistir TV e fazer crochê sem dores. Super confortável!",
    rating: 5,
    imageSrc: "https://tse2.mm.bing.net/th?id=OIP.tnXYc1A0UtFdb_5VgEKdVQHaHa&rs=1&pid=ImgDetMain"
  },
  {
    name: "Dona Maria José",
    role: "Professora aposentada, 70 anos",
    content: "Leve e prática! Minhas dores nas costas quase sumiram, até minhas amigas da igreja notaram minha melhora.",
    rating: 5,
    imageSrc: "https://thumbs.dreamstime.com/b/idosa-africana-rindo-negra-com-cabelo-grisalho-sentada-digna-e-orgulhosa-de-fundo-negro-220563586.jpg"
  },
  {
    name: "Dona Marisa",
    role: "Artesã, 65 anos",
    content: "Perfeita para quem sofre de artrose! Uso todos os dias e já sinto muito menos dor. Aprovadíssima!",
    rating: 4,
    imageSrc: "https://brecha.com.uy/wp-content/uploads/2024/04/27-Mariyse-Conde-w-680x1024.jpg"
  },
  {
    name: "Seu João",
    role: "Aposentado, 72 anos",
    content: "Ficar sentado jogando dominó nunca foi tão confortável! A almofada é ótima para as costas.",
    rating: 5,
    imageSrc: "https://tse2.mm.bing.net/th?id=OIP.tnXYc1A0UtFdb_5VgEKdVQHaHa&rs=1&pid=ImgDetMain"
  },
  {
    name: "Dona Clarice",
    role: "Cozinheira, 68 anos",
    content: "Finalmente posso ficar horas cozinhando sem dores! O produto é maravilhoso e fácil de limpar.",
    rating: 5,
    imageSrc: "https://tse2.mm.bing.net/th?id=OIP.tnXYc1A0UtFdb_5VgEKdVQHaHa&rs=1&pid=ImgDetMain"
  },
  {
    name: "Dona Neide",
    role: "Costureira, 66 anos",
    content: "Costuro por horas e nem percebo! Super confortável e prática. Recomendo para todo mundo.",
    rating: 4,
    imageSrc: "https://tse2.mm.bing.net/th?id=OIP.tnXYc1A0UtFdb_5VgEKdVQHaHa&rs=1&pid=ImgDetMain"
  },
  {
    name: "Seu Antônio",
    role: "Motorista aposentado, 74 anos",
    content: "Passei a dirigir por longas distâncias sem dor. É incrível o alívio que essa almofada proporciona!",
    rating: 5,
    imageSrc: "https://th.bing.com/th/id/R.80b321da8bfce6b6575a8fe0602ee4d5?rik=9a7E4N47g5k0lA&pid=ImgRaw&r=0"
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
