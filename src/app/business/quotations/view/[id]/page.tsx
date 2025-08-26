
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import DashboardLayout from "@/components/dashboard-layout";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

// Dummy data structure - replace with your actual data structure
interface QuotationItem {
  name: string;
  description: string;
  quantity: number;
  price: number;
}

interface CompanyInfo {
  name: string;
  address: string;
  email: string;
  logoUrl: string;
  termsAndConditions: string;
}

interface Quotation {
  id: string;
  client: string;
  clientAddress: string;
  date: string;
  dueDate: string;
  status: string;
  items: QuotationItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes: string;
  company: CompanyInfo;
}

// Dummy function to simulate fetching quotation data - replace with actual data fetching
const getQuotation = async (userId: string, id: string): Promise<Quotation | null> => {
  // This needs to be implemented with firestore
  return null; // No hardcoded data
};

export default function ViewQuotationPage() {
  const params = useParams();
  const { toast } = useToast();
  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();


  useEffect(() => {
    if (user && params.id) {
      getQuotation(user.uid, params.id as string).then(data => {
        setQuotation(data);
        setLoading(false);
      });
    } else if (!user && !loading) {
        router.push("/auth/login");
    }
  }, [params.id, user, loading, router]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
          <p>Loading quotation...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!quotation) {
    return (
        <DashboardLayout>
            <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
                 <div className="flex items-center">
                    <Button asChild variant="outline" size="icon" className="mr-4">
                        <Link href="/business/quotations">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h2 className="text-3xl font-bold tracking-tight">Quotation Not Found</h2>
                </div>
            </div>
      </DashboardLayout>
    );
  }

  const handleEmail = () => {
    toast({
      title: "Email Sent",
      description: `Quotation ${quotation.id} emailed to ${quotation.client}.`,
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: `Quotation ${quotation.id} download initiated.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <Button asChild variant="outline" size="icon" className="mr-4">
                    <Link href="/business/quotations">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Quotation #{quotation.id}</h2>
                    <p className="text-muted-foreground">Viewing quotation details for client {quotation.client}.</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" onClick={handleEmail}><Mail className="mr-2 h-4 w-4" /> Email to Client</Button>
                <Button onClick={handleDownload}><Download className="mr-2 h-4 w-4" /> Download PDF</Button>
            </div>
        </div>

      <Card className="p-8">
        <CardHeader className="p-0 mb-8">
            <div className="flex justify-between items-start">
                <div>
                    {quotation.company.logoUrl && (
                        <div className="mb-4 relative h-12 w-36">
                            <Image src={quotation.company.logoUrl} alt={quotation.company.name} layout="fill" objectFit="contain" data-ai-hint="logo" />
                        </div>
                    )}
                    <h1 className="text-2xl font-bold text-primary">{quotation.company.name}</h1>
                    <p className="text-muted-foreground">{quotation.company.address}</p>
                    <p className="text-muted-foreground">{quotation.company.email}</p>
                </div>
                <div className="text-right">
                    <h2 className="text-3xl font-semibold">QUOTATION</h2>
                    <p className="text-lg">#{quotation.id}</p>
                    <Badge className={`mt-2 ${quotation.status === 'Sent' ? 'bg-blue-500' : 'bg-yellow-500'}`}>{quotation.status}</Badge>
                </div>
            </div>
        </CardHeader>
        <CardContent className="p-0">
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                    <h3 className="font-semibold mb-2">Bill To:</h3>
                    <p className="font-bold">{quotation.client}</p>
                    <p>{quotation.clientAddress}</p>
                </div>
                <div className="text-right">
                    <p><span className="font-semibold">Date:</span> {quotation.date}</p>
                    <p><span className="font-semibold">Due Date:</span> {quotation.dueDate}</p>
                </div>
            </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotation.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-right">MWK {item.price.toLocaleString()}</TableCell>
                  <TableCell className="text-right">MWK {(item.quantity * item.price).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-end mt-8">
            <div className="w-1/3 space-y-2">
                <div className="flex justify-between">
                    <span className="font-semibold">Subtotal</span>
                    <span>MWK {quotation.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold">VAT (16.5%)</span>
                    <span>MWK {quotation.tax.toLocaleString()}</span>
                </div>
                 <div className="flex justify-between font-bold text-xl border-t pt-2">
                    <span>Total</span>
                    <span>MWK {quotation.total.toLocaleString()}</span>
                </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start p-0 mt-8">
            <Separator className="mb-4" />
             <div className="w-full">
                <h4 className="font-semibold mb-2">Notes</h4>
                <p className="text-muted-foreground text-sm">{quotation.notes}</p>
            </div>
            {quotation.company.termsAndConditions && (
                <div className="w-full mt-4">
                    <h4 className="font-semibold mb-2">Terms & Conditions</h4>
                    <p className="text-muted-foreground text-sm">{quotation.company.termsAndConditions}</p>
                </div>
            )}
        </CardFooter>
      </Card>
    </div>
  </DashboardLayout>
  );
}
