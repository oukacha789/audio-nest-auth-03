
import React from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { BackButton } from '@/components/BackButton';

const Albums = () => {
  return (
    <>
      <AppSidebar />
      <div className="flex flex-col flex-1 p-6">
        <BackButton />
        <div className="flex flex-col items-center justify-center flex-1">
          <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">Albums</h1>
          <div className="bg-black/50 backdrop-blur-md p-8 rounded-lg shadow-xl border border-white/10 w-full max-w-2xl">
            <p className="text-white text-xl mb-4">Explorez notre collection d'albums</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-md">
                <h3 className="text-lg font-semibold text-white mb-2">Nouveautés</h3>
                <p className="text-white/80">Les derniers albums ajoutés à notre catalogue</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-md">
                <h3 className="text-lg font-semibold text-white mb-2">Albums classiques</h3>
                <p className="text-white/80">Redécouvrez les albums qui ont marqué l'histoire</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Albums;
