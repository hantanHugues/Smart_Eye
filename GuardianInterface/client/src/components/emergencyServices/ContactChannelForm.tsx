import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { EmergencyService, ContactChannel } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveIcon, XIcon } from "@/lib/icons";

const formSchema = z.object({
  serviceId: z.number(),
  channelType: z.enum(["email", "sms", "whatsapp", "telegram"]),
  contactValue: z.string().min(3, "Veuillez entrer une valeur valide"),
  isActive: z.boolean().default(true),
});

interface ContactChannelFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  service: EmergencyService | null;
}

export default function ContactChannelForm({ open, setOpen, service }: ContactChannelFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceId: service?.id || 0,
      channelType: "email",
      contactValue: "",
      isActive: true,
    },
  });
  
  // Update service ID when service changes
  if (service && form.getValues().serviceId !== service.id) {
    form.setValue("serviceId", service.id);
  }
  
  const createChannel = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      return apiRequest('/api/contact-channels', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Canal de contact ajouté",
        description: "Le canal de contact a été ajouté avec succès.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/emergency-services'] });
      setOpen(false);
      form.reset({
        serviceId: service?.id || 0,
        channelType: "email",
        contactValue: "",
        isActive: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout du canal de contact.",
        variant: "destructive",
      });
      console.error(error);
    },
  });
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createChannel.mutate(data);
  };
  
  // Helper pour obtenir le placeholder et la validation selon le type de canal
  const getChannelInfo = (type: string) => {
    switch (type) {
      case "email":
        return {
          placeholder: "contact@example.com",
          label: "Adresse e-mail",
          validate: (value: string) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value) || "Veuillez entrer une adresse e-mail valide";
          }
        };
      case "sms":
        return {
          placeholder: "+33612345678",
          label: "Numéro de téléphone",
          validate: (value: string) => {
            const phoneRegex = /^\+[0-9]{10,15}$/;
            return phoneRegex.test(value) || "Veuillez entrer un numéro de téléphone valide (format: +33612345678)";
          }
        };
      case "whatsapp":
        return {
          placeholder: "+33612345678",
          label: "Numéro WhatsApp",
          validate: (value: string) => {
            const phoneRegex = /^\+[0-9]{10,15}$/;
            return phoneRegex.test(value) || "Veuillez entrer un numéro WhatsApp valide (format: +33612345678)";
          }
        };
      case "telegram":
        return {
          placeholder: "@username ou +33612345678",
          label: "Identifiant Telegram",
          validate: (value: string) => {
            return value.startsWith("@") || value.startsWith("+") || "Veuillez entrer un identifiant Telegram valide (@username ou +33612345678)";
          }
        };
      default:
        return {
          placeholder: "Valeur de contact",
          label: "Valeur",
          validate: () => true
        };
    }
  };
  
  const selectedChannelType = form.watch("channelType");
  const channelInfo = getChannelInfo(selectedChannelType);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] bg-dark-light text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-heading">Ajouter un canal de contact</DialogTitle>
          <DialogDescription>
            {service ? (
              <>Configurez un nouveau canal de contact pour <strong>{service.name}</strong>.</>
            ) : (
              <>Configurez un nouveau canal de contact.</>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="channelType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de canal</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-dark-lighter border-gray-700 text-white">
                        <SelectValue placeholder="Sélectionnez un type de canal" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-dark-lighter border-gray-700 text-white">
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="telegram">Telegram</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contactValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{channelInfo.label}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={channelInfo.placeholder}
                      className="bg-dark-lighter border-gray-700 text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
                className="bg-dark-darker text-white border-gray-700 hover:bg-dark"
              >
                <XIcon className="mr-2 h-4 w-4" />
                Annuler
              </Button>
              <Button 
                type="submit"
                className="bg-primary text-white hover:bg-primary-light"
                disabled={createChannel.isPending}
              >
                <SaveIcon className="mr-2 h-4 w-4" />
                {createChannel.isPending ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}