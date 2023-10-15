export interface NavItem {
  title: string
  href: string
  disabled?: boolean
}

export interface User {
  email: string
  username?: string
  image?: string
  firstName?: string
  lastName?: string
}
