import { X } from "lucide-react";
import { useEffect } from "react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

export const Lightbox = ({ isOpen, onClose, imageSrc, imageAlt }: LightboxProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 animate-fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white hover:text-accent transition-colors"
        aria-label="Fechar"
      >
        <X className="w-8 h-8" />
      </button>
      <img
        src={imageSrc}
        alt={imageAlt}
        className="max-w-[90vw] max-h-[90vh] object-contain animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};
