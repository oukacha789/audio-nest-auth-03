import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock } from "lucide-react";
import type { FormData } from "./RegisterForm";

interface RegisterFormFieldsProps {
  formData: FormData;
  avatarPreview: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RegisterFormFields = ({
  formData,
  avatarPreview,
  handleInputChange,
  handleAvatarChange,
}: RegisterFormFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Nom d'utilisateur</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="username"
            name="username"
            type="text"
            required
            className="pl-10"
            placeholder="Votre nom d'utilisateur"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="pl-10"
            placeholder="votre@email.com"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="pl-10"
            placeholder="Votre mot de passe"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            className="pl-10"
            placeholder="Confirmez votre mot de passe"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="avatar">Avatar (optionnel)</Label>
        <Input
          id="avatar"
          name="avatar"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
        />
        {avatarPreview && (
          <div className="mt-2">
            <img
              src={avatarPreview}
              alt="Avatar preview"
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterFormFields;