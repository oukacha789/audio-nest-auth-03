import React from 'react';
import { useLocation } from 'react-router-dom';

export const BackgroundImage = () => {
  const location = useLocation();

  const getBackgroundImage = () => {
    switch (location.pathname) {
      case '/':
        return "url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070')";
      case '/repertoire':
        return "url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070')";
      case '/explorer':
        return "url('https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070')";
      case '/avis':
        return "url('https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2070')";
      case '/register':
        return "url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070')";
      case '/parametres':
        return "url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070')";
      default:
        return "url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070')";
    }
  };

  return (
    <div 
      className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-80 -z-10"
      style={{
        backgroundImage: getBackgroundImage(),
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    />
  );
};