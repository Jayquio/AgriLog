import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AuthWrapper } from "@/components/layout/auth-wrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapper>
      <SidebarProvider>
        <div className="min-h-screen w-full bg-background">
          <AppSidebar />
          <SidebarInset>
            <div className="flex h-full flex-col">
              <AppHeader />
              <main className="container mx-auto flex-1 overflow-y-auto px-4 py-8">
                {children}
              </main>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AuthWrapper>
  );
}
