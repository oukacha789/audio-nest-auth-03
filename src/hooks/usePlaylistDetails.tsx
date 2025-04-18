
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { NavigateFunction } from 'react-router-dom';

export type Track = {
  id: string;
  title: string;
  artist: string;
  duration: number | null;
  added_at: string;
};

export type PlaylistDetails = {
  id: string;
  title: string;
  description: string | null;
  user_id: string;
  created_at: string;
  tracks: Track[];
  isOwner: boolean;
};

export function usePlaylistDetails(playlistId: string | undefined, navigate: NavigateFunction) {
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
    if (!playlistId) return;

    const fetchPlaylistDetails = async () => {
      setLoading(true);
      try {
        // Récupérer les détails de la playlist
        const { data: playlistData, error: playlistError } = await supabase
          .from('playlists')
          .select('*')
          .eq('id', playlistId)
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
            track_id,
            audio_tracks (
              id,
              title,
              artist,
              duration
            )
          `)
          .eq('playlist_id', playlistId)
          .order('position', { ascending: true });

        if (tracksError) throw tracksError;

        // Formater les données des pistes correctement
        const tracks: Track[] = tracksData.map(item => ({
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
  }, [playlistId, navigate, session]);

  const handlePlayTrack = (trackId: string, title: string) => {
    toast.info(`Lecture de "${title}"`);
    // Implémentation de la lecture audio
  };

  const handleAddTrack = () => {
    // Cette fonctionnalité serait à implémenter plus tard
    toast.info("Ajouter des pistes à la playlist (fonctionnalité à venir)");
  };

  const handleRemoveTrack = async (trackId: string) => {
    if (!playlistId || !playlist?.isOwner) return;

    try {
      const { error } = await supabase
        .from('playlist_tracks')
        .delete()
        .eq('playlist_id', playlistId)
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

  return { playlist, loading, handlePlayTrack, handleAddTrack, handleRemoveTrack };
}
