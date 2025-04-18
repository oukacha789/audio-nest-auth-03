
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Plus } from 'lucide-react';

type PlaylistHeaderProps = {
  title: string;
  description: string | null;
  isOwner: boolean;
  onPlay: () => void;
  onAddTrack: () => void;
};

export function PlaylistHeader({ title, description, isOwner, onPlay, onAddTrack }: PlaylistHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-2">{title}</h1>
      {description && (
        <p className="text-white/70 text-lg">{description}</p>
      )}
      <div className="flex gap-4 mt-4">
        <Button onClick={onPlay}>
          <Play className="mr-2 h-4 w-4" /> Lecture
        </Button>
        {isOwner && (
          <Button variant="outline" onClick={onAddTrack}>
            <Plus className="mr-2 h-4 w-4" /> Ajouter des pistes
          </Button>
        )}
      </div>
    </div>
  );
}
