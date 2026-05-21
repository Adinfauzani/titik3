import { router, adminProcedure } from "../trpc"

export const userRouter = router({
  getAll: adminProcedure.query(({ ctx }) =>
    ctx.prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    })
  ),
})
