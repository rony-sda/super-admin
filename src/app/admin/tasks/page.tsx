"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { tasks } from "@/lib/mock-data";
import { Plus, Search, CheckSquare, Clock, ListTodo } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const priorityColor: Record<string, string> = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-gray-100 text-gray-700",
};

const columns = [
  { key: "Todo", label: "To Do", color: "border-t-gray-400" },
  { key: "In Progress", label: "In Progress", color: "border-t-blue-500" },
  { key: "Completed", label: "Completed", color: "border-t-emerald-500" },
];

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Task Management</h1>
          <p className="text-sm text-muted-foreground">
            Organize tasks with Kanban board, priorities, and deadlines
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Add Task
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="py-4">
          <CardContent className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
              <ListTodo className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {tasks.filter((t) => t.status === "Todo").length}
              </p>
              <p className="text-xs text-muted-foreground">To Do</p>
            </div>
          </CardContent>
        </Card>
        <Card className="py-4">
          <CardContent className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {tasks.filter((t) => t.status === "In Progress").length}
              </p>
              <p className="text-xs text-muted-foreground">In Progress</p>
            </div>
          </CardContent>
        </Card>
        <Card className="py-4">
          <CardContent className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
              <CheckSquare className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {tasks.filter((t) => t.status === "Completed").length}
              </p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="kanban">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search tasks..." className="pl-9 h-9" />
          </div>
        </div>

        <TabsContent value="kanban" className="mt-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {columns.map((col) => {
              const colTasks = tasks.filter((t) => t.status === col.key);
              return (
                <div
                  key={col.key}
                  className={`rounded-lg border border-t-4 ${col.color} bg-muted/30 p-4`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-sm">{col.label}</h3>
                    <Badge variant="secondary">{colTasks.length}</Badge>
                  </div>
                  <div className="space-y-3">
                    {colTasks.map((task) => (
                      <Card
                        key={task.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-4">
                          <h4 className="font-medium text-sm">{task.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {task.project}
                          </p>
                          <div className="mt-3 flex items-center justify-between">
                            <Badge
                              variant="secondary"
                              className={priorityColor[task.priority]}
                            >
                              {task.priority}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {task.dueDate}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <Badge variant="outline" className="text-[10px]">
                              {task.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {task.assignee}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-4 rounded-lg border p-3 hover:bg-muted/50"
                  >
                    <CheckSquare
                      className={`h-5 w-5 shrink-0 ${task.status === "Completed" ? "text-emerald-500" : "text-muted-foreground"}`}
                    />
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm font-medium ${task.status === "Completed" ? "line-through text-muted-foreground" : ""}`}
                      >
                        {task.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {task.project} &middot; {task.assignee}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={priorityColor[task.priority]}
                    >
                      {task.priority}
                    </Badge>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {task.dueDate}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
