"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  FolderKanban,
  Ticket,
  FileText,
  CalendarDays,
  DollarSign,
  ArrowRight,
  Clock,
} from "lucide-react";
import Link from "next/link";
import {
  portalStats,
  portalProfile,
  portalTickets,
  portalProjects,
  portalInvoices,
  portalMeetings,
} from "@/lib/mock-data";

export default function PortalDashboard() {
  const statCards = [
    {
      title: "Active Projects",
      value: portalStats.activeProjects,
      icon: FolderKanban,
      color: "text-blue-500",
      href: "/portal/projects",
    },
    {
      title: "Open Tickets",
      value: portalStats.openTickets,
      icon: Ticket,
      color: "text-orange-500",
      href: "/portal/tickets",
    },
    {
      title: "Pending Invoices",
      value: portalStats.pendingInvoices,
      icon: FileText,
      color: "text-red-500",
      href: "/portal/invoices",
    },
    {
      title: "Upcoming Meetings",
      value: portalStats.upcomingMeetings,
      icon: CalendarDays,
      color: "text-green-500",
      href: "/portal/meetings",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {portalProfile.name}
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s what&apos;s happening with your account
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{portalProfile.avatar}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{portalProfile.company}</p>
            <p className="text-xs text-muted-foreground">
              {portalProfile.role}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <p className="text-3xl font-bold">
                ${(portalStats.totalSpent / 1000).toFixed(1)}K
              </p>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-500">
                +{portalStats.spentGrowth}% this quarter
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Active Projects</CardTitle>
              <CardDescription>Your ongoing projects</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/portal/projects">
                View All <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portalProjects
                .filter((p) => p.status === "in_progress")
                .map((project) => (
                  <div key={project.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {project.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {project.progress}%
                      </span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Manager: {project.manager} &middot; Due: {project.endDate}
                    </p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Tickets</CardTitle>
              <CardDescription>Your latest support tickets</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/portal/tickets">
                View All <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {portalTickets.slice(0, 4).map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="text-sm font-medium">{ticket.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      {ticket.id} &middot; {ticket.category}
                    </p>
                  </div>
                  <Badge
                    variant={
                      ticket.status === "open"
                        ? "destructive"
                        : ticket.status === "in_progress"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {ticket.status.replace("_", " ")}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Meetings</CardTitle>
              <CardDescription>Your scheduled meetings</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/portal/meetings">
                View All <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {portalMeetings
                .filter((m) => m.status === "upcoming")
                .slice(0, 3)
                .map((meeting) => (
                  <div
                    key={meeting.id}
                    className="flex items-center gap-3 rounded-lg border p-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{meeting.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {meeting.date} at {meeting.time} &middot;{" "}
                        {meeting.duration}
                      </p>
                    </div>
                    <Badge variant="outline">{meeting.type}</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Invoices</CardTitle>
              <CardDescription>Your billing history</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/portal/invoices">
                View All <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {portalInvoices.slice(0, 4).map((inv) => (
                <div
                  key={inv.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="text-sm font-medium">{inv.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {inv.id} &middot; Due: {inv.dueDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{inv.amount}</p>
                    <Badge
                      variant={
                        inv.status === "paid"
                          ? "secondary"
                          : inv.status === "overdue"
                            ? "destructive"
                            : "default"
                      }
                      className="mt-1"
                    >
                      {inv.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
