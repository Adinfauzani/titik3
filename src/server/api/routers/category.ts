import { z } from "zod"
import { router, publicProcedure, adminProcedure } from "../trpc"

export const categoryRouter = router({
  getAll: publicProcedure.query(({ ctx }) =>
    ctx.prisma.category.findMany({
      include: { _count: { select: { menuItems: true } } },
      orderBy: { sortOrder: "asc" },
    })
  ),

  create: adminProcedure
    .input(
      z.object({
        name: z.string().min(1),
        slug: z.string().min(1),
        image: z.string().optional(),
        sortOrder: z.number().optional(),
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.prisma.category.create({ data: input })
    ),

  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        slug: z.string().optional(),
        image: z.string().optional(),
        sortOrder: z.number().optional(),
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.prisma.category.update({
        where: { id: input.id },
        data: input,
      })
    ),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) =>
      ctx.prisma.category.delete({ where: { id: input.id } })
    ),
})
