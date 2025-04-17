
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Reviews from "./pages/Reviews";
import Explorer from "./pages/Explorer";
import Register from "./pages/Register";
import Playlists from "./pages/Playlists";
import Albums from "./pages/Albums";
import Radio from "./pages/Radio";
import Podcasts from "./pages/Podcasts";
import { BackgroundImage } from "./components/BackgroundImage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SessionContextProvider supabaseClient={supabase}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex w-full">
              <BackgroundImage />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
                <Route path="/repertoire" element={<Index />} />
                <Route path="/explorer" element={<Explorer />} />
                <Route path="/avis" element={<Reviews />} />
                <Route path="/parametres" element={<Settings />} />
                <Route path="/playlists" element={<Playlists />} />
                <Route path="/albums" element={<Albums />} />
                <Route path="/radio" element={<Radio />} />
                <Route path="/podcasts" element={<Podcasts />} />
                {/* Route par défaut - redirige vers la page d'accueil */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </SessionContextProvider>
  </QueryClientProvider>
);

export default App;
