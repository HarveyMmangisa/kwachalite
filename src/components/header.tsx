
"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, PlusCircle } from "lucide-react"
import { Nav } from "./nav"
import React from "react"
import { SidebarTrigger } from "./ui/sidebar"

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
       <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <Nav />
        </SheetContent>
      </Sheet>
      <div className="hidden md:block">
        <SidebarTrigger />
       </div>


      <div className="flex-1" />

      <div className="flex items-center gap-2">
         <Button size="sm" className="h-8 gap-1">
          <React.Fragment>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Transaction
            </span>
          </React.Fragment>
          </Button>
      </div>
    </header>
  )
}
