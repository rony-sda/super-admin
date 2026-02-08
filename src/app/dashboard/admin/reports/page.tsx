"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from "recharts";
import {
  FolderKanban,
  CheckCircle2,
  ListTodo,
  FileText,
} from "lucide-react";
import { adminMonthlyReports } from "@/lib/mock-data";

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export default function AdminReportsPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">Monthly Reports</h1>
        <p className="text-sm text-muted-foreground">
          Your assigned projects, completed projects, tasks & invoices by month
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Assigned Projects",
            value: adminMonthlyReports.reduce((s, r) => s + r.assignedProjects, 0),
            icon: FolderKanban,
          },
          {
            label: "Completed Projects",
            value: adminMonthlyReports.reduce((s, r) => s + r.completedProjects, 0),
            icon: CheckCircle2,
          },
          {
            label: "Completed Tasks",
            value: adminMonthlyReports.reduce((s, r) => s + r.completedTasks, 0),
            icon: ListTodo,
          },
          {
            label: "Invoices (Paid)",
            value: adminMonthlyReports.reduce((s, r) => s + r.invoicesPaid, 0),
            icon: FileText,
          },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground truncate">{s.label}</p>
                  <p className="text-xl sm:text-2xl font-bold">{s.value}</p>
                </div>
                <s.icon
                  className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground shrink-0"
                  aria-hidden="true"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Projects Overview</CardTitle>
            <CardDescription>
              Assigned vs completed projects by month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adminMonthlyReports}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="month"
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid hsl(var(--border))",
                      background: "hsl(var(--card))",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="assignedProjects"
                    name="Assigned"
                    fill={COLORS[0]}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="completedProjects"
                    name="Completed"
                    fill={COLORS[1]}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Tasks & Invoices</CardTitle>
            <CardDescription>
              Completed tasks and invoices by month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={adminMonthlyReports}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="month"
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid hsl(var(--border))",
                      background: "hsl(var(--card))",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="completedTasks"
                    name="Tasks Done"
                    stroke={COLORS[2]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="invoicesPaid"
                    name="Invoices Paid"
                    stroke={COLORS[3]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="invoicesPending"
                    name="Invoices Pending"
                    stroke={COLORS[4]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Summary Table</CardTitle>
          <CardDescription>
            Detailed monthly breakdown
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div className="min-w-[500px]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium">Month</th>
                  <th className="text-right py-3 px-2 font-medium">Assigned</th>
                  <th className="text-right py-3 px-2 font-medium">Completed</th>
                  <th className="text-right py-3 px-2 font-medium">Tasks</th>
                  <th className="text-right py-3 px-2 font-medium">Paid</th>
                  <th className="text-right py-3 px-2 font-medium">Pending</th>
                </tr>
              </thead>
              <tbody>
                {adminMonthlyReports.map((row) => (
                  <tr key={row.month} className="border-b last:border-0">
                    <td className="py-3 px-2">{row.month}</td>
                    <td className="text-right py-3 px-2">{row.assignedProjects}</td>
                    <td className="text-right py-3 px-2">{row.completedProjects}</td>
                    <td className="text-right py-3 px-2">{row.completedTasks}</td>
                    <td className="text-right py-3 px-2 text-green-600">{row.invoicesPaid}</td>
                    <td className="text-right py-3 px-2 text-amber-600">{row.invoicesPending}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
