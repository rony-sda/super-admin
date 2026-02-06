"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { dashboardStats } from "@/lib/mock-data";
import {
  DollarSign,
  TrendingUp,
  Users,
  FolderKanban,
  Briefcase,
  ShoppingBag,
  PiggyBank,
  TrendingDown,
  Activity,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

const statCards = [
  {
    label: "Total Income",
    value: dashboardStats.totalIncome,
    icon: DollarSign,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    change: "+12.5%",
  },
  {
    label: "Total Expenses",
    value: dashboardStats.totalExpenses,
    icon: TrendingDown,
    color: "text-red-600",
    bg: "bg-red-50",
    change: "+4.2%",
  },
  {
    label: "Total Clients",
    value: dashboardStats.totalClients,
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-50",
    change: "+8.1%",
  },
  {
    label: "Total Members",
    value: dashboardStats.totalMembers,
    icon: Users,
    color: "text-violet-600",
    bg: "bg-violet-50",
    change: "+2.3%",
  },
  {
    label: "Total Projects",
    value: dashboardStats.totalProjects,
    icon: FolderKanban,
    color: "text-amber-600",
    bg: "bg-amber-50",
    change: "+15.7%",
  },
  {
    label: "Active Services",
    value: dashboardStats.totalServices,
    icon: Briefcase,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    change: "+3.4%",
  },
  {
    label: "Products",
    value: dashboardStats.totalProducts,
    icon: ShoppingBag,
    color: "text-pink-600",
    bg: "bg-pink-50",
    change: "+6.8%",
  },
  {
    label: "Investments",
    value: dashboardStats.totalInvestments,
    icon: PiggyBank,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    change: "+22.1%",
  },
];

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

const activityTypeColors: Record<string, string> = {
  client: "bg-blue-100 text-blue-700",
  invoice: "bg-emerald-100 text-emerald-700",
  project: "bg-amber-100 text-amber-700",
  ticket: "bg-red-100 text-red-700",
  team: "bg-violet-100 text-violet-700",
  service: "bg-cyan-100 text-cyan-700",
};

function formatCurrency(val: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(val);
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back, Super Admin. Here&apos;s your overview.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="py-4">
              <CardContent className="flex items-center gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${stat.bg}`}
                >
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground truncate">
                    {stat.label}
                  </p>
                  <p className="text-xl font-bold">
                    {typeof stat.value === "number" && stat.value > 999
                      ? stat.label.includes("Income") ||
                        stat.label.includes("Expense") ||
                        stat.label.includes("Investment")
                        ? formatCurrency(stat.value)
                        : stat.value.toLocaleString()
                      : stat.value}
                  </p>
                  <p className="text-xs text-emerald-600 font-medium">
                    {stat.change}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Income vs Expense Bar Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
            <CardDescription>Monthly comparison for the year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboardStats.monthlyIncome}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="month"
                    className="text-xs"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis className="text-xs" tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="income"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                    name="Income"
                  />
                  <Bar
                    dataKey="expenses"
                    fill="#ef4444"
                    radius={[4, 4, 0, 0]}
                    name="Expenses"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Revenue distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dashboardStats.salesByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {dashboardStats.salesByCategory.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {dashboardStats.salesByCategory.map((item, i) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 text-xs"
                >
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[i] }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="ml-auto font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trend Line Chart + Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Net income trend over the year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardStats.monthlyIncome}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Income"
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Expenses"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardStats.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <Badge
                    variant="secondary"
                    className={`mt-0.5 text-[10px] shrink-0 ${activityTypeColors[activity.type] || ""}`}
                  >
                    {activity.type}
                  </Badge>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.user} &middot; {activity.time}
                    </p>
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
