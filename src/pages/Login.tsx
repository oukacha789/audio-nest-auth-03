import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@/components/BackButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthError } from "@supabase/supabase-js";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Redirect to home if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    
    checkUser();

    // Listen for auth changes and handle errors
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event);
        if (session) {
          navigate("/");
        }
        if (event === 'USER_DELETED') {
          setError("Le compte utilisateur a été supprimé.");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleError = (error: AuthError) => {
    console.error("Auth error:", error);
    switch (error.message) {
      case "Invalid login credentials":
        setError("Email ou mot de passe incorrect.");
        break;
      case "Email not confirmed":
        setError("Veuillez confirmer votre email avant de vous connecter.");
        break;
      default:
        setError("Une erreur s'est produite lors de la connexion.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative">
      <BackButton />
      <div className="w-full max-w-md space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Music STUDIO</h1>
          <p className="text-muted-foreground">
            Connectez-vous pour accéder à votre espace
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="bg-card p-6 rounded-lg shadow-sm">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'rgb(var(--primary))',
                    brandAccent: 'rgb(var(--primary))',
                    inputText: 'white',
                    inputBackground: 'rgb(var(--background))',
                    inputPlaceholder: 'rgb(var(--muted-foreground))',
                  },
                },
              },
              className: {
                input: 'text-white',
                label: 'text-white',
              },
            }}
            providers={[]}
            localization={{
              variables: {
                sign_in: {
                  email_label: "Email",
                  password_label: "Mot de passe",
                  button_label: "Se connecter",
                  loading_button_label: "Connexion en cours...",
                  email_input_placeholder: "Votre email",
                  password_input_placeholder: "Votre mot de passe",
                },
                sign_up: {
                  email_label: "Email",
                  password_label: "Mot de passe",
                  button_label: "S'inscrire",
                  loading_button_label: "Inscription en cours...",
                  email_input_placeholder: "Votre email",
                  password_input_placeholder: "Votre mot de passe",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;