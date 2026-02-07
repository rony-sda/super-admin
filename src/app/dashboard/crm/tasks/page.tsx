"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { crmTasks } from "@/lib/mock-data";

const priorityColor = (p: string) =>
  p === "critical"
    ? "destructive"
    : p === "high"
      ? "default"
      : p === "medium"
        ? "secondary"
        : "outline";
const statusIcon = (s: string) =>
  s === "completed"
    ? "bg-green-500"
    : s === "in_progress"
      ? "bg-blue-500"
      : "bg-muted-foreground";

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">
            Manage and track task progress
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            label: "Pending",
            count: crmTasks.filter((t) => t.status === "pending").length,
          },
          {
            label: "In Progress",
            count: crmTasks.filter((t) => t.status === "in_progress").length,
          },
          {
            label: "Completed",
            count: crmTasks.filter((t) => t.status === "completed").length,
          },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-bold">{s.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        {crmTasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="py-4">
              <div className="flex items-center gap-4">
                <Checkbox checked={task.status === "completed"} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${statusIcon(task.status)}`}
                    />
                    <p
                      className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}
                    >
                      {task.title}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {task.project} &middot; {task.assignee}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={priorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {task.dueDate}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
