"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { adminTasks, adminProjects, teamMembers } from "@/lib/mock-data";

const priorityColor = (p: string) =>
  p === "critical" || p === "High"
    ? "destructive"
    : p === "high"
      ? "default"
      : p === "medium" || p === "Medium"
        ? "secondary"
        : "outline";

const statusIcon = (s: string) =>
  s === "Completed"
    ? "bg-green-500"
    : s === "In Progress"
      ? "bg-blue-500"
      : "bg-muted-foreground";

export default function AdminTasksPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);

  const pendingCount = adminTasks.filter((t) => t.status === "Todo").length;
  const inProgressCount = adminTasks.filter((t) => t.status === "In Progress").length;
  const completedCount = adminTasks.filter((t) => t.status === "Completed").length;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Tasks</h1>
          <p className="text-sm text-muted-foreground">
            Create, list & assign tasks
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <UserPlus className="mr-2 h-4 w-4" />
                Assign Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Assign Task</DialogTitle>
                <DialogDescription>
                  Select a task and assign it to a team member
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Task</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select task" />
                    </SelectTrigger>
                    <SelectContent>
                      {adminTasks.map((t) => (
                        <SelectItem key={t.id} value={String(t.id)}>
                          {t.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Assign To</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select team member" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.slice(0, 6).map((m) => (
                        <SelectItem key={m.id} value={String(m.id)}>
                          {m.name} ({m.role})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAssignOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setAssignOpen(false)}>
                  Assign
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create Task</DialogTitle>
                <DialogDescription>
                  Add a new task to a project
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Task Title</Label>
                  <Input id="title" placeholder="e.g. Implement login" />
                </div>
                <div className="space-y-2">
                  <Label>Project</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {adminProjects.map((p) => (
                        <SelectItem key={p.id} value={String(p.id)}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Assign To</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamMembers.slice(0, 6).map((m) => (
                          <SelectItem key={m.id} value={String(m.id)}>
                            {m.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="due">Due Date</Label>
                  <Input id="due" type="date" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setCreateOpen(false)}>
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
        {[
          { label: "Pending", count: pendingCount },
          { label: "In Progress", count: inProgressCount },
          { label: "Completed", count: completedCount },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-4 sm:pt-6">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-xl sm:text-2xl font-bold">{s.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        {adminTasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="py-3 sm:py-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <Checkbox
                  checked={task.status === "Completed"}
                  className="shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${statusIcon(task.status)}`}
                      aria-hidden="true"
                    />
                    <p
                      className={`font-medium truncate ${
                        task.status === "Completed"
                          ? "line-through text-muted-foreground"
                          : ""
                      }`}
                    >
                      {task.title}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5 truncate">
                    {task.project} &middot; {task.assignee}
                  </p>
                  {task.assignedBy && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Assigned by {task.assignedBy}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
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
