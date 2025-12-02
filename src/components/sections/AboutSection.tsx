import { Shield, Eye, Cpu, Heart } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Confiança",
    description: "Garantia em todos os serviços e peças originais certificadas.",
  },
  {
    icon: Eye,
    title: "Transparência",
    description: "Orçamentos detalhados e acompanhamento em tempo real.",
  },
  {
    icon: Cpu,
    title: "Tecnologia",
    description: "Diagnóstico eletrónico avançado e equipamentos de última geração.",
  },
  {
    icon: Heart,
    title: "Paixão",
    description: "Equipa de motociclistas que entende a sua mota como ninguém.",
  },
];

export const AboutSection = () => {
  return (
    <section id="sobre" className="py-20 bg-secondary">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Sobre Nós
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-foreground">
            Mais do que uma Oficina, uma Paixão
          </h2>
          <p className="text-muted-foreground text-lg">
            Desde 2008, a MotoTech dedica-se a cuidar das motas dos nossos clientes 
            com a mesma atenção que damos às nossas. Somos uma equipa de entusiastas 
            que respira duas rodas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-elegant hover:shadow-elegant-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
