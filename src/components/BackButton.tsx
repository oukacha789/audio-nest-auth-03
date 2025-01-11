import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => navigate(-1)}
      className="ml-8 mt-4 gap-1 bg-background/80 backdrop-blur-sm border scale-75"
    >
      <ChevronLeft className="h-3 w-3" />
      Retour
    </Button>
  );
}