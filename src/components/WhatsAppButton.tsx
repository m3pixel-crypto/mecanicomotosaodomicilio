import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/351912345678?text=Olá! Gostaria de agendar um serviço."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-success rounded-full flex items-center justify-center shadow-elegant-xl hover:scale-110 transition-transform animate-float"
      aria-label="Contactar via WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-accent-foreground" />
    </a>
  );
};
