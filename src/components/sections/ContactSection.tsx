import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
export const ContactSection = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem Enviada!",
      description: "Entraremos em contacto consigo em breve."
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: ""
    });
  };
  return <section id="contactos" className="py-20 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Contactos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-foreground">
            Entre em Contacto
          </h2>
          <p className="text-muted-foreground text-lg">
            Estamos prontos para ajudar. Visite-nos, ligue ou envie uma mensagem.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="aspect-video rounded-xl overflow-hidden shadow-elegant-lg">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3004.1542889999998!2d-8.6109!3d41.1496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA4JzU4LjYiTiA4wrAzNic0MC0zIlc!5e0!3m2!1spt-PT!2spt!4v1699999999999!5m2!1spt-PT!2spt" width="100%" height="100%" style={{
              border: 0
            }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Localização MotoTech" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Morada</h4>
                  <p className="text-muted-foreground text-sm">
                    Montijo<br />​
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Telefone</h4>
                  <a className="text-muted-foreground text-sm hover:text-accent transition-colors" href="tel:+351910392073">
                    +351 910392073
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Email</h4>
                  <a className="text-muted-foreground text-sm hover:text-accent transition-colors" href="mailto:mecanicomotociclos@gmail.com">
                    mecanicomotociclos@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Horário</h4>
                  <p className="text-muted-foreground text-sm">
                    Seg-Sex: 10h-18h<br />Sáb: 10h-13h
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 shadow-elegant border border-border">
            <h3 className="font-bold text-xl mb-6 text-foreground">Envie-nos uma Mensagem</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nome *
                  </label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-shadow" placeholder="O seu nome" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Telefone
                  </label>
                  <input type="tel" value={formData.phone} onChange={e => setFormData({
                  ...formData,
                  phone: e.target.value
                })} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-shadow" placeholder="+351 912 345 678" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email *
                </label>
                <input type="email" required value={formData.email} onChange={e => setFormData({
                ...formData,
                email: e.target.value
              })} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-shadow" placeholder="o.seu@email.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Serviço Pretendido
                </label>
                <select value={formData.service} onChange={e => setFormData({
                ...formData,
                service: e.target.value
              })} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-shadow">
                  <option value="">Selecione um serviço</option>
                  <option value="revisao">Revisão Completa</option>
                  <option value="oleo">Troca de Óleo</option>
                  <option value="diagnostico">Diagnóstico Eletrónico</option>
                  <option value="pneus">Pneus e Travões</option>
                  <option value="motor">Reparação Motor</option>
                  <option value="customizacao">Customização</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mensagem
                </label>
                <textarea value={formData.message} onChange={e => setFormData({
                ...formData,
                message: e.target.value
              })} rows={4} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-shadow resize-none" placeholder="Descreva o que precisa..." />
              </div>

              <Button type="submit" variant="cta" size="lg" className="w-full">
                <Send className="w-4 h-4" />
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>;
};