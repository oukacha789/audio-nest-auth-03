import React from 'react';

export const BackgroundImage = () => {
  return (
    <div 
      className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-50"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1649972904349-6e44c42644a7')"
      }}
    />
  );
};