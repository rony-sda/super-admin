"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { teamMembers, clients, students } from "@/lib/mock-data";
import { CreditCard, Download, Printer, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function IDCard({
  name,
  role,
  id,
  type,
}: {
  name: string;
  role: string;
  id: number;
  type: string;
}) {
  return (
    <Card className="w-full max-w-xs">
      <CardContent className="pt-6">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <h3 className="mt-3 font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{role}</p>
          <Badge variant="outline" className="mt-2">
            {type}
          </Badge>
          <div className="mt-3 rounded bg-muted p-2 text-xs font-mono">
            ID: JVX-{type.toUpperCase().slice(0, 3)}-
            {String(id).padStart(4, "0")}
          </div>
          <div className="mt-3 flex justify-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-3.5 w-3.5 mr-1" /> Download
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-3.5 w-3.5 mr-1" /> Print
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function IDCardsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">ID Cards</h1>
          <p className="text-sm text-muted-foreground">
            Generate ID cards for staff, students, and clients
          </p>
        </div>
        <Button>
          <CreditCard className="h-4 w-4 mr-2" /> Generate Bulk
        </Button>
      </div>

      <Tabs defaultValue="staff">
        <TabsList>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>

        <TabsContent value="staff" className="mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
            {teamMembers.map((m) => (
              <IDCard
                key={m.id}
                name={m.name}
                role={m.role}
                id={m.id}
                type="Staff"
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="clients" className="mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
            {clients.map((c) => (
              <IDCard
                key={c.id}
                name={c.name}
                role={c.industry}
                id={c.id}
                type="Client"
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="students" className="mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
            {students.map((c) => (
              <IDCard
                key={c.id}
                name={c.name}
                role={c.department}
                id={c.id}
                type="Student"
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
