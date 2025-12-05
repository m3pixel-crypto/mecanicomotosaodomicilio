import { Settings, Droplets, Zap, CircleDot, Wrench, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScheduleDialog } from "@/components/ScheduleDialog";

const services = [
  {
    icon: Settings,
    title: "Revisão Completa",
    description: "Inspeção de 50 pontos, filtros, velas e regulações.",
    price: "Desde 150€",
  },
  {
    icon: Droplets,
    title: "Troca de óleo de motor + Filtro de óleo",
    description: "Óleo premium e filtro de óleo incluído.",
    price: "Desde 75€",
  },
  {
    icon: Zap,
    title: "Diagnóstico de falhas e problemas",
    description: "Leitura de erros e programação de centralinas.",
    price: "Desde 35€",
  },
  {
    icon: CircleDot,
    title: "Pneus e Travões",
    description: "Montagem, calibração e substituição de pastilhas.",
    price: "Sob consulta",
  },
  {
    icon: Wrench,
    title: "Reparação Motor",
    description: "Retificação, juntas, válvulas e embraiagem.",
    price: "Sob consulta",
  },
  {
    icon: Palette,
    title: "Restauros e Customizações",
    description: "Escapes, suspensões, acessórios e pintura.",
    price: "Sob consulta",
  },
];

export const ServicesSection = () => {
  return (
    <section id="servicos" className="py-20 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Serviços
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-foreground">
            Tudo o que a Sua Mota Precisa
          </h2>
          <p className="text-muted-foreground text-lg">
            Oferecemos uma gama completa de serviços para manter a sua mota 
            em perfeitas condições. Preços transparentes, qualidade garantida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 hover:shadow-elegant-lg transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                  <service.icon className="w-6 h-6 text-foreground group-hover:text-accent transition-colors" />
                </div>
                <span className="text-accent font-bold text-sm">{service.price}</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
              <ScheduleDialog preselectedService={service.title}>
                <Button variant="outline" size="sm" className="w-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-colors">
                  Agendar
                </Button>
              </ScheduleDialog>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
