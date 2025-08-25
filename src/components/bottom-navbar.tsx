
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ArrowRightLeft, Briefcase, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/transactions", label: "Transactions", icon: ArrowRightLeft },
  { href: "/business", label: "Business", icon: Briefcase },
]

export function BottomNavbar() {
  const pathname = usePathname()

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <div className="relative flex items-center justify-around h-16 bg-card border-t shadow-[0_-1px_4px_rgba(0,0,0,0.05)] mx-auto max-w-sm rounded-t-2xl">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center text-muted-foreground w-full h-full",
                isActive && "text-primary"
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          )
        })}

        <Link href="/transactions/add">
            <div className="absolute -top-6 flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg">
                <Plus className="h-6 w-6" />
                <span className="sr-only">Add Transaction</span>
            </div>
        </Link>
      </div>
    </div>
  )
}
