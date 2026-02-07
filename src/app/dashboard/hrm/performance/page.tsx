"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Star, Plus } from "lucide-react";
import { hrmPerformanceReviews } from "@/lib/mock-data";

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i <= Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : i - 0.5 <= rating ? "fill-yellow-400/50 text-yellow-400" : "text-muted-foreground"}`}
        />
      ))}
      <span className="ml-1 text-sm font-medium">{rating}</span>
    </div>
  );
}

export default function PerformancePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Performance Reviews</h1>
          <p className="text-muted-foreground">
            Employee performance evaluations
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Review
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Avg Rating</p>
            <p className="text-2xl font-bold">
              {(
                hrmPerformanceReviews.reduce((a, b) => a + b.rating, 0) /
                hrmPerformanceReviews.length
              ).toFixed(1)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold text-green-500">
              {
                hrmPerformanceReviews.filter((r) => r.status === "completed")
                  .length
              }
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-yellow-500">
              {
                hrmPerformanceReviews.filter((r) => r.status === "pending")
                  .length
              }
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Review Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Strengths</TableHead>
                <TableHead>Improvement Areas</TableHead>
                <TableHead>Reviewer</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hrmPerformanceReviews.map((rev) => (
                <TableRow key={rev.id}>
                  <TableCell className="font-medium">{rev.employee}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{rev.department}</Badge>
                  </TableCell>
                  <TableCell>
                    <RatingStars rating={rev.rating} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                    {rev.strengths}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {rev.areas}
                  </TableCell>
                  <TableCell className="text-sm">{rev.reviewer}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        rev.status === "completed" ? "secondary" : "outline"
                      }
                    >
                      {rev.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
