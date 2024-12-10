import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      size="default"
      onClick={() => navigate(-1)}
      className="fixed top-4 left-4 z-40 gap-2 bg-background/80 backdrop-blur-sm border"
    >
      <ChevronLeft className="h-4 w-4" />
      Retour
    </Button>
  );
}