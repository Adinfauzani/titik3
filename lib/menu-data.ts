export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
  isPopular?: boolean
  isSignature?: boolean
}

export const categories = [
  { id: "coffee", name: "Coffee", icon: "☕" },
  { id: "non-coffee", name: "Non Coffee", icon: "🧋" },
  { id: "signature", name: "Signature", icon: "✦" },
  { id: "snacks", name: "Snacks", icon: "🍟" },
  { id: "makanan-berat", name: "Makanan Berat", icon: "🍚" },
  { id: "dessert", name: "Dessert", icon: "🍰" },
] as const

export const menuItems: MenuItem[] = [
  { id: "espresso-titik", name: "Espresso Titik", description: "Single origin espresso dengan karakter bold dan rich crema", price: 25000, category: "coffee" },
  { id: "americano-noir", name: "Americano Noir", description: "Americano hitam pekat dengan aroma kopi premium", price: 28000, category: "coffee" },
  { id: "cappuccino-tiga", name: "Cappuccino Tiga", description: "Cappuccino klasik dengan foam tebal bertiga lapis", price: 32000, category: "coffee", isPopular: true },
  { id: "caramel-latte", name: "Caramel Latte", description: "Latte lembut dengan sirup caramel homemade", price: 35000, category: "coffee", isPopular: true },
  { id: "hazelnut-latte", name: "Hazelnut Latte", description: "Latte aromatik dengan hazelnut premium", price: 35000, category: "coffee" },
  { id: "vanilla-latte", name: "Vanilla Latte", description: "Classic vanilla latte dengan rasa lembut dan creamy", price: 35000, category: "coffee" },
  { id: "kopi-susu-titik", name: "Kopi Susu Titik", description: "Kopi susu kekinian dengan sentuhan khas Titik 3", price: 30000, category: "coffee", isPopular: true, isSignature: true },
  { id: "mocha-velvet", name: "Mocha Velvet", description: "Perpaduan espresso dan coklat dengan tekstur velvet", price: 38000, category: "coffee", isPopular: true },
  { id: "matcha-cloud", name: "Matcha Cloud", description: "Matcha premium Jepang dengan creamy milk foam", price: 38000, category: "non-coffee", isPopular: true },
  { id: "chocolate-bloom", name: "Chocolate Bloom", description: "Minuman coklat belgia dengan sentuhan dark chocolate", price: 35000, category: "non-coffee" },
  { id: "red-velvet-cream", name: "Red Velvet Cream", description: "Red velvet latte dengan cream cheese foam", price: 38000, category: "non-coffee", isPopular: true },
  { id: "taro-bliss", name: "Taro Bliss", description: "Taro latte creamy dengan aroma vanilla", price: 36000, category: "non-coffee" },
  { id: "lychee-tea", name: "Lychee Tea", description: "Lychee tea segar dengan potongan buah asli", price: 28000, category: "non-coffee" },
  { id: "lemon-spark", name: "Lemon Spark", description: "Lemon sparkling segar dengan mint", price: 26000, category: "non-coffee" },
  { id: "thai-tea-luxe", name: "Thai Tea Luxe", description: "Thai tea autentik dengan boba dan creamy toping", price: 35000, category: "non-coffee" },
  { id: "titik-3-special-brew", name: "Titik 3 Special Brew", description: "Racikan spesial signature Titik 3 dengan metode slow brew", price: 45000, category: "signature", isPopular: true, isSignature: true },
  { id: "midnight-coffee", name: "Midnight Coffee", description: "Cold brew hitam pekat dengan vanilla dan charcoal", price: 42000, category: "signature", isSignature: true },
  { id: "sunset-latte", name: "Sunset Latte", description: "Latte berlapis warna sunset dari taro dan kopi", price: 40000, category: "signature", isSignature: true },
  { id: "triple-dot-affogato", name: "Triple Dot Affogato", description: "Affogato tiga rasa dengan espresso, caramel, dan coklat", price: 45000, category: "signature", isPopular: true, isSignature: true },
  { id: "brown-sugar-signature", name: "Brown Sugar Signature", description: "Brown sugar latte dengan boba homemade dan cream top", price: 40000, category: "signature", isPopular: true, isSignature: true },
  { id: "kentang-crispy", name: "Kentang Crispy", description: "Kentang goreng crispy dengan bumbu spesial", price: 22000, category: "snacks", isPopular: true },
  { id: "cireng-rujak", name: "Cireng Rujak", description: "Cireng crispy dengan sambal rujak pedas manis", price: 20000, category: "snacks" },
  { id: "pisang-coklat", name: "Pisang Coklat", description: "Pisang goreng dengan lelehan coklat premium", price: 20000, category: "snacks" },
  { id: "tahu-cabe-garam", name: "Tahu Cabe Garam", description: "Tahu goreng crispy dengan bumbu cabe garam", price: 18000, category: "snacks" },
  { id: "singkong-keju", name: "Singkong Keju", description: "Singkong goreng dengan taburan keju mozzarella", price: 22000, category: "snacks" },
  { id: "roti-bakar-nutella", name: "Roti Bakar Nutella", description: "Roti bakar dengan nutella dan pisang", price: 25000, category: "snacks", isPopular: true },
  { id: "indomie-carbonara", name: "Indomie Carbonara", description: "Indomie goreng dengan saus carbonara creamy", price: 25000, category: "makanan-berat", isPopular: true },
  { id: "indomie-aceh-special", name: "Indomie Aceh Special", description: "Indomie Aceh dengan bumbu rempah khas", price: 28000, category: "makanan-berat" },
  { id: "nasi-ayam-sambal-matah", name: "Nasi Ayam Sambal Matah", description: "Nasi dengan ayam suwir dan sambal matah segar", price: 35000, category: "makanan-berat", isPopular: true },
  { id: "rice-bowl-beef-blackpepper", name: "Rice Bowl Beef Blackpepper", description: "Rice bowl daging sapi lada hitam dengan sayuran", price: 38000, category: "makanan-berat" },
  { id: "rice-bowl-chicken-teriyaki", name: "Rice Bowl Chicken Teriyaki", description: "Rice bowl ayam teriyaki dengan saus manis gurih", price: 35000, category: "makanan-berat" },
  { id: "mie-goreng-titik", name: "Mie Goreng Titik", description: "Mie goreng spesial dengan topping lengkap", price: 30000, category: "makanan-berat" },
  { id: "croffle-caramel", name: "Croffle Caramel", description: "Croffle renyah dengan saus caramel dan ice cream", price: 30000, category: "dessert", isPopular: true },
  { id: "brownies-lava", name: "Brownies Lava", description: "Brownies coklat dengan molten lava center", price: 32000, category: "dessert", isPopular: true },
  { id: "ice-cream-coffee-crunch", name: "Ice Cream Coffee Crunch", description: "Ice cream kopi dengan crushed cookies", price: 28000, category: "dessert" },
]

