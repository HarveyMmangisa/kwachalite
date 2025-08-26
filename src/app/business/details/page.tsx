
"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import DashboardLayout from "@/components/dashboard-layout"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

const businessDetailsFormSchema = z.object({
  name: z.string().min(1, "Business name is required"),
  address: z.string().min(1, "Address is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  logoUrl: z.string().url("Invalid URL").optional().or(z.literal('')),
  termsAndConditions: z.string().optional(),
})

type BusinessDetailsFormValues = z.infer<typeof businessDetailsFormSchema>

export default function BusinessDetailsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const form = useForm<BusinessDetailsFormValues>({
    resolver: zodResolver(businessDetailsFormSchema),
    defaultValues: {
      name: "",
      address: "",
      email: "",
      phone: "",
      logoUrl: "",
      termsAndConditions: "",
    },
  })

  if (loading) {
    return <DashboardLayout><p>Loading...</p></DashboardLayout>
  }

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  const logoUrl = form.watch("logoUrl");

  function onSubmit(data: BusinessDetailsFormValues) {
    console.log(data)
  }

  return (
    <DashboardLayout>
        <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <div className="flex items-center">
            <Button asChild variant="outline" size="icon" className="mr-4">
            <Link href="/business">
                <ArrowLeft className="h-4 w-4" />
            </Link>
            </Button>
            <div>
            <h2 className="text-3xl font-bold tracking-tight">Business Details</h2>
            <p className="text-muted-foreground">Manage your company information for quotations and invoices.</p>
            </div>
        </div>
        <Card>
            <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Update your business name, address, contact details, and logo.</CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                        <Input placeholder="Your Company LLC" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                        <Textarea placeholder="123 Business Rd, Suite 100" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                            <Input type="email" placeholder="contact@yourcompany.com" {...field} />
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
                            <Input placeholder="+1 (234) 567-890" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                    <FormField
                        control={form.control}
                        name="logoUrl"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Logo URL</FormLabel>
                            <FormControl>
                            <Input placeholder="https://yourcompany.com/logo.png" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    {logoUrl && (
                        <div className="flex flex-col space-y-2">
                            <FormLabel>Logo Preview</FormLabel>
                            <div className="w-48 h-24 relative bg-muted rounded-md flex items-center justify-center">
                            <Image src={logoUrl} alt="Logo Preview" layout="fill" objectFit="contain" data-ai-hint="logo" />
                            </div>
                        </div>
                    )}
                    <FormField
                    control={form.control}
                    name="termsAndConditions"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Terms & Conditions</FormLabel>
                        <FormControl>
                        <Textarea placeholder="Enter your terms and conditions or other notes for the quotation." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit">Save Details</Button>
                </form>
            </Form>
            </CardContent>
        </Card>
        </div>
    </DashboardLayout>
  )
}
