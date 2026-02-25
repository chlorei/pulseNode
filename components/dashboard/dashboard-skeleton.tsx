"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Skeleton className="h-8 w-36 bg-secondary" />
        <Skeleton className="mt-2 h-4 w-56 bg-secondary" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card rounded-xl p-5">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24 bg-secondary" />
              <Skeleton className="size-8 rounded-lg bg-secondary" />
            </div>
            <Skeleton className="mt-4 h-8 w-20 bg-secondary" />
            <Skeleton className="mt-2 h-3 w-32 bg-secondary" />
            <Skeleton className="mt-3 h-3 w-40 bg-secondary" />
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="glass-card rounded-xl">
            <div className="border-b border-border/50 px-5 py-4">
              <Skeleton className="h-4 w-28 bg-secondary" />
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 border-b border-border/30 px-5 py-3"
              >
                <Skeleton className="size-8 rounded-lg bg-secondary" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 bg-secondary" />
                  <Skeleton className="mt-1.5 h-3 w-44 bg-secondary" />
                </div>
                <Skeleton className="h-5 w-20 rounded-full bg-secondary" />
                <Skeleton className="hidden h-4 w-12 bg-secondary sm:block" />
                <Skeleton className="hidden h-6 w-20 bg-secondary sm:block" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="glass-card rounded-xl">
            <div className="border-b border-border/50 px-5 py-4">
              <Skeleton className="h-4 w-24 bg-secondary" />
            </div>
            <div className="grid grid-cols-2 gap-3 p-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-lg bg-secondary/50 p-3">
                  <Skeleton className="h-3 w-16 bg-secondary" />
                  <Skeleton className="mt-2 h-6 w-12 bg-secondary" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
