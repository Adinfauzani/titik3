import { initTRPC, TRPCError } from "@trpc/server"
import { auth } from "@/server/auth"
import { prisma } from "@/lib/db"

export async function createTRPCContext() {
  const session = await auth()
  return { session, prisma }
}

const t = initTRPC.context<Awaited<ReturnType<typeof createTRPCContext>>>().create()

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) throw new TRPCError({ code: "UNAUTHORIZED" })
  return next({ ctx: { user: ctx.session.user } })
})
export const adminProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user || ctx.session.user.role !== "ADMIN")
    throw new TRPCError({ code: "FORBIDDEN" })
  return next({ ctx: { user: ctx.session.user } })
})
