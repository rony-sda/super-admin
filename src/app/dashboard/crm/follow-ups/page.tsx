"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Phone,
  Mail,
  CalendarDays,
  Search,
  Plus,
  Clock,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { crmFollowUps } from "@/lib/mock-data";

const statusColor = (s: string) =>
  s === "completed"
    ? "default"
    : s === "overdue"
      ? "destructive"
      : s === "scheduled"
        ? "secondary"
        : "outline";

const priorityColor = (p: string) =>
  p === "high" ? "destructive" : p === "medium" ? "secondary" : "outline";

const typeIcon = (t: string) => {
  if (t === "call") return <Phone className="h-4 w-4" />;
  if (t === "email") return <Mail className="h-4 w-4" />;
  return <CalendarDays className="h-4 w-4" />;
};

export default function FollowUpsPage() {
  const pending = crmFollowUps.filter((f) => f.status === "pending").length;
  const overdue = crmFollowUps.filter((f) => f.status === "overdue").length;
  const scheduled = crmFollowUps.filter((f) => f.status === "scheduled").length;
  const completed = crmFollowUps.filter((f) => f.status === "completed").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Follow-ups</h1>
          <p className="text-muted-foreground">
            Track and manage follow-up activities with leads and clients
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Follow-up
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting action</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{overdue}</div>
            <p className="text-xs text-muted-foreground">
              Needs immediate attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduled}</div>
            <p className="text-xs text-muted-foreground">Upcoming activities</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completed}</div>
            <p className="text-xs text-muted-foreground">This period</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Follow-ups</CardTitle>
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search follow-ups..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {crmFollowUps.map((fu) => (
                <TableRow key={fu.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {typeIcon(fu.type)}
                      <span className="capitalize text-xs">{fu.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="text-xs">
                          {fu.contact
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{fu.contact}</div>
                        <div className="text-xs text-muted-foreground">
                          {fu.company}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {fu.subject}
                  </TableCell>
                  <TableCell>{fu.assignee}</TableCell>
                  <TableCell>{fu.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant={priorityColor(fu.priority)}>
                      {fu.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColor(fu.status)}>{fu.status}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-xs text-muted-foreground">
                    {fu.notes}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
