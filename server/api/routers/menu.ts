import { z } from "zod"
import { router, publicProcedure, adminProcedure } from "../trpc"

export const menuRouter = router({
  getAll: publicProcedure.query(({ ctx }) =>
    ctx.prisma.menuItem.findMany({
      include: { category: true },
      orderBy: { sortOrder: "asc" },
    })
  ),

  getByCategory: publicProcedure
    .input(z.object({ categorySlug: z.string() }))
    .query(({ ctx, input }) =>
      ctx.prisma.menuItem.findMany({
        where: { category: { slug: input.categorySlug } },
        include: { category: true },
        orderBy: { sortOrder: "asc" },
      })
    ),

  getPopular: publicProcedure.query(({ ctx }) =>
    ctx.prisma.menuItem.findMany({
      where: { isPopular: true, isAvailable: true },
      include: { category: true },
      orderBy: { sortOrder: "asc" },
    })
  ),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) =>
      ctx.prisma.menuItem.findUnique({
        where: { id: input.id },
        include: { category: true },
      })
    ),

  create: adminProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        price: z.number().positive(),
        image: z.string().optional(),
        categoryId: z.string(),
        isPopular: z.boolean().optional(),
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.prisma.menuItem.create({ data: input })
    ),

  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        description: z.string().optional(),
        price: z.number().positive().optional(),
        image: z.string().optional(),
        categoryId: z.string().optional(),
        isAvailable: z.boolean().optional(),
        isPopular: z.boolean().optional(),
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.prisma.menuItem.update({
        where: { id: input.id },
        data: input,
      })
    ),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) =>
      ctx.prisma.menuItem.delete({ where: { id: input.id } })
    ),
})

export type MenuRouter = typeof menuRouter
