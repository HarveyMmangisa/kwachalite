
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import DashboardLayout from "@/components/dashboard-layout";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user) {
        router.push("/auth/login");
        return null;
    }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6 sm:p-10 pt-8 bg-background">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Settings</h2>
            <p className="text-muted-foreground text-base">
              Manage and customize your application preferences.
            </p>
          </div>
        </div>

        {/* Under Construction Notice */}
        <Card className="border border-muted shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-medium">Page Under Construction</CardTitle>
            <CardDescription>
              We’re working on this section to improve your experience.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Please check back soon. In the meantime, you can continue using other features.
            </p>
            <div>
              <Button variant="outline" className="text-sm" asChild>
                <Link href="/">
                  Back to Dashboard
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
