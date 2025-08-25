"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ArrowRightLeft, BarChart3, Settings, Briefcase, Users, Package, FileText, ChevronDown } from "lucide-react"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import * as React from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const mainNavItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/transactions", label: "Transactions", icon: ArrowRightLeft },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
]

const businessNavItems = [
    { href: "/business", label: "Dashboard", icon: LayoutDashboard },
    { href: "/business/clients", label: "Clients", icon: Users },
    { href: "/business/products", label: "Products", icon: Package },
    { href: "/business/quotations", label: "Quotations", icon: FileText },
]

export function Nav() {
  const pathname = usePathname()
  const { open } = useSidebar()
  const [isBusinessOpen, setIsBusinessOpen] = React.useState(pathname.startsWith('/business'));


  return (
    <SidebarMenu>
      {mainNavItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} legacyBehavior passHref>
            <SidebarMenuButton
              isActive={pathname === item.href}
              className="w-full"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
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
    </SidebarMenu>
  )
}
