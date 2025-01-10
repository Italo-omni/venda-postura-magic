import { CheckCircle, Award, Repeat, Heart } from "lucide-react";

const benefits = [
  {
    icon: <CheckCircle className="w-12 h-12 text-primary" />,
    title: "Tecnologia Revolucionária",
    description: "Design ergonômico patenteado que se adapta perfeitamente ao seu corpo, garantindo alívio instantâneo"
  },
  {
    icon: <Heart className="w-12 h-12 text-primary" />,
    title: "Alívio Garantido",
    description: "95% dos usuários relatam redução significativa das dores nas primeiras 2 semanas de uso"
  },
  {
    icon: <Award className="w-12 h-12 text-primary" />,
    title: "Qualidade Premium",
    description: "Material viscoelástico de altíssima densidade, durável e com tecnologia de respiração ativa"
  },
  {
    icon: <Repeat className="w-12 h-12 text-primary" />,
    title: "Versatilidade Total",
    description: "Leve para qualquer lugar: escritório, home office, carro ou viagens. Seu conforto garantido 24/7"
  }
];

export const Benefits = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
          Por Que Nossa Almofada é a Escolha de Mais de 50.000 Brasileiros?
        </h2>
        <p className="text-center text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
          Desenvolvida por especialistas em ergonomia, nossa almofada é a solução definitiva para quem passa horas sentado e busca conforto e saúde.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="font-heading text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};