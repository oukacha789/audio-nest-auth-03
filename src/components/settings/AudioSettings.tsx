import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { UseFormReturn } from "react-hook-form";
import { SettingsFormValues } from "@/pages/Settings";

interface AudioSettingsProps {
  form: UseFormReturn<SettingsFormValues>;
}

export const AudioSettings = ({ form }: AudioSettingsProps) => {
  return (
    <>
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
    </>
  );
};