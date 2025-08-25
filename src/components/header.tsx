
"use client"

import { Button } from "@/components/ui/button"
import { Menu, PlusCircle } from "lucide-react"
import React from "react"
import { SidebarTrigger, useSidebar } from "./ui/sidebar"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Header() {
    const isMobile = useIsMobile();
    const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
       {!isMobile && <SidebarTrigger />}
       {isMobile && <h1 className="text-lg font-semibold">Kwacha Quick</h1>}

      <div className="flex-1" />

      <div className="hidden md:flex items-center gap-2">
         <Button size="sm" className="h-8 gap-1" asChild>
            <Link href="/transactions/add">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Transaction
                </span>
            </Link>
          </Button>
      </div>
    </header>
  )
}
