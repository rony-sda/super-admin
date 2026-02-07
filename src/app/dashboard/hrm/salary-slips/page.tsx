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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DollarSign,
  FileText,
  Download,
  Search,
  Printer,
  Eye,
} from "lucide-react";
import { hrmSalarySlips } from "@/lib/mock-data";

const statusColor = (s: string) =>
  s === "generated" ? "default" : s === "pending" ? "outline" : "secondary";

export default function SalarySlipsPage() {
  const totalPayout = hrmSalarySlips.reduce((sum, s) => sum + s.netPay, 0);
  const generated = hrmSalarySlips.filter(
    (s) => s.status === "generated",
  ).length;
  const pending = hrmSalarySlips.filter((s) => s.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Salary Slips</h1>
          <p className="text-muted-foreground">
            Generate and manage monthly salary slips for employees
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export All
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" /> Generate Slips
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Payout</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalPayout.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">December 2024</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Generated</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{generated}</div>
            <p className="text-xs text-muted-foreground">Slips ready</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <FileText className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting generation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hrmSalarySlips.length}</div>
            <p className="text-xs text-muted-foreground">This pay period</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">Salary List</TabsTrigger>
          <TabsTrigger value="detail">Slip Detail</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>December 2024 - Salary Slips</CardTitle>
                <div className="relative max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search employee..." className="pl-9" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-right">Base Salary</TableHead>
                    <TableHead className="text-right">Earnings</TableHead>
                    <TableHead className="text-right">Deductions</TableHead>
                    <TableHead className="text-right">Net Pay</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hrmSalarySlips.map((slip) => {
                    const totalEarnings =
                      slip.hra + slip.transport + slip.bonus;
                    const totalDeductions = slip.pf + slip.tax + slip.insurance;
                    return (
                      <TableRow key={slip.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarFallback className="text-xs">
                                {slip.employee
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{slip.employee}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {slip.employeeId}
                        </TableCell>
                        <TableCell>{slip.department}</TableCell>
                        <TableCell className="text-right">
                          ${slip.baseSalary.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right text-green-600">
                          +${totalEarnings.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right text-red-500">
                          -${totalDeductions.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          ${slip.netPay.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusColor(slip.status)}>
                            {slip.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                            >
                              <Printer className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                            >
                              <Download className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detail">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    Salary Slip - {hrmSalarySlips[0].employee}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {hrmSalarySlips[0].month} | {hrmSalarySlips[0].employeeId}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Printer className="mr-2 h-3.5 w-3.5" /> Print
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-3.5 w-3.5" /> PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-muted-foreground">
                    Earnings
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Base Salary</span>
                      <span>
                        ${hrmSalarySlips[0].baseSalary.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>HRA</span>
                      <span>${hrmSalarySlips[0].hra.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Transport Allowance</span>
                      <span>
                        ${hrmSalarySlips[0].transport.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Bonus</span>
                      <span>${hrmSalarySlips[0].bonus.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm font-semibold">
                      <span>Total Earnings</span>
                      <span className="text-green-600">
                        $
                        {(
                          hrmSalarySlips[0].baseSalary +
                          hrmSalarySlips[0].hra +
                          hrmSalarySlips[0].transport +
                          hrmSalarySlips[0].bonus
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-muted-foreground">
                    Deductions
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Provident Fund</span>
                      <span>${hrmSalarySlips[0].pf.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Income Tax</span>
                      <span>${hrmSalarySlips[0].tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Health Insurance</span>
                      <span>
                        ${hrmSalarySlips[0].insurance.toLocaleString()}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm font-semibold">
                      <span>Total Deductions</span>
                      <span className="text-red-500">
                        $
                        {(
                          hrmSalarySlips[0].pf +
                          hrmSalarySlips[0].tax +
                          hrmSalarySlips[0].insurance
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg">
                <span className="text-lg font-semibold">Net Pay</span>
                <span className="text-2xl font-bold">
                  ${hrmSalarySlips[0].netPay.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
