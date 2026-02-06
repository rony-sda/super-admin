"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Briefcase,
  Users,
  CheckSquare,
  UserCircle,
  Receipt,
  Megaphone,
  Shield,
  Handshake,
  GraduationCap,
  LifeBuoy,
  Trophy,
  CreditCard,
  Settings,
  ChevronDown,
  ShoppingBag,
  Building2,
  X,
} from "lucide-react";
import { useState } from "react";

const navGroups = [
  {
    label: "Main",
    items: [{ name: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    label: "Management",
    items: [
      { name: "Content (CMS)", href: "/admin/cms", icon: FileText },
      { name: "Projects", href: "/admin/projects", icon: FolderKanban },
      { name: "Services", href: "/admin/services", icon: Briefcase },
      { name: "Team", href: "/admin/team", icon: Users },
      { name: "Tasks", href: "/admin/tasks", icon: CheckSquare },
      { name: "Clients", href: "/admin/clients", icon: UserCircle },
    ],
  },
  {
    label: "Finance",
    items: [
      { name: "Invoices", href: "/admin/invoices", icon: Receipt },
      { name: "Partnership", href: "/admin/partnership", icon: Handshake },
    ],
  },
  {
    label: "Marketing",
    items: [
      { name: "Campaigns", href: "/admin/marketing", icon: Megaphone },
      { name: "Success Stories", href: "/admin/stories", icon: Trophy },
    ],
  },
  {
    label: "Organization",
    items: [
      { name: "Roles & Permissions", href: "/admin/roles", icon: Shield },
      { name: "School Control", href: "/admin/schools", icon: GraduationCap },
      { name: "ID Cards", href: "/admin/id-cards", icon: CreditCard },
    ],
  },
  {
    label: "Support & Config",
    items: [
      { name: "Support Tickets", href: "/admin/support", icon: LifeBuoy },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
  {
    label: "Coming Soon",
    items: [
      {
        name: "Shop (E-Commerce)",
        href: "#",
        icon: ShoppingBag,
        disabled: true,
      },
      { name: "Office Management", href: "#", icon: Building2, disabled: true },
    ],
  },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleGroup = (label: string) => {
    setCollapsed((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 flex h-full w-64 flex-col border-r bg-card transition-transform duration-200 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 items-center justify-between border-b px-4">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
              J
            </div>
            <span className="text-lg font-bold">Jevxo</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2 px-2">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-1">
              <button
                onClick={() => toggleGroup(group.label)}
                className="flex w-full items-center justify-between px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
              >
                {group.label}
                <ChevronDown
                  className={cn(
                    "h-3 w-3 transition-transform",
                    collapsed[group.label] && "-rotate-90",
                  )}
                />
              </button>
              {!collapsed[group.label] && (
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.disabled ? "#" : item.href}
                        onClick={
                          item.disabled
                            ? (e) => e.preventDefault()
                            : () => onClose()
                        }
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          item.disabled && "opacity-40 cursor-not-allowed",
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="truncate">{item.name}</span>
                        {item.disabled && (
                          <span className="ml-auto text-[10px] rounded bg-muted px-1.5 py-0.5">
                            Soon
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="border-t p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
              SA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Super Admin</p>
              <p className="text-xs text-muted-foreground truncate">
                admin@jevxo.com
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
