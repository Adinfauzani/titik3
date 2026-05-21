import { router } from "./trpc"
import { menuRouter } from "./routers/menu"
import { categoryRouter } from "./routers/category"
import { orderRouter } from "./routers/order"
import { userRouter } from "./routers/user"

export const appRouter = router({
  menu: menuRouter,
  category: categoryRouter,
  order: orderRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter
