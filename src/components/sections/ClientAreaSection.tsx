import { useState } from "react";
import { 
  User, Bike, Calendar, AlertTriangle, CheckCircle, 
  Plus, FileText, Clock, Building, Pencil 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const mockClient = {
  name: "João Silva",
  email: "joao.silva@email.com",
  since: "2021",
};

const mockMotorcycle = {
  brand: "Yamaha",
  model: "MT-07",
  year: 2022,
  plate: "XX-00-XX",
  km: 12500,
};

const mockHistory = [
  {
    id: 1,
    date: "15 Nov 2024",
    service: "Troca de Óleo + Filtro",
    km: 12000,
    source: "oficina",
    status: "completed",
  },
  {
    id: 2,
    date: "10 Ago 2024",
    service: "Revisão 10.000km",
    km: 10200,
    source: "oficina",
    status: "completed",
  },
  {
    id: 3,
    date: "20 Jul 2024",
    service: "Troca de Pneu Traseiro",
    km: 9800,
    source: "cliente",
    status: "completed",
  },
  {
    id: 4,
    date: "05 Mar 2024",
    service: "Pastilhas de Travão",
    km: 7500,
    source: "oficina",
    status: "completed",
  },
];

export const ClientAreaSection = () => {
  const [activeTab, setActiveTab] = useState<"garagem" | "historico">("garagem");
  
  // Simple alert calculation
  const kmSinceLastService = mockMotorcycle.km - mockHistory[0].km;
  const needsService = kmSinceLastService >= 5000;

  return (
    <section id="area-cliente" className="py-20 bg-secondary">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Área de Cliente
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-foreground">
            A Sua Garagem Virtual
          </h2>
          <p className="text-muted-foreground text-lg">
            Acompanhe toda a manutenção da sua mota num só lugar. 
            Receba alertas, consulte histórico e agende serviços.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Demo Dashboard */}
          <div className="bg-card rounded-2xl shadow-elegant-lg overflow-hidden border border-border">
            {/* Header */}
            <div className="bg-primary p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center">
                  <User className="w-7 h-7 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-primary-foreground font-bold text-lg">{mockClient.name}</h3>
                  <p className="text-primary-foreground/70 text-sm">Cliente desde {mockClient.since}</p>
                </div>
              </div>
              
              {needsService && (
                <div className="flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-lg border border-accent/30">
                  <AlertTriangle className="w-5 h-5 text-accent" />
                  <span className="text-accent-foreground text-sm font-medium">
                    Revisão em breve ({kmSinceLastService}km desde última)
                  </span>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="border-b border-border flex">
              <button
                onClick={() => setActiveTab("garagem")}
                className={`flex-1 py-4 px-6 text-sm font-medium transition-colors relative ${
                  activeTab === "garagem"
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <Bike className="w-4 h-4" />
                  A Minha Garagem
                </span>
                {activeTab === "garagem" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("historico")}
                className={`flex-1 py-4 px-6 text-sm font-medium transition-colors relative ${
                  activeTab === "historico"
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" />
                  Histórico de Serviços
                </span>
                {activeTab === "historico" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                )}
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === "garagem" && (
                <div className="space-y-6">
                  {/* Motorcycle Card */}
                  <div className="bg-secondary rounded-xl p-6 flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-48 h-32 bg-muted rounded-lg flex items-center justify-center">
                      <Bike className="w-16 h-16 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-xl text-foreground">
                            {mockMotorcycle.brand} {mockMotorcycle.model}
                          </h4>
                          <p className="text-muted-foreground">
                            {mockMotorcycle.year} • {mockMotorcycle.plate}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-card rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-foreground">
                            {mockMotorcycle.km.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">KM Atuais</div>
                        </div>
                        <div className="bg-card rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-foreground">4</div>
                          <div className="text-xs text-muted-foreground">Serviços</div>
                        </div>
                        <div className="bg-card rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-accent">500</div>
                          <div className="text-xs text-muted-foreground">Km para Revisão</div>
                        </div>
                        <div className="bg-card rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-success">OK</div>
                          <div className="text-xs text-muted-foreground">Estado</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Outra Mota
                  </Button>
                </div>
              )}

              {activeTab === "historico" && (
                <div className="space-y-4">
                  {mockHistory.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 bg-secondary rounded-xl"
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        item.source === "oficina" ? "bg-accent/10" : "bg-muted"
                      }`}>
                        {item.source === "oficina" ? (
                          <Building className="w-5 h-5 text-accent" />
                        ) : (
                          <User className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">{item.service}</span>
                          {item.source === "oficina" && (
                            <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">
                              Oficina
                            </span>
                          )}
                          {item.source === "cliente" && (
                            <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">
                              Cliente
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {item.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {item.km.toLocaleString()} km
                          </span>
                        </div>
                      </div>
                      <CheckCircle className="w-5 h-5 text-success" />
                    </div>
                  ))}

                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Registo Manual
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Esta é uma demonstração. Crie a sua conta para aceder à sua garagem virtual.
            </p>
            <Button variant="cta" size="lg">
              Criar Conta Gratuita
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
