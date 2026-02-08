"use client";

import { useState } from "react";
import { Menu, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/toogle-button";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { adminProfile } from "@/lib/mock-data";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center gap-2 sm:gap-4 border-b bg-card px-3 sm:px-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden shrink-0"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex flex-1 items-center gap-2 sm:gap-4 min-w-0">
            <div className="relative max-w-xs sm:max-w-sm flex-1 min-w-0">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground shrink-0"
                aria-hidden="true"
              />
              <Input
                placeholder="Search..."
                className="pl-9 h-9 w-full min-w-0"
                aria-label="Search"
              />
            </div>
            <ModeToggle />
          </div>
          <Button variant="ghost" size="icon" className="relative shrink-0">
            <Bell className="h-5 w-5" aria-hidden="true" />
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white">
              3
            </span>
          </Button>
          <div className="hidden sm:flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
            {adminProfile.avatar}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
