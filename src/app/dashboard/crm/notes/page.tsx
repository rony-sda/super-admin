"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Pin, StickyNote, MoreHorizontal } from "lucide-react";
import { crmNotes } from "@/lib/mock-data";

const categoryColor = (c: string) => {
  const map: Record<
    string,
    "default" | "secondary" | "destructive" | "outline"
  > = {
    strategy: "default",
    technical: "secondary",
    sales: "default",
    feedback: "outline",
    onboarding: "secondary",
    legal: "outline",
    requirements: "default",
    risk: "destructive",
  };
  return map[c] || "outline";
};

export default function NotesPage() {
  const pinnedNotes = crmNotes.filter((n) => n.pinned);
  const otherNotes = crmNotes.filter((n) => !n.pinned);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notes</h1>
          <p className="text-muted-foreground">
            Client notes, observations, and important records
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Note
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search notes..." className="pl-9" />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <StickyNote className="h-4 w-4" />
          <span>{crmNotes.length} notes total</span>
          <span className="mx-1">|</span>
          <Pin className="h-3 w-3" />
          <span>{pinnedNotes.length} pinned</span>
        </div>
      </div>

      {pinnedNotes.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
            <Pin className="h-3 w-3" /> Pinned Notes
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {pinnedNotes.map((note) => (
              <Card key={note.id} className="border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-base">{note.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <span>{note.client}</span>
                        <span>|</span>
                        <span>{note.author}</span>
                        <span>|</span>
                        <span>{note.date}</span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={categoryColor(note.category)}>
                        {note.category}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {note.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground">
          All Notes
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {otherNotes.map((note) => (
            <Card key={note.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-base">{note.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <span>{note.client}</span>
                      <span>|</span>
                      <span>{note.author}</span>
                      <span>|</span>
                      <span>{note.date}</span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={categoryColor(note.category)}>
                      {note.category}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{note.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
