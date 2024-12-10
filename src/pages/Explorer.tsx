import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BackButton } from "@/components/BackButton";

const Explorer = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6 relative">
          <BackButton />
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Explorer</h1>
            {/* Contenu à venir */}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Explorer;