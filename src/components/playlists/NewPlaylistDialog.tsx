
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface NewPlaylistDialogProps {
  onPlaylistCreated?: () => void;
}

export function NewPlaylistDialog({ onPlaylistCreated }: NewPlaylistDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreatePlaylist = async () => {
    if (!title.trim()) {
      toast.error("Le titre est requis");
      return;
    }

    setLoading(true);
    
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session?.session?.user) {
        toast.error("Vous devez être connecté pour créer une playlist");
        setLoading(false);
        return;
      }
      
      const { error } = await supabase.from('playlists').insert({
        title: title.trim(),
        description: description.trim() || null,
        user_id: session.session.user.id
      });

      if (error) throw error;
      
      toast.success("Playlist créée avec succès");
      setOpen(false);
      setTitle('');
      setDescription('');
      
      if (onPlaylistCreated) {
        onPlaylistCreated();
      }
    } catch (error) {
      console.error("Erreur lors de la création de la playlist:", error);
      toast.error("Erreur lors de la création de la playlist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <PlusCircle className="h-4 w-4" /> Nouvelle Playlist
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black/80 backdrop-blur-md border border-white/10">
        <DialogHeader>
          <DialogTitle>Créer une nouvelle playlist</DialogTitle>
          <DialogDescription>
            Donnez un titre et une description optionnelle à votre nouvelle playlist.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Titre</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ma nouvelle playlist" 
              className="bg-black/50"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description (optionnelle)</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Une description de votre playlist" 
              className="bg-black/50"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)} disabled={loading}>
            Annuler
          </Button>
          <Button onClick={handleCreatePlaylist} disabled={loading}>
            {loading ? "Création..." : "Créer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
