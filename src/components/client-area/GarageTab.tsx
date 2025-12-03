import { useState } from "react";
import { Bike, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Motorcycle, useServiceHistory } from "@/hooks/useMotorcycles";
import { AddMotorcycleDialog } from "./AddMotorcycleDialog";
import { EditMotorcycleDialog } from "./EditMotorcycleDialog";

interface GarageTabProps {
  motorcycles: Motorcycle[];
  onAdd: (data: Omit<Motorcycle, "id" | "user_id" | "created_at" | "updated_at">) => Promise<any>;
  onUpdate: (id: string, data: Partial<Omit<Motorcycle, "id" | "user_id" | "created_at" | "updated_at">>) => Promise<any>;
  onDelete: (id: string) => Promise<any>;
}

export const GarageTab = ({ motorcycles, onAdd, onUpdate, onDelete }: GarageTabProps) => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedMoto, setSelectedMoto] = useState<Motorcycle | null>(null);

  const handleEdit = (moto: Motorcycle) => {
    setSelectedMoto(moto);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem a certeza que deseja remover esta mota?")) {
      await onDelete(id);
    }
  };

  if (motorcycles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Bike className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          A sua garagem está vazia
        </h3>
        <p className="text-muted-foreground mb-6">
          Adicione a sua primeira mota para começar a acompanhar a manutenção.
        </p>
        <Button variant="cta" onClick={() => setAddDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Mota
        </Button>

        <AddMotorcycleDialog
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          onAdd={onAdd}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {motorcycles.map((moto) => (
        <MotorcycleCard
          key={moto.id}
          motorcycle={moto}
          onEdit={() => handleEdit(moto)}
          onDelete={() => handleDelete(moto.id)}
        />
      ))}

      <Button
        variant="outline"
        className="w-full"
        onClick={() => setAddDialogOpen(true)}
      >
        <Plus className="w-4 h-4 mr-2" />
        Adicionar Outra Mota
      </Button>

      <AddMotorcycleDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onAdd={onAdd}
      />

      {selectedMoto && (
        <EditMotorcycleDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          motorcycle={selectedMoto}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

const MotorcycleCard = ({
  motorcycle,
  onEdit,
  onDelete,
}: {
  motorcycle: Motorcycle;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const { services } = useServiceHistory(motorcycle.id);
  const lastService = services[0];
  const kmSinceLastService = lastService
    ? motorcycle.current_km - lastService.km_at_service
    : motorcycle.current_km;
  const nextServiceIn = Math.max(0, 5000 - kmSinceLastService);

  return (
    <div className="bg-secondary rounded-xl p-6 flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-48 h-32 bg-muted rounded-lg flex items-center justify-center">
        <Bike className="w-16 h-16 text-muted-foreground" />
      </div>
      <div className="flex-1 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-bold text-xl text-foreground">
              {motorcycle.brand} {motorcycle.model}
            </h4>
            <p className="text-muted-foreground">
              {motorcycle.year} • {motorcycle.plate}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={onEdit}>
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={onDelete}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-foreground">
              {motorcycle.current_km.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">KM Atuais</div>
          </div>
          <div className="bg-card rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-foreground">
              {services.length}
            </div>
            <div className="text-xs text-muted-foreground">Serviços</div>
          </div>
          <div className="bg-card rounded-lg p-3 text-center">
            <div
              className={`text-2xl font-bold ${
                nextServiceIn <= 500 ? "text-accent" : "text-foreground"
              }`}
            >
              {nextServiceIn.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Km para Revisão</div>
          </div>
          <div className="bg-card rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-success">OK</div>
            <div className="text-xs text-muted-foreground">Estado</div>
          </div>
        </div>
      </div>
    </div>
  );
};
