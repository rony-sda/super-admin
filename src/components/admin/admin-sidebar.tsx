"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  FileText,
  User,
  BarChart3,
  X,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { adminProfile } from "@/lib/mock-data";

const navGroups = [
  {
    label: "Main",
    items: [
      {
        name: "Dashboard",
        href: "/dashboard/admin",
        icon: LayoutDashboard,
        disabled: false,
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        name: "Projects",
        href: "/dashboard/admin/projects",
        icon: FolderKanban,
        disabled: false,
      },
      {
        name: "Tasks",
        href: "/dashboard/admin/tasks",
        icon: ListTodo,
        disabled: false,
      },
      {
        name: "Invoice Operations",
        href: "/dashboard/admin/invoices",
        icon: FileText,
        disabled: false,
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        name: "Profile",
        href: "/dashboard/admin/profile",
        icon: User,
        disabled: false,
      },
      {
        name: "Reports",
        href: "/dashboard/admin/reports",
        icon: BarChart3,
        disabled: false,
      },
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
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 flex h-full w-64 flex-col border-r bg-card transition-transform duration-200 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 items-center justify-between border-b px-4">
          <Link href="/dashboard/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
              J
            </div>
            <span className="text-lg font-bold">Jevxo Admin</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded hover:bg-muted"
            type="button"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-2 px-2" aria-label="Admin navigation">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-1">
              <button
                onClick={() => toggleGroup(group.label)}
                className="flex w-full items-center justify-between px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
                type="button"
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
                        aria-current={isActive ? "page" : undefined}
                      >
                        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
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
        </nav>

        <div className="border-t p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
              {adminProfile.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{adminProfile.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {adminProfile.email}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
