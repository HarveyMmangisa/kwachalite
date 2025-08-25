
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BillsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Bills</h2>
          <p className="text-muted-foreground">Manage your recurring bills.</p>
        </div>
        <div className="flex items-center space-x-2">
           <Button disabled asChild>
            <Link href="/bills/add">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Bill
            </Link>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bills</CardTitle>
          <CardDescription>This page is under construction.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Come back later!</p>
        </CardContent>
      </Card>
    </div>
  );
}
