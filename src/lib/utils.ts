import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { siteConfig } from "@/config/site"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUsersInitials(
  firstName?: string,
  lastName?: string
): string {
  return `${firstName?.charAt(0) ?? ""} ${lastName?.charAt(0) ?? "ME"}`
}

export async function getStargazersCount(): Promise<number | null> {
  try {
    const response = await fetch(siteConfig.links.github, {
      headers: {
        Accept: "application/vnd.github+json",
      },
      next: {
        revalidate: 60,
      },
    })

    if (!response.ok) {
      return null
    }

    const data = (await response.json()) as { stargazers_count: number }
    return data.stargazers_count
  } catch (error) {
    console.error(error)
    return null
  }
}
