import { useState, useRef, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AudioControls } from "./audio/AudioControls";
import { VolumeControls } from "./audio/VolumeControls";
import { TrackInfo } from "./audio/TrackInfo";

interface AudioPlayerProps {
  id: string;
  title: string;
  artist: string;
  filePath: string;
  onDelete?: () => void;
}

export default function AudioPlayer({ id, title, artist, filePath, onDelete }: AudioPlayerProps) {
  const session = useSession();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string>("");

  useEffect(() => {
    const fetchAudioUrl = async () => {
      const { data } = await supabase.storage
        .from("audio")
        .createSignedUrl(filePath, 3600);

      if (data?.signedUrl) {
        setAudioUrl(data.signedUrl);
      }
    };

    fetchAudioUrl();
  }, [filePath]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handleTimeChange = (value: number[]) => {
    const newTime = value[0];
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleDelete = async () => {
    try {
      const { error: storageError } = await supabase.storage
        .from("audio")
        .remove([filePath]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from("audio_tracks")
        .delete()
        .eq("id", id);

      if (dbError) throw dbError;

      toast.success("Piste audio supprimée avec succès");
      if (onDelete) onDelete();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression de la piste audio");
    }
  };

  return (
    <div className="w-full max-w-2xl bg-background border rounded-lg p-4 space-y-4">
      <audio ref={audioRef} src={audioUrl} />
      
      <TrackInfo
        title={title}
        artist={artist}
        showDeleteButton={!!session?.user?.id}
        onDelete={handleDelete}
      />

      <div className="space-y-2">
        <AudioControls
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          onPlayPause={togglePlay}
          onTimeChange={handleTimeChange}
          formatTime={formatTime}
        />

        <VolumeControls
          isMuted={isMuted}
          volume={volume}
          onMuteToggle={toggleMute}
          onVolumeChange={handleVolumeChange}
        />
      </div>
    </div>
  );
}