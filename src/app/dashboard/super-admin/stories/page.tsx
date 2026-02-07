"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { successStories } from "@/lib/mock-data";
import { Plus, Edit, Trash2, Eye, Trophy, Image } from "lucide-react";

const statusColor: Record<string, string> = {
  Published: "bg-emerald-100 text-emerald-700",
  Draft: "bg-gray-100 text-gray-700",
};

export default function StoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Success Stories</h1>
          <p className="text-sm text-muted-foreground">
            Showcase client success stories and testimonials
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Add Story
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {successStories.map((story) => (
          <Card key={story.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-50">
                  <Trophy className="h-6 w-6 text-amber-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold">{story.title}</h3>
                    <Badge
                      variant="secondary"
                      className={statusColor[story.status]}
                    >
                      {story.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {story.client}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{story.date}</span>
                      <span>{story.views.toLocaleString()} views</span>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
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
