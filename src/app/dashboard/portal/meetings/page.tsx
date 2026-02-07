"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, MapPin, Plus } from "lucide-react";
import { portalMeetings } from "@/lib/mock-data";

export default function PortalMeetingsPage() {
  const upcoming = portalMeetings.filter((m) => m.status === "upcoming");
  const completed = portalMeetings.filter((m) => m.status === "completed");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Meetings</h1>
          <p className="text-muted-foreground">
            Your scheduled and past meetings
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Request Meeting
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Upcoming</p>
            <p className="text-2xl font-bold text-blue-500">
              {upcoming.length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold text-green-500">
              {completed.length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold">{portalMeetings.length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Meetings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcoming.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-center gap-4 rounded-lg border p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  {meeting.type === "video" ? (
                    <Video className="h-6 w-6 text-primary" />
                  ) : (
                    <MapPin className="h-6 w-6 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{meeting.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    With: {meeting.with}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{meeting.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>
                      {meeting.time} ({meeting.duration})
                    </span>
                  </div>
                </div>
                <Badge variant="outline">{meeting.type}</Badge>
                <Button variant="outline" size="sm">
                  Join
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Past Meetings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {completed.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-center gap-4 rounded-lg border p-4 opacity-70"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                  {meeting.type === "video" ? (
                    <Video className="h-6 w-6 text-muted-foreground" />
                  ) : (
                    <MapPin className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{meeting.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    With: {meeting.with}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{meeting.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>
                      {meeting.time} ({meeting.duration})
                    </span>
                  </div>
                </div>
                <Badge variant="secondary">completed</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
