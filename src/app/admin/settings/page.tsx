"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  Shield,
  Mail,
  CreditCard,
  Database,
  Globe,
  Palette,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          System configuration, integrations, and security settings
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">
            <Settings className="h-4 w-4 mr-1.5" /> General
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="h-4 w-4 mr-1.5" /> Payment
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="h-4 w-4 mr-1.5" /> Email/SMS
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-1.5" /> Security
          </TabsTrigger>
          <TabsTrigger value="branding">
            <Palette className="h-4 w-4 mr-1.5" /> Branding
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Control the system availability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">System Online</p>
                  <p className="text-xs text-muted-foreground">
                    Toggle to put system in maintenance mode
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Registration Open</p>
                  <p className="text-xs text-muted-foreground">
                    Allow new user registrations
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">API Access</p>
                  <p className="text-xs text-muted-foreground">
                    Enable external API access
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Backup & Restore</CardTitle>
              <CardDescription>Manage system backups</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Last Backup</p>
                  <p className="text-xs text-muted-foreground">
                    2025-12-10 03:00 AM
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-700"
                >
                  Successful
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Database className="h-4 w-4 mr-2" /> Create Backup
                </Button>
                <Button variant="outline">Restore from Backup</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment API Integration</CardTitle>
              <CardDescription>Configure payment gateways</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Stripe Public Key</label>
                <Input type="password" defaultValue="pk_live_xxxxxxxxxxxxx" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Stripe Secret Key</label>
                <Input type="password" defaultValue="sk_live_xxxxxxxxxxxxx" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Test Mode</p>
                  <p className="text-xs text-muted-foreground">
                    Use test API keys
                  </p>
                </div>
                <Switch />
              </div>
              <Button>Save Payment Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Email & SMS Configuration</CardTitle>
              <CardDescription>Setup email and SMS providers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">SMTP Host</label>
                <Input defaultValue="smtp.gmail.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">SMTP Port</label>
                  <Input defaultValue="587" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Encryption</label>
                  <Input defaultValue="TLS" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">SMTP Username</label>
                <Input defaultValue="noreply@jevxo.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">SMTP Password</label>
                <Input type="password" defaultValue="xxxxxxxx" />
              </div>
              <Separator />
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  SMS API Key (Twilio)
                </label>
                <Input type="password" defaultValue="xxxxxxxx" />
              </div>
              <Button>Save Email/SMS Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">
                    Two-Factor Authentication
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Require 2FA for all admin users
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">IP Whitelisting</p>
                  <p className="text-xs text-muted-foreground">
                    Restrict admin access by IP
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Session Timeout</p>
                  <p className="text-xs text-muted-foreground">
                    Auto-logout after inactivity
                  </p>
                </div>
                <Input className="w-24" defaultValue="30" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Login Rate Limiting</p>
                  <p className="text-xs text-muted-foreground">
                    Max login attempts before lockout
                  </p>
                </div>
                <Input className="w-24" defaultValue="5" />
              </div>
              <Button>Save Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Branding</CardTitle>
              <CardDescription>Customize platform appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Platform Name</label>
                <Input defaultValue="Jevxo" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tagline</label>
                <Input defaultValue="Enterprise Management Platform" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Primary Color</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    defaultValue="#000000"
                    className="w-12 h-9 p-1"
                  />
                  <Input defaultValue="#000000" className="flex-1" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Logo</label>
                <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed cursor-pointer hover:bg-muted/50">
                  <p className="text-sm text-muted-foreground">
                    Click to upload logo
                  </p>
                </div>
              </div>
              <Button>Save Branding</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
