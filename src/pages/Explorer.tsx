import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BackButton } from "@/components/BackButton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackgroundImage } from "@/components/BackgroundImage";

const Explorer = () => {
  const session = useSession();

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
            <h1 className="text-3xl font-bold">Explorer</h1>
            
            <div className="grid gap-6 md:grid-cols-2">
              {/* Pistes Audio */}
              <Card>
                <CardHeader>
                  <CardTitle>Pistes Audio Sauvegardées</CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingTracks ? (
                    <p>Chargement des pistes...</p>
                  ) : audioTracks?.length ? (
                    <ul className="space-y-2">
                      {audioTracks.map((track) => (
                        <li key={track.id} className="p-2 border rounded">
                          <p className="font-medium">{track.title}</p>
                          <p className="text-sm text-muted-foreground">
                            par {track.artist}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Créé le: {new Date(track.created_at).toLocaleDateString()}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Aucune piste audio trouvée</p>
                  )}
                </CardContent>
              </Card>

              {/* Avis */}
              <Card>
                <CardHeader>
                  <CardTitle>Avis Sauvegardés</CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingReviews ? (
                    <p>Chargement des avis...</p>
                  ) : reviews?.length ? (
                    <ul className="space-y-2">
                      {reviews.map((review) => (
                        <li key={review.id} className="p-2 border rounded">
                          <p className="font-medium">{review.title}</p>
                          <p className="text-sm">Note: {review.rating}/5</p>
                          <p className="text-sm text-muted-foreground">
                            {review.comment}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Créé le: {new Date(review.created_at).toLocaleDateString()}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Aucun avis trouvé</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Explorer;
