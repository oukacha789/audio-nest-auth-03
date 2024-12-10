import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BackButton } from "@/components/BackButton";

const formSchema = z.object({
  theme: z.enum(["default", "classic"]),
  notifications: z.boolean().default(true),
  username: z.string().min(2).max(50),
  volume: z.number().min(0).max(100),
  autoplay: z.boolean().default(false),
  quality: z.enum(["auto", "high", "medium", "low"]),
});

type SettingsFormValues = z.infer<typeof formSchema>;

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

  function onSubmit(data: SettingsFormValues) {
    console.log("Settings updated:", data);
    toast({
      title: "Paramètres mis à jour",
      description: "Vos préférences ont été enregistrées avec succès.",
    });
  }

  return (
    <div className="container max-w-2xl py-10 relative">
      <BackButton />
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Paramètres</h1>
        <p className="text-muted-foreground">
          Personnalisez l'apparence et le comportement de votre application.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thème visuel</FormLabel>
                <FormDescription>
                  Choisissez l'apparence générale de l'application
                </FormDescription>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="default" id="default" />
                      <label htmlFor="default" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Moderne
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="classic" id="classic" />
                      <label htmlFor="classic" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Classique
                      </label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom d'utilisateur</FormLabel>
                <FormDescription>
                  Ce nom sera affiché sur votre profil
                </FormDescription>
                <FormControl>
                  <Input placeholder="Votre nom d'utilisateur" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="volume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Volume par défaut</FormLabel>
                <FormDescription>
                  Réglez le volume de lecture par défaut
                </FormDescription>
                <FormControl>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    defaultValue={[field.value]}
                    onValueChange={(vals) => field.onChange(vals[0])}
                    className="w-full"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qualité audio</FormLabel>
                <FormDescription>
                  Définissez la qualité de lecture par défaut
                </FormDescription>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-4 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="auto" id="auto" />
                      <label htmlFor="auto" className="text-sm font-medium leading-none">
                        Auto
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high" />
                      <label htmlFor="high" className="text-sm font-medium leading-none">
                        Haute
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <label htmlFor="medium" className="text-sm font-medium leading-none">
                        Moyenne
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low" />
                      <label htmlFor="low" className="text-sm font-medium leading-none">
                        Basse
                      </label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notifications"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Notifications</FormLabel>
                  <FormDescription>
                    Recevoir des notifications sur les nouveautés
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="autoplay"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Lecture automatique</FormLabel>
                  <FormDescription>
                    Lancer automatiquement la lecture des morceaux
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit">Enregistrer les modifications</Button>
        </form>
      </Form>
    </div>
  );
}
