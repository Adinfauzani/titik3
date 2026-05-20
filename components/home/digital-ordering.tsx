"use client"

import { motion, type Variants } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Smartphone, ClipboardCheck, CupSoda } from "lucide-react"
import { Button } from "@/components/shared/button"
import { Section } from "@/components/shared/section"

const steps = [
  { icon: Smartphone, title: "Pilih", description: "Browse menu digital dan pilih favoritmu." },
  { icon: ClipboardCheck, title: "Pesan", description: "Kustomisasi dan checkout dalam hitungan detik." },
  { icon: CupSoda, title: "Nikmati", description: "Duduk santai, kami yang proses sisanya." },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.2 } },
}

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export function DigitalOrdering() {
  return (
    <Section className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-coffee-400">
          Smart Ordering
        </p>
        <h2 className="mt-3 font-cursive text-4xl sm:text-5xl">
          Pesan Digital, Nikmat Tanpa Antri
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-text-secondary">
          Cukup dari smartphone kamu. Scan, pilih, pesan, dan hidangan siap dinikmati.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="visible"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto mt-14 flex max-w-3xl flex-col items-center justify-center gap-8 sm:flex-row"
      >
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            variants={stepVariants}
            className="flex flex-col items-center text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-coffee-600/10 text-coffee-400">
              <step.icon className="h-7 w-7" />
            </div>
            <div className="mt-3 flex gap-1.5">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className={`inline-block h-2 w-2 rounded-full ${
                    d === i ? "bg-coffee-400" : "bg-dark-600"
                  }`}
                />
              ))}
            </div>
            <h3 className="mt-3 text-base font-semibold text-text-primary">{step.title}</h3>
            <p className="mt-1 text-xs text-text-secondary">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 1, y: 0 }}
        className="mt-10 text-center"
      >
        <Link href="/menu">
          <Button className="group">
            Pesan Sekarang
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Link>
      </motion.div>
    </Section>
  )
}
