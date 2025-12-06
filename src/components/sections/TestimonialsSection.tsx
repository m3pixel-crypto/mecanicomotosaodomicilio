import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ricardo Mendes",
    role: "Honda Africa Twin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    text: "Fiz a revisão completa da minha Africa Twin e fiquei impressionado! A inspeção de 50 pontos detetou problemas que nem imaginava. Muito profissionais.",
  },
  {
    id: 2,
    name: "Ana Costa",
    role: "Yamaha MT-09",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    text: "A troca de óleo e filtro foi rápida e o preço muito justo. Usaram óleo premium e a mota ficou a ronronar. Recomendo vivamente!",
  },
  {
    id: 3,
    name: "Miguel Ferreira",
    role: "BMW R1250GS",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 5,
    text: "O diagnóstico de falhas identificou exatamente o problema da minha GS em minutos. A leitura de erros e reprogramação da centralina resolveu tudo!",
  },
  {
    id: 4,
    name: "Sofia Rodrigues",
    role: "Kawasaki Z900",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    text: "Troquei pneus e pastilhas de travão aqui. A montagem foi perfeita e a calibração impecável. Agora sinto muito mais confiança nas curvas!",
  },
  {
    id: 5,
    name: "Pedro Santos",
    role: "Ducati Monster 821",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 5,
    text: "A reparação do motor da minha Ducati foi um trabalho de mestre. Retificaram, trocaram juntas e válvulas. Ficou como nova, melhor até!",
  },
  {
    id: 6,
    name: "Joana Martins",
    role: "Triumph Bonneville T120",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    rating: 5,
    text: "O restauro da minha Bonneville clássica ficou espetacular! Novo escape, suspensão ajustada e uma pintura personalizada de sonho. Arte pura!",
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
