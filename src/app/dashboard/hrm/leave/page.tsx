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
import { Plus, Check, X } from "lucide-react";
import { hrmLeaveRequests } from "@/lib/mock-data";

const statusColor = (s: string) =>
  s === "approved" ? "secondary" : s === "pending" ? "outline" : "destructive";

export default function LeavePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Leave Management</h1>
          <p className="text-muted-foreground">
            Handle leave requests and balances
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Apply Leave
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          {
            label: "Total Requests",
            value: hrmLeaveRequests.length.toString(),
          },
          {
            label: "Approved",
            value: hrmLeaveRequests
              .filter((l) => l.status === "approved")
              .length.toString(),
            color: "text-green-500",
          },
          {
            label: "Pending",
            value: hrmLeaveRequests
              .filter((l) => l.status === "pending")
              .length.toString(),
            color: "text-yellow-500",
          },
          {
            label: "Avg Days/Request",
            value: (
              hrmLeaveRequests.reduce((a, b) => a + b.days, 0) /
              hrmLeaveRequests.length
            ).toFixed(1),
          },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color || ""}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hrmLeaveRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="font-medium">{req.employee}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{req.type}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{req.from}</TableCell>
                  <TableCell className="text-sm">{req.to}</TableCell>
                  <TableCell className="text-sm">{req.days}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {req.reason}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColor(req.status)}>
                      {req.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {req.status === "pending" && (
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-green-500"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
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
