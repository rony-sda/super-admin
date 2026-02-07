"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Calendar } from "lucide-react";
import { hrmAttendance } from "@/lib/mock-data";

const statusColor = (s: string) => {
  const m: Record<string, "default" | "secondary" | "outline" | "destructive"> =
    {
      present: "default",
      late: "secondary",
      on_leave: "outline",
      absent: "destructive",
    };
  return m[s] || "secondary";
};

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Attendance</h1>
          <p className="text-muted-foreground">
            Track daily employee attendance
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>December 11, 2024</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          {
            label: "Present",
            value: hrmAttendance.filter((a) => a.status === "present").length,
            color: "text-green-500",
          },
          {
            label: "Late",
            value: hrmAttendance.filter((a) => a.status === "late").length,
            color: "text-yellow-500",
          },
          {
            label: "On Leave",
            value: hrmAttendance.filter((a) => a.status === "on_leave").length,
            color: "text-blue-500",
          },
          {
            label: "Absent",
            value: hrmAttendance.filter((a) => a.status === "absent").length,
            color: "text-red-500",
          },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search employees..." className="pl-9" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Total Hours</TableHead>
                <TableHead>Overtime</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hrmAttendance.map((att) => (
                <TableRow key={att.id}>
                  <TableCell className="font-medium">{att.employee}</TableCell>
                  <TableCell className="text-sm">{att.date}</TableCell>
                  <TableCell className="text-sm font-mono">
                    {att.checkIn}
                  </TableCell>
                  <TableCell className="text-sm font-mono">
                    {att.checkOut}
                  </TableCell>
                  <TableCell className="text-sm">{att.hours}</TableCell>
                  <TableCell className="text-sm">{att.overtime}</TableCell>
                  <TableCell>
                    <Badge variant={statusColor(att.status)}>
                      {att.status.replace("_", " ")}
                    </Badge>
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
