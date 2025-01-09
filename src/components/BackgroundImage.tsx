import React from 'react';
import { useLocation } from 'react-router-dom';

export const BackgroundImage = () => {
  const location = useLocation();

  // Fonction pour déterminer quelle image afficher selon la route
  const getBackgroundImage = () => {
    switch (location.pathname) {
      case '/':
        return "url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80')"; // Studio d'enregistrement
      case '/explorer':
        return "url('https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80')"; // Vinyles et collection de musique
      case '/reviews':
        return "url('https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80')"; // Concert live
      case '/register':
        return "url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80')"; // Casque audio moderne
      case '/settings':
        return "url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80')"; // Table de mixage
      default:
        return "url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80')";
    }
  };

  return (
    <div 
      className="fixed top-0 left-0 w-full h-1/2 bg-cover bg-center bg-no-repeat opacity-80 -z-10"
      style={{
        backgroundImage: getBackgroundImage()
      }}
    />
  );
};