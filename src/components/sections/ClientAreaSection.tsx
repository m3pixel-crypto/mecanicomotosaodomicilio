import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Bike, FileText, AlertTriangle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useMotorcycles, useServiceHistory } from "@/hooks/useMotorcycles";
import { GarageTab } from "@/components/client-area/GarageTab";
import { HistoryTab } from "@/components/client-area/HistoryTab";

export const ClientAreaSection = () => {
  const [activeTab, setActiveTab] = useState<"garagem" | "historico">("garagem");
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();

  const {
    motorcycles,
    loading: motosLoading,
    addMotorcycle,
    updateMotorcycle,
    deleteMotorcycle,
  } = useMotorcycles();

  const firstMoto = motorcycles[0];
  const { services } = useServiceHistory(firstMoto?.id || null);
  const lastService = services[0];
  const kmSinceLastService = firstMoto && lastService
    ? firstMoto.current_km - lastService.km_at_service
    : 0;
  const needsService = kmSinceLastService >= 5000;

  const handleSignOut = async () => {
    await signOut();
  };

  if (!user && !authLoading) {
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
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl shadow-elegant-lg border border-border p-8 md:p-12 text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bike className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Crie a sua conta gratuita</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Registe as suas motas, acompanhe o histórico de manutenção e receba alertas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="cta" size="lg" onClick={() => navigate("/auth")}>
                  Criar Conta Gratuita
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate("/auth")}>
                  Já tenho conta
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (authLoading || motosLoading) {
    return (
      <section id="area-cliente" className="py-20 bg-secondary">
        <div className="container text-center">
          <div className="animate-pulse">A carregar...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="area-cliente" className="py-20 bg-secondary">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Área de Cliente</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-foreground">A Sua Garagem Virtual</h2>
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl shadow-elegant-lg border border-border">
            <div className="bg-primary p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center">
                  <User className="w-7 h-7 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-primary-foreground font-bold text-lg">
                    {user?.user_metadata?.name || user?.email?.split("@")[0]}
                  </h3>
                  <p className="text-primary-foreground/70 text-sm">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {needsService && firstMoto && (
                  <div className="flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-lg border border-accent/30">
                    <AlertTriangle className="w-5 h-5 text-accent" />
                    <span className="text-accent-foreground text-sm font-medium">
                      Revisão em breve ({kmSinceLastService}km)
                    </span>
                  </div>
                )}
                <Button variant="ghost" size="sm" className="text-primary-foreground/70 hover:text-primary-foreground" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            </div>
            <div className="border-b border-border flex">
              <button onClick={() => setActiveTab("garagem")} className={`flex-1 py-4 px-6 text-sm font-medium transition-colors relative ${activeTab === "garagem" ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}>
                <span className="flex items-center justify-center gap-2"><Bike className="w-4 h-4" />A Minha Garagem</span>
                {activeTab === "garagem" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
              </button>
              <button onClick={() => setActiveTab("historico")} className={`flex-1 py-4 px-6 text-sm font-medium transition-colors relative ${activeTab === "historico" ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}>
                <span className="flex items-center justify-center gap-2"><FileText className="w-4 h-4" />Histórico de Serviços</span>
                {activeTab === "historico" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
              </button>
            </div>
            <div className="p-6">
              {activeTab === "garagem" && <GarageTab motorcycles={motorcycles} onAdd={addMotorcycle} onUpdate={updateMotorcycle} onDelete={deleteMotorcycle} />}
              {activeTab === "historico" && <HistoryTab motorcycles={motorcycles} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
