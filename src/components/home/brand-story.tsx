"use client"

import { motion, type Variants } from "framer-motion"
import { Section } from "@/components/shared/section"

const pillars = [
  {
    dot: 0,
    title: "Rasa",
    description: "Setiap tegukan adalah perjalanan rasa yang autentik. Dari biji kopi pilihan Nusantara hingga racikan yang penuh hati.",
  },
  {
    dot: 1,
    title: "Cerita",
    description: "Setiap pengunjung membawa cerita. Titik 3 hadir sebagai ruang untuk berbagi tawa, merayakan momen, dan menciptakan kenangan baru.",
  },
  {
    dot: 2,
    title: "Kebersamaan",
    description: "Kopi terasa lebih nikmat ketika dinikmati bersama. Titik 3 adalah tempat bertemu, antara rasa, cerita, dan orang-orang spesial.",
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export function BrandStory() {
  return (
    <Section className="py-14 sm:py-24 md:py-32" id="tentang">
      <div className="mb-10 text-center sm:mb-14">
        <motion.p
          initial={{ opacity: 1, y: 0 }}
          className="text-sm font-medium uppercase tracking-[0.25em] text-coffee-400"
        >
          Tentang Titik 3
        </motion.p>
        <motion.h2
          initial={{ opacity: 1, y: 0 }}
          className="          mt-2 font-cursive text-3xl sm:text-5xl"
        >
          Lebih dari Sekadar Kopi
        </motion.h2>
        <motion.p
          initial={{ opacity: 1, y: 0 }}
          className="mx-auto mt-4 max-w-xl text-text-secondary"
        >
          Tiga titik bukan sekadar logo. Ini adalah filosofi tentang apa yang kami percaya.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="visible"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-5 md:grid-cols-3"
      >
        {pillars.map((p) => (
          <motion.div
            key={p.title}
            variants={cardVariants}
            className="group rounded-2xl border border-dark-600/30 bg-dark-800/30 p-5 text-center transition-all duration-500 hover:-translate-y-0.5 hover:border-coffee-500/20 hover:shadow-xl hover:shadow-coffee-600/5 sm:p-8"
          >
            <div className="mb-4 flex justify-center gap-3 sm:mb-5">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className={`inline-block h-2.5 w-2.5 rounded-full transition-all duration-500 ${
                    d === p.dot
                      ? "bg-coffee-400 shadow-lg shadow-coffee-500/20"
                      : "bg-dark-600"
                  }`}
                />
              ))}
            </div>
            <h3 className="mb-1.5 text-base font-bold text-text-primary sm:text-xl">{p.title}</h3>
            <p className="text-[13px] leading-relaxed text-text-secondary sm:text-sm">{p.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
