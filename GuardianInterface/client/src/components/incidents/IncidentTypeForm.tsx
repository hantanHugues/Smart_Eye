import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { IncidentType } from "@/lib/types";
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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveIcon, XIcon } from "@/lib/icons";

const formSchema = z.object({
  name: z.string().min(3, "Le nom doit comporter au moins 3 caractères"),
  description: z.string().nullable().optional(),
  severity: z.enum(["high", "medium", "low"]),
  icon: z.string().nullable().optional(),
});

interface IncidentTypeFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  incidentType?: IncidentType | null;
}

export default function IncidentTypeForm({ open, setOpen, incidentType }: IncidentTypeFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: incidentType?.name || "",
      description: incidentType?.description || null,
      severity: (incidentType?.severity as any) || "medium",
      icon: incidentType?.icon || null,
    },
  });
  
  const createIncidentType = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      return apiRequest('/api/incident-types', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Type d'incident ajouté",
        description: "Le type d'incident a été ajouté avec succès.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/incident-types'] });
      setOpen(false);
      form.reset({
        name: "",
        description: null,
        severity: "medium",
        icon: null,
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout du type d'incident.",
        variant: "destructive",
      });
      console.error(error);
    },
  });
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createIncidentType.mutate(data);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] bg-dark-light text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-heading">
            {incidentType ? "Modifier le type d'incident" : "Ajouter un type d'incident"}
          </DialogTitle>
          <DialogDescription>
            {incidentType 
              ? `Modifiez les détails du type d'incident ${incidentType.name}.` 
              : "Configurez un nouveau type d'incident pour la détection et la classification des alertes."}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du type d'incident</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Incendie, intrusion, etc."
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optionnelle)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description détaillée de ce type d'incident..."
                      className="bg-dark-lighter border-gray-700 text-white min-h-[80px]"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="severity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Niveau de gravité</FormLabel>
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
                disabled={createIncidentType.isPending}
              >
                <SaveIcon className="mr-2 h-4 w-4" />
                {createIncidentType.isPending ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}