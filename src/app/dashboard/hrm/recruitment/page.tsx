"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, Users, Briefcase } from "lucide-react";
import { hrmRecruitment } from "@/lib/mock-data";

const statusColor = (s: string) => {
  const m: Record<string, "default" | "secondary" | "outline" | "destructive"> =
    {
      open: "default",
      interviewing: "secondary",
      screening: "outline",
      offer_sent: "destructive",
    };
  return m[s] || "secondary";
};

export default function RecruitmentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Recruitment</h1>
          <p className="text-muted-foreground">
            Manage job openings and applications
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Post Job
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Open Positions</p>
            <p className="text-2xl font-bold">{hrmRecruitment.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Applicants</p>
            <p className="text-2xl font-bold">
              {hrmRecruitment.reduce((a, b) => a + b.applicants, 0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Shortlisted</p>
            <p className="text-2xl font-bold">
              {hrmRecruitment.reduce((a, b) => a + b.shortlisted, 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {hrmRecruitment.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{job.position}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{job.department}</Badge>
                    <Badge variant="secondary">{job.type}</Badge>
                  </div>
                </div>
                <Badge variant={statusColor(job.status)}>
                  {job.status.replace("_", " ")}
                </Badge>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Shortlisted</span>
                  <span className="font-medium">
                    {job.shortlisted}/{job.applicants}
                  </span>
                </div>
                <Progress
                  value={(job.shortlisted / job.applicants) * 100}
                  className="h-2"
                />
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {job.applicants} applicants
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3" />
                  Posted {job.posted}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
