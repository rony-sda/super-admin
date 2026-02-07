"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Clock, Users, Video, Calendar } from "lucide-react";
import { crmMeetings } from "@/lib/mock-data";

export default function MeetingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Meetings</h1>
          <p className="text-muted-foreground">Schedule and manage meetings</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Schedule Meeting
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {crmMeetings.map((meeting) => (
          <Card key={meeting.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{meeting.title}</p>
                  <Badge
                    variant={
                      meeting.type === "client" ? "default" : "secondary"
                    }
                    className="mt-1"
                  >
                    {meeting.type}
                  </Badge>
                </div>
                <Badge
                  variant={
                    meeting.status === "upcoming" ? "outline" : "secondary"
                  }
                >
                  {meeting.status}
                </Badge>
              </div>
              <div className="space-y-1.5 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  {meeting.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  {meeting.time} ({meeting.duration})
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3" />
                  {meeting.attendees} attendees
                </div>
              </div>
              {meeting.status === "upcoming" && (
                <Button variant="outline" size="sm" className="w-full">
                  <Video className="mr-2 h-3 w-3" />
                  Join Meeting
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
