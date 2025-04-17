
import React from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { BackButton } from '@/components/BackButton';

const Radio = () => {
  return (
    <>
      <AppSidebar />
      <div className="flex flex-col flex-1 p-6">
        <BackButton />
        <div className="flex flex-col items-center justify-center flex-1">
          <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">Radio</h1>
          <div className="bg-black/50 backdrop-blur-md p-8 rounded-lg shadow-xl border border-white/10 w-full max-w-2xl">
            <p className="text-white text-xl mb-4">Écoutez nos stations de radio en direct</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-md">
                <h3 className="text-lg font-semibold text-white mb-2">Stations populaires</h3>
                <p className="text-white/80">Les stations les plus écoutées du moment</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-md">
                <h3 className="text-lg font-semibold text-white mb-2">Par genre</h3>
                <p className="text-white/80">Trouvez des stations selon vos goûts musicaux</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Radio;
