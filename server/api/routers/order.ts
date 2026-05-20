import { z } from "zod"
import { router, publicProcedure, protectedProcedure, adminProcedure } from "../trpc"
import { OrderStatus } from "@prisma/client"

export const orderRouter = router({
  create: publicProcedure
    .input(
      z.object({
        type: z.enum(["DINE_IN", "TAKEAWAY"]),
        tableNumber: z.string().optional(),
        notes: z.string().optional(),
        items: z.array(
          z.object({
            menuItemId: z.string(),
            quantity: z.number().positive(),
            price: z.number(),
            notes: z.string().optional(),
          })
        ),
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.prisma.order.create({
        data: {
          type: input.type,
          tableNumber: input.tableNumber,
          notes: input.notes,
          userId: ctx.session?.user?.id,
          items: {
            create: input.items,
          },
        },
        include: { items: true },
      })
    ),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) =>
      ctx.prisma.order.findUnique({
        where: { id: input.id },
        include: { items: { include: { menuItem: true } } },
      })
    ),

  getMyOrders: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.order.findMany({
      where: { userId: ctx.user.id },
      include: { items: { include: { menuItem: true } } },
      orderBy: { createdAt: "desc" },
    })
  ),

  getAll: adminProcedure.query(({ ctx }) =>
    ctx.prisma.order.findMany({
      include: {
        items: { include: { menuItem: true } },
        user: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    })
  ),

  getQueue: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.order.findMany({
      where: { status: { in: ["PENDING", "PREPARING"] } },
      include: { items: { include: { menuItem: true } } },
      orderBy: { createdAt: "asc" },
    })
  ),

  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.nativeEnum(OrderStatus),
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.prisma.order.update({
        where: { id: input.id },
        data: { status: input.status },
      })
    ),

  getSalesSummary: adminProcedure.query(async ({ ctx }) => {
    const orders = await ctx.prisma.order.findMany({
      where: { status: "COMPLETED" },
      select: { total: true, createdAt: true },
    })

    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
    const totalOrders = orders.length

    return { totalRevenue, totalOrders }
  }),
})
