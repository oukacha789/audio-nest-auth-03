import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { RecentTracks } from "@/components/RecentTracks";
import { PopularTracks } from "@/components/PopularTracks";
import { BackButton } from "@/components/BackButton";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
      }
    };
    
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          navigate("/login");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6 relative">
          <BackButton />
          <div className="space-y-6">
            <div className="relative h-[300px] w-full rounded-lg overflow-hidden mb-8">
              <img
                src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"
                alt="Music Studio Hero"
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent">
                <div className="absolute bottom-0 left-0 p-8">
                  <h1 className="text-4xl font-bold text-white mb-2">Music STUDIO</h1>
                  <p className="text-white/80 text-lg">Votre espace musical personnalisé</p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Morceaux Récents</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentTracks />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Les Plus Populaires</CardTitle>
                </CardHeader>
                <CardContent>
                  <PopularTracks />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;