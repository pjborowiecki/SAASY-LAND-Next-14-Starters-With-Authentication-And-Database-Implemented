import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getGitHubStars(): Promise<number | null> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/pjborowiecki/SAASY-LAND-Next-13-Starters-With-Authentication-And-Database-Implemented",
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        next: {
          revalidate: 60,
        },
      }
    )

    if (!response.ok) {
      return null
    }

    const data = (await response.json()) as { stargazers_count: number }

    return data.stargazers_count
  } catch (err) {
    console.error(err)
    return null
  }
}
