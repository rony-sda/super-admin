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
import { Progress } from "@/components/ui/progress";
import { projects } from "@/lib/mock-data";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  FolderKanban,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const statusConfig: Record<
  string,
  { color: string; icon: typeof CheckCircle }
> = {
  "In Progress": { color: "bg-blue-100 text-blue-700", icon: Clock },
  Completed: { color: "bg-emerald-100 text-emerald-700", icon: CheckCircle },
  Pending: { color: "bg-amber-100 text-amber-700", icon: AlertCircle },
  Rejected: { color: "bg-red-100 text-red-700", icon: XCircle },
};

const priorityColor: Record<string, string> = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-gray-100 text-gray-700",
};

function formatCurrency(val: number) {
  return "$" + val.toLocaleString();
}

export default function ProjectsPage() {
  const inProgress = projects.filter((p) => p.status === "In Progress");
  const pending = projects.filter((p) => p.status === "Pending");
  const completed = projects.filter((p) => p.status === "Completed");
  const rejected = projects.filter((p) => p.status === "Rejected");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage all projects, track progress, and assign teams
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Add Project
        </Button>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            label: "In Progress",
            count: inProgress.length,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Pending",
            count: pending.length,
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
          {
            label: "Completed",
            count: completed.length,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Rejected",
            count: rejected.length,
            color: "text-red-600",
            bg: "bg-red-50",
          },
        ].map((s) => (
          <Card key={s.label} className="py-4">
            <CardContent className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.bg}`}
              >
                <FolderKanban className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.count}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({projects.length})</TabsTrigger>
          <TabsTrigger value="progress">
            In Progress ({inProgress.length})
          </TabsTrigger>
          <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({rejected.length})
          </TabsTrigger>
        </TabsList>

        {[
          { key: "all", data: projects },
          { key: "progress", data: inProgress },
          { key: "pending", data: pending },
          { key: "rejected", data: rejected },
        ].map((tab) => (
          <TabsContent key={tab.key} value={tab.key} className="mt-4">
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Projects</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search projects..."
                    className="pl-9 h-9"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Team</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tab.data.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">
                          {project.name}
                        </TableCell>
                        <TableCell>{project.client}</TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={statusConfig[project.status]?.color}
                          >
                            {project.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={priorityColor[project.priority]}
                          >
                            {project.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={project.progress}
                              className="h-2 w-16"
                            />
                            <span className="text-xs text-muted-foreground">
                              {project.progress}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{formatCurrency(project.budget)}</TableCell>
                        <TableCell>{project.deadline || "—"}</TableCell>
                        <TableCell>{project.assignedTo || "—"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
