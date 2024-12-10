import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
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