import { type Metadata } from "next"
import { env } from "@/env.mjs"
import { type BlogPostParamsProps } from "@/types"
import { allPosts } from "contentlayer/generated"

import { absoluteUrl } from "@/lib/utils"

export function getPostFromParams(params: BlogPostParamsProps["params"]) {
  const slug = params?.slug?.join("/")
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) return null
  return post
}

export function generateStaticParams(): Promise<
  BlogPostParamsProps["params"][]
> {
  return Promise.resolve(
    allPosts.map((post) => ({
      slug: post.slugAsParams.split("/"),
    }))
  )
}

export function generateMetadata({
  params,
}: BlogPostParamsProps): Promise<Metadata> {
  const post = getPostFromParams(params)
  if (!post) return Promise.resolve({})

  const ogUrl = new URL(absoluteUrl("/api/og"))
  ogUrl.searchParams.set("title", post.title)
  ogUrl.searchParams.set("type", "Blog Post")
  ogUrl.searchParams.set("mode", "dark")

  return Promise.resolve({
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    title: post.title,
    description: post.description,
    authors: post.authors.map((author) => ({
      name: author,
    })),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: absoluteUrl(post.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogUrl.toString()],
    },
  })
}
