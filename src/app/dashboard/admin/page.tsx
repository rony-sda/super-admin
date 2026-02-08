"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FolderKanban,
  ListTodo,
  FileText,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  adminStats,
  adminDashboardData,
} from "@/lib/mock-data";

function StatCard({
  title,
  value,
  growth,
  icon: Icon,
}: {
  title: string;
  value: string;
  growth: number;
  icon: React.ElementType;
}) {
  return (
    <Card>
      <CardContent className="pt-4 sm:pt-6">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-sm text-muted-foreground truncate">{title}</p>
            <p className="text-xl sm:text-2xl font-bold truncate">{value}</p>
            <div className="flex items-center gap-1 mt-1 flex-wrap">
              {growth >= 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500 shrink-0" aria-hidden="true" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 shrink-0" aria-hidden="true" />
              )}
              <span
                className={`text-xs shrink-0 ${growth >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {Math.abs(growth)}%
              </span>
              <span className="text-xs text-muted-foreground">
                vs last month
              </span>
            </div>
          </div>
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" aria-hidden="true" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your projects, tasks, and operations
        </p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="My Projects"
          value={adminStats.myProjects.toString()}
          growth={adminStats.projectsGrowth}
          icon={FolderKanban}
        />
        <StatCard
          title="Active Tasks"
          value={adminStats.activeTasks.toString()}
          growth={adminStats.tasksGrowth}
          icon={ListTodo}
        />
        <StatCard
          title="Invoices Processed"
          value={adminStats.invoicesProcessed.toString()}
          growth={adminStats.invoicesGrowth}
          icon={FileText}
        />
        <StatCard
          title="Total Revenue"
          value={`$${(adminStats.totalRevenue / 1000).toFixed(1)}K`}
          growth={12}
          icon={DollarSign}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Monthly Activity</CardTitle>
            <CardDescription>Projects assigned & completed, tasks done</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adminDashboardData.monthlyActivity}>
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
                    dataKey="assigned"
                    name="Assigned"
                    fill="hsl(var(--chart-1))"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="completed"
                    name="Completed"
                    fill="hsl(var(--chart-2))"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="tasks"
                    name="Tasks Done"
                    fill="hsl(var(--chart-3))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Recent Activity</CardTitle>
            <CardDescription>Your latest actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {adminDashboardData.recentActivity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 rounded-lg border p-3"
                >
                  <span
                    className={`flex h-2 w-2 mt-1.5 shrink-0 rounded-full ${
                      item.type === "project"
                        ? "bg-blue-500"
                        : item.type === "task"
                          ? "bg-green-500"
                          : "bg-amber-500"
                    }`}
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0 text-[10px]">
                    {item.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
