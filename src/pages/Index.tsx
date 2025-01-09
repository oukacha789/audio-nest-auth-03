import { useSession } from "@supabase/auth-helpers-react";
import AudioUploadForm from "@/components/AudioUploadForm";
import AudioList from "@/components/AudioList";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BackButton } from "@/components/BackButton";
import { BackgroundImage } from "@/components/BackgroundImage";

export default function Index() {
  const session = useSession();

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <BackgroundImage />
        <AppSidebar />
        <main className="flex-1 overflow-y-auto p-8 relative">
          <BackButton />
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold">Mon Répertoire</h1>
            
            {session ? (
              <>
                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold">Ajouter une piste</h2>
                  <AudioUploadForm />
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold">Mes pistes audio</h2>
                  <AudioList />
                </section>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-lg text-muted-foreground">
                  Connectez-vous pour accéder à votre répertoire musical
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
