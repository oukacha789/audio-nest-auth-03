import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "@supabase/auth-helpers-react";
import { Music } from "lucide-react";
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

export default function AudioUploadForm() {
  const session = useSession();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  
  const form = useForm<FormData>({
    defaultValues: {
      title: "",
      artist: "",
      description: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Form data:", data); // Debug log

    if (!session?.user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour télécharger un fichier audio",
        variant: "destructive",
      });
      return;
    }

    const file = data.audioFile?.[0];
    if (!file) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier audio",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      console.log("Starting upload for file:", file.name);

      // Upload to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const filePath = `${session.user.id}/${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from("audio")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      console.log("File uploaded successfully:", filePath);

      // Save metadata to database
      const { error: dbError } = await supabase.from("audio_tracks").insert({
        title: data.title,
        artist: data.artist,
        description: data.description,
        file_path: filePath,
        user_id: session.user.id,
      });

      if (dbError) {
        throw dbError;
      }

      toast({
        title: "Succès",
        description: "Le fichier audio a été téléchargé avec succès",
      });

      form.reset();
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du téléchargement",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

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

        <Button type="submit" disabled={isUploading} className="w-full">
          {isUploading ? (
            "Téléchargement en cours..."
          ) : (
            <>
              <Music className="mr-2 h-4 w-4" />
              Télécharger
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}