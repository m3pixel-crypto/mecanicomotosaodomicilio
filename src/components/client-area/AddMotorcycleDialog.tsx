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
import { Motorcycle } from "@/hooks/useMotorcycles";

const motorcycleSchema = z.object({
  brand: z.string().trim().min(1, "Marca é obrigatória").max(50),
  model: z.string().trim().min(1, "Modelo é obrigatório").max(50),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  plate: z.string().trim().min(1, "Matrícula é obrigatória").max(20),
  current_km: z.number().min(0, "KM deve ser positivo"),
});

interface AddMotorcycleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (data: Omit<Motorcycle, "id" | "user_id" | "created_at" | "updated_at">) => Promise<any>;
}

export const AddMotorcycleDialog = ({
  open,
  onOpenChange,
  onAdd,
}: AddMotorcycleDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    plate: "",
    current_km: 0,
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

    const result = motorcycleSchema.safeParse(formData);
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
      const { error } = await onAdd(formData);
      if (error) {
        toast({
          title: "Erro",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Mota adicionada!",
          description: `${formData.brand} ${formData.model} foi adicionada à sua garagem.`,
        });
        onOpenChange(false);
        setFormData({
          brand: "",
          model: "",
          year: new Date().getFullYear(),
          plate: "",
          current_km: 0,
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
          <DialogTitle>Adicionar Mota</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="brand">Marca</Label>
              <Input
                id="brand"
                name="brand"
                placeholder="Ex: Yamaha"
                value={formData.brand}
                onChange={handleChange}
                className={errors.brand ? "border-destructive" : ""}
              />
              {errors.brand && (
                <p className="text-xs text-destructive">{errors.brand}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Modelo</Label>
              <Input
                id="model"
                name="model"
                placeholder="Ex: MT-07"
                value={formData.model}
                onChange={handleChange}
                className={errors.model ? "border-destructive" : ""}
              />
              {errors.model && (
                <p className="text-xs text-destructive">{errors.model}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Ano</Label>
              <Input
                id="year"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                className={errors.year ? "border-destructive" : ""}
              />
              {errors.year && (
                <p className="text-xs text-destructive">{errors.year}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="plate">Matrícula</Label>
              <Input
                id="plate"
                name="plate"
                placeholder="Ex: XX-00-XX"
                value={formData.plate}
                onChange={handleChange}
                className={errors.plate ? "border-destructive" : ""}
              />
              {errors.plate && (
                <p className="text-xs text-destructive">{errors.plate}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="current_km">Quilometragem Atual</Label>
            <Input
              id="current_km"
              name="current_km"
              type="number"
              value={formData.current_km}
              onChange={handleChange}
              className={errors.current_km ? "border-destructive" : ""}
            />
            {errors.current_km && (
              <p className="text-xs text-destructive">{errors.current_km}</p>
            )}
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
