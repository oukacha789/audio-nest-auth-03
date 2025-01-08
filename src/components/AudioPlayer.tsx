import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";

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
      // Supprimer le fichier du stockage
      const { error: storageError } = await supabase.storage
        .from("audio")
        .remove([filePath]);

      if (storageError) throw storageError;

      // Supprimer l'enregistrement de la base de données
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
      
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{artist}</p>
        </div>
        
        {session?.user?.id && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={togglePlay}
            className="h-8 w-8"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>

          <div className="flex-1">
            <Slider
              value={[currentTime]}
              min={0}
              max={duration || 100}
              step={1}
              onValueChange={handleTimeChange}
              className="w-full"
            />
          </div>

          <span className="text-sm min-w-[4rem] text-right">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="h-8 w-8"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>

          <Slider
            value={[volume]}
            min={0}
            max={1}
            step={0.1}
            onValueChange={handleVolumeChange}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
}