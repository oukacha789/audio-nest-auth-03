import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BackButton } from "@/components/BackButton";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useLocation } from "react-router-dom";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Le titre doit contenir au moins 2 caractères.",
  }),
  rating: z.string().refine((val) => {
    const rating = parseInt(val);
    return rating >= 1 && rating <= 5;
  }, {
    message: "La note doit être comprise entre 1 et 5.",
  }),
  comment: z.string().min(10, {
    message: "Le commentaire doit contenir au moins 10 caractères.",
  }),
});

export default function Reviews() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      rating: "5",
      comment: "",
    },
  });

  const location = useLocation();

  const getHeaderImage = () => {
    switch (location.pathname) {
      case '/avis':
        return "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2070";
      default:
        return "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070";
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Vous devez être connecté pour soumettre un avis");
        return;
      }

      // Log the submission for now since we haven't created the reviews table yet
      console.log("Soumission de l'avis:", {
        userId: user.id,
        ...values
      });
      
      toast.success("Merci pour votre avis !");
      form.reset();
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      toast.error("Une erreur est survenue lors de la soumission");
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6 relative">
          <BackButton />
          <div className="max-w-2xl mx-auto space-y-6">
            <img 
              src={getHeaderImage()} 
              alt="Avis header" 
              className="w-full h-48 object-cover rounded-lg mb-8"
            />
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Avis & Commentaires</h1>
              <p className="text-muted-foreground">
                Partagez votre expérience et aidez-nous à nous améliorer
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre</FormLabel>
                      <FormControl>
                        <Input placeholder="Donnez un titre à votre avis" {...field} />
                      </FormControl>
                      <FormDescription>
                        Un titre court et descriptif
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          max="5"
                          placeholder="5"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Notez de 1 à 5 étoiles
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Commentaire</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Partagez votre expérience en détail..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Décrivez votre expérience en détail
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Soumettre l'avis</Button>
              </form>
            </Form>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}