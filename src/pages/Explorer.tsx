import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Search, Filter, Music2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Track {
  id: string;
  title: string;
  artist: string;
  description: string | null;
  duration: number | null;
}

export default function Explorer() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: tracks, isLoading } = useQuery({
    queryKey: ["tracks", searchTerm],
    queryFn: async () => {
      console.log("Fetching tracks with search term:", searchTerm);
      const query = supabase
        .from("audio_tracks")
        .select("*")
        .order("created_at", { ascending: false });

      if (searchTerm) {
        query.or(`title.ilike.%${searchTerm}%,artist.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching tracks:", error);
        throw error;
      }
      
      console.log("Fetched tracks:", data);
      return data as Track[];
    },
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mx-auto p-6 space-y-8 animate-fade-in">
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold">Explorer</h1>
        <p className="text-muted-foreground">
          Découvrez tous les morceaux disponibles
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par titre ou artiste..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filtres
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Skeletons pendant le chargement
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))
        ) : tracks?.length ? (
          tracks.map((track) => (
            <Card
              key={track.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music2 className="h-5 w-5" />
                  {track.title}
                </CardTitle>
                <CardDescription>{track.artist}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {track.description || "Aucune description disponible"}
                </p>
                {track.duration && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Durée: {Math.floor(track.duration / 60)}:
                    {(track.duration % 60).toString().padStart(2, "0")}
                  </p>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">
              Aucun morceau trouvé{searchTerm ? " pour votre recherche" : ""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}