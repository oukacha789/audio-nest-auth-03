
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
import { Play, Music, Clock, Calendar, User, Plus, Trash2 } from 'lucide-react';

type Track = {
  id: string;
  title: string;
  artist: string;
  duration: number | null;
  added_at: string;
};

type PlaylistDetails = {
  id: string;
  title: string;
  description: string | null;
  user_id: string;
  created_at: string;
  tracks: Track[];
  isOwner: boolean;
};

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

const PlaylistDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState<PlaylistDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchPlaylistDetails = async () => {
      setLoading(true);
      try {
        // Récupérer les détails de la playlist
        const { data: playlistData, error: playlistError } = await supabase
          .from('playlists')
          .select('*')
          .eq('id', id)
          .single();

        if (playlistError) throw playlistError;
        if (!playlistData) {
          toast.error('Playlist non trouvée');
          navigate('/playlists');
          return;
        }

        // Récupérer les pistes associées à la playlist
        const { data: tracksData, error: tracksError } = await supabase
          .from('playlist_tracks')
          .select(`
            position,
            added_at,
            audio_tracks (
              id,
              title,
              artist,
              duration
            )
          `)
          .eq('playlist_id', id)
          .order('position', { ascending: true });

        if (tracksError) throw tracksError;

        // Formater les données des pistes
        const tracks = tracksData.map(item => ({
          id: item.audio_tracks.id,
          title: item.audio_tracks.title,
          artist: item.audio_tracks.artist,
          duration: item.audio_tracks.duration,
          added_at: item.added_at
        }));

        // Vérifier si l'utilisateur est le propriétaire de la playlist
        const isOwner = session?.user?.id === playlistData.user_id;

        setPlaylist({
          ...playlistData,
          tracks,
          isOwner
        });
      } catch (err) {
        console.error("Erreur lors du chargement des détails de la playlist:", err);
        toast.error("Impossible de charger les détails de la playlist");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistDetails();
  }, [id, navigate, session]);

  const handlePlayTrack = (trackId: string, title: string) => {
    toast.info(`Lecture de "${title}"`);
    // Implémentation de la lecture audio
  };

  const handleAddTrack = () => {
    // Cette fonctionnalité serait à implémenter plus tard
    toast.info("Ajouter des pistes à la playlist (fonctionnalité à venir)");
  };

  const handleRemoveTrack = async (trackId: string) => {
    if (!id || !playlist?.isOwner) return;

    try {
      const { error } = await supabase
        .from('playlist_tracks')
        .delete()
        .eq('playlist_id', id)
        .eq('track_id', trackId);

      if (error) throw error;

      toast.success('Piste supprimée de la playlist');
      
      // Mettre à jour l'état local pour refléter la suppression
      setPlaylist(prev => {
        if (!prev) return null;
        return {
          ...prev,
          tracks: prev.tracks.filter(track => track.id !== trackId)
        };
      });
    } catch (err) {
      console.error("Erreur lors de la suppression de la piste:", err);
      toast.error("Impossible de supprimer la piste");
    }
  };

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
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-2">{playlist.title}</h1>
                {playlist.description && (
                  <p className="text-white/70 text-lg">{playlist.description}</p>
                )}
                <div className="flex gap-4 mt-4">
                  <Button onClick={() => toast.info(`Lecture de la playlist "${playlist.title}"`)}>
                    <Play className="mr-2 h-4 w-4" /> Lecture
                  </Button>
                  {playlist.isOwner && (
                    <Button variant="outline" onClick={handleAddTrack}>
                      <Plus className="mr-2 h-4 w-4" /> Ajouter des pistes
                    </Button>
                  )}
                </div>
              </div>

              <div className="bg-black/50 backdrop-blur-md p-6 rounded-lg shadow-xl border border-white/10">
                {playlist.tracks.length > 0 ? (
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
                        {playlist.isOwner && (
                          <TableHead className="w-[80px]"></TableHead>
                        )}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {playlist.tracks.map((track, index) => (
                        <TableRow key={track.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell className="font-medium">
                            <Button 
                              variant="ghost" 
                              className="p-0 h-auto text-left hover:bg-transparent hover:underline flex items-center gap-2"
                              onClick={() => handlePlayTrack(track.id, track.title)}
                            >
                              <Music className="h-4 w-4" /> {track.title}
                            </Button>
                          </TableCell>
                          <TableCell>{track.artist}</TableCell>
                          <TableCell>{formatDuration(track.duration)}</TableCell>
                          <TableCell>{formatDate(track.added_at)}</TableCell>
                          {playlist.isOwner && (
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="text-destructive hover:text-destructive/80"
                                onClick={() => handleRemoveTrack(track.id)}
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
