
import React from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { BackButton } from '@/components/BackButton';

const Podcasts = () => {
  return (
    <>
      <AppSidebar />
      <div className="flex flex-col flex-1 p-6">
        <BackButton />
        <div className="flex flex-col items-center justify-center flex-1">
          <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">Podcasts</h1>
          <div className="bg-black/50 backdrop-blur-md p-8 rounded-lg shadow-xl border border-white/10 w-full max-w-2xl">
            <p className="text-white text-xl mb-4">Découvrez notre sélection de podcasts</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-md">
                <h3 className="text-lg font-semibold text-white mb-2">En tendance</h3>
                <p className="text-white/80">Les podcasts les plus écoutés du moment</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-md">
                <h3 className="text-lg font-semibold text-white mb-2">Catégories</h3>
                <p className="text-white/80">Explorez nos podcasts par thématique</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Podcasts;
