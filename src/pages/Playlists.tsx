
import React from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { BackButton } from '@/components/BackButton';

const Playlists = () => {
  return (
    <>
      <AppSidebar />
      <div className="flex flex-col flex-1 p-6">
        <BackButton />
        <div className="flex flex-col items-center justify-center flex-1">
          <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">Playlists</h1>
          <div className="bg-black/50 backdrop-blur-md p-8 rounded-lg shadow-xl border border-white/10 w-full max-w-2xl">
            <p className="text-white text-xl mb-4">Découvrez et créez des playlists personnalisées</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-md">
                <h3 className="text-lg font-semibold text-white mb-2">Playlists populaires</h3>
                <p className="text-white/80">Découvrez les playlists tendance du moment</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-md">
                <h3 className="text-lg font-semibold text-white mb-2">Vos playlists</h3>
                <p className="text-white/80">Accédez à vos playlists personnelles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Playlists;
