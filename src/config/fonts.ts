import { Inter, Urbanist } from "next/font/google"
import localFont from "next/font/local"

export const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const fontUrbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
})

export const fontHeading = localFont({
  src: "../../public/fonts/cal-sans-semi-bold.woff2",
  variable: "--font-heading",
})
