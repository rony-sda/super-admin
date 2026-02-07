"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { Search, Download, DollarSign } from "lucide-react";
import { portalInvoices } from "@/lib/mock-data";

const statusColor = (s: string) =>
  s === "paid"
    ? ("secondary" as const)
    : s === "overdue"
      ? ("destructive" as const)
      : s === "pending"
        ? ("default" as const)
        : ("outline" as const);

export default function PortalInvoicesPage() {
  const totalPaid = portalInvoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + parseFloat(i.amount.replace(/[$,]/g, "")), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Invoices</h1>
          <p className="text-muted-foreground">View and manage your invoices</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          {
            label: "Paid",
            count: portalInvoices.filter((i) => i.status === "paid").length,
            color: "text-green-500",
          },
          {
            label: "Pending",
            count: portalInvoices.filter((i) => i.status === "pending").length,
            color: "text-blue-500",
          },
          {
            label: "Overdue",
            count: portalInvoices.filter((i) => i.status === "overdue").length,
            color: "text-red-500",
          },
          {
            label: "Total Paid",
            count: `$${(totalPaid / 1000).toFixed(1)}K`,
            color: "text-primary",
          },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search invoices..." className="pl-9" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Paid Date</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portalInvoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-mono text-sm">{inv.id}</TableCell>
                  <TableCell className="font-medium">
                    {inv.description}
                  </TableCell>
                  <TableCell className="font-bold">{inv.amount}</TableCell>
                  <TableCell>
                    <Badge variant={statusColor(inv.status)}>
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {inv.issueDate}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {inv.dueDate}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {inv.paidDate}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {inv.status === "pending" || inv.status === "overdue" ? (
                        <Button variant="outline" size="sm">
                          <DollarSign className="mr-1 h-3 w-3" />
                          Pay
                        </Button>
                      ) : (
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
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
