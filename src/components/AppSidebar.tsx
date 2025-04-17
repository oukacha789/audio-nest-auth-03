
import { Home, Library, Compass, MessageSquare, Settings, LogOut, UserPlus, Music, Image, Radio, Mic, ChevronDown, ChevronUp } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "@/components/ui/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

// Structure de données des menus
const menuItems = [
  {
    title: "Accueil",
    icon: Home,
    path: "/",
    submenu: [
      {
        title: "Playlists",
        icon: Music,
        path: "/playlists"
      },
      {
        title: "Albums",
        icon: Image,
        path: "/albums"
      },
      {
        title: "Radio",
        icon: Radio,
        path: "/radio"
      },
      {
        title: "Podcasts",
        icon: Mic,
        path: "/podcasts"
      }
    ]
  },
  {
    title: "Mon Répertoire",
    icon: Library,
    path: "/repertoire",
  },
  {
    title: "Explorer",
    icon: Compass,
    path: "/explorer",
  },
  {
    title: "Avis/Commentaires",
    icon: MessageSquare,
    path: "/avis",
  },
  {
    title: "S'inscrire",
    icon: UserPlus,
    path: "/register",
  },
  {
    title: "Paramètres",
    icon: Settings,
    path: "/parametres",
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>("Accueil");

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Déconnexion réussie");
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      toast.error("Erreur lors de la déconnexion");
    }
  };

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.submenu ? (
                    <>
                      <SidebarMenuButton 
                        onClick={() => toggleSubmenu(item.title)} 
                        isActive={location.pathname === item.path}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                        {openSubmenu === item.title ? (
                          <ChevronUp className="ml-auto h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-auto h-4 w-4" />
                        )}
                      </SidebarMenuButton>
                      
                      {openSubmenu === item.title && (
                        <SidebarMenuSub>
                          {item.submenu.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                onClick={() => navigate(subItem.path)}
                                isActive={location.pathname === subItem.path}
                              >
                                <subItem.icon className="w-4 h-4" />
                                <span>{subItem.title}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </>
                  ) : (
                    <SidebarMenuButton 
                      onClick={() => navigate(item.path)}
                      isActive={location.pathname === item.path}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut className="w-5 h-5" />
                  <span>Déconnexion</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
