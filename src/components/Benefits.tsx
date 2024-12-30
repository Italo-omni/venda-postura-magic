import { CheckCircle, Award, Repeat, Heart } from "lucide-react";

const benefits = [
  {
    icon: <CheckCircle className="w-12 h-12 text-primary" />,
    title: "Correção de Postura",
    description: "Alinhamento natural da coluna e melhor posicionamento do corpo"
  },
  {
    icon: <Heart className="w-12 h-12 text-primary" />,
    title: "Alívio de Dores",
    description: "Redução significativa das dores lombares e tensão muscular"
  },
  {
    icon: <Award className="w-12 h-12 text-primary" />,
    title: "Material Premium",
    description: "Espuma viscoelástica de alta densidade e tecido respirável"
  },
  {
    icon: <Repeat className="w-12 h-12 text-primary" />,
    title: "Versatilidade",
    description: "Perfeita para casa, escritório e viagens"
  }
];

export const Benefits = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
          Benefícios que Transformam sua Vida
        </h2>
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