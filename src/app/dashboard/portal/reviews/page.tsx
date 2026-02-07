"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Plus } from "lucide-react";
import { portalReviews } from "@/lib/mock-data";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
        />
      ))}
    </div>
  );
}

export default function PortalReviewsPage() {
  const avgRating =
    portalReviews.reduce((sum, r) => sum + r.rating, 0) / portalReviews.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reviews</h1>
          <p className="text-muted-foreground">
            Your feedback and project reviews
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Write Review
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Average Rating</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-3xl font-bold">{avgRating.toFixed(1)}</p>
              <StarRating rating={Math.round(avgRating)} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Reviews</p>
            <p className="text-3xl font-bold">{portalReviews.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">5-Star Reviews</p>
            <p className="text-3xl font-bold text-yellow-500">
              {portalReviews.filter((r) => r.rating === 5).length}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {portalReviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">{review.project}</CardTitle>
                  <CardDescription>{review.date}</CardDescription>
                </div>
                <StarRating rating={review.rating} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave a Review</CardTitle>
          <CardDescription>
            Share your feedback about a completed project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Rating</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Star className="h-5 w-5 text-muted-foreground hover:text-yellow-400" />
                  </Button>
                ))}
              </div>
            </div>
            <Textarea placeholder="Write your review..." rows={4} />
            <Button>Submit Review</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
