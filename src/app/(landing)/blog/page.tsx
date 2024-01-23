import Image from "next/image"
import Link from "next/link"
import { env } from "@/env.mjs"
import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import { formatDate } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Icons } from "@/components/icons"

export const metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Blog",
  description: "Read out latest blog posts",
}

export default function BlogPage(): JSX.Element {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <div className="container grid w-full max-w-7xl grid-cols-2 gap-8 py-24 md:py-16 lg:grid-cols-3 lg:gap-16 lg:py-32">
      {posts.map((post, index) => (
        <Link key={post.slug} href={post.slug}>
          <article className="flex flex-col space-y-2.5">
            <AspectRatio ratio={16 / 9}>
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 384px, (min-width: 768px) 288px, (min-width: 640px) 224px, 100vw"
                  className="rounded-lg object-cover"
                  priority={index <= 1}
                />
              ) : (
                <div
                  aria-label="Placeholder"
                  role="img"
                  aria-roledescription="placeholder"
                  className="flex size-full items-center justify-center rounded-lg bg-secondary"
                >
                  <Icons.placeholder
                    className="size-9 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
              )}
            </AspectRatio>
            <h2 className="line-clamp-1 text-xl font-semibold">{post.title}</h2>
            <p className="line-clamp-2 text-muted-foreground">
              {post.description}
            </p>
            {post.date ? (
              <p className="text-sm text-muted-foreground">
                {formatDate(post.date)}
              </p>
            ) : null}
          </article>
          <span className="sr-only">{post.title}</span>
        </Link>
      ))}
    </div>
  )
}
