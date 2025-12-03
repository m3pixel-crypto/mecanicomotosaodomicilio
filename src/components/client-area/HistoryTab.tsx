import { useState } from "react";
import { Calendar, Clock, Building, User, Plus, CheckCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Motorcycle, ServiceRecord, useServiceHistory } from "@/hooks/useMotorcycles";
import { AddServiceDialog } from "./AddServiceDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HistoryTabProps {
  motorcycles: Motorcycle[];
}

export const HistoryTab = ({ motorcycles }: HistoryTabProps) => {
  const [selectedMotoId, setSelectedMotoId] = useState<string>(
    motorcycles[0]?.id || ""
  );
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const { services, loading, addService, deleteService } = useServiceHistory(
    selectedMotoId || null
  );

  const selectedMoto = motorcycles.find((m) => m.id === selectedMotoId);

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem a certeza que deseja remover este registo?")) {
      await deleteService(id);
    }
  };

  if (motorcycles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Adicione uma mota primeiro para ver o histórico de serviços.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Motorcycle selector */}
      {motorcycles.length > 1 && (
        <div className="mb-6">
          <Select value={selectedMotoId} onValueChange={setSelectedMotoId}>
            <SelectTrigger className="w-full md:w-72">
              <SelectValue placeholder="Selecione uma mota" />
            </SelectTrigger>
            <SelectContent>
              {motorcycles.map((moto) => (
                <SelectItem key={moto.id} value={moto.id}>
                  {moto.brand} {moto.model} ({moto.plate})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Service list */}
      {loading ? (
        <div className="text-center py-8 text-muted-foreground">
          A carregar histórico...
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Ainda não há registos de serviços para esta mota.
          </p>
        </div>
      ) : (
        services.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 bg-secondary rounded-xl group"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                item.source === "oficina" ? "bg-accent/10" : "bg-muted"
              }`}
            >
              {item.source === "oficina" ? (
                <Building className="w-5 h-5 text-accent" />
              ) : (
                <User className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">
                  {item.service_description}
                </span>
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
                  {new Date(item.service_date).toLocaleDateString("pt-PT")}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {item.km_at_service.toLocaleString()} km
                </span>
              </div>
            </div>
            <CheckCircle className="w-5 h-5 text-success" />
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive"
              onClick={() => handleDelete(item.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))
      )}

      <Button
        variant="outline"
        className="w-full"
        onClick={() => setAddDialogOpen(true)}
        disabled={!selectedMotoId}
      >
        <Plus className="w-4 h-4 mr-2" />
        Adicionar Registo Manual
      </Button>

      {selectedMoto && (
        <AddServiceDialog
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          motorcycleId={selectedMotoId}
          currentKm={selectedMoto.current_km}
          onAdd={addService}
        />
      )}
    </div>
  );
};
