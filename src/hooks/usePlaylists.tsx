
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type Playlist = {
  id: string;
  title: string;
  description: string | null;
  user_id: string;
  created_at: string;
  track_count?: number;
};

export function usePopularPlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      // Obtenir les playlists avec le nombre de pistes associées
      const { data, error } = await supabase
        .from('playlists')
        .select(`
          *,
          track_count:playlist_tracks(count)
        `)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;

      // Formater les données pour avoir le nombre de pistes comme propriété directe
      const formattedPlaylists = data.map(playlist => ({
        ...playlist,
        track_count: playlist.track_count ? playlist.track_count[0]?.count || 0 : 0
      }));

      setPlaylists(formattedPlaylists);
    } catch (err) {
      console.error("Erreur lors du chargement des playlists populaires:", err);
      setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
      toast.error("Impossible de charger les playlists populaires");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return { playlists, loading, error, refetch: fetchPlaylists };
}

export function useUserPlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
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

  const fetchPlaylists = async () => {
    if (!session?.user) {
      setPlaylists([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('playlists')
        .select(`
          *,
          track_count:playlist_tracks(count)
        `)
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Formater les données pour avoir le nombre de pistes comme propriété directe
      const formattedPlaylists = data.map(playlist => ({
        ...playlist,
        track_count: playlist.track_count ? playlist.track_count[0]?.count || 0 : 0
      }));

      setPlaylists(formattedPlaylists);
    } catch (err) {
      console.error("Erreur lors du chargement des playlists de l'utilisateur:", err);
      setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
      toast.error("Impossible de charger vos playlists");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchPlaylists();
    }
  }, [session]);

  return { playlists, loading, error, refetch: fetchPlaylists, isLoggedIn: !!session?.user };
}
