
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import MonthlyOverviewChart from "@/components/charts/monthly-overview-chart";
import ExpenseBreakdownChart from "@/components/charts/expense-breakdown-chart";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard-layout";
import { useEffect } from "react";

export default function Home() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/auth/login");
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return <div>Loading...</div>
    }

  return (
    <DashboardLayout>
        <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">MWK 45,231.89</div>
                <p className="text-xs text-muted-foreground">
                +20.1% from last month
                </p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+MWK 12,234.00</div>
                <p className="text-xs text-muted-foreground">
                +19% from last month
                </p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">-MWK 8,123.50</div>
                <p className="text-xs text-muted-foreground">
                +2% from last month
                </p>
            </CardContent>
            </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
            <CardHeader>
                <CardTitle>Monthly Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <MonthlyOverviewChart />
            </CardContent>
            </Card>
            <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
                <ExpenseBreakdownChart />
            </CardContent>
            </Card>
        </div>
        </div>
    </DashboardLayout>
  );
}
