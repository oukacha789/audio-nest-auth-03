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
            <h1 className="text-3xl font-bold">Music STUDIO</h1>
            
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