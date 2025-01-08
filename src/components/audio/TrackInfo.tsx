import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrackInfoProps {
  title: string;
  artist: string;
  showDeleteButton: boolean;
  onDelete: () => void;
}

export function TrackInfo({ title, artist, showDeleteButton, onDelete }: TrackInfoProps) {
  return (
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{artist}</p>
      </div>
      
      {showDeleteButton && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="h-8 w-8 text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}