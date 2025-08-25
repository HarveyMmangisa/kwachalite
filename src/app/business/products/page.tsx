
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { Product, getProducts, deleteProduct } from "@/lib/db/products";
import DashboardLayout from "@/components/dashboard-layout";
import { useToast } from "@/hooks/use-toast";

export default function ProductsPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      getProducts(user.uid).then(setProducts);
    }
  }, [user]);

  const handleDelete = async (id: string) => {
    if (user) {
      await deleteProduct(user.uid, id);
      setProducts(products.filter(p => p.id !== id));
      toast({
        title: "Product Deleted",
        description: "The product has been successfully deleted.",
      });
    }
  }

  return (
    <DashboardLayout>
        <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
            <div>
            <h2 className="text-3xl font-bold tracking-tight">Products</h2>
            <p className="text-muted-foreground">Manage your products and services.</p>
            </div>
            <div className="flex items-center space-x-2">
            <Button asChild>
                <Link href="/business/products/add">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Product
                </Link>
            </Button>
            </div>
        </div>
        <Card>
            <CardHeader>
            <CardTitle>Product List</CardTitle>
            <CardDescription>A list of all your products and services.</CardDescription>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {products.length > 0 ? (
                    products.map(product => (
                        <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>MWK {product.price.toLocaleString()}</TableCell>
                            <TableCell><Badge>{product.type}</Badge></TableCell>
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
                                <DropdownMenuItem asChild><Link href={`/business/products/edit/${product.id}`}>Edit</Link></DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDelete(product.id!)}>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">You haven't added any products yet.</TableCell>
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
