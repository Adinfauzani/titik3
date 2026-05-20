"use client"

import { motion, type Variants } from "framer-motion"
import { Users, Pen, Handshake, Building, Camera, Mic, Palette } from "lucide-react"
import { Button } from "@/components/shared/button"
import { Section } from "@/components/shared/section"

const opportunities = [
  { icon: Users, title: "Komunitas Kreatif", desc: "Ruang bagi kreator lokal untuk berbagi ide dan berkembang bersama.", span: 2 },
  { icon: Pen, title: "Workshop & Kelas", desc: "Belajar barista, roasting, dan seni kopi langsung dari ahlinya.", span: 1 },
  { icon: Handshake, title: "Brand Partnership", desc: "Jalin kemitraan strategis untuk menjangkau audiens yang lebih luas.", span: 3 },
  { icon: Building, title: "Event Kustom", desc: "Rayakan acaramu, ulang tahun, meeting, atau gathering bersama.", span: 1 },
  { icon: Camera, title: "Content Space", desc: "Ruang estetik untuk konten kreatif, podcast, dan sesi foto profesional.", span: 2 },
  { icon: Mic, title: "Open Collaboration", desc: "Punya ide baru? Kami selalu siap menyambut dengan tangan terbuka.", span: 1 },
  { icon: Palette, title: "Komunitas Seni", desc: "Wadah bagi seniman lokal untuk pameran, diskusi, dan kolaborasi karya.", span: 2 },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.06 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

export function CommunityCollaboration() {
  return (
    <Section className="py-20 sm:py-28" id="kolaborasi">
      <div className="mb-10 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-coffee-400">
          Kolaborasi
        </p>
        <h2 className="mt-3 font-cursive text-4xl sm:text-5xl">
          Ruang untuk Berkarya Bersama
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-text-secondary">
          Titik 3 adalah ruang terbuka untuk kreator, komunitas, dan brand yang ingin menciptakan sesuatu yang bermakna.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="visible"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-3 gap-3 md:gap-4 lg:gap-5"
      >
        {opportunities.map((o) => (
          <motion.div
            key={o.title}
            variants={cardVariants}
            className={`group relative overflow-hidden rounded-2xl border border-dark-600/30 bg-dark-800/30 p-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-coffee-500/20 hover:shadow-xl hover:shadow-coffee-600/5 sm:p-5 ${
              o.span === 3 ? "col-span-3" : o.span === 2 ? "col-span-2" : "col-span-1"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-coffee-800/10 via-coffee-900/5 to-dark-900 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-dark-700/70 backdrop-blur-sm transition-colors group-hover:bg-coffee-600/20">
                <o.icon className="h-5 w-5 text-coffee-400" />
              </div>
              <h3 className="text-sm font-bold text-text-primary">{o.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                {o.desc}
              </p>
            </div>
            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/[0.03]" />
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="mt-10 text-center">
        <Button variant="primary">
          Ajukan Kolaborasi
        </Button>
      </motion.div>
    </Section>
  )
}
