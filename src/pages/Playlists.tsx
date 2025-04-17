
import React from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { BackButton } from '@/components/BackButton';
import { usePopularPlaylists, useUserPlaylists } from '@/hooks/usePlaylists';
import { PlaylistCard } from '@/components/playlists/PlaylistCard';
import { NewPlaylistDialog } from '@/components/playlists/NewPlaylistDialog';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Playlists = () => {
  const navigate = useNavigate();
  const { 
    playlists: popularPlaylists, 
    loading: loadingPopular, 
    refetch: refetchPopular 
  } = usePopularPlaylists();
  
  const { 
    playlists: userPlaylists, 
    loading: loadingUser, 
    refetch: refetchUser, 
    isLoggedIn 
  } = useUserPlaylists();

  const handlePlaylistCreated = () => {
    refetchUser();
    refetchPopular();
  };

  const handlePlay = (playlistId: string, title: string) => {
    toast.info(`Lecture de la playlist "${title}"`);
    // Ici, vous pourriez implémenter la lecture réelle de la playlist
  };

  const handleView = (playlistId: string) => {
    // Navigation vers la page de détails de la playlist
    navigate(`/playlists/${playlistId}`);
  };

  return (
    <>
      <AppSidebar />
      <div className="flex flex-col flex-1 p-6">
        <BackButton />
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">Playlists</h1>
            {isLoggedIn && <NewPlaylistDialog onPlaylistCreated={handlePlaylistCreated} />}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Section Playlists populaires */}
            <div className="bg-black/50 backdrop-blur-md p-6 rounded-lg shadow-xl border border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-4">Playlists populaires</h2>
              
              {loadingPopular ? (
                <div className="flex items-center justify-center h-40">
                  <p className="text-white/70">Chargement des playlists populaires...</p>
                </div>
              ) : popularPlaylists.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {popularPlaylists.slice(0, 4).map((playlist) => (
                    <PlaylistCard
                      key={playlist.id}
                      id={playlist.id}
                      title={playlist.title}
                      description={playlist.description}
                      trackCount={playlist.track_count || 0}
                      onPlay={() => handlePlay(playlist.id, playlist.title)}
                      onView={() => handleView(playlist.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-40">
                  <p className="text-white/70">Aucune playlist disponible pour le moment</p>
                </div>
              )}
            </div>
            
            {/* Section Vos playlists */}
            <div className="bg-black/50 backdrop-blur-md p-6 rounded-lg shadow-xl border border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-4">Vos playlists</h2>
              
              {!isLoggedIn ? (
                <div className="flex flex-col items-center justify-center h-40 gap-4">
                  <p className="text-white/70">Connectez-vous pour voir vos playlists</p>
                  <Button onClick={() => navigate('/login')}>
                    <LogIn className="mr-2 h-4 w-4" /> Se connecter
                  </Button>
                </div>
              ) : loadingUser ? (
                <div className="flex items-center justify-center h-40">
                  <p className="text-white/70">Chargement de vos playlists...</p>
                </div>
              ) : userPlaylists.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userPlaylists.map((playlist) => (
                    <PlaylistCard
                      key={playlist.id}
                      id={playlist.id}
                      title={playlist.title}
                      description={playlist.description}
                      trackCount={playlist.track_count || 0}
                      onPlay={() => handlePlay(playlist.id, playlist.title)}
                      onView={() => handleView(playlist.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 gap-4">
                  <p className="text-white/70">Vous n'avez pas encore de playlists</p>
                  <NewPlaylistDialog onPlaylistCreated={handlePlaylistCreated} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Playlists;
