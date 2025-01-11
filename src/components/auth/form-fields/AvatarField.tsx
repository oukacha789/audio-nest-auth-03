import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AvatarFieldProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  preview: string;
}

const AvatarField = ({ onChange, preview }: AvatarFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="avatar">Avatar (optionnel)</Label>
      <Input
        id="avatar"
        name="avatar"
        type="file"
        accept="image/*"
        className="bg-background"
        onChange={onChange}
      />
      {preview && (
        <div className="mt-2">
          <img
            src={preview}
            alt="Avatar preview"
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default AvatarField;