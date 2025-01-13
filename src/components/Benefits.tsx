import { CheckCircle, Award, Repeat, Heart, Star } from "lucide-react";

const benefits = [
  {
    icon: <CheckCircle className="w-8 md:w-12 h-8 md:h-12 text-primary" />,
    title: "Tecnologia Exclusiva",
    description: "Design ergonômico patenteado que se adapta ao seu corpo",
  },
  {
    icon: <Star className="w-8 md:w-12 h-8 md:h-12 text-primary" />,
    title: "Alta Satisfação",
    description: "Aprovado por usuários após 2 semanas de uso",
  },
  {
    icon: <Award className="w-8 md:w-12 h-8 md:h-12 text-primary" />,
    title: "Máxima Qualidade",
    description: "Material premium com tecnologia respirável",
  },
  {
    icon: <Heart className="w-8 md:w-12 h-8 md:h-12 text-primary" />,
    title: "Versátil e Confortável",
    description: "Ideal para casa, trabalho e viagens",
  },
];

export const Benefits = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Por Que Mais de 50 Mil Pessoas Confiam?
          </h2>
          <p className="text-gray-600 text-lg">
            Descubra como nosso produto pode melhorar seu bem-estar e conforto.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Este produto não substitui uma consulta médica. Consulte um profissional de saúde para orientações específicas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="benefit-card hover:bg-blue-50 transition-colors duration-300"
            >
              <div className="mb-4 md:mb-6">{benefit.icon}</div>
              <h3 className="font-heading text-xl font-bold mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
