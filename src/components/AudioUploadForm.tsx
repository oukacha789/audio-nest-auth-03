import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "@supabase/auth-helpers-react";
import { Music, Settings2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type FormData = {
  title: string;
  artist: string;
  description: string;
  audioFile: FileList;
};

type AudioTrack = {
  id: string;
  title: string;
  artist: string;
  description: string;
  file_path: string;
};

export default function AudioUploadForm({ track, onUpdate }: { track?: AudioTrack; onUpdate?: () => void }) {
  const session = useSession();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const form = useForm<FormData>({
    defaultValues: {
      title: track?.title || "",
      artist: track?.artist || "",
      description: track?.description || "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Form data:", data);

    if (!session?.user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour télécharger un fichier audio",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);

      if (track?.id) {
        // Update existing track
        const { error: updateError } = await supabase
          .from("audio_tracks")
          .update({
            title: data.title,
            artist: data.artist,
            description: data.description,
          })
          .eq("id", track.id);

        if (updateError) throw updateError;

        toast({
          title: "Succès",
          description: "La piste audio a été mise à jour avec succès",
        });

        setIsEditing(false);
        if (onUpdate) onUpdate();
      } else {
        // Upload new track
        const file = data.audioFile?.[0];
        if (!file) {
          toast({
            title: "Erreur",
            description: "Veuillez sélectionner un fichier audio",
            variant: "destructive",
          });
          return;
        }

        console.log("Starting upload for file:", file.name);

        const fileExt = file.name.split(".").pop();
        const filePath = `${session.user.id}/${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from("audio")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        console.log("File uploaded successfully:", filePath);

        const { error: dbError } = await supabase.from("audio_tracks").insert({
          title: data.title,
          artist: data.artist,
          description: data.description,
          file_path: filePath,
          user_id: session.user.id,
        });

        if (dbError) throw dbError;

        toast({
          title: "Succès",
          description: "Le fichier audio a été téléchargé avec succès",
        });

        form.reset();
      }
    } catch (error) {
      console.error("Upload/Update error:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'opération",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (!isEditing && track) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{track.title}</h3>
            <p className="text-sm text-muted-foreground">{track.artist}</p>
            {track.description && (
              <p className="text-sm mt-2">{track.description}</p>
            )}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsEditing(true)}
            className="ml-2"
          >
            <Settings2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          rules={{ required: "Le titre est requis" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input placeholder="Titre de la piste" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="artist"
          rules={{ required: "L'artiste est requis" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Artiste</FormLabel>
              <FormControl>
                <Input placeholder="Nom de l'artiste" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description de la piste"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!track && (
          <FormField
            control={form.control}
            name="audioFile"
            rules={{ required: "Le fichier audio est requis" }}
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormLabel>Fichier Audio</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files?.length) {
                        onChange(files);
                      }
                    }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex gap-2">
          <Button type="submit" disabled={isUploading} className="flex-1">
            {isUploading ? (
              "Traitement en cours..."
            ) : track ? (
              "Mettre à jour"
            ) : (
              <>
                <Music className="mr-2 h-4 w-4" />
                Télécharger
              </>
            )}
          </Button>
          {track && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Annuler
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}