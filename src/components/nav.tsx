"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ArrowRightLeft, BarChart3, Settings, Briefcase, Users, Package, FileText, ChevronDown } from "lucide-react"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import * as React from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useIsMobile } from "@/hooks/use-mobile"


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
  const sidebar = useSidebar()
  const isMobile = useIsMobile()
  const [isBusinessOpen, setIsBusinessOpen] = React.useState(pathname.startsWith('/business'));
  
  if (isMobile) {
    return (
        <>
            {mainNavItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                    "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
                    pathname === item.href && "text-foreground"
                    )}
                >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                </Link>
            ))}
             <Collapsible open={isBusinessOpen} onOpenChange={setIsBusinessOpen} className="flex flex-col gap-4">
                <CollapsibleTrigger asChild>
                    <div className={cn(
                    "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
                    pathname.startsWith("/business") && "text-foreground"
                    )}>
                        <Briefcase className="h-5 w-5" />
                        Business
                        <ChevronDown className={cn("ml-auto h-5 w-5 transition-transform", isBusinessOpen && "rotate-180")} />
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="flex flex-col gap-4 ml-7 data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
                    {businessNavItems.map((item) => (
                        <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
                            pathname === item.href && "text-foreground"
                        )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    ))}
                </CollapsibleContent>
             </Collapsible>
        </>
    );
  }


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
