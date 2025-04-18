
import * as React from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@/components/BackButton";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Headphones, Library, MessageCircle, Music, Settings, Star, Users } from "lucide-react";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentProps<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default function Home() {
  const session = useSession();
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto p-8 relative">
          <BackButton />
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
              <img
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d"
                alt="Music Studio"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h1 className="text-4xl font-bold mb-2">Bienvenue sur votre espace musical</h1>
                <p className="text-lg text-white/80">Explorez, créez et partagez votre musique</p>
              </div>
            </div>
            
            {session ? (
              <div className="grid gap-6">
                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold">Découvrez nos fonctionnalités</h2>
                  <NavigationMenu>
                    <NavigationMenuList className="gap-2">
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Mon Contenu Musical</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                            <ListItem
                              onClick={() => navigate("/repertoire")}
                              title="Gérer mon répertoire"
                              className="cursor-pointer"
                            >
                              <Library className="w-4 h-4 mb-2" />
                              Organisez et gérez votre collection musicale personnelle
                            </ListItem>
                            <ListItem
                              onClick={() => navigate("/repertoire/upload")}
                              title="Ajouter une piste"
                              className="cursor-pointer"
                            >
                              <Music className="w-4 h-4 mb-2" />
                              Ajoutez de nouvelles pistes audio à votre répertoire
                            </ListItem>
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>

                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Communauté</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                            <ListItem
                              onClick={() => navigate("/explorer")}
                              title="Explorer la musique"
                              className="cursor-pointer"
                            >
                              <Star className="w-4 h-4 mb-2" />
                              Découvrez les meilleures pistes de la communauté
                            </ListItem>
                            <ListItem
                              onClick={() => navigate("/avis")}
                              title="Avis & Commentaires"
                              className="cursor-pointer"
                            >
                              <MessageCircle className="w-4 h-4 mb-2" />
                              Partagez votre opinion et découvrez les retours des autres
                            </ListItem>
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>

                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Préférences</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                            <ListItem
                              onClick={() => navigate("/parametres/audio")}
                              title="Paramètres Audio"
                              className="cursor-pointer"
                            >
                              <Headphones className="w-4 h-4 mb-2" />
                              Personnalisez vos paramètres de lecture audio
                            </ListItem>
                            <ListItem
                              onClick={() => navigate("/parametres/profil")}
                              title="Paramètres du profil"
                              className="cursor-pointer"
                            >
                              <Settings className="w-4 h-4 mb-2" />
                              Gérez vos informations personnelles et préférences
                            </ListItem>
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>

                  <div className="grid gap-4 md:grid-cols-2 mt-8">
                    <Button 
                      className="h-16 text-sm px-3 py-1.5"
                      onClick={() => navigate('/repertoire')}
                    >
                      Gérer mon répertoire musical
                    </Button>
                    <Button 
                      className="h-16 text-sm px-3 py-1.5"
                      onClick={() => navigate('/explorer')}
                    >
                      Explorer de nouvelles musiques
                    </Button>
                    <Button 
                      className="h-16 text-sm px-3 py-1.5"
                      onClick={() => navigate('/avis')}
                    >
                      Voir les avis et commentaires
                    </Button>
                    <Button 
                      className="h-16 text-sm px-3 py-1.5"
                      onClick={() => navigate('/parametres')}
                    >
                      Gérer mes paramètres
                    </Button>
                  </div>
                </section>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-lg text-muted-foreground">
                  Connectez-vous pour accéder à votre espace musical
                </p>
                <Button 
                  className="mt-4"
                  onClick={() => navigate('/login')}
                >
                  Se connecter
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
