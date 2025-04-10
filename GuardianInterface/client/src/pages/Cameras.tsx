import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  RefreshIcon, PlusIcon, EditIcon, SettingsIcon, 
  CheckboxIcon, AlertCircleIcon, XIcon, SaveIcon
} from "@/lib/icons";
import { useToast } from "@/hooks/use-toast";
import { Camera } from "@/lib/types";
import MapComponent from "@/components/map/MapComponent";
import { LatLngExpression } from "leaflet";
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

const formSchema = z.object({
  name: z.string().min(3, "Le nom doit comporter au moins 3 caractères"),
  streamUrl: z.string().url("URL de flux invalide"),
  status: z.enum(["active", "inactive"]),
  location: z.string().min(5, "Veuillez sélectionner une position sur la carte"),
});

export default function Cameras() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([48.8566, 2.3522]); // Paris par défaut
  const [mapZoom, setMapZoom] = useState(10);
  const [tempLocation, setTempLocation] = useState<string>("");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: cameras = [], isLoading } = useQuery<Camera[]>({
    queryKey: ['/api/cameras'],
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      streamUrl: "",
      status: "active",
      location: "",
    },
  });
  
  const createCamera = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      return apiRequest('/api/cameras', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Caméra ajoutée",
        description: "La caméra a été ajoutée avec succès.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/cameras'] });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de la caméra.",
        variant: "destructive",
      });
      console.error(error);
    },
  });
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createCamera.mutate(data);
  };
  
  const handleMapClick = (e: { latlng: { lat: number; lng: number } }) => {
    const { lat, lng } = e.latlng;
    const locationString = `${lat.toFixed(6)},${lng.toFixed(6)}`;
    setTempLocation(locationString);
    form.setValue('location', locationString);
  };
  
  const handleCameraClick = (camera: Camera) => {
    setSelectedCamera(camera);
    const [lat, lng] = camera.location.split(',').map(coord => parseFloat(coord));
    setMapCenter([lat, lng]);
    setMapZoom(15);
  };
  
  const openNewCameraDialog = () => {
    form.reset();
    setIsDialogOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-heading font-bold text-white">Gestion des caméras</h1>
        <div className="flex space-x-2">
          <button 
            className="bg-dark-light px-3 py-2 rounded-md text-sm flex items-center hover:bg-dark-lighter transition-colors"
            onClick={() => queryClient.invalidateQueries({ queryKey: ['/api/cameras'] })}
          >
            <RefreshIcon className="mr-2" />
            <span>Actualiser</span>
          </button>
          <button 
            className="bg-primary text-white px-3 py-2 rounded-md text-sm flex items-center hover:bg-primary-light transition-colors"
            onClick={openNewCameraDialog}
          >
            <PlusIcon className="mr-2" />
            <span>Ajouter une caméra</span>
          </button>
        </div>
      </div>
      
      {/* Carte des caméras - masquée quand le formulaire d'ajout est ouvert */}
      {!isDialogOpen && (
        <div className="bg-dark-light rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-dark-lighter">
            <h3 className="font-heading font-semibold text-white">Cartographie des caméras</h3>
          </div>
          <div className="p-4">
            <div className="h-[400px] rounded-lg overflow-hidden">
              {!isLoading && cameras && (
                <MapComponent 
                  cameras={cameras} 
                  center={mapCenter}
                  zoom={mapZoom}
                  height="400px"
                  onMarkerClick={handleCameraClick}
                  selectedCamera={selectedCamera}
                />
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Liste des caméras */}
      <div className="bg-dark-light rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b border-dark-lighter flex justify-between items-center">
          <h3 className="font-heading font-semibold text-white">Toutes les caméras</h3>
          <input
            type="text"
            placeholder="Rechercher une caméra..."
            className="bg-dark-lighter text-gray-300 pl-3 pr-3 py-1 rounded-md text-sm border border-gray-700 focus:outline-none focus:border-primary-light w-48"
          />
        </div>
        
        {isLoading ? (
          <div className="p-8 text-center text-gray-400">
            Chargement des caméras...
          </div>
        ) : cameras && cameras.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {cameras.map((camera: Camera) => (
              <div 
                key={camera.id} 
                className={`bg-dark-darker rounded-lg overflow-hidden shadow card hover:border hover:border-primary transition-colors cursor-pointer ${selectedCamera?.id === camera.id ? 'border border-primary' : ''}`}
                onClick={() => handleCameraClick(camera)}
              >
                <div className="relative h-40 bg-black">
                  <div className="absolute top-2 right-2 flex items-center z-10">
                    <span className={`animate-pulse ${camera.status === 'active' ? 'bg-success' : 'bg-danger'} rounded-full h-2 w-2 mr-1`}></span>
                    <span className="text-xs text-white bg-dark bg-opacity-70 px-1.5 py-0.5 rounded">
                      {camera.status === 'active' ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white">{camera.name}</h3>
                      <p className="text-xs text-gray-400 mt-1">
                        Position: {camera.location.split(',').map(c => parseFloat(c).toFixed(4)).join(', ')}
                      </p>
                    </div>
                    <div className="flex">
                      <button className="text-gray-400 hover:text-white p-1">
                        <EditIcon />
                      </button>
                      <button className="text-gray-400 hover:text-white p-1">
                        <SettingsIcon />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center text-xs text-gray-400">
                      {camera.status === 'active' ? (
                        <>
                          <CheckboxIcon className="text-success mr-1" />
                          <span>Opérationnelle</span>
                        </>
                      ) : (
                        <>
                          <AlertCircleIcon className="text-danger mr-1" />
                          <span>Déconnectée</span>
                        </>
                      )}
                    </div>
                    <button className="bg-primary text-white px-2 py-1 rounded text-xs">
                      Voir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-400">
            Aucune caméra configurée. Ajoutez votre première caméra pour commencer.
          </div>
        )}
      </div>
      
      {/* Dialogue d'ajout de caméra */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[650px] bg-dark-light text-white border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl font-heading">Ajouter une nouvelle caméra</DialogTitle>
            <DialogDescription>
              Configurez les détails de votre nouvelle caméra de surveillance.
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
                        <FormLabel>Nom de la caméra</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Entrée principale"
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
                    name="streamUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL du flux vidéo</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="rtsp://example.com/stream"
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
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emplacement</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Cliquez sur la carte pour définir"
                            className="bg-dark-lighter border-gray-700 text-white"
                            {...field}
                            readOnly
                            value={tempLocation || field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="h-[250px] rounded-lg overflow-hidden">
                  <MapComponent 
                    cameras={[]}
                    height="250px"
                    onMapClick={handleMapClick}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  className="bg-dark-darker text-white border-gray-700 hover:bg-dark"
                >
                  <XIcon className="mr-2 h-4 w-4" />
                  Annuler
                </Button>
                <Button 
                  type="submit"
                  className="bg-primary text-white hover:bg-primary-light"
                  disabled={createCamera.isPending}
                >
                  <SaveIcon className="mr-2 h-4 w-4" />
                  {createCamera.isPending ? "Enregistrement..." : "Enregistrer"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
