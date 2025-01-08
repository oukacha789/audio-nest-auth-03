import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import AudioPlayer from "./AudioPlayer";

type AudioTrack = {
  id: string;
  title: string;
  artist: string;
  description: string;
  file_path: string;
  user_id: string;
};

export default function AudioList() {
  const session = useSession();
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTracks = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("audio_tracks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTracks(data || []);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  if (isLoading) {
    return <div>Chargement des pistes...</div>;
  }

  if (tracks.length === 0) {
    return <div>Aucune piste audio trouvée.</div>;
  }

  return (
    <div className="space-y-6">
      {tracks.map((track) => (
        <AudioPlayer
          key={track.id}
          id={track.id}
          title={track.title}
          artist={track.artist}
          filePath={track.file_path}
          onDelete={fetchTracks}
        />
      ))}
    </div>
  );
}