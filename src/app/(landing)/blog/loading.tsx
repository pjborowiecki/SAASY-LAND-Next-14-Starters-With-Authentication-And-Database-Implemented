import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Skeleton } from "@/components/ui/skeleton"

export default function BlogLoadingPage(): JSX.Element {
  return (
    <div className="container grid w-full max-w-7xl grid-cols-2 gap-8 py-24 md:py-16 lg:grid-cols-3 lg:gap-16 lg:py-32">
      {Array.from({ length: 6 }).map((_, index) => (
        <article key={index} className="flex flex-col space-y-2.5">
          <AspectRatio ratio={16 / 9}>
            <Skeleton className="size-full" />
          </AspectRatio>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-6 w-28" />
        </article>
      ))}
    </div>
  )
}
