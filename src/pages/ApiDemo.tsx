
import * as React from "react";
import { useState } from "react";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { callApi } from "@/services/apiService";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function ApiDemo() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un prompt",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const data = await callApi(prompt);
      setResult(data);
      
      toast({
        title: "Succès",
        description: "Requête API envoyée avec succès",
      });
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: "Erreur lors de l'appel à l'API",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto p-8 relative">
          <BackButton />
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-4">Démonstration API</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Envoyez un prompt à l'API pour générer une réponse
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium mb-2">
                  Votre prompt
                </label>
                <Input
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Entrez votre prompt ici..."
                  className="w-full"
                  disabled={loading}
                />
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Chargement..." : "Envoyer"}
              </Button>
            </form>

            {result && (
              <div className="mt-8 p-4 border rounded-lg bg-slate-50">
                <h2 className="text-lg font-semibold mb-2">Résultat:</h2>
                <pre className="whitespace-pre-wrap bg-slate-100 p-4 rounded-md overflow-auto max-h-96">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
