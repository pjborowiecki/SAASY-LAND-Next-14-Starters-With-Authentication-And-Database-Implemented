"use client"

import * as React from "react"
import type LocomotiveScroll from "locomotive-scroll"

const LocomotiveContext = React.createContext<LocomotiveScroll | null>(null)

export function useLocomotiveScroll() {
  return React.useContext(LocomotiveContext)
}

export function SmoothScrollProvider({
  children,
}: React.PropsWithChildren): JSX.Element {
  React.useEffect(() => {
    let scroll: LocomotiveScroll | null = null

    async function initLocomotiveScroll() {
      try {
        const locomotiveModule = await import("locomotive-scroll")

        scroll = new locomotiveModule.default()
        if (scroll) console.log("LocomotiveScroll initialized")
      } catch (error) {
        console.error("Error initializing LocomotiveScroll:", error)
      }
    }

    void initLocomotiveScroll()

    return () => {
      if (scroll) scroll.destroy()
    }
  }, [])

  return (
    <LocomotiveContext.Provider value={null}>
      {children}
    </LocomotiveContext.Provider>
  )
}
