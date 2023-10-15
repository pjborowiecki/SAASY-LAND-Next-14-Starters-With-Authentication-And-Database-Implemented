"use client"

import * as React from "react"
import Link from "next/link"
import type { NavItem } from "@/types"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

interface NavigationProps {
  navItems: NavItem[]
}

export function Navigation({ navItems }: NavigationProps) {
  return (
    <NavigationMenu className="hidden text-customLight-400 transition-all duration-300 ease-in-out md:flex">
      <NavigationMenuList>
        {navItems.map((item) => (
          <NavigationMenuItem key={item.title} asChild>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {item.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
