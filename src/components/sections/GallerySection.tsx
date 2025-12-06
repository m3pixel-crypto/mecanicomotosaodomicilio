import { useState } from "react";
import { ZoomIn, ChevronLeft, ChevronRight, X } from "lucide-react";
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAfter, setShowAfter] = useState(false);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setShowAfter(false);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const navigatePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    setShowAfter(false);
  };

  const navigateNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    setShowAfter(false);
  };

  const toggleBeforeAfter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAfter((prev) => !prev);
  };

  const currentImage = galleryImages[currentImageIndex];

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
          {galleryImages.map((item, index) => (
            <div
              key={item.id}
              className="relative rounded-xl overflow-hidden aspect-video cursor-pointer group"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => openLightbox(index)}
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
              
              {/* Zoom Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-5 h-5 text-foreground" />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-primary-foreground font-bold text-lg">{item.title}</h3>
                <span className={`text-sm font-medium transition-colors ${
                  hoveredId === item.id ? "text-accent" : "text-primary-foreground/80"
                }`}>
                  {hoveredId === item.id ? "Depois" : "Antes"} • Clique para ampliar
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && currentImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
            aria-label="Fechar"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation Prev */}
          <button
            onClick={navigatePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 hover:bg-background/40 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation Next */}
          <button
            onClick={navigateNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 hover:bg-background/40 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Próxima imagem"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Container */}
          <div className="flex flex-col items-center max-w-[90vw] max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img
                src={showAfter ? currentImage.after : currentImage.before}
                alt={`${currentImage.title} - ${showAfter ? "Depois" : "Antes"}`}
                className="max-w-[90vw] max-h-[75vh] object-contain rounded-lg animate-scale-in"
              />
            </div>

            {/* Title and Toggle */}
            <div className="mt-4 text-center">
              <h3 className="text-white font-bold text-xl mb-3">{currentImage.title}</h3>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={toggleBeforeAfter}
                  className={`px-4 py-2 rounded-l-full font-medium transition-colors ${
                    !showAfter 
                      ? "bg-accent text-accent-foreground" 
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  Antes
                </button>
                <button
                  onClick={toggleBeforeAfter}
                  className={`px-4 py-2 rounded-r-full font-medium transition-colors ${
                    showAfter 
                      ? "bg-accent text-accent-foreground" 
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  Depois
                </button>
              </div>
              <p className="text-white/50 text-sm mt-2">
                {currentImageIndex + 1} / {galleryImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
