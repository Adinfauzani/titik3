import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10)
  const kitchenPassword = await bcrypt.hash("kitchen123", 10)

  const admin = await prisma.user.upsert({
    where: { email: "admin@warkop.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@warkop.com",
      password: adminPassword,
      role: "ADMIN",
    },
  })

  await prisma.user.upsert({
    where: { email: "kitchen@warkop.com" },
    update: {},
    create: {
      name: "Kitchen Staff",
      email: "kitchen@warkop.com",
      password: kitchenPassword,
      role: "KITCHEN",
    },
  })

  const coffee = await prisma.category.upsert({
    where: { slug: "coffee" },
    update: {},
    create: { name: "Coffee", slug: "coffee", sortOrder: 1 },
  })

  const nonCoffee = await prisma.category.upsert({
    where: { slug: "non-coffee" },
    update: {},
    create: { name: "Non Coffee", slug: "non-coffee", sortOrder: 2 },
  })

  const snacks = await prisma.category.upsert({
    where: { slug: "snacks" },
    update: {},
    create: { name: "Snacks", slug: "snacks", sortOrder: 3 },
  })

  const signature = await prisma.category.upsert({
    where: { slug: "signature" },
    update: {},
    create: { name: "Signature", slug: "signature", sortOrder: 4 },
  })

  const menuItems = [
    { name: "Espresso", description: "Rich espresso shot", price: 25000, categoryId: coffee.id, isPopular: true },
    { name: "Cappuccino", description: "Espresso with steamed milk foam", price: 35000, categoryId: coffee.id, isPopular: true },
    { name: "Latte", description: "Espresso with steamed milk", price: 35000, categoryId: coffee.id, isPopular: true },
    { name: "Americano", description: "Espresso with hot water", price: 30000, categoryId: coffee.id },
    { name: "Cold Brew", description: "Cold brewed coffee", price: 40000, categoryId: coffee.id },
    { name: "Matcha Latte", description: "Japanese matcha with milk", price: 40000, categoryId: nonCoffee.id, isPopular: true },
    { name: "Chocolate", description: "Rich hot chocolate", price: 35000, categoryId: nonCoffee.id },
    { name: "Red Velvet", description: "Red velvet latte", price: 40000, categoryId: nonCoffee.id },
    { name: "Fresh Orange", description: "Freshly squeezed orange juice", price: 30000, categoryId: nonCoffee.id },
    { name: "French Fries", description: "Crispy french fries", price: 25000, categoryId: snacks.id, isPopular: true },
    { name: "Chicken Wings", description: "Spicy chicken wings", price: 35000, categoryId: snacks.id },
    { name: "Sandwich", description: "Grilled chicken sandwich", price: 30000, categoryId: snacks.id },
    { name: "Warkop Special", description: "Our signature coffee blend", price: 45000, categoryId: signature.id, isPopular: true },
    { name: "Titik 3 Frappe", description: "Signature frappuccino", price: 50000, categoryId: signature.id, isPopular: true },
  ]

  for (const item of menuItems) {
    await prisma.menuItem.upsert({
      where: { id: item.name.toLowerCase().replace(/\s+/g, "-") },
      update: {},
      create: { id: item.name.toLowerCase().replace(/\s+/g, "-"), ...item },
    })
  }

  console.log("Seed completed successfully")
  console.log(`Admin: admin@warkop.com / admin123`)
  console.log(`Kitchen: kitchen@warkop.com / kitchen123`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
