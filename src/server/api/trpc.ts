import { initTRPC, TRPCError } from "@trpc/server"
import { auth } from "@/server/auth"
import { prisma } from "@/lib/db"

export async function createTRPCContext() {
  const user = await auth()
  return { user, prisma }
}

const t = initTRPC.context<Awaited<ReturnType<typeof createTRPCContext>>>().create()

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" })
  return next({ ctx: { user: ctx.user } })
})
export const adminProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user || ctx.user.role !== "ADMIN")
    throw new TRPCError({ code: "FORBIDDEN" })
  return next({ ctx: { user: ctx.user } })
})
