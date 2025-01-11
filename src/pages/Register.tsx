import RegisterForm from "@/components/auth/RegisterForm";
import { BackButton } from "@/components/BackButton";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <BackButton />
      <div className="w-full h-48 mt-12 mb-6 max-w-3xl overflow-hidden rounded-lg">
        <img 
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070" 
          alt="Création de compte" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Créer un compte</h1>
          <p className="text-muted-foreground">
            Remplissez le formulaire ci-dessous pour vous inscrire
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;