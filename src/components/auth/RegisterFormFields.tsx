import type { FormData } from "./RegisterForm";
import UsernameField from "./form-fields/UsernameField";
import EmailField from "./form-fields/EmailField";
import PasswordField from "./form-fields/PasswordField";
import AvatarField from "./form-fields/AvatarField";

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
      <UsernameField 
        value={formData.username}
        onChange={handleInputChange}
      />

      <EmailField 
        value={formData.email}
        onChange={handleInputChange}
      />

      <PasswordField
        id="password"
        label="Mot de passe"
        value={formData.password}
        onChange={handleInputChange}
      />

      <PasswordField
        id="confirmPassword"
        label="Confirmer le mot de passe"
        value={formData.confirmPassword}
        onChange={handleInputChange}
      />

      <AvatarField
        onChange={handleAvatarChange}
        preview={avatarPreview}
      />
    </div>
  );
};

export default RegisterFormFields;