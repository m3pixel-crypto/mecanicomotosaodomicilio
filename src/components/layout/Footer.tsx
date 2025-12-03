import { Wrench, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
export const Footer = () => {
  return <footer className="bg-primary text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Wrench className="w-6 h-6 text-accent-foreground" />
              </div>
              <span className="font-bold text-xl">Mecânico ao Domicílio </span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              A sua oficina de confiança para motas. Mais de 15 anos de experiência, 
              tecnologia de ponta e paixão pelo que fazemos.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors" aria-label="Youtube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#inicio" className="hover:text-accent transition-colors">Início</a></li>
              <li><a href="#sobre" className="hover:text-accent transition-colors">Sobre Nós</a></li>
              <li><a href="#servicos" className="hover:text-accent transition-colors">Serviços</a></li>
              <li><a href="#galeria" className="hover:text-accent transition-colors">Galeria</a></li>
              <li><a href="#area-cliente" className="hover:text-accent transition-colors">Área Cliente</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Revisões Completas</li>
              <li>Troca de Óleo</li>
              <li>Diagnóstico Eletrónico</li>
              <li>Pneus e Travões</li>
              <li>Customização</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contactos</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                <span>Rua cidade de Portimão <br />​2870 Montijo </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0" />
                <a className="hover:text-accent transition-colors" href="tel:+351910392073">
                  +351 910 392 073  
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0" />
                <a href="mailto:info@mototech.pt" className="hover:text-accent transition-colors">
                  info@mototech.pt
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} MotoTech. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>;
};