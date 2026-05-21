import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@warkop.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@warkop.com",
      role: "ADMIN",
    },
  })

  await prisma.user.upsert({
    where: { email: "kitchen@warkop.com" },
    update: {},
    create: {
      name: "Kitchen Staff",
      email: "kitchen@warkop.com",
      role: "KITCHEN",
    },
  })

  const kopi = await prisma.category.upsert({
    where: { slug: "kopi" },
    update: {},
    create: { name: "Kopi", slug: "kopi", sortOrder: 1 },
  })

  const minuman = await prisma.category.upsert({
    where: { slug: "minuman" },
    update: {},
    create: { name: "Minuman", slug: "minuman", sortOrder: 2 },
  })

  const makananRingan = await prisma.category.upsert({
    where: { slug: "makanan-ringan" },
    update: {},
    create: { name: "Makanan Ringan", slug: "makanan-ringan", sortOrder: 3 },
  })

  const mieNasi = await prisma.category.upsert({
    where: { slug: "mie-nasi" },
    update: {},
    create: { name: "Mie & Nasi", slug: "mie-nasi", sortOrder: 4 },
  })

  const signature = await prisma.category.upsert({
    where: { slug: "signature" },
    update: {},
    create: { name: "Signature Titik 3", slug: "signature", sortOrder: 5 },
  })

  const camilanManis = await prisma.category.upsert({
    where: { slug: "camilan-manis" },
    update: {},
    create: { name: "Camilan Manis", slug: "camilan-manis", sortOrder: 6 },
  })

  const menuItems = [
    { name: "Kopi Susu Titik", description: "Kopi susu kekinian, creamy, manis pas — teman nongkrong paling setia", price: 15000, categoryId: kopi.id, isPopular: true },
    { name: "Kopi Hitam", description: "Kopi hitam tradisional, pekat dan mantap buat begadang", price: 10000, categoryId: kopi.id, isPopular: true },
    { name: "Kopi Susu Gula Aren", description: "Kopi susu dengan gula aren asli, legit dan wangi", price: 18000, categoryId: kopi.id, isPopular: true },
    { name: "Es Kopi Susu", description: "Kopi susu dingin, segar, nagih — favorit anak muda", price: 17000, categoryId: kopi.id, isPopular: true },
    { name: "Kopi Jahe", description: "Kopi hangat dengan jahe segar, menghangatkan badan", price: 15000, categoryId: kopi.id },
    { name: "Kopi Jeruk", description: "Kopi dengan perasan jeruk nipis — khas legendaris warkop Indonesia", price: 15000, categoryId: kopi.id },
    { name: "Es Teh Manis", description: "Teh manis segar, wajib ada di setiap warkop", price: 7000, categoryId: minuman.id, isPopular: true },
    { name: "Teh Hangat", description: "Teh hangat untuk teman ngobrol sampai pagi", price: 6000, categoryId: minuman.id },
    { name: "Nutrisari", description: "Nutrisari jeruk, manis asam segar", price: 8000, categoryId: minuman.id, isPopular: true },
    { name: "Good Day Cappuccino", description: "Good Day cappuccino — klasik, nikmat, praktis", price: 10000, categoryId: minuman.id, isPopular: true },
    { name: "Good Day Moccacinno", description: "Good Day mocca, favorit semua kalangan", price: 10000, categoryId: minuman.id },
    { name: "Pop Ice Coklat", description: "Pop Ice coklat creamy, dingin, bikin nagih", price: 10000, categoryId: minuman.id, isPopular: true },
    { name: "Pop Ice Taro", description: "Pop Ice taro, favorit anak muda banget", price: 10000, categoryId: minuman.id },
    { name: "Milo", description: "Milo hangat atau dingin, susu coklat kesukaan semua umur", price: 12000, categoryId: minuman.id },
    { name: "Susu Putih", description: "Susu putih hangat/dingin, sederhana tapi selalu dirindu", price: 10000, categoryId: minuman.id },
    { name: "Es Jeruk", description: "Jeruk peras segar, manis asam alami", price: 12000, categoryId: minuman.id },
    { name: "Cireng", description: "Cireng crispy dengan sambal rujak pedas manis", price: 15000, categoryId: makananRingan.id, isPopular: true },
    { name: "Cireng Keju", description: "Cireng isi keju mozzarella, kriuk dan lumer", price: 18000, categoryId: makananRingan.id },
    { name: "Kentang Goreng", description: "Kentang goreng crispy, gurih, cocok buat cemilan ngobrol", price: 17000, categoryId: makananRingan.id, isPopular: true },
    { name: "Kentang Sosis", description: "Kentang goreng campur sosis, lengkap dan mengenyangkan", price: 22000, categoryId: makananRingan.id },
    { name: "Tahu Cabe Garam", description: "Tahu goreng crispy dengan bumbu cabe garam", price: 15000, categoryId: makananRingan.id },
    { name: "Pisang Goreng Coklat", description: "Pisang goreng dengan coklat lumer", price: 15000, categoryId: makananRingan.id },
    { name: "Pisang Goreng Keju", description: "Pisang goreng dengan keju parut", price: 16000, categoryId: makananRingan.id },
    { name: "Singkong Goreng", description: "Singkong goreng empuk, gurih, bumbu tabur", price: 15000, categoryId: makananRingan.id },
    { name: "Siomay", description: "Siomay lengkap dengan bumbu kacang dan kecap", price: 18000, categoryId: makananRingan.id },
    { name: "Batagor", description: "Batagor crispy dengan sambal petis", price: 18000, categoryId: makananRingan.id },
    { name: "Indomie Goreng", description: "Indomie goreng spesial telur, bawang goreng, mantap", price: 20000, categoryId: mieNasi.id, isPopular: true },
    { name: "Indomie Goreng Ceker", description: "Indomie goreng dengan ceker ayam bumbu kecap", price: 25000, categoryId: mieNasi.id },
    { name: "Indomie Kuah", description: "Indomie kuah telur, hangat dan nikmat", price: 20000, categoryId: mieNasi.id, isPopular: true },
    { name: "Indomie Rendang", description: "Indomie rasa rendang, kaya rempah", price: 22000, categoryId: mieNasi.id },
    { name: "Mie Nyemek", description: "Mie nyemek pedas dengan topping lengkap — gak cukup satu piring", price: 25000, categoryId: mieNasi.id, isPopular: true },
    { name: "Seblak", description: "Seblak pedas dengan ceker, kerupuk, telur — nampol", price: 28000, categoryId: mieNasi.id, isPopular: true },
    { name: "Seblak Mie", description: "Seblak dengan mie, pedasnya bikin nagih", price: 25000, categoryId: mieNasi.id },
    { name: "Nasi Goreng", description: "Nasi goreng spesial telur ceplok — comfort food sejati", price: 25000, categoryId: mieNasi.id, isPopular: true },
    { name: "Nasi Goreng Komplit", description: "Nasi goreng lengkap dengan ayam dan sosis", price: 32000, categoryId: mieNasi.id },
    { name: "Nasi Ayam", description: "Nasi dengan ayam goreng/suwir, sambal, dan lalapan", price: 28000, categoryId: mieNasi.id },
    { name: "Roti Bakar Coklat Keju", description: "Roti bakar klasik, coklat keju lumer di mulut", price: 18000, categoryId: makananRingan.id, isPopular: true },
    { name: "Roti Bakar Pisang Coklat", description: "Roti bakar pisang coklat, legit dan memanjakan", price: 20000, categoryId: makananRingan.id },
    { name: "Roti Bakar Strawberry", description: "Roti bakar selai strawberry, manis asam segar", price: 18000, categoryId: makananRingan.id },
    { name: "Kopi Susu 3 Rasa", description: "Kopi susu tiga lapis rasa: gula aren, coklat, vanila — signature Titik 3", price: 22000, categoryId: signature.id, isPopular: true },
    { name: "Indomie Titik 3", description: "Indomie goreng spesial with sambal bawang, telur, suwiran ayam — resep rahasia Titik 3", price: 30000, categoryId: signature.id, isPopular: true },
    { name: "Seblak Titik 3", description: "Seblak full topping, level pedas bisa dipilih — favorit pelanggan setia", price: 32000, categoryId: signature.id, isPopular: true },
    { name: "Es Campur Titik 3", description: "Es campur kekinian topping lengkap — segar, manis, pas buat cuaca panas", price: 25000, categoryId: signature.id },
    { name: "Cireng Samara", description: "Cireng isi komplit: sosis, keju, cabe — gurih dan pedas nagih", price: 22000, categoryId: signature.id },
    { name: "Pisang Titik 3", description: "Pisang goreng tiga topping: coklat, keju, susu — rame-rame makin enak", price: 22000, categoryId: signature.id, isPopular: true },
    { name: "Roti Bakar Nutella Pisang", description: "Roti bakar nutella pisang, manisnya pas", price: 22000, categoryId: camilanManis.id, isPopular: true },
    { name: "Pisang Coklat Lumer", description: "Pisang goreng coklat lumer, cocok buat yang suka manis", price: 18000, categoryId: camilanManis.id },
    { name: "Kentang Keju", description: "Kentang goreng dengan melted cheese, creamy dan gurih", price: 22000, categoryId: camilanManis.id },
  ]

  for (const item of menuItems) {
    await prisma.menuItem.upsert({
      where: { id: item.name.toLowerCase().replace(/\s+/g, "-") },
      update: {},
      create: { id: item.name.toLowerCase().replace(/\s+/g, "-"), ...item },
    })
  }

  console.log("Seed completed successfully")
  console.log("Users created (link via Clerk dashboard with matching emails)")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
