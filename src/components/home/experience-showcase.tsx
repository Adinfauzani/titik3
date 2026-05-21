import { Sofa, Heart, Music, Users, BookOpen, Wifi, Sun } from "lucide-react"
import { Section } from "@/components/shared/section"

const experiences = [
  { icon: Sofa, title: "Suasana Nyaman", desc: "Ruang hangat dengan pencahayaan temaram dan kursi nyaman untuk bersantai.", span: 2 },
  { icon: Heart, title: "Momen Bermakna", desc: "Dari ngopi sendiri hingga kumpul komunitas, setiap kunjungan terasa spesial.", span: 1 },
  { icon: Music, title: "Live Akustik", desc: "Alunan musik live dan iringan gitar akustik di setiap akhir pekan yang hangat.", span: 3 },
  { icon: Users, title: "Ruang Diskusi", desc: "Area privat nyaman untuk rapat kecil dan diskusi kelompok yang produktif.", span: 1 },
  { icon: BookOpen, title: "Sudut Baca", desc: "Koleksi buku dan majalah pilihan menemani secangkir kopi favoritmu.", span: 2 },
  { icon: Wifi, title: "Free WiFi", desc: "Koneksi internet cepat untuk bekerja, belajar, atau sekadar berselancar.", span: 1 },
  { icon: Sun, title: "Teras Outdoor", desc: "Nikmati kopi di area terbuka dengan suasana segar dan pemandangan asri.", span: 2 },
]

export function ExperienceShowcase() {
  return (
    <Section className="py-14 sm:py-20 md:py-28">
      <div className="mb-8 text-center sm:mb-10">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-coffee-400">
          Pengalaman
        </p>
        <h2 className="          mt-2 font-cursive text-3xl sm:text-5xl">
          Pengalaman di Titik 3
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-text-secondary">
          Setiap sudut dirancang untuk memberikan pengalaman terbaik.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-5">
        {experiences.map((e) => (
          <div
            key={e.title}
            className={`group relative overflow-hidden rounded-2xl border border-dark-600/30 bg-dark-800/30 p-3 transition-all duration-500 hover:-translate-y-1 hover:border-coffee-500/20 hover:shadow-xl hover:shadow-coffee-600/5 sm:p-6 ${
              e.span === 3 ? "sm:col-span-3" : e.span === 2 ? "sm:col-span-2" : ""
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-coffee-800/10 via-coffee-900/5 to-dark-900 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-dark-700/70 backdrop-blur-sm transition-colors group-hover:bg-coffee-600/20 sm:h-11 sm:w-11">
                <e.icon className="h-4 w-4 text-coffee-400 sm:h-5 sm:w-5" />
              </div>
              <h3 className="text-[13px] font-bold text-text-primary sm:text-sm">{e.title}</h3>
              <p className="mt-1.5 text-[11px] leading-relaxed text-text-secondary sm:text-xs">
                {e.desc}
              </p>
            </div>
            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/[0.03]" />
          </div>
        ))}
      </div>
    </Section>
  )
}
