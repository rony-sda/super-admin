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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { marketingCampaigns } from "@/lib/mock-data";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Megaphone,
  Mail,
  MessageSquare,
  Bell,
  BarChart3,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const statusColor: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Scheduled: "bg-blue-100 text-blue-700",
  Completed: "bg-gray-100 text-gray-700",
  Draft: "bg-amber-100 text-amber-700",
};

const typeIcon: Record<string, typeof Mail> = {
  Email: Mail,
  SMS: MessageSquare,
  Push: Bell,
};

export default function MarketingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Marketing Module</h1>
          <p className="text-sm text-muted-foreground">
            Bulk email, SMS, push notifications, and campaign reports
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> New Campaign
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="py-4">
          <CardContent className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {marketingCampaigns.filter((c) => c.type === "Email").length}
              </p>
              <p className="text-xs text-muted-foreground">Email Campaigns</p>
            </div>
          </CardContent>
        </Card>
        <Card className="py-4">
          <CardContent className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
              <MessageSquare className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {marketingCampaigns.filter((c) => c.type === "SMS").length}
              </p>
              <p className="text-xs text-muted-foreground">SMS Campaigns</p>
            </div>
          </CardContent>
        </Card>
        <Card className="py-4">
          <CardContent className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50">
              <Bell className="h-5 w-5 text-violet-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {marketingCampaigns.filter((c) => c.type === "Push").length}
              </p>
              <p className="text-xs text-muted-foreground">Push Campaigns</p>
            </div>
          </CardContent>
        </Card>
        <Card className="py-4">
          <CardContent className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
              <BarChart3 className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {marketingCampaigns
                  .reduce((a, c) => a + c.sent, 0)
                  .toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Total Sent</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>All Campaigns</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search campaigns..." className="pl-9 h-9" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Opened</TableHead>
                <TableHead>Clicked</TableHead>
                <TableHead>Open Rate</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {marketingCampaigns.map((campaign) => {
                const TypeIcon = typeIcon[campaign.type] || Megaphone;
                const openRate =
                  campaign.sent > 0
                    ? Math.round((campaign.opened / campaign.sent) * 100)
                    : 0;
                return (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">
                      {campaign.name}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <TypeIcon className="h-4 w-4 text-muted-foreground" />
                        {campaign.type}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={statusColor[campaign.status]}
                      >
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{campaign.sent.toLocaleString()}</TableCell>
                    <TableCell>{campaign.opened.toLocaleString()}</TableCell>
                    <TableCell>{campaign.clicked.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={openRate} className="h-2 w-12" />
                        <span className="text-xs">{openRate}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{campaign.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
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
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bulk Calls Coming Soon */}
      <Card className="border-dashed">
        <CardContent className="flex items-center justify-center py-8 text-muted-foreground">
          <Megaphone className="h-5 w-5 mr-2" />
          <span>Bulk Calls feature coming soon</span>
        </CardContent>
      </Card>
    </div>
  );
}
