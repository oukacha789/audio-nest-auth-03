import { useSession } from "@supabase/auth-helpers-react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@/components/BackButton";

export default function Home() {
  const session = useSession();
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto p-8 relative">
          <BackButton />
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold">Bienvenue sur votre espace musical</h1>
            
            {session ? (
              <div className="grid gap-6">
                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold">Que souhaitez-vous faire ?</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Button 
                      className="h-32 text-lg"
                      onClick={() => navigate('/repertoire')}
                    >
                      Gérer mon répertoire musical
                    </Button>
                    <Button 
                      className="h-32 text-lg"
                      onClick={() => navigate('/explorer')}
                    >
                      Explorer de nouvelles musiques
                    </Button>
                    <Button 
                      className="h-32 text-lg"
                      onClick={() => navigate('/avis')}
                    >
                      Voir les avis et commentaires
                    </Button>
                    <Button 
                      className="h-32 text-lg"
                      onClick={() => navigate('/parametres')}
                    >
                      Gérer mes paramètres
                    </Button>
                  </div>
                </section>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-lg text-muted-foreground">
                  Connectez-vous pour accéder à votre espace musical
                </p>
                <Button 
                  className="mt-4"
                  onClick={() => navigate('/login')}
                >
                  Se connecter
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}