
"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { getClient, updateClient, Client } from "@/lib/db/clients"
import { useRouter, useParams } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth"

const clientFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  status: z.enum(["Active", "Inactive"]),
})

type ClientFormValues = z.infer<typeof clientFormSchema>

export default function EditClientPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const { toast } = useToast();
    const [client, setClient] = useState<Client | null>(null);
    const [loading, setLoading] = useState(true);
  
    const form = useForm<ClientFormValues>({
        resolver: zodResolver(clientFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            status: "Active",
        },
    });

    useEffect(() => {
        if (user && params.id) {
            getClient(user.uid, params.id as string).then(clientData => {
                if (clientData) {
                    setClient(clientData);
                    form.reset(clientData);
                } else {
                    toast({
                        title: "Error",
                        description: "Client not found.",
                        variant: "destructive",
                    });
                    router.push("/business/clients");
                }
            }).finally(() => setLoading(false))
        } else if (!user) {
          router.push("/auth/login");
        }
    }, [params.id, form, user, router, toast]);


  async function onSubmit(data: ClientFormValues) {
    if (user && params.id) {
        await updateClient(user.uid, params.id as string, data);
        toast({
          title: "Changes Saved",
          description: "Client details have been updated.",
        });
        router.push("/business/clients");
    }
  }

  if (loading) {
    return (
        <DashboardLayout>
            <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
                <p>Loading client...</p>
            </div>
        </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
       <div className="flex items-center">
        <Button asChild variant="outline" size="icon" className="mr-4">
            <Link href="/business/clients">
                <ArrowLeft className="h-4 w-4" />
            </Link>
        </Button>
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Edit Client</h2>
            <p className="text-muted-foreground">Update the client&apos;s details.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
          <CardDescription>Update the details for the client.</CardDescription>
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
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 234 567 890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
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
  </DashboardLayout>
  )
}
