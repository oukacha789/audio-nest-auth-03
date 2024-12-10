import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={() => navigate(-1)}
      className="fixed top-4 left-4 z-50 gap-2 bg-background/80 backdrop-blur-sm border-2"
    >
      <ChevronLeft className="h-5 w-5" />
      Retour
    </Button>
  );
}