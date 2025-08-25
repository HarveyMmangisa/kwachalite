"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Nav } from "./nav";
import { LogOut, Loader2 } from "lucide-react";
import Header from "./header";
import { BottomNavbar } from "./bottom-navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    router.push("/auth/login");
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        {/* Sidebar (Desktop only) */}
        {!isMobile && (
          <Sidebar>
            <SidebarHeader className="border-b px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                  {/* Minimal app logo */}
                  <span className="text-sm font-bold">KQ</span>
                </div>
                <h1 className="text-lg font-semibold tracking-tight">
                  Kwacha Quick
                </h1>
              </div>
            </SidebarHeader>

            <SidebarContent>
              <Nav />
            </SidebarContent>

            <SidebarFooter className="border-t px-2 py-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex w-full items-center gap-3 px-2 py-2 h-auto justify-start"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={
                          user.photoURL || "https://placehold.co/40x40.png"
                        }
                        alt="user avatar"
                      />
                      <AvatarFallback>
                        {user.email?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start overflow-hidden">
                      <p className="truncate text-sm font-medium leading-none">
                        {user.displayName || "User"}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-muted-foreground leading-none">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarFooter>
          </Sidebar>
        )}

        {/* Main content */}
        <main className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 px-4 py-6 sm:px-8">{children}</div>
        </main>
      </div>

      {/* Mobile navbar */}
      {isMobile && <BottomNavbar />}
    </SidebarProvider>
  );
}
