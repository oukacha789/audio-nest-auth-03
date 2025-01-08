import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface AudioControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onTimeChange: (value: number[]) => void;
  formatTime: (time: number) => string;
}

export function AudioControls({
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
  onTimeChange,
  formatTime,
}: AudioControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={onPlayPause}
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
          onValueChange={onTimeChange}
          className="w-full"
        />
      </div>

      <span className="text-sm min-w-[4rem] text-right">
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>
    </div>
  );
}