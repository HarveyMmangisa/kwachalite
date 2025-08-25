
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, Users, CreditCard, Package, FileText, Building2 } from "lucide-react";
import SalesOverviewChart from "@/components/charts/sales-overview-chart";
import CustomerAcquisitionChart from "@/components/charts/customer-acquisition-chart";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const businessNavItems = [
    { href: "/business/details", label: "Business Details", icon: Building2, description: "Manage your company information." },
    { href: "/business/clients", label: "Clients", icon: Users, description: "Manage your clients." },
    { href: "/business/products", label: "Products", icon: Package, description: "Manage your products and services." },
    { href: "/business/quotations", label: "Quotations", icon: FileText, description: "Create and manage quotations." },
    { href: "/business/invoices", label: "Invoices", icon: CreditCard, description: "Create and manage invoices." },
]

export default function BusinessDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
       <div>
          <h2 className="text-3xl font-bold tracking-tight">Business Dashboard</h2>
          <p className="text-muted-foreground">An overview of your business performance and quick links to manage operations.</p>
        </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">MWK 1,250,231.89</div>
            <p className="text-xs text-muted-foreground">
              +15.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+MWK 345,234.00</div>
            <p className="text-xs text-muted-foreground">
              +18.3% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +20% from last month
            </p>
          </CardContent>
        </Card>
      </div>

       <div className="space-y-4">
        <h3 className="text-2xl font-bold tracking-tight">Manage Your Business</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {businessNavItems.map((item) => (
                <Link href={item.href} key={item.href}>
                    <Card className="hover:bg-muted/50 transition-colors h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
                            <item.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <SalesOverviewChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Customer Acquisition</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomerAcquisitionChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
