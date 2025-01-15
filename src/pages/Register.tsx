import RegisterForm from "@/components/auth/RegisterForm";
import { BackButton } from "@/components/BackButton";
import { AppSidebar } from "@/components/AppSidebar";

const Register = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <AppSidebar />
      <div className="flex-1 p-4">
        <div className="w-full">
          <BackButton />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-2">
              <div className="w-full h-48 mb-6 overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070" 
                  alt="Création de compte" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-2xl font-bold">Créer un compte</h1>
              <p className="text-muted-foreground">
                Remplissez le formulaire ci-dessous pour vous inscrire
              </p>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;