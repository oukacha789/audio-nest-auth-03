import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";

interface UsernameFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UsernameField = ({ value, onChange }: UsernameFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="username">Nom d'utilisateur</Label>
      <div className="relative">
        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          id="username"
          name="username"
          type="text"
          required
          className="pl-10 bg-background"
          placeholder="Votre nom d'utilisateur"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default UsernameField;