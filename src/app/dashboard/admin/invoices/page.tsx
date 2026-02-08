"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { adminInvoices } from "@/lib/mock-data";

const statusColor = (s: string) => {
  const m: Record<string, "default" | "secondary" | "outline" | "destructive"> =
    {
      Paid: "secondary",
      Pending: "default",
      Overdue: "destructive",
      Draft: "outline",
    };
  return m[s] || "secondary";
};

export default function AdminInvoiceOperationsPage() {
  const paidTotal = adminInvoices
    .filter((i) => i.status === "Paid")
    .reduce((s, i) => s + i.amount, 0);
  const pendingTotal = adminInvoices
    .filter((i) => i.status === "Pending")
    .reduce((s, i) => s + i.amount, 0);
  const overdueTotal = adminInvoices
    .filter((i) => i.status === "Overdue")
    .reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Invoice Operations</h1>
          <p className="text-sm text-muted-foreground">
            Manage and process invoices
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Invoice</DialogTitle>
              <DialogDescription>
                Generate a new invoice for a client
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Client</label>
                <Input placeholder="Client name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount</label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Issue Date</label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Due Date</label>
                  <Input type="date" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Total Paid",
            value: `$${paidTotal.toLocaleString()}`,
            color: "text-green-500",
          },
          {
            label: "Pending",
            value: `$${pendingTotal.toLocaleString()}`,
            color: "text-blue-500",
          },
          {
            label: "Overdue",
            value: `$${overdueTotal.toLocaleString()}`,
            color: "text-red-500",
          },
          {
            label: "Processed by You",
            value: adminInvoices.length.toString(),
            color: "text-muted-foreground",
          },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-4 sm:pt-6">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className={`text-xl sm:text-2xl font-bold ${s.color}`}>
                {s.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="relative max-w-full sm:max-w-sm">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              placeholder="Search invoices..."
              className="pl-9"
              aria-label="Search invoices"
            />
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="hidden md:table-cell">Due Date</TableHead>
                <TableHead className="hidden lg:table-cell">Processed By</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminInvoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-mono text-sm font-medium">
                    {inv.id}
                  </TableCell>
                  <TableCell className="text-sm">{inv.client}</TableCell>
                  <TableCell className="text-sm font-medium">
                    ${inv.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColor(inv.status)}>
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                    {inv.date}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {inv.dueDate}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                    {inv.processedBy}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" aria-label="Download">
                      <Download className="h-4 w-4" />
                    </Button>
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
