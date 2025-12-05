import { useState } from "react";
import { Menu, X, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScheduleDialog } from "@/components/ScheduleDialog";

const navLinks = [{
  href: "#inicio",
  label: "Início"
}, {
  href: "#sobre",
  label: "Sobre Nós"
}, {
  href: "#servicos",
  label: "Serviços"
}, {
  href: "#dicas",
  label: "Dicas"
}, {
  href: "#galeria",
  label: "Galeria"
}, {
  href: "#contactos",
  label: "Contactos"
}];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
            <Wrench className="w-6 h-6 text-accent-foreground" />
          </div>
          <span className="font-bold text-xl text-foreground">Mecânico ao Domicílio </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => <a key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {link.label}
            </a>)}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="#area-cliente">
            <Button variant="outline" size="sm">
              Área Cliente
            </Button>
          </a>
          <ScheduleDialog>
            <Button variant="cta" size="sm">
              Agendar
            </Button>
          </ScheduleDialog>
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-foreground" aria-label="Toggle menu">
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && <div className="md:hidden bg-background border-t border-border">
          <nav className="container py-4 flex flex-col gap-2">
            {navLinks.map(link => <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="py-3 px-4 text-foreground hover:bg-secondary rounded-lg transition-colors">
                {link.label}
              </a>)}
            <div className="pt-4 flex flex-col gap-2">
              <a href="#area-cliente" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Área Cliente
                </Button>
              </a>
              <ScheduleDialog>
                <Button variant="cta" className="w-full">
                  Agendar
                </Button>
              </ScheduleDialog>
            </div>
          </nav>
        </div>}
    </header>;
};