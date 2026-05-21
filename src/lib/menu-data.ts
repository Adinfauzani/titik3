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
  { id: "kopi", name: "Kopi", icon: "☕" },
  { id: "minuman", name: "Minuman", icon: "🧋" },
  { id: "makanan-ringan", name: "Makanan Ringan", icon: "🍟" },
  { id: "mie-nasi", name: "Mie & Nasi", icon: "🍜" },
  { id: "signature", name: "Signature Titik 3", icon: "✦" },
  { id: "camilan-manis", name: "Camilan Manis", icon: "🍰" },
] as const

export const menuItems: MenuItem[] = [
  { id: "kopi-susu-titik", name: "Kopi Susu Titik", description: "Kopi susu kekinian, creamy, manis pas — teman nongkrong paling setia", price: 15000, category: "kopi", isPopular: true, isSignature: true },
  { id: "kopi-hitam", name: "Kopi Hitam", description: "Kopi hitam tradisional, pekat dan mantap buat begadang", price: 10000, category: "kopi", isPopular: true },
  { id: "kopi-susu-gula-aren", name: "Kopi Susu Gula Aren", description: "Kopi susu dengan gula aren asli, legit dan wangi", price: 18000, category: "kopi", isPopular: true },
  { id: "es-kopi-susu", name: "Es Kopi Susu", description: "Kopi susu dingin, segar, nagih — favorit anak muda", price: 17000, category: "kopi", isPopular: true },
  { id: "kopi-jahe", name: "Kopi Jahe", description: "Kopi hangat dengan jahe segar, menghangatkan badan", price: 15000, category: "kopi" },
  { id: "kopi-jeruk", name: "Kopi Jeruk", description: "Kopi dengan perasan jeruk nipis — khas legendaris warkop Indonesia", price: 15000, category: "kopi" },
  { id: "es-teh-manis", name: "Es Teh Manis", description: "Teh manis segar, wajib ada di setiap warkop", price: 7000, category: "minuman", isPopular: true },
  { id: "teh-hangat", name: "Teh Hangat", description: "Teh hangat untuk teman ngobrol sampai pagi", price: 6000, category: "minuman" },
  { id: "nutrisari", name: "Nutrisari", description: "Nutrisari jeruk, manis asam segar", price: 8000, category: "minuman", isPopular: true },
  { id: "good-day-cap", name: "Good Day Cappuccino", description: "Good Day cappuccino — klasik, nikmat, praktis", price: 10000, category: "minuman", isPopular: true },
  { id: "good-day-mocca", name: "Good Day Moccacinno", description: "Good Day mocca, favorit semua kalangan", price: 10000, category: "minuman" },
  { id: "pop-ice-coklat", name: "Pop Ice Coklat", description: "Pop Ice coklat creamy, dingin, bikin nagih", price: 10000, category: "minuman", isPopular: true },
  { id: "pop-ice-taro", name: "Pop Ice Taro", description: "Pop Ice taro, favorit anak muda banget", price: 10000, category: "minuman" },
  { id: "milo", name: "Milo", description: "Milo hangat atau dingin, susu coklat kesukaan semua umur", price: 12000, category: "minuman" },
  { id: "susu-putih", name: "Susu Putih", description: "Susu putih hangat/dingin, sederhana tapi selalu dirindu", price: 10000, category: "minuman" },
  { id: "es-jeruk", name: "Es Jeruk", description: "Jeruk peras segar, manis asam alami", price: 12000, category: "minuman" },
  { id: "cireng", name: "Cireng", description: "Cireng crispy dengan sambal rujak pedas manis", price: 15000, category: "makanan-ringan", isPopular: true },
  { id: "cireng-keju", name: "Cireng Keju", description: "Cireng isi keju mozzarella, kriuk dan lumer", price: 18000, category: "makanan-ringan" },
  { id: "kentang-goreng", name: "Kentang Goreng", description: "Kentang goreng crispy, gurih, cocok buat cemilan ngobrol", price: 17000, category: "makanan-ringan", isPopular: true },
  { id: "kentang-sosis", name: "Kentang Sosis", description: "Kentang goreng campur sosis, lengkap dan mengenyangkan", price: 22000, category: "makanan-ringan" },
  { id: "tahu-cabe-garam", name: "Tahu Cabe Garam", description: "Tahu goreng crispy dengan bumbu cabe garam", price: 15000, category: "makanan-ringan" },
  { id: "pisang-goreng-coklat", name: "Pisang Goreng Coklat", description: "Pisang goreng dengan coklat lumer", price: 15000, category: "makanan-ringan" },
  { id: "pisang-goreng-keju", name: "Pisang Goreng Keju", description: "Pisang goreng dengan keju parut", price: 16000, category: "makanan-ringan" },
  { id: "singkong-goreng", name: "Singkong Goreng", description: "Singkong goreng empuk, gurih, bumbu tabur", price: 15000, category: "makanan-ringan" },
  { id: "siomay", name: "Siomay", description: "Siomay lengkap dengan bumbu kacang dan kecap", price: 18000, category: "makanan-ringan" },
  { id: "batagor", name: "Batagor", description: "Batagor crispy dengan sambal petis", price: 18000, category: "makanan-ringan" },
  { id: "indomie-goreng", name: "Indomie Goreng", description: "Indomie goreng spesial telur, bawang goreng, mantap", price: 20000, category: "mie-nasi", isPopular: true },
  { id: "indomie-goreng-ceker", name: "Indomie Goreng Ceker", description: "Indomie goreng dengan ceker ayam bumbu kecap", price: 25000, category: "mie-nasi" },
  { id: "indomie-kuah", name: "Indomie Kuah", description: "Indomie kuah telur, hangat dan nikmat", price: 20000, category: "mie-nasi", isPopular: true },
  { id: "indomie-rendang", name: "Indomie Rendang", description: "Indomie rasa rendang, kaya rempah", price: 22000, category: "mie-nasi" },
  { id: "mie-nyemek", name: "Mie Nyemek", description: "Mie nyemek pedas dengan topping lengkap — gak cukup satu piring", price: 25000, category: "mie-nasi", isPopular: true },
  { id: "seblak", name: "Seblak", description: "Seblak pedas dengan ceker, kerupuk, telur — nampol", price: 28000, category: "mie-nasi", isPopular: true },
  { id: "seblak-mie", name: "Seblak Mie", description: "Seblak dengan mie, pedasnya bikin nagih", price: 25000, category: "mie-nasi" },
  { id: "nasi-goreng", name: "Nasi Goreng", description: "Nasi goreng spesial telur ceplok — comfort food sejati", price: 25000, category: "mie-nasi", isPopular: true },
  { id: "nasi-goreng-komplit", name: "Nasi Goreng Komplit", description: "Nasi goreng lengkap dengan ayam dan sosis", price: 32000, category: "mie-nasi" },
  { id: "nasi-ayam", name: "Nasi Ayam", description: "Nasi dengan ayam goreng/suwir, sambal, dan lalapan", price: 28000, category: "mie-nasi" },
  { id: "roti-bakar-coklat-keju", name: "Roti Bakar Coklat Keju", description: "Roti bakar klasik, coklat keju lumer di mulut", price: 18000, category: "makanan-ringan", isPopular: true },
  { id: "roti-bakar-pisang-coklat", name: "Roti Bakar Pisang Coklat", description: "Roti bakar pisang coklat, legit dan memanjakan", price: 20000, category: "makanan-ringan" },
  { id: "roti-bakar-strawberry", name: "Roti Bakar Strawberry", description: "Roti bakar selai strawberry, manis asam segar", price: 18000, category: "makanan-ringan" },
  { id: "kopi-susu-tiga-rasa", name: "Kopi Susu 3 Rasa", description: "Kopi susu tiga lapis rasa: gula aren, coklat, vanila — signature Titik 3", price: 22000, category: "signature", isPopular: true, isSignature: true },
  { id: "indomie-titik-3", name: "Indomie Titik 3", description: "Indomie goreng spesial with sambal bawang, telur, suwiran ayam — resep rahasia Titik 3", price: 30000, category: "signature", isPopular: true, isSignature: true },
  { id: "seblak-titik-3", name: "Seblak Titik 3", description: "Seblak full topping, level pedas bisa dipilih — favorit pelanggan setia", price: 32000, category: "signature", isPopular: true, isSignature: true },
  { id: "es-campur-titik-3", name: "Es Campur Titik 3", description: "Es campur kekinian topping lengkap — segar, manis, pas buat cuaca panas", price: 25000, category: "signature", isSignature: true },
  { id: "cireng-samara", name: "Cireng Samara", description: "Cireng isi komplit: sosis, keju, cabe — gurih dan pedas nagih", price: 22000, category: "signature", isSignature: true },
  { id: "pisang-titik-3", name: "Pisang Titik 3", description: "Pisang goreng tiga topping: coklat, keju, susu — rame-rame makin enak", price: 22000, category: "signature", isPopular: true, isSignature: true },
  { id: "roti-bakar-nutella-pisang", name: "Roti Bakar Nutella Pisang", description: "Roti bakar nutella pisang, manisnya pas buat berbuka puasa", price: 22000, category: "camilan-manis", isPopular: true },
  { id: "pisang-coklat-lumer", name: "Pisang Coklat Lumer", description: "Pisang goreng coklat lumer, cocok buat yang suka manis", price: 18000, category: "camilan-manis" },
  { id: "kentang-keju", name: "Kentang Keju", description: "Kentang goreng dengan melted cheese, creamy dan gurih", price: 22000, category: "camilan-manis" },
]

