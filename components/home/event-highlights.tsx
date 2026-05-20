"use client"

import { motion, type Variants } from "framer-motion"
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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: "easeOut" },
  }),
}

export function EventHighlights() {
  return (
    <Section className="py-20 sm:py-28" id="event">
      <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-2 lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-coffee-400">
            Events
          </p>
          <h2 className="mt-3 font-cursive text-4xl leading-tight sm:text-5xl">
            Ada Apa di Titik 3?
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-secondary">
            Dari ngopi santai hingga panggung terbuka, selalu ada kegiatan seru yang bisa kamu ikuti.
          </p>
          <div className="mt-8 hidden lg:flex lg:gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
                className="inline-block h-2 w-2 rounded-full bg-coffee-400"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-3">
          {events.map((ev, i) => (
            <motion.div
              key={ev.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-2xl border border-dark-600/30 bg-dark-800/30 p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-coffee-500/20 hover:shadow-xl hover:shadow-coffee-600/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-coffee-800/10 via-coffee-900/5 to-dark-900 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-dark-700/70 backdrop-blur-sm transition-colors group-hover:bg-coffee-600/20">
                  <ev.icon className="h-6 w-6 text-coffee-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold text-text-primary">{ev.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-secondary">{ev.desc}</p>
                </div>
              </div>
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/[0.03]" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
