import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { SettingsFormValues } from "@/pages/Settings";

interface ThemeSettingsProps {
  form: UseFormReturn<SettingsFormValues>;
}

export const ThemeSettings = ({ form }: ThemeSettingsProps) => {
  return (
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
  );
};