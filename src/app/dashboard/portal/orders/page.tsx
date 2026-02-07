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
import { Search, ShoppingCart, Eye } from "lucide-react";
import { portalOrders } from "@/lib/mock-data";

const statusColor = (s: string) =>
  s === "active"
    ? ("default" as const)
    : s === "completed"
      ? ("secondary" as const)
      : ("destructive" as const);

export default function PortalOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Shop Orders</h1>
          <p className="text-muted-foreground">
            Your subscriptions and purchases
          </p>
        </div>
        <Button>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Browse Shop
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            label: "Active",
            count: portalOrders.filter((o) => o.status === "active").length,
            color: "text-green-500",
          },
          {
            label: "Completed",
            count: portalOrders.filter((o) => o.status === "completed").length,
            color: "text-blue-500",
          },
          {
            label: "Cancelled",
            count: portalOrders.filter((o) => o.status === "cancelled").length,
            color: "text-red-500",
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
            <Input placeholder="Search orders..." className="pl-9" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Renewal</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portalOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-sm">
                    {order.id}
                  </TableCell>
                  <TableCell className="font-medium">{order.product}</TableCell>
                  <TableCell className="font-medium">{order.amount}</TableCell>
                  <TableCell>
                    <Badge variant={statusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {order.date}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {order.renewal}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
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
