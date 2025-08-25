
"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  type: "Product" | "Service";
}

// Dummy function to simulate fetching product data
const getProduct = async (id: string): Promise<Product> => {
  // In a real application, you would fetch this from a database or API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: id,
        name: "Web Design",
        description: "Responsive web design services",
        price: 500000,
        type: "Service",
      });
    }, 500); // Simulate network delay
  });
};

const productFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  type: z.enum(["Product", "Service"]),
})

type ProductFormValues = z.infer<typeof productFormSchema>

export default function EditProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (params.id) {
      getProduct(params.id as string).then(setProduct);
    }
  }, [params.id]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: product || undefined, // Set default values once product is loaded
  });

  useEffect(() => {
    if (product) {
      form.reset(product);
    }
  }, [product, form]);

  if (!product) {
    return (
      <DashboardLayout>
        <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
          <p>Loading product...</p>
        </div>
      </DashboardLayout>
    );
  }

  const router = useRouter();
  const { toast } = useToast();

  function onSubmit(data: ProductFormValues) {
    console.log(data);
    toast({
      title: "Changes Saved",
      description: "Product details have been updated.",
    });
    router.push("/business/products");
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <div className="flex items-center">
            <Button asChild variant="outline" size="icon" className="mr-4">
                <Link href="/business/products">
                    <ArrowLeft className="h-4 w-4" />
                </Link>
            </Button>
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Edit Product {product.id}</h2>
                <p className="text-muted-foreground">Update the product or service details.</p>
            </div>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>Update the details for the product or service.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Web Design" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the product or service" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (MWK)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="150000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={product.type}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Product">Product</SelectItem>
                        <SelectItem value="Service">Service</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save Changes</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
</DashboardLayout>
