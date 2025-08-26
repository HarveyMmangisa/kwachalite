
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard-layout";

export default function ProfilePage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex h-full items-center justify-center">
                    <p>Loading profile...</p>
                </div>
            </DashboardLayout>
        );
    }

    if (!user) {
        router.push("/auth/login");
        return null;
    }

  return (
    <DashboardLayout>
        <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
            <div>
            <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
            <p className="text-muted-foreground">Manage your profile information.</p>
            </div>
        </div>
        <Card>
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                    <AvatarImage src={user.photoURL || "https://placehold.co/40x40.png"} alt={user.displayName || "User"} data-ai-hint="person avatar" />
                    <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-2xl">{user.displayName || "John Doe"}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <p>This page is under construction.</p>
            </CardContent>
        </Card>
        </div>
    </DashboardLayout>
  );
}
