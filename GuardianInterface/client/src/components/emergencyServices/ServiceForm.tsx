import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { EmergencyService, IncidentType } from "@/lib/types";
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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveIcon, XIcon } from "@/lib/icons";

const formSchema = z.object({
  name: z.string().min(3, "Le nom doit comporter au moins 3 caractères"),
  priorityLevel: z.enum(["high", "medium", "low"]),
  icon: z.string().nullable().optional(),
  status: z.enum(["active", "pending"]),
  incidentTypeIds: z.array(z.number()),
});

interface ServiceFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  service?: EmergencyService | null;
}

export default function ServiceForm({ open, setOpen, service }: ServiceFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedIncidentTypes, setSelectedIncidentTypes] = useState<number[]>([]);
  
  const { data: incidentTypes = [] } = useQuery<IncidentType[]>({
    queryKey: ['/api/incident-types'],
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: service?.name || "",
      priorityLevel: (service?.priorityLevel as any) || "medium",
      icon: service?.icon || null,
      status: (service?.status as any) || "active",
      incidentTypeIds: [],
    },
  });
  
  // Mettre à jour le formulaire si le service change
  useEffect(() => {
    if (service) {
      form.reset({
        name: service.name,
        priorityLevel: (service.priorityLevel as any),
        icon: service.icon,
        status: (service.status as any),
        incidentTypeIds: [],  // Nous n'avons pas cette information ici
      });
    }
  }, [service, form]);
  
  const createService = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      return apiRequest('/api/emergency-services', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          priorityLevel: data.priorityLevel,
          icon: data.icon,
          status: data.status,
        }),
      });
    },
    onSuccess: async (newService: any) => {
      // Si des types d'incidents sont sélectionnés, créer les associations
      if (selectedIncidentTypes.length > 0) {
        for (const typeId of selectedIncidentTypes) {
          try {
            await apiRequest('/api/service-incident-types', {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                serviceId: newService.id,
                incidentTypeId: typeId,
              }),
            });
          } catch (error) {
            console.error("Erreur lors de la création de l'association:", error);
          }
        }
      }
      
      toast({
        title: "Service d'urgence ajouté",
        description: "Le service d'urgence a été ajouté avec succès.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/emergency-services'] });
      setOpen(false);
      form.reset({
        name: "",
        priorityLevel: "medium",
        icon: null,
        status: "active",
        incidentTypeIds: [],
      });
      setSelectedIncidentTypes([]);
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout du service d'urgence.",
        variant: "destructive",
      });
      console.error(error);
    },
  });
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    data.incidentTypeIds = selectedIncidentTypes;
    createService.mutate(data);
  };
  
  const handleIncidentTypeChange = (typeId: number, checked: boolean) => {
    if (checked) {
      setSelectedIncidentTypes(prev => [...prev, typeId]);
    } else {
      setSelectedIncidentTypes(prev => prev.filter(id => id !== typeId));
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] bg-dark-light text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-heading">
            {service ? "Modifier le service d'urgence" : "Ajouter un service d'urgence"}
          </DialogTitle>
          <DialogDescription>
            {service 
              ? `Modifiez les détails du service ${service.name}.` 
              : "Configurez un nouveau service d'urgence et associez-le à des types d'incidents."}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom du service</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Pompiers"
                          className="bg-dark-lighter border-gray-700 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="priorityLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Niveau de priorité</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-dark-lighter border-gray-700 text-white">
                            <SelectValue placeholder="Sélectionnez un niveau" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-dark-lighter border-gray-700 text-white">
                          <SelectItem value="high">Haute</SelectItem>
                          <SelectItem value="medium">Moyenne</SelectItem>
                          <SelectItem value="low">Basse</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Statut</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-dark-lighter border-gray-700 text-white">
                            <SelectValue placeholder="Sélectionnez un statut" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-dark-lighter border-gray-700 text-white">
                          <SelectItem value="active">Actif</SelectItem>
                          <SelectItem value="pending">En configuration</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-4">
                <FormItem>
                  <FormLabel>Types d'incidents associés</FormLabel>
                  <FormDescription className="text-gray-400">
                    Sélectionnez les types d'incidents que ce service gère.
                  </FormDescription>
                  <div className="space-y-2 mt-2">
                    {incidentTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`incident-${type.id}`}
                          checked={selectedIncidentTypes.includes(type.id)}
                          onCheckedChange={(checked) => 
                            handleIncidentTypeChange(type.id, checked as boolean)
                          }
                          className="border-gray-600 data-[state=checked]:bg-primary"
                        />
                        <label
                          htmlFor={`incident-${type.id}`}
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          {type.name} ({type.severity})
                        </label>
                      </div>
                    ))}
                  </div>
                </FormItem>
              </div>
            </div>
            
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
                disabled={createService.isPending}
              >
                <SaveIcon className="mr-2 h-4 w-4" />
                {createService.isPending ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}