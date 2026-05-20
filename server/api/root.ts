import { router } from "./trpc"
import { menuRouter } from "./routers/menu"
import { categoryRouter } from "./routers/category"
import { orderRouter } from "./routers/order"

export const appRouter = router({
  menu: menuRouter,
  category: categoryRouter,
  order: orderRouter,
})

export type AppRouter = typeof appRouter
