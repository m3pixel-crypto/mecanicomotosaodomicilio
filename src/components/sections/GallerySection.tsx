import { useState } from "react";

const galleryImages = [
  {
    id: 1,
    before: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
    after: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600",
    title: "Honda CB500F - Revisão Completa",
  },
  {
    id: 2,
    before: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600",
    after: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600",
    title: "Kawasaki Z900 - Customização",
  },
  {
    id: 3,
    before: "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?w=600",
    after: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=600",
    title: "Yamaha MT-07 - Escape e Suspensão",
  },
  {
    id: 4,
    before: "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=600",
    after: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600",
    title: "BMW R1250GS - Manutenção Viagem",
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
