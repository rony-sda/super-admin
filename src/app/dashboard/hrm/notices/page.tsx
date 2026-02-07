"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Bell, AlertTriangle, Info, PartyPopper } from "lucide-react";
import { hrmNotices } from "@/lib/mock-data";

const priorityColor = (p: string) =>
  p === "high" ? "destructive" : p === "medium" ? "default" : "secondary";
const categoryIcon = (c: string) => {
  if (c === "Events")
    return <PartyPopper className="h-5 w-5 text-purple-500" />;
  if (c === "Benefits" || c === "General")
    return <Info className="h-5 w-5 text-blue-500" />;
  if (c === "Facility")
    return <AlertTriangle className="h-5 w-5 text-orange-500" />;
  return <Bell className="h-5 w-5 text-muted-foreground" />;
};

export default function NoticesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notices & Alerts</h1>
          <p className="text-muted-foreground">
            Company announcements and notifications
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Notice
        </Button>
      </div>

      <div className="space-y-4">
        {hrmNotices.map((notice) => (
          <Card key={notice.id} className="hover:shadow-md transition-shadow">
            <CardContent className="py-5">
              <div className="flex items-start gap-4">
                <div className="mt-0.5">{categoryIcon(notice.category)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-medium">{notice.title}</h3>
                    <Badge variant={priorityColor(notice.priority)}>
                      {notice.priority}
                    </Badge>
                    <Badge variant="outline">{notice.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {notice.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {notice.date}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
