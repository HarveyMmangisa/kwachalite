
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ArrowRightLeft, Settings, Briefcase, Users, Package, FileText, ChevronDown, Building2, User, FilePieChart, Target, Receipt, PiggyBank } from "lucide-react"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import * as React from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const personalNavItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/transactions", label: "Transactions", icon: ArrowRightLeft },
  { href: "/budgets", label: "Budgets", icon: Target },
  { href: "/savings", label: "Savings", icon: PiggyBank },
  { href: "/bills", label: "Bills", icon: Receipt },
]

const businessNavItems = [
    { href: "/business", label: "Dashboard", icon: LayoutDashboard },
    { href: "/business/details", label: "Details", icon: Building2 },
    { href: "/business/clients", label: "Clients", icon: Users },
    { href: "/business/products", label: "Products", icon: Package },
    { href: "/business/quotations", label: "Quotations", icon: FileText },
    { href: "/business/invoices", label: "Invoices", icon: FilePieChart },
]

const userNavItems = [
    { href: "/profile", label: "Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings },
]

export function Nav() {
  const pathname = usePathname()
  const [isPersonalOpen, setIsPersonalOpen] = React.useState(pathname.startsWith('/transactions') || pathname === '/');
  const [isBusinessOpen, setIsBusinessOpen] = React.useState(pathname.startsWith('/business'));
  const [isUserOpen, setIsUserOpen] = React.useState(pathname.startsWith('/profile') || pathname.startsWith('/settings'));


  return (
    <SidebarMenu>
        <Collapsible open={isPersonalOpen} onOpenChange={setIsPersonalOpen}>
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="w-full">
                        <User className="h-4 w-4" />
                        <span>Personal</span>
                        <ChevronDown className={cn("ml-auto h-4 w-4 transition-transform", isPersonalOpen && "rotate-180")} />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
            </SidebarMenuItem>
            <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
                <SidebarMenuSub>
                    {personalNavItems.map((item) => (
                        <SidebarMenuSubItem key={item.href}>
                            <Link href={item.href} passHref legacyBehavior>
                                <SidebarMenuSubButton isActive={pathname === item.href} asChild>
                                    <a>
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.label}</span>
                                    </a>
                                </SidebarMenuSubButton>
                            </Link>
                        </SidebarMenuSubItem>
                    ))}
                </SidebarMenuSub>
            </CollapsibleContent>
        </Collapsible>
       <Collapsible open={isBusinessOpen} onOpenChange={setIsBusinessOpen}>
        <SidebarMenuItem>
            <CollapsibleTrigger asChild>
                <SidebarMenuButton className="w-full">
                    <Briefcase className="h-4 w-4" />
                    <span>Business</span>
                    <ChevronDown className={cn("ml-auto h-4 w-4 transition-transform", isBusinessOpen && "rotate-180")} />
                </SidebarMenuButton>
            </CollapsibleTrigger>
        </SidebarMenuItem>
        <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
            <SidebarMenuSub>
                {businessNavItems.map((item) => (
                    <SidebarMenuSubItem key={item.href}>
                        <Link href={item.href} passHref legacyBehavior>
                            <SidebarMenuSubButton isActive={pathname === item.href} asChild>
                                <a>
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.label}</span>
                                </a>
                            </SidebarMenuSubButton>
                        </Link>
                    </SidebarMenuSubItem>
                ))}
            </SidebarMenuSub>
        </CollapsibleContent>
       </Collapsible>
       <Collapsible open={isUserOpen} onOpenChange={setIsUserOpen}>
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="w-full">
                        <User className="h-4 w-4" />
                        <span>User</span>
                        <ChevronDown className={cn("ml-auto h-4 w-4 transition-transform", isUserOpen && "rotate-180")} />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
            </SidebarMenuItem>
            <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
                <SidebarMenuSub>
                    {userNavItems.map((item) => (
                        <SidebarMenuSubItem key={item.href}>
                            <Link href={item.href} passHref legacyBehavior>
                                <SidebarMenuSubButton isActive={pathname === item.href} asChild>
                                    <a>
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.label}</span>
                                    </a>
                                </SidebarMenuSubButton>
                            </Link>
                        </SidebarMenuSubItem>
                    ))}
                </SidebarMenuSub>
            </CollapsibleContent>
        </Collapsible>
    </SidebarMenu>
  )
}
