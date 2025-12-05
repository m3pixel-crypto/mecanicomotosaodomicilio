import { useState } from "react";
import { Lightbulb, ZoomIn } from "lucide-react";
import { Lightbox } from "@/components/ui/lightbox";
import maintenanceStages from "@/assets/tips/maintenance-stages.png";
import roadReadyChecklist from "@/assets/tips/road-ready-checklist.png";
import diagnosticGuide from "@/assets/tips/diagnostic-guide.png";
import essentialServices from "@/assets/tips/essential-services.png";

const tips = [
  {
    image: maintenanceStages,
    title: "As 3 Etapas da Manutenção",
    description: "Conheça as fases essenciais para manter a sua mota em perfeitas condições: Inspeção, Diagnóstico e Reparos.",
  },
  {
    image: roadReadyChecklist,
    title: "Checklist Antes de Conduzir",
    description: "Verificações rápidas e essenciais para garantir a sua segurança antes de pegar na estrada.",
  },
  {
    image: diagnosticGuide,
    title: "Guia de Diagnóstico de Avarias",
    description: "Aprenda a identificar os sintomas mais comuns de problemas no motor, transmissão e sistema elétrico.",
  },
  {
    image: essentialServices,
    title: "10 Serviços Essenciais",
    description: "Os serviços de reparação mais importantes para manter a sua mota a funcionar na perfeição.",
  },
];

export const TipsSection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ src: "", alt: "" });

  const openLightbox = (src: string, alt: string) => {
    setSelectedImage({ src, alt });
    setLightboxOpen(true);
  };

  return (
    <section id="dicas" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-4">
            <Lightbulb className="w-4 h-4" />
            <span className="text-sm font-medium">Dicas & Conselhos</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Cuide da Sua Mota
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dicas úteis para manter a sua mota sempre em excelentes condições e garantir a sua segurança na estrada.
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-background rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div
                className="aspect-video overflow-hidden relative group cursor-pointer"
                onClick={() => openLightbox(tip.image, tip.title)}
              >
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {tip.title}
                </h3>
                <p className="text-muted-foreground">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>

        <Lightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          imageSrc={selectedImage.src}
          imageAlt={selectedImage.alt}
        />

        {/* Additional Tips */}
        <div className="mt-16 bg-background rounded-xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Conselhos Rápidos de Manutenção
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-accent font-bold text-xl">1</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Verifique o Óleo Regularmente</h4>
              <p className="text-sm text-muted-foreground">
                O nível de óleo deve ser verificado semanalmente para garantir a lubrificação adequada do motor.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-accent font-bold text-xl">2</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Pressão dos Pneus</h4>
              <p className="text-sm text-muted-foreground">
                Pneus com pressão incorreta afetam a aderência e o consumo de combustível. Verifique mensalmente.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-accent font-bold text-xl">3</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Corrente Limpa e Lubrificada</h4>
              <p className="text-sm text-muted-foreground">
                Limpe e lubrifique a corrente a cada 500km para prolongar a vida útil da transmissão.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
