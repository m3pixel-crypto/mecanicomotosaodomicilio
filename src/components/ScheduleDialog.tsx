import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const services = [
  "Revisão Completa",
  "Troca de óleo de motor + Filtro de óleo",
  "Diagnóstico de falhas e problemas",
  "Pneus e Travões",
  "Reparação Motor",
  "Customização",
  "Outro",
];

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const scheduleSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
  phone: z.string().min(9, "Telefone inválido").max(20),
  email: z.string().email("Email inválido").max(255),
  service: z.string().min(1, "Selecione um serviço"),
  date: z.date({ required_error: "Selecione uma data" }),
  time: z.string().min(1, "Selecione um horário"),
  location: z.string().min(5, "Indique a morada").max(200),
  motorcycle: z.string().max(100).optional(),
  notes: z.string().max(500).optional(),
});

type ScheduleFormData = z.infer<typeof scheduleSchema>;

interface ScheduleDialogProps {
  children: React.ReactNode;
  preselectedService?: string;
}

export const ScheduleDialog = ({ children, preselectedService }: ScheduleDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: preselectedService || "",
      location: "",
      motorcycle: "",
      notes: "",
    },
  });

  // Update service when preselectedService changes
  useState(() => {
    if (preselectedService) {
      form.setValue("service", preselectedService);
    }
  });

  const onSubmit = async (data: ScheduleFormData) => {
    setIsSubmitting(true);
    
    // Format WhatsApp message
    const formattedDate = format(data.date, "dd/MM/yyyy", { locale: pt });
    const message = `*Novo Agendamento*
    
📋 *Serviço:* ${data.service}
📅 *Data:* ${formattedDate}
🕐 *Horário:* ${data.time}

👤 *Nome:* ${data.name}
📱 *Telefone:* ${data.phone}
📧 *Email:* ${data.email}

📍 *Morada:* ${data.location}
🏍️ *Mota:* ${data.motorcycle || "Não especificado"}

📝 *Observações:* ${data.notes || "Nenhuma"}`;

    const whatsappUrl = `https://wa.me/351910392073?text=${encodeURIComponent(message)}`;
    
    // Simulate a small delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    window.open(whatsappUrl, "_blank");
    
    toast({
      title: "Pedido enviado!",
      description: "Será redirecionado para o WhatsApp para confirmar o agendamento.",
    });
    
    setIsSubmitting(false);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Agendar Serviço</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para agendar o seu serviço ao domicílio.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome *</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone *</FormLabel>
                    <FormControl>
                      <Input placeholder="912 345 678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="seu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serviço *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o serviço" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy", { locale: pt })
                            ) : (
                              <span>Selecione</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date.getDay() === 0
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione">
                            {field.value && (
                              <span className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {field.value}
                              </span>
                            )}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Morada do Serviço *</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua, nº, cidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="motorcycle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca/Modelo da Mota</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Honda CB500F 2020" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva o problema ou informações adicionais..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="cta"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "A enviar..." : "Confirmar Agendamento"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
