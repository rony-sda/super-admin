"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Mail, Phone, Building2, Globe, Calendar, Edit } from "lucide-react";
import { adminProfile } from "@/lib/mock-data";

export default function AdminProfilePage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">My Profile</h1>
          <p className="text-sm text-muted-foreground">
            Manage your admin account information
          </p>
        </div>
        <Button>
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 mb-4">
                <AvatarFallback className="text-xl sm:text-2xl">
                  {adminProfile.avatar}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-lg sm:text-xl font-bold">{adminProfile.name}</h2>
              <p className="text-sm text-muted-foreground">
                {adminProfile.role}
              </p>
              <Badge className="mt-2" variant="secondary">
                {adminProfile.department}
              </Badge>
              <Separator className="my-4" />
              <div className="w-full space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                  <span className="text-sm truncate">{adminProfile.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                  <span className="text-sm">{adminProfile.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                  <span className="text-sm">{adminProfile.department}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                  <span className="text-sm truncate">{adminProfile.timezone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                  <span className="text-sm">
                    Joined {adminProfile.joinDate}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    defaultValue={adminProfile.name}
                    aria-label="Full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    defaultValue={adminProfile.email}
                    type="email"
                    aria-label="Email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    defaultValue={adminProfile.phone}
                    aria-label="Phone"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    defaultValue={adminProfile.department}
                    aria-label="Department"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input
                    id="timezone"
                    defaultValue={adminProfile.timezone}
                    aria-label="Timezone"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="language">Language</Label>
                  <Input
                    id="language"
                    defaultValue={adminProfile.language}
                    aria-label="Language"
                  />
                </div>
              </div>
              <Button className="mt-4">Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">
                      Receive updates via email
                    </p>
                  </div>
                  <Switch defaultChecked={adminProfile.notifications.email} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">SMS Notifications</p>
                    <p className="text-xs text-muted-foreground">
                      Receive updates via text message
                    </p>
                  </div>
                  <Switch defaultChecked={adminProfile.notifications.sms} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Push Notifications</p>
                    <p className="text-xs text-muted-foreground">
                      Receive browser push notifications
                    </p>
                  </div>
                  <Switch defaultChecked={adminProfile.notifications.push} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">Password</p>
                    <p className="text-xs text-muted-foreground">
                      Last changed 30 days ago
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0">
                    Change Password
                  </Button>
                </div>
                <Separator />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">
                      Two-Factor Authentication
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Add an extra layer of security
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0">
                    Enable 2FA
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
