"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, User, Flag } from "lucide-react";
import { portalProjects } from "@/lib/mock-data";

const statusColor = (s: string) =>
  s === "in_progress"
    ? ("default" as const)
    : s === "completed"
      ? ("secondary" as const)
      : ("outline" as const);

export default function PortalProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Projects</h1>
        <p className="text-muted-foreground">
          Track the progress of your projects
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            label: "In Progress",
            count: portalProjects.filter((p) => p.status === "in_progress")
              .length,
            color: "text-blue-500",
          },
          {
            label: "Completed",
            count: portalProjects.filter((p) => p.status === "completed")
              .length,
            color: "text-green-500",
          },
          {
            label: "Total",
            count: portalProjects.length,
            color: "text-primary",
          },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {portalProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <Badge variant={statusColor(project.status)}>
                  {project.status.replace("_", " ")}
                </Badge>
              </div>
              <CardDescription>
                {project.completedMilestones} of {project.milestones} milestones
                completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      Progress
                    </span>
                    <span className="text-sm font-medium">
                      {project.progress}%
                    </span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">Manager:</span>
                    <span>{project.manager}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">Start:</span>
                    <span>{project.startDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Flag className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">End:</span>
                    <span>{project.endDate}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