export const testimonials = [
  { name: "Aulia Rahman", rating: 5, text: "Titik 3 bukan sekadar tempat ngopi. Ini ruang di mana rasa dan cerita bertemu. Kopinya luar biasa, suasananya bikin betah berlama-lama.", role: "Mahasiswa" },
  { name: "Sari Dewi", rating: 5, text: "Pesen online aja udah kaya di cafe beneran. Kemasannya rapi, rasa tetap juara, bikin hari-hari terasa lebih hangat.", role: "Online Customer" },
  { name: "Bambang Santoso", rating: 5, text: "Tempat favorit buat nongkrong sama teman-teman. Cappuccino Tiga sama pisang coklatnya juara, rasanya kaya pulang ke rumah.", role: "Kolega" },
  { name: "Maya Indah", rating: 4, text: "Pelayanannya cepet banget, cocok buat lunch break. Rice Bowl-nya recommended! Suasana hangatnya bikin betah.", role: "Karyawan Kantoran" },
  { name: "Rizki Pratama", rating: 5, text: "Sudah beberapa kali order delivery dan selalu puas. Kopinya sampai dengan suhu pas, rasa tetap premium.", role: "Pelanggan Setia" },
  { name: "Dina Safitri", rating: 5, text: "Tempatnya aesthetic banget buat foto-foto. Tapi yang bikin balik lagi itu rasanya, bukan hanya tampilannya.", role: "Content Creator" },
  { name: "Hendra Wijaya", rating: 4, text: "Wifi kencang, colokan banyak, kopi enak. Surga buat para remote worker kayak saya.", role: "Freelancer" },
  { name: "Putri Anggraini", rating: 5, text: "Pertama kali ke sini diajak temen, sekarang jadi langganan. Signature menunya juara semua!", role: "Mahasiswi" },
  { name: "Adi Saputra", rating: 5, text: "Bawa client meeting di Titik 3, suasananya mendukung banget. Client suka, saya pun betah.", role: "Sales Executive" },
  { name: "Nadia Kusuma", rating: 4, text: "Menu non-coffee-nya juga enak. Matcha Cloud dan Red Velvet Cream recomended banget.", role: "Karyawan Swasta" },
  { name: "Fajar Ramadhan", rating: 5, text: "Acoustic night di Titik 3 tuh beda. Suasana intim, musiknya nyampe ke hati. Kopi hangatnya bikin makin syahdu.", role: "Musisi" },
  { name: "Intan Permata", rating: 5, text: "Bikin acara ulang tahun di sini, pelayanannya luar biasa. Tamu-tamu pada betah sampai malam.", role: "Event Organizer" },
  { name: "Gilang Abimanyu", rating: 4, text: "Pisang coklatnya wajib coba! Dijamin nagih. Tempat nongkrong favorit selepas kuliah.", role: "Mahasiswa" },
  { name: "Rina Marlina", rating: 5, text: "Barista-nya ramah banget, hapal pesanan saya. Pelayanan personal kayak gini yang bikin saya setia.", role: "Pelanggan Tetap" },
  { name: "Doni Prasetyo", rating: 5, text: "Dari segi harga, kualitas, dan suasana, semuanya pas. Best value coffee shop di kota ini.", role: "Pengusaha" },
  { name: "Mega Sari", rating: 4, text: "Tempatnya cozy buat baca buku sambil ngopi. Musiknya ngga terlalu keras, pas buat santai.", role: "Penulis" },
  { name: "Arif Hidayat", rating: 5, text: "Cold brew-nya juara! Udah coba beberapa coffee shop, tapi yang ini paling berani soal rasa.", role: "Coffee Enthusiast" },
]
