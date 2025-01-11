import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Database } from "@/integrations/supabase/types";

type AudioTrack = Database["public"]["Tables"]["audio_tracks"]["Row"];

interface AudioTracksCardProps {
  audioTracks: AudioTrack[] | null;
  isLoading: boolean;
}

export const AudioTracksCard = ({ audioTracks, isLoading }: AudioTracksCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link 
            to="/repertoire" 
            className="hover:text-primary transition-colors duration-200"
          >
            Pistes Audio Sauvegardées
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
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
  );
};