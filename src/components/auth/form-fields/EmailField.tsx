import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

interface EmailFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailField = ({ value, onChange }: EmailFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <div className="relative">
        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          id="email"
          name="email"
          type="email"
          required
          className="pl-10 bg-background"
          placeholder="votre@email.com"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default EmailField;