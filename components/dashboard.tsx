"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAccountsStore } from "@/lib/store/accounts";
import { useInstagramStore } from "@/lib/store/instagram";
import { InstagramService } from "@/lib/services/instagram";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function Dashboard() {
  const accounts = useAccountsStore((state) => state.accounts);
  const { stats, isLoading, error, fetchAccountStats, refreshAllStats } = useInstagramStore();

  useEffect(() => {
    const fetchStats = async () => {
      for (const account of accounts) {
        if (!stats[account.id]) {
          await fetchAccountStats(account);
        }
      }
    };
    fetchStats();
  }, [accounts, fetchAccountStats, stats]);

  const handleRefresh = async () => {
    try {
      await refreshAllStats();
      toast.success("Stats refreshed successfully");
    } catch (error) {
      toast.error("Failed to refresh stats");
    }
  };

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>{error}</p>
        <Button onClick={handleRefresh} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Button onClick={handleRefresh} disabled={isLoading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {accounts.map((account) => {
          const accountStats = stats[account.id];
          return (
            <Card key={account.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{account.name}</span>
                  <span className="text-sm text-muted-foreground">@{account.username}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ) : accountStats ? (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Followers</span>
                      <span className="font-medium">{accountStats.followers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Following</span>
                      <span className="font-medium">{accountStats.following.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Posts</span>
                      <span className="font-medium">{accountStats.posts.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Engagement Rate</span>
                      <span className="font-medium">{accountStats.engagementRate.toFixed(2)}%</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">No data available</div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {accounts.some((account) => stats[account.id]?.recentPosts.length > 0) && (
        <div className="mt-8">
          <h3 className="mb-4 text-xl font-semibold">Recent Posts</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {accounts.map((account) => {
              const accountStats = stats[account.id];
              return accountStats?.recentPosts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-0">
                    <img
                      src={post.mediaUrl}
                      alt="Post"
                      className="aspect-square w-full object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                        <div className="flex gap-4">
                          <span>❤️ {post.likes.toLocaleString()}</span>
                          <span>💬 {post.comments.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ));
            })}
          </div>
        </div>
      )}
    </div>
  );
} 