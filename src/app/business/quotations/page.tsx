
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, MoreHorizontal, Download, Mail } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard-layout";

export default function QuotationsPage() {
  return (
    <DashboardLayout>
        <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
            <div>
            <h2 className="text-3xl font-bold tracking-tight">Quotations</h2>
            <p className="text-muted-foreground">Create and manage your quotations.</p>
            </div>
            <div className="flex items-center space-x-2">
            <Button asChild>
                <Link href="/business/quotations/create">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Quotation
                </Link>
            </Button>
            </div>
        </div>
        <Card>
            <CardHeader>
            <CardTitle>Quotation List</CardTitle>
            <CardDescription>A list of all your quotations.</CardDescription>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Quotation #</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={6} className="text-center">You haven't created any quotations yet.</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </CardContent>
        </Card>
        </div>
    </DashboardLayout>
  );
}
