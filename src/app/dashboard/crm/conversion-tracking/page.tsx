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
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  Users,
  Target,
  Clock,
  Search,
  Download,
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
import { crmConversions, crmConversionStats } from "@/lib/mock-data";

const stageColor = (s: string) =>
  s === "converted"
    ? "default"
    : s === "proposal"
      ? "secondary"
      : s === "qualified"
        ? "outline"
        : "outline";

export default function ConversionTrackingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Conversion Tracking</h1>
          <p className="text-muted-foreground">
            Monitor lead-to-client conversion metrics and performance
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {crmConversionStats.totalLeads}
            </div>
            <p className="text-xs text-muted-foreground">All tracked leads</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {crmConversionStats.conversionRate}%
            </div>
            <p className="text-xs text-muted-foreground">
              {crmConversionStats.converted} converted
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Days to Convert
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {crmConversionStats.avgDaysToConvert}
            </div>
            <p className="text-xs text-muted-foreground">Average sales cycle</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Deal Value
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(crmConversionStats.totalDealValue / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground">
              Converted pipeline value
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={crmConversionStats.monthlyConversions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="leads"
                  fill="hsl(var(--muted-foreground))"
                  name="New Leads"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="converted"
                  fill="hsl(var(--primary))"
                  name="Converted"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion by Source</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {crmConversionStats.conversionBySource.map((source) => (
              <div key={source.source} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{source.source}</span>
                  <span className="text-muted-foreground">
                    {source.converted}/{source.leads} ({source.rate}%)
                  </span>
                </div>
                <Progress value={source.rate} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lead Conversions</CardTitle>
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search leads..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Convert Date</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Deal Value</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Assignee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {crmConversions.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.lead}</TableCell>
                  <TableCell>{c.company}</TableCell>
                  <TableCell>{c.source}</TableCell>
                  <TableCell>{c.startDate}</TableCell>
                  <TableCell>{c.convertDate}</TableCell>
                  <TableCell>{c.daysToConvert ?? "-"}</TableCell>
                  <TableCell>{c.dealValue}</TableCell>
                  <TableCell>
                    <Badge variant={stageColor(c.stage)}>{c.stage}</Badge>
                  </TableCell>
                  <TableCell>{c.assignee}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
