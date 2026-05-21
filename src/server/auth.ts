import { auth as clerkAuth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/db"

export async function auth() {
  const { userId } = await clerkAuth()
  if (!userId) return null

  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  return user
}
