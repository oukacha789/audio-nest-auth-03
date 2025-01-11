import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BackButton } from "@/components/BackButton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BackgroundImage } from "@/components/BackgroundImage";
import { AudioTracksCard } from "@/components/explorer/AudioTracksCard";
import { ReviewsCard } from "@/components/explorer/ReviewsCard";

const Explorer = () => {
  const { data: audioTracks, isLoading: loadingTracks } = useQuery({
    queryKey: ["audioTracks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("audio_tracks")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) {
        console.error("Erreur lors du chargement des pistes:", error);
        throw error;
      }
      return data;
    },
  });

  const { data: reviews, isLoading: loadingReviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) {
        console.error("Erreur lors du chargement des avis:", error);
        throw error;
      }
      return data;
    },
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <BackgroundImage />
        <AppSidebar />
        <main className="flex-1 p-6 relative">
          <BackButton />
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold">Explorer</h1>
              <img 
                src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=150" 
                alt="Vinyles"
                className="w-48 h-48 rounded-full object-cover shadow-lg"
              />
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <AudioTracksCard audioTracks={audioTracks} isLoading={loadingTracks} />
              <ReviewsCard reviews={reviews} isLoading={loadingReviews} />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Explorer;