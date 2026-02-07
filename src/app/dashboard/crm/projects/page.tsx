"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, Users, Calendar } from "lucide-react";
import { crmProjects } from "@/lib/mock-data";

const statusColor = (s: string) => {
  const m: Record<string, "default" | "secondary" | "outline" | "destructive"> =
    {
      in_progress: "default",
      completed: "secondary",
      planning: "outline",
      on_hold: "destructive",
    };
  return m[s] || "secondary";
};

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground">
            Track project progress and deliverables
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {crmProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{project.name}</CardTitle>
                <Badge variant={statusColor(project.status)}>
                  {project.status.replace("_", " ")}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{project.client}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>{project.team} members</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{project.deadline}</span>
                </div>
              </div>
              <div className="text-sm font-medium">
                Budget: {project.budget}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
