import { Coffee, Users, Handshake, Sparkles, Mic, Palette } from "lucide-react"
import { Section } from "@/components/shared/section"

const events = [
  { icon: Coffee, title: "Ngopi Santai", desc: "Temukan sudut nyaman untuk menikmati waktu sambil menyeruput kopi favorit." },
  { icon: Users, title: "Diskusi Komunitas", desc: "Ruang terbuka bertukar ide dan berbagi pengalaman dengan sesama kreator." },
  { icon: Handshake, title: "Kolaborasi Terbuka", desc: "Terhubung dengan komunitas lokal dan ciptakan sesuatu yang bermakna bersama." },
  { icon: Sparkles, title: "Workshop Barista", desc: "Belajar meracik kopi dari barista profesional dalam suasana santai dan interaktif." },
  { icon: Mic, title: "Open Mic", desc: "Tunjukkan bakatmu di panggung terbuka — puisi, musik, komedi, semua bisa." },
  { icon: Palette, title: "Acara Kreatif", desc: "Workshop dan gathering inspiratif untuk mengasah kreativitas tanpa batas." },
]

export function EventHighlights() {
  return (
    <Section className="py-14 sm:py-20 md:py-28" id="event">
      <div className="grid gap-6 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-2 lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-coffee-400">
            Events
          </p>
          <h2 className="mt-2 font-cursive text-3xl leading-tight sm:text-5xl">
            Ada Apa di Titik 3?
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-secondary">
            Dari ngopi santai hingga panggung terbuka, selalu ada kegiatan seru yang bisa kamu ikuti.
          </p>
          <div className="mt-8 hidden lg:flex lg:gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="inline-block h-2 w-2 rounded-full bg-coffee-400"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-3">
          {events.map((ev, i) => (
            <div
              key={ev.title}
              className="group relative overflow-hidden rounded-2xl border border-dark-600/30 bg-dark-800/30 p-3 transition-all duration-500 hover:-translate-y-1 hover:border-coffee-500/20 hover:shadow-xl hover:shadow-coffee-600/5 sm:p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-coffee-800/10 via-coffee-900/5 to-dark-900 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-dark-700/70 backdrop-blur-sm transition-colors group-hover:bg-coffee-600/20">
                  <ev.icon className="h-6 w-6 text-coffee-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15px] font-bold text-text-primary sm:text-base">{ev.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-text-secondary sm:text-sm">{ev.desc}</p>
                </div>
              </div>
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/[0.03]" />
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
