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
import { Search, Edit, RefreshCw } from "lucide-react";
import { pagesSeoSettings } from "@/lib/mock-data";

const scoreColor = (s: number) =>
  s >= 85 ? "text-green-500" : s >= 70 ? "text-yellow-500" : "text-red-500";
const statusBadge = (s: string) =>
  s === "optimized"
    ? ("secondary" as const)
    : s === "needs_improvement"
      ? ("default" as const)
      : ("destructive" as const);

export default function SeoSettingsPage() {
  const avgScore = Math.round(
    pagesSeoSettings.reduce((sum, p) => sum + p.score, 0) /
      pagesSeoSettings.length,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">SEO Settings</h1>
          <p className="text-muted-foreground">
            Optimize your pages for search engines
          </p>
        </div>
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Re-analyze All
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Average Score</p>
            <p className={`text-2xl font-bold ${scoreColor(avgScore)}`}>
              {avgScore}/100
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Optimized</p>
            <p className="text-2xl font-bold text-green-500">
              {pagesSeoSettings.filter((p) => p.status === "optimized").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Needs Improvement</p>
            <p className="text-2xl font-bold text-yellow-500">
              {
                pagesSeoSettings.filter((p) => p.status === "needs_improvement")
                  .length
              }
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Poor</p>
            <p className="text-2xl font-bold text-red-500">
              {pagesSeoSettings.filter((p) => p.status === "poor").length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Page SEO Overview</CardTitle>
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search pages..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagesSeoSettings.map((page) => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium">{page.page}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {page.url}
                  </TableCell>
                  <TableCell className="text-sm max-w-[200px] truncate">
                    {page.title}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={page.score} className="h-2 w-16" />
                      <span
                        className={`text-sm font-medium ${scoreColor(page.score)}`}
                      >
                        {page.score}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusBadge(page.status)}>
                      {page.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
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
