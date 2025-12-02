import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import heroImage from "@/assets/hero-workshop.jpg";

export const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Oficina de motas profissional"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-20">
        <div className="max-w-2xl space-y-6 animate-slide-up">
          <span className="inline-block px-4 py-2 bg-accent/20 text-accent-foreground rounded-full text-sm font-medium border border-accent/30">
            ⚙️ Oficina Especializada em Motas
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
            A Sua Mota Merece o{" "}
            <span className="text-accent">Melhor Cuidado</span>
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-xl">
            Mais de 15 anos de experiência. Transparência total. 
            Acompanhe cada detalhe da manutenção da sua mota através da nossa área de cliente.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href="#servicos">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                Agendar Serviço
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
            <a href="tel:+351912345678">
              <Button variant="outline-light" size="xl" className="w-full sm:w-auto">
                <Phone className="w-5 h-5" />
                Ligar Agora
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-8 border-t border-primary-foreground/20 mt-8">
            <div>
              <div className="text-3xl font-bold text-accent">15+</div>
              <div className="text-sm text-primary-foreground/80">Anos de Experiência</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">5000+</div>
              <div className="text-sm text-primary-foreground/80">Motas Reparadas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">98%</div>
              <div className="text-sm text-primary-foreground/80">Clientes Satisfeitos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
