
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Music, Clock, Calendar, Trash2 } from 'lucide-react';
import { Track } from '@/hooks/usePlaylistDetails';

type PlaylistTrackListProps = {
  tracks: Track[];
  isOwner: boolean;
  onPlayTrack: (trackId: string, title: string) => void;
  onRemoveTrack: (trackId: string) => void;
};

// Utility functions
const formatDuration = (seconds: number | null) => {
  if (!seconds) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export function PlaylistTrackList({ 
  tracks, 
  isOwner, 
  onPlayTrack, 
  onRemoveTrack 
}: PlaylistTrackListProps) {
  return (
    <div className="bg-black/50 backdrop-blur-md p-6 rounded-lg shadow-xl border border-white/10">
      {tracks.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Titre</TableHead>
              <TableHead>Artiste</TableHead>
              <TableHead className="w-[100px]">
                <Clock className="h-4 w-4" />
              </TableHead>
              <TableHead className="w-[140px]">
                <Calendar className="h-4 w-4" />
              </TableHead>
              {isOwner && (
                <TableHead className="w-[80px]"></TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tracks.map((track, index) => (
              <TableRow key={track.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">
                  <Button 
                    variant="ghost" 
                    className="p-0 h-auto text-left hover:bg-transparent hover:underline flex items-center gap-2"
                    onClick={() => onPlayTrack(track.id, track.title)}
                  >
                    <Music className="h-4 w-4" /> {track.title}
                  </Button>
                </TableCell>
                <TableCell>{track.artist}</TableCell>
                <TableCell>{formatDuration(track.duration)}</TableCell>
                <TableCell>{formatDate(track.added_at)}</TableCell>
                {isOwner && (
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-destructive hover:text-destructive/80"
                      onClick={() => onRemoveTrack(track.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex items-center justify-center h-40">
          <p className="text-white/70">Cette playlist ne contient pas encore de pistes</p>
        </div>
      )}
    </div>
  );
}
