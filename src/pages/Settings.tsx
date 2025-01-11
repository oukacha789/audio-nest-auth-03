import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BackButton } from "@/components/BackButton";
import { ThemeSettings } from "@/components/settings/ThemeSettings";
import { UserSettings } from "@/components/settings/UserSettings";
import { AudioSettings } from "@/components/settings/AudioSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { useLocation } from "react-router-dom";

const formSchema = z.object({
  theme: z.enum(["default", "classic"]),
  notifications: z.boolean().default(true),
  username: z.string().min(2).max(50),
  volume: z.number().min(0).max(100),
  autoplay: z.boolean().default(false),
  quality: z.enum(["auto", "high", "medium", "low"]),
});

export type SettingsFormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<SettingsFormValues> = {
  theme: "default",
  notifications: true,
  username: "",
  volume: 80,
  autoplay: false,
  quality: "auto",
};

export default function Settings() {
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const location = useLocation();

  const getHeaderImage = () => {
    switch (location.pathname) {
      case '/parametres':
        return "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070";
      default:
        return "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070";
    }
  };

  function onSubmit(data: SettingsFormValues) {
    console.log("Settings updated:", data);
    toast({
      title: "Paramètres mis à jour",
      description: "Vos préférences ont été enregistrées avec succès.",
    });
  }

  return (
    <div className="container max-w-2xl py-10">
      <BackButton />
      <img 
        src={getHeaderImage()} 
        alt="Paramètres header" 
        className="w-full h-48 object-cover rounded-lg mb-8"
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Paramètres</h1>
        <p className="text-muted-foreground">
          Personnalisez l'apparence et le comportement de votre application.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <ThemeSettings form={form} />
          <UserSettings form={form} />
          <AudioSettings form={form} />
          <NotificationSettings form={form} />
          <Button type="submit">Enregistrer les modifications</Button>
        </form>
      </Form>
    </div>
  );
}