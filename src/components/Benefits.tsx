import { CheckCircle, Award, Repeat, Heart } from "lucide-react";

const benefits = [
  {
    icon: <CheckCircle className="w-8 md:w-12 h-8 md:h-12 text-primary" />,
    title: "Tecnologia Premium",
    description: "Design ergonômico que se adapta ao seu corpo"
  },
  {
    icon: <Heart className="w-8 md:w-12 h-8 md:h-12 text-primary" />,
    title: "Resultados Reais",
    description: "95% dos clientes relatam alívio em 2 semanas"
  },
  {
    icon: <Award className="w-8 md:w-12 h-8 md:h-12 text-primary" />,
    title: "Alta Qualidade",
    description: "Material premium com tecnologia respirável"
  },
  {
    icon: <Repeat className="w-8 md:w-12 h-8 md:h-12 text-primary" />,
    title: "Leve Onde Quiser",
    description: "Ideal para casa, escritório e viagens"
  }
];

export const Benefits = () => {
  return (
    <section className="py-12 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 md:mb-4 px-2">
          Por Que 50.000 Pessoas Escolheram?
        </h2>
        <p className="text-center text-gray-600 text-base md:text-lg mb-8 md:mb-12 max-w-3xl mx-auto px-2">
          A solução definitiva para quem quer viver sem dor
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