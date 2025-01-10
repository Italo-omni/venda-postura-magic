import { CheckCircle, Award, Repeat, Heart } from "lucide-react";

const benefits = [
  {
    icon: <CheckCircle className="w-8 md:w-12 h-8 md:h-12 text-primary" />,
    title: "Tecnologia Revolucionária",
    description: "Design ergonômico patenteado que se adapta perfeitamente ao seu corpo, garantindo alívio instantâneo"
  },
  {
    icon: <Heart className="w-8 md:w-12 h-8 md:h-12 text-primary" />,
    title: "Alívio Garantido",
    description: "95% dos usuários relatam redução significativa das dores nas primeiras 2 semanas de uso"
  },
  {
    icon: <Award className="w-8 md:w-12 h-8 md:h-12 text-primary" />,
    title: "Qualidade Premium",
    description: "Material viscoelástico de altíssima densidade, durável e com tecnologia de respiração ativa"
  },
  {
    icon: <Repeat className="w-8 md:w-12 h-8 md:h-12 text-primary" />,
    title: "Versatilidade Total",
    description: "Leve para qualquer lugar: escritório, home office, carro ou viagens. Seu conforto garantido 24/7"
  }
];

export const Benefits = () => {
  return (
    <section className="py-12 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 md:mb-4 px-2">
          Por Que Nossa Almofada é a Escolha de Mais de 50.000 Brasileiros?
        </h2>
        <p className="text-center text-gray-600 text-base md:text-lg mb-8 md:mb-12 max-w-3xl mx-auto px-2">
          Desenvolvida por especialistas em ergonomia, nossa almofada é a solução definitiva para quem passa horas sentado e busca conforto e saúde.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card p-4 md:p-6">
              <div className="mb-3 md:mb-4">{benefit.icon}</div>
              <h3 className="font-heading text-lg md:text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm md:text-base">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};