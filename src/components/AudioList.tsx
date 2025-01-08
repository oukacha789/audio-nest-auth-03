import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AudioPlayer from "./AudioPlayer";

interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  file_path: string;
}

export default function AudioList() {
  const session = useSession();

  const { data: tracks, isLoading, refetch } = useQuery({
    queryKey: ["audioTracks", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("audio_tracks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as AudioTrack[];
    },
    enabled: !!session?.user,
  });

  if (isLoading) {
    return <div>Chargement des pistes audio...</div>;
  }

  return (
    <div className="space-y-4">
      {tracks?.map((track) => (
        <AudioPlayer
          key={track.id}
          id={track.id}
          title={track.title}
          artist={track.artist}
          filePath={track.file_path}
          onDelete={refetch}
        />
      ))}
    </div>
  );
}