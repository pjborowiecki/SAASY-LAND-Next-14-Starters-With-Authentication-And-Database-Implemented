import "@/styles/mdx.css"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function BlogPostLoadingPage(): JSX.Element {
  return (
    <article className="container grid max-w-7xl items-center gap-8 py-24 md:py-16 lg:py-32">
      <Skeleton className="absolute left-[-200px] top-14 hidden h-9 w-28 xl:inline-block" />
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-10" />
        </div>
        <Skeleton className="h-6 w-full" />
        <div className="flex items-center space-x-2">
          <Skeleton className="size-10 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 w-10" />
          </div>
        </div>
      </div>
      <AspectRatio ratio={16 / 9}>
        <Skeleton className="size-full" />
      </AspectRatio>
      <Skeleton className="h-6 w-40" />
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
      <Separator className="my-4" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-6 w-28" />
      </div>
      <Skeleton className="mx-auto mt-4 h-6 w-28" />
    </article>
  )
}
