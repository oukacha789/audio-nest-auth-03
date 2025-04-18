
import React, { useState, useEffect } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { BackButton } from '@/components/BackButton';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Play, Music, Clock, Calendar, Plus, Trash2 } from 'lucide-react';
import { PlaylistHeader } from '@/components/playlists/PlaylistHeader';
import { PlaylistTrackList } from '@/components/playlists/PlaylistTrackList';
import { usePlaylistDetails } from '@/hooks/usePlaylistDetails';

const PlaylistDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    playlist, 
    loading, 
    handlePlayTrack, 
    handleAddTrack, 
    handleRemoveTrack 
  } = usePlaylistDetails(id, navigate);

  return (
    <>
      <AppSidebar />
      <div className="flex flex-col flex-1 p-6">
        <BackButton />
        <div className="flex flex-col flex-1">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-white/70">Chargement des détails de la playlist...</p>
            </div>
          ) : playlist ? (
            <>
              <PlaylistHeader 
                title={playlist.title} 
                description={playlist.description} 
                isOwner={playlist.isOwner} 
                onPlay={() => toast.info(`Lecture de la playlist "${playlist.title}"`)} 
                onAddTrack={handleAddTrack} 
              />

              <PlaylistTrackList 
                tracks={playlist.tracks} 
                isOwner={playlist.isOwner} 
                onPlayTrack={handlePlayTrack}
                onRemoveTrack={handleRemoveTrack}
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-white/70">Playlist non trouvée</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PlaylistDetail;
