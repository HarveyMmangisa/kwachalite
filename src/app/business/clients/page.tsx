
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Client, getClients, deleteClient } from "@/lib/db/clients";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/dashboard-layout";
import { useToast } from "@/hooks/use-toast";

export default function ClientsPage() {
    const { user } = useAuth();
    const [clients, setClients] = useState<Client[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        if (user) {
            getClients(user.uid).then(setClients);
        }
    }, [user]);

    const handleDelete = async (id: string) => {
        if(user) {
            await deleteClient(user.uid, id);
            setClients(clients.filter(c => c.id !== id));
            toast({
                title: "Client Deleted",
                description: "The client has been successfully deleted.",
            })
        }
    }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
            <div>
            <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
            <p className="text-muted-foreground">Manage your clients and view their details.</p>
            </div>
            <div className="flex items-center space-x-2">
            <Button asChild>
                <Link href="/business/clients/add">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Client
                </Link>
            </Button>
            </div>
        </div>
        <Card>
            <CardHeader>
            <CardTitle>Client List</CardTitle>
            <CardDescription>A list of all your clients.</CardDescription>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    {clients.length > 0 ? (
                        clients.map(client => (
                            <TableRow key={client.id}>
                                <TableCell className="font-medium">{client.name}</TableCell>
                                <TableCell>{client.email}</TableCell>
                                <TableCell>{client.phone}</TableCell>
                                <TableCell><Badge variant={client.status === 'Active' ? 'default' : 'secondary'}>{client.status}</Badge></TableCell>
                                <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem asChild><Link href={`/business/clients/edit/${client.id}`}>Edit</Link></DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDelete(client.id!)}>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">You haven't added any clients yet.</TableCell>
                        </TableRow>
                    )}
                
                </TableBody>
            </Table>
            </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
