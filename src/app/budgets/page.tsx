
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard-layout";
import { useAuth } from "@/hooks/use-auth";

export default function BudgetsPage() {
    const { user, loading } = useAuth();
    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex h-full items-center justify-center">
                <p>Loading...</p>
                </div>
            </DashboardLayout>
        );
    }
  return (
    <DashboardLayout>
        <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
            <div>
            <h2 className="text-3xl font-bold tracking-tight">Budgets</h2>
            <p className="text-muted-foreground">Manage your budgets.</p>
            </div>
            <div className="flex items-center space-x-2">
            <Button disabled asChild>
                <Link href="/budgets/add">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Budget
                </Link>
            </Button>
            </div>
        </div>
        <Card>
            <CardHeader>
            <CardTitle>Budgets</CardTitle>
            <CardDescription>This page is under construction.</CardDescription>
            </CardHeader>
            <CardContent>
            <p>Come back later!</p>
            </CardContent>
        </Card>
        </div>
    </DashboardLayout>
  );
}
