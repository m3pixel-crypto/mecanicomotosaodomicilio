import { useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ServiceRecord } from "@/hooks/useMotorcycles";

const serviceSchema = z.object({
  service_date: z.string().min(1, "Data é obrigatória"),
  service_description: z.string().trim().min(1, "Descrição é obrigatória").max(200),
  km_at_service: z.number().min(0, "KM deve ser positivo"),
});

interface AddServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  motorcycleId: string;
  currentKm: number;
  onAdd: (data: Omit<ServiceRecord, "id" | "created_at">) => Promise<any>;
}

export const AddServiceDialog = ({
  open,
  onOpenChange,
  motorcycleId,
  currentKm,
  onAdd,
}: AddServiceDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    service_date: new Date().toISOString().split("T")[0],
    service_description: "",
    km_at_service: currentKm,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = serviceSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const { error } = await onAdd({
        ...formData,
        motorcycle_id: motorcycleId,
        source: "cliente",
      });
      if (error) {
        toast({
          title: "Erro",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Serviço registado!",
          description: "O registo foi adicionado ao histórico.",
        });
        onOpenChange(false);
        setFormData({
          service_date: new Date().toISOString().split("T")[0],
          service_description: "",
          km_at_service: currentKm,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Registo de Serviço</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="service_description">Descrição do Serviço</Label>
            <Input
              id="service_description"
              name="service_description"
              placeholder="Ex: Troca de óleo"
              value={formData.service_description}
              onChange={handleChange}
              className={errors.service_description ? "border-destructive" : ""}
            />
            {errors.service_description && (
              <p className="text-xs text-destructive">{errors.service_description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="service_date">Data</Label>
              <Input
                id="service_date"
                name="service_date"
                type="date"
                value={formData.service_date}
                onChange={handleChange}
                className={errors.service_date ? "border-destructive" : ""}
              />
              {errors.service_date && (
                <p className="text-xs text-destructive">{errors.service_date}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="km_at_service">KM no Serviço</Label>
              <Input
                id="km_at_service"
                name="km_at_service"
                type="number"
                value={formData.km_at_service}
                onChange={handleChange}
                className={errors.km_at_service ? "border-destructive" : ""}
              />
              {errors.km_at_service && (
                <p className="text-xs text-destructive">{errors.km_at_service}</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="cta" className="flex-1" disabled={loading}>
              {loading ? "A adicionar..." : "Adicionar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
