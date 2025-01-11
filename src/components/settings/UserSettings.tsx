import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { SettingsFormValues } from "@/pages/Settings";

interface UserSettingsProps {
  form: UseFormReturn<SettingsFormValues>;
}

export const UserSettings = ({ form }: UserSettingsProps) => {
  return (
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
  );
};