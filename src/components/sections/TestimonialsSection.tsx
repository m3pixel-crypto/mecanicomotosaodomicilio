import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ricardo Mendes",
    role: "Honda Africa Twin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    text: "Excelente serviço! A área de cliente é fantástica, consigo ver todo o histórico da minha mota e receber alertas de manutenção. Muito profissionais.",
  },
  {
    id: 2,
    name: "Ana Costa",
    role: "Yamaha MT-09",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    text: "Finalmente uma oficina que me trata como uma verdadeira motociclista! Transparência total nos orçamentos e qualidade impecável.",
  },
  {
    id: 3,
    name: "Miguel Ferreira",
    role: "BMW R1250GS",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 5,
    text: "Levo a minha GS aqui há 3 anos. A equipa conhece a mota como ninguém. O sistema de lembretes já me salvou de várias situações.",
  },
];

export const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Testemunhos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-foreground">
            O Que Dizem os Nossos Clientes
          </h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center shadow-elegant">
                    <Quote className="w-10 h-10 text-accent/30 mx-auto mb-6" />
                    
                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                      ))}
                    </div>

                    <p className="text-lg md:text-xl text-foreground mb-8 italic">
                      "{testimonial.text}"
                    </p>

                    <div className="flex items-center justify-center gap-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-accent/20"
                      />
                      <div className="text-left">
                        <div className="font-bold text-foreground">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 rounded-full bg-card border border-border shadow-elegant flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 rounded-full bg-card border border-border shadow-elegant flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  current === index ? "bg-accent w-8" : "bg-border hover:bg-muted-foreground"
                }`}
                aria-label={`Ir para testemunho ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