export const testimonials = [
  { name: "Aulia Rahman", rating: 5, text: "Titik 3 bukan sekadar tempat nongkrong. Ini rumah kedua. Kopi Susunya juara, Indomie Titik 3-nya gak ada lawan.", role: "Mahasiswa" },
  { name: "Sari Dewi", rating: 5, text: "Pesen Indomie Goreng sama Es Kopi Susu tiap ke sini. Udah kaya ritual. Tempatnya hangat, murah, bikin betah.", role: "Pelanggan Setia" },
  { name: "Bambang Santoso", rating: 5, text: "Tempat favorit buat ngumpul sama teman-teman. Cireng Samara sama Pisang Titik 3 juara banget! Harganya ramah di kantong.", role: "Kolega" },
  { name: "Maya Indah", rating: 4, text: "Seblak Titik 3-nya recommended banget! Pedasnya pas, topping-nya banyak. Cocok buat lunch break.", role: "Karyawan Kantoran" },
  { name: "Rizki Pratama", rating: 5, text: "Udah berkali-kali delivery dan selalu puas. Kopi Susunya sampai dengan suhu pas. Mienya tetap enak walaupun diantar.", role: "Online Customer" },
  { name: "Dina Safitri", rating: 5, text: "Estetik banget buat foto-foto. Tapi yang bikin balik lagi itu rasanya, bukan hanya tampilannya. Es Campur Titik 3 recommended!", role: "Content Creator" },
  { name: "Hendra Wijaya", rating: 4, text: "Wifi kenceng, colokan banyak, Kopi Hitam cuma 10rb. Surga buat para remote worker kayak saya.", role: "Freelancer" },
  { name: "Putri Anggraini", rating: 5, text: "Pertama kali ke sini diajak temen, sekarang jadi langganan. Signature menunya juara semua! Mie Nyemek-nya nagih banget.", role: "Mahasiswi" },
  { name: "Adi Saputra", rating: 5, text: "Bawa klien meeting di Titik 3 — suasananya santai tapi tetap profesional. Klien suka, kantong juga aman.", role: "Sales Executive" },
  { name: "Nadia Kusuma", rating: 4, text: "Nutrisari sama Pop Ice Coklat-nya jadi andalan aku. Murah, enak, bikin kangen.", role: "Karyawan Swasta" },
  { name: "Fajar Ramadhan", rating: 5, text: "Acoustic night di Titik 3 tuh beda. Suasana intim, musiknya nyampe ke hati. Kopi Jahenya bikin makin anget.", role: "Musisi" },
  { name: "Intan Permata", rating: 5, text: "Bikin acara ulang tahun di sini, pelayanannya ramah banget. Teman-teman pada betah sampai tutup.", role: "Event Organizer" },
  { name: "Gilang Abimanyu", rating: 4, text: "Pisang Titik 3-nya wajib coba! Dijamin nagih. Tempat nongkrong favorit selepas kuliah.", role: "Mahasiswa" },
  { name: "Rina Marlina", rating: 5, text: "Abang-abangnya ramah banget, hapal pesanan aku. Pelayanan personal kayak gini yang bikin aku setia.", role: "Pelanggan Tetap" },
  { name: "Doni Prasetyo", rating: 5, text: "Dari segi harga, kualitas, sama suasananya — semua pas. Warkop modern terbaik di kota ini.", role: "Pengusaha" },
  { name: "Mega Sari", rating: 4, text: "Tempatnya cozy buat baca buku sambil ngopi. Musiknya nggak keras-keras amat, pas buat santai.", role: "Penulis" },
  { name: "Arif Hidayat", rating: 5, text: "Good Day Moccacinno-nya favorit! Udah coba beberapa warkop, tapi yang ini paling berani soal rasa.", role: "Kopi Enthusiast" },
]
