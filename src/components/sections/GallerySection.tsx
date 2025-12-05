import { useState } from "react";
import hondaBefore from "@/assets/gallery/honda-before.jpg";
import hondaAfter from "@/assets/gallery/honda-after.jpg";
import kawasakiBefore from "@/assets/gallery/kawasaki-before.jpg";
import kawasakiAfter from "@/assets/gallery/kawasaki-after.jpg";
import yamahaBefore from "@/assets/gallery/yamaha-before.jpg";
import yamahaAfter from "@/assets/gallery/yamaha-after.jpg";
import bmwBefore from "@/assets/gallery/bmw-before.jpg";
import bmwAfter from "@/assets/gallery/bmw-after.jpg";

const galleryImages = [
  {
    id: 1,
    before: hondaBefore,
    after: hondaAfter,
    title: "Revisão Completa de Motor",
  },
  {
    id: 2,
    before: kawasakiBefore,
    after: kawasakiAfter,
    title: "Manutenção de Travões",
  },
  {
    id: 3,
    before: yamahaBefore,
    after: yamahaAfter,
    title: "Substituição de Corrente e Kit",
  },
  {
    id: 4,
    before: bmwBefore,
    after: bmwAfter,
    title: "Troca de Óleo e Filtro",
  },
];

export const GallerySection = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="galeria" className="py-20 bg-secondary">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Galeria
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-foreground">
            Os Nossos Trabalhos
          </h2>
          <p className="text-muted-foreground text-lg">
            Veja algumas das transformações que realizamos. 
            Passe o rato sobre as imagens para ver o antes e depois.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {galleryImages.map((item) => (
            <div
              key={item.id}
              className="relative rounded-xl overflow-hidden aspect-video cursor-pointer group"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Before Image */}
              <img
                src={item.before}
                alt={`${item.title} - Antes`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  hoveredId === item.id ? "opacity-0" : "opacity-100"
                }`}
              />
              {/* After Image */}
              <img
                src={item.after}
                alt={`${item.title} - Depois`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  hoveredId === item.id ? "opacity-100" : "opacity-0"
                }`}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-primary-foreground font-bold text-lg">{item.title}</h3>
                <span className={`text-sm font-medium transition-colors ${
                  hoveredId === item.id ? "text-accent" : "text-primary-foreground/80"
                }`}>
                  {hoveredId === item.id ? "Depois" : "Antes"} • Passe o rato para ver
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
