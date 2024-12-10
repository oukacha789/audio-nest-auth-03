import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import RegisterFormFields from "./RegisterFormFields";

export type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      setLoading(true);
      console.log("Tentative d'inscription avec l'email:", formData.email);
      
      // First, check if user exists in the profiles table
      const { data: existingUser, error: checkError } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', formData.username)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error("Erreur lors de la vérification de l'utilisateur:", checkError);
        toast.error("Une erreur est survenue lors de la vérification de l'utilisateur");
        return;
      }

      if (existingUser) {
        toast.error("Ce nom d'utilisateur est déjà utilisé");
        return;
      }
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username
          }
        }
      });

      if (authError) {
        console.error("Erreur d'authentification:", authError);
        
        // Gestion spécifique de l'erreur "User already registered"
        if (authError.message.includes("User already registered")) {
          toast.error("Cette adresse email est déjà utilisée. Veuillez vous connecter ou utiliser une autre adresse.");
          return;
        }
        
        throw authError;
      }

      if (authData.user) {
        console.log("Utilisateur créé avec succès:", authData.user.id);
        
        let avatarUrl = "";
        if (avatar) {
          const fileExt = avatar.name.split('.').pop();
          const fileName = `${authData.user.id}.${fileExt}`;
          
          console.log("Upload de l'avatar...");
          const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(fileName, avatar);

          if (uploadError) {
            console.error("Erreur lors de l'upload de l'avatar:", uploadError);
            throw uploadError;
          }

          const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(fileName);
          
          avatarUrl = publicUrl;
          console.log("Avatar uploadé avec succès:", avatarUrl);
        }

        console.log("Mise à jour du profil...");
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            username: formData.username,
            avatar_url: avatarUrl || null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', authData.user.id);

        if (updateError) {
          console.error("Erreur lors de la mise à jour du profil:", updateError);
          throw updateError;
        }

        toast.success("Inscription réussie !");
        navigate("/");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      toast.error("Erreur lors de l'inscription. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <RegisterFormFields
        formData={formData}
        avatarPreview={avatarPreview}
        handleInputChange={handleInputChange}
        handleAvatarChange={handleAvatarChange}
      />

      <div className="space-y-4">
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Inscription en cours..." : "S'inscrire"}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => navigate("/login")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à la connexion
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;