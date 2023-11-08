import Link from "next/link"

import { siteConfig } from "@/config/site"
import { getCurrentUser } from "@/lib/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SignOutButton } from "@/components/auth/signout-button"
import { Icons } from "@/components/icons"
import { Navigation } from "@/components/nav/navigation"
import { NavigationMobile } from "@/components/nav/navigation-mobile"
import { ThemeToggle } from "@/components/theme-toggle"

export async function Header(): Promise<JSX.Element> {
  const user = await getCurrentUser()

  return (
    <header className="sticky top-0 z-40 flex h-20 w-full bg-transparent">
      <div className="container flex items-center justify-between p-4">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 text-lg font-bold tracking-wide transition-all duration-300 ease-in-out"
        >
          <Icons.rocket className="h-6 w-6 md:hidden lg:flex" />
          <span className="hidden md:flex">{siteConfig.name}</span>
        </Link>
        <Navigation navItems={siteConfig.navItems} />
        <div className="flex items-center justify-center md:gap-1">
          <ThemeToggle />
          <NavigationMobile navItems={siteConfig.navItems} />

          <nav className="ml-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="transition-all duration-300 ease-in-out hover:opacity-70"
                >
                  <Button variant="user" size="icon">
                    <Avatar className="h-full w-full">
                      {user.image && (
                        <AvatarImage
                          src={user.image}
                          alt={user.name ?? "user's profile picture"}
                        />
                      )}
                      <AvatarFallback className="text-xs capitalize">
                        {user.email && user.email.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild disabled>
                      <Link href="/dashboard/account">
                        <Icons.avatar
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild disabled>
                      <Link href="/dashboard/settings">
                        <Icons.settings
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <SignOutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                aria-label="Get started"
                href="/signup"
                className={buttonVariants({ size: "sm" })}
              >
                Get Started
                <span className="sr-only">Get Started</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
