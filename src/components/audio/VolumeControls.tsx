import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface VolumeControlsProps {
  isMuted: boolean;
  volume: number;
  onMuteToggle: () => void;
  onVolumeChange: (value: number[]) => void;
}

export function VolumeControls({
  isMuted,
  volume,
  onMuteToggle,
  onVolumeChange,
}: VolumeControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={onMuteToggle}
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
        onValueChange={onVolumeChange}
        className="w-24"
      />
    </div>
  );
}