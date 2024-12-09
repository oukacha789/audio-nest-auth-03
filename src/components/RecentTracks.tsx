import { Button } from "@/components/ui/button";

export function RecentTracks() {
  // Cette fonction sera implémentée une fois que nous aurons configuré Supabase
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Connectez-vous pour voir vos morceaux récents
      </p>
      <Button>Se connecter</Button>
    </div>
  );
}