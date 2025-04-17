
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

type PlaylistCardProps = {
  id: string;
  title: string;
  description?: string | null;
  trackCount: number;
  onPlay?: () => void;
  onView?: () => void;
};

export function PlaylistCard({ id, title, description, trackCount, onPlay, onView }: PlaylistCardProps) {
  return (
    <Card className="bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-5 w-5" /> {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-white/70">{trackCount} pistes</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button 
          variant="secondary" 
          size="sm"
          className="w-full" 
          onClick={onPlay}
        >
          <Play className="mr-1 h-4 w-4" /> Écouter
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="w-full" 
          onClick={onView}
        >
          Voir
        </Button>
      </CardFooter>
    </Card>
  );
}
