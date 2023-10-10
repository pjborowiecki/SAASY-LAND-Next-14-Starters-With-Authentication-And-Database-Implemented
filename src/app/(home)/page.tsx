import { prisma } from "@/config/prisma"

export default function Home() {
  const myUser = prisma.user.findFirst()

  return <main>hello world</main>
}
