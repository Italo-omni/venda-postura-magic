import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ana Silva",
    role: "Profissional de TI",
    content: "Depois de usar por 2 semanas, minhas dores nas costas diminuíram significativamente. Recomendo muito!",
    rating: 5
  },
  {
    name: "Carlos Santos",
    role: "Designer",
    content: "A melhor almofada que já usei! Material de qualidade e muito confortável para longas horas de trabalho.",
    rating: 5
  },
  {
    name: "Marina Costa",
    role: "Professora",
    content: "Excelente produto! Ajudou muito na minha postura durante as aulas online.",
    rating: 5
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
          O Que Nossos Clientes Dizem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">{testimonial.content}</p>
              <div>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};