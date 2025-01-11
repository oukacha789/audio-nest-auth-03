import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";

type Review = Database["public"]["Tables"]["reviews"]["Row"];

interface ReviewsCardProps {
  reviews: Review[] | null;
  isLoading: boolean;
}

export const ReviewsCard = ({ reviews, isLoading }: ReviewsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Button 
            asChild 
            variant="link" 
            className="p-0 h-auto font-semibold text-xl text-white hover:text-[#F1F1F1] transition-colors"
          >
            <Link to="/avis">
              Avis Sauvegardés
            </Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Chargement des avis...</p>
        ) : reviews?.length ? (
          <ul className="space-y-2">
            {reviews.map((review) => (
              <li key={review.id} className="p-2 border rounded">
                <p className="font-medium">{review.title}</p>
                <p className="text-sm">Note: {review.rating}/5</p>
                <p className="text-sm text-muted-foreground">
                  {review.comment}
                </p>
                <p className="text-xs text-muted-foreground">
                  Créé le: {new Date(review.created_at).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun avis trouvé</p>
        )}
      </CardContent>
    </Card>
  );
};