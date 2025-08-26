
"use client"

import { z } from "zod"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useAuth } from "@/hooks/use-auth"
import { useEffect, useState } from "react"
import { Client, getClients } from "@/lib/db/clients"
import { Product, getProducts } from "@/lib/db/products"
import DashboardLayout from "@/components/dashboard-layout"

const quotationFormSchema = z.object({
  client: z.string().min(1, "Client is required"),
  date: z.date(),
  items: z.array(z.object({
    productId: z.string().min(1, "Product is required"),
    quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
    price: z.coerce.number().min(0),
  })).min(1, "Quotation must have at least one item"),
})

type QuotationFormValues = z.infer<typeof quotationFormSchema>

export default function CreateQuotationPage() {
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      if (user) {
          Promise.all([
            getClients(user.uid),
            getProducts(user.uid)
          ]).then(([clientData, productData]) => {
              setClients(clientData);
              setProducts(productData);
              setLoading(false);
          })
      }
  }, [user]);

  const form = useForm<QuotationFormValues>({
    resolver: zodResolver(quotationFormSchema),
    defaultValues: {
      client: "",
      date: new Date(),
      items: [{ productId: "", quantity: 1, price: 0 }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  })
  
  const watchedItems = form.watch("items");

  const subtotal = watchedItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  const tax = subtotal * 0.165;
  const total = subtotal + tax;

  function onSubmit(data: QuotationFormValues) {
    console.log(data)
  }

  if (loading) {
      return <DashboardLayout><p>Loading...</p></DashboardLayout>
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
          <div className="flex items-center">
              <Button asChild variant="outline" size="icon" className="mr-4">
                  <Link href="/business/quotations">
                      <ArrowLeft className="h-4 w-4" />
                  </Link>
              </Button>
              <div>
                  <h2 className="text-3xl font-bold tracking-tight">Create New Quotation</h2>
                  <p className="text-muted-foreground">Fill out the form to create a new quotation.</p>
              </div>
          </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                  <CardHeader>
                      <CardTitle>Quotation Details</CardTitle>
                      <CardDescription>Select a client and date for the quotation.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-2">
                      <FormField
                          control={form.control}
                          name="client"
                          render={({ field }) => (
                          <FormItem>
                              <FormLabel>Client</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                  <SelectTrigger>
                                  <SelectValue placeholder="Select a client" />
                                  </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                  {clients.map(client => (
                                      <SelectItem key={client.id} value={client.id!}>{client.name}</SelectItem>
                                  ))}
                              </SelectContent>
                              </Select>
                              <FormMessage />
                          </FormItem>
                          )}
                      />
                      <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                              <FormItem className="flex flex-col">
                              <FormLabel>Quotation Date</FormLabel>
                              <Popover>
                                  <PopoverTrigger asChild>
                                  <FormControl>
                                      <Button
                                      variant={"outline"}
                                      className={cn(
                                          "w-full pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                      )}
                                      >
                                      {field.value ? (
                                          format(field.value, "PPP")
                                      ) : (
                                          <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                  </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) =>
                                      date > new Date() || date < new Date("1900-01-01")
                                      }
                                      initialFocus
                                  />
                                  </PopoverContent>
                              </Popover>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                  </CardContent>
              </Card>

              <Card>
                  <CardHeader>
                      <CardTitle>Items</CardTitle>
                      <CardDescription>Add products or services to the quotation.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <Table>
                          <TableHeader>
                          <TableRow>
                              <TableHead className="w-2/5">Product</TableHead>
                              <TableHead className="w-1/5">Quantity</TableHead>
                              <TableHead className="w-1/5 text-right">Price</TableHead>
                              <TableHead className="w-1/5 text-right">Total</TableHead>
                              <TableHead className="w-[50px]"><span className="sr-only">Actions</span></TableHead>
                          </TableRow>
                          </TableHeader>
                          <TableBody>
                          {fields.map((field, index) => (
                              <TableRow key={field.id}>
                                  <TableCell>
                                      <FormField
                                          control={form.control}
                                          name={`items.${index}.productId`}
                                          render={({ field }) => (
                                          <FormItem>
                                              <Select onValueChange={(value) => {
                                                  field.onChange(value);
                                                  const product = products.find(p => p.id === value);
                                                  if (product) {
                                                      form.setValue(`items.${index}.price`, product.price);
                                                  }
                                              }} defaultValue={field.value}>
                                              <FormControl>
                                                  <SelectTrigger>
                                                      <SelectValue placeholder="Select a product" />
                                                  </SelectTrigger>
                                              </FormControl>
                                              <SelectContent>
                                                  {products.map(product => (
                                                      <SelectItem key={product.id} value={product.id!}>{product.name}</SelectItem>
                                                  ))}
                                              </SelectContent>
                                              </Select>
                                              <FormMessage />
                                          </FormItem>
                                          )}
                                      />
                                  </TableCell>
                                  <TableCell>
                                      <FormField
                                          control={form.control}
                                          name={`items.${index}.quantity`}
                                          render={({ field }) => (
                                              <FormItem>
                                                  <FormControl>
                                                      <Input type="number" {...field} />
                                                  </FormControl>
                                                  <FormMessage/>
                                              </FormItem>
                                          )}
                                          />
                                  </TableCell>
                                  <TableCell className="text-right">
                                      <FormField
                                          control={form.control}
                                          name={`items.${index}.price`}
                                          render={({ field }) => (
                                              <FormItem>
                                                  <FormControl>
                                                      <Input type="number" className="text-right" {...field} />
                                                  </FormControl>
                                                  <FormMessage/>
                                              </FormItem>
                                          )}
                                          />
                                  </TableCell>
                                  <TableCell className="text-right font-medium">
                                      MWK {(watchedItems[index].quantity * watchedItems[index].price).toLocaleString()}
                                  </TableCell>
                                  <TableCell>
                                      <Button variant="ghost" size="icon" onClick={() => remove(index)}>
                                          <Trash2 className="h-4 w-4" />
                                      </Button>
                                  </TableCell>
                              </TableRow>
                          ))}
                          </TableBody>
                      </Table>
                  </CardContent>
                  <CardFooter className="justify-between">
                      <Button
                          type="button"
                          variant="outline"
                          onClick={() => append({ productId: "", quantity: 1, price: 0 })}
                      >
                          <PlusCircle className="mr-2 h-4 w-4" /> Add Item
                      </Button>
                      <div className="w-1/3 space-y-2">
                          <div className="flex justify-between">
                              <span>Subtotal</span>
                              <span>MWK {subtotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                              <span>VAT (16.5%)</span>
                              <span>MWK {tax.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between font-bold text-lg">
                              <span>Total</span>
                              <span>MWK {total.toLocaleString()}</span>
                          </div>
                      </div>
                  </CardFooter>
              </Card>

            <Button type="submit">Save Quotation</Button>
          </form>
        </Form>
      </div>
    </DashboardLayout>
  )
}
