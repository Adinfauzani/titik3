"use client"

import { motion, type Variants } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/shared/button"
import { Section } from "@/components/shared/section"
import { formatPrice } from "@/lib/utils"
import { menuItems } from "@/lib/menu-data"

const signatureItems = menuItems.filter((i) => i.isSignature).slice(0, 6)

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export function SignatureMenu() {
  return (
    <Section className="py-24 sm:py-32">
      <div className="mb-12 flex flex-col items-center text-center">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-coffee-400">
          Signature Menu
        </p>
        <h2 className="mt-3 font-cursive text-4xl sm:text-5xl">
          Temukan Favorit Barumu
        </h2>
        <p className="mt-3 max-w-md text-text-secondary">
          Racikan spesial yang hanya bisa kamu temukan di Titik 3.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="visible"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
      >
        {signatureItems.map((item, i) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            custom={i}
            className="group cursor-pointer"
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-dark-600/40 bg-gradient-to-b from-coffee-800/20 to-dark-800 shadow-lg shadow-black/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-coffee-900/20">
              <div className="flex h-full flex-col items-center justify-center p-4 text-center">
                <div className="mb-3 flex gap-1 opacity-40 transition-opacity group-hover:opacity-80">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="inline-block h-1.5 w-1.5 rounded-full bg-coffee-500" />
                  ))}
                </div>
                <p className="text-sm font-semibold leading-tight text-text-primary">{item.name}</p>
                <p className="mt-1 text-xs text-coffee-400">{formatPrice(item.price)}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 1, y: 0 }}
        className="mt-10 text-center"
      >
        <Link href="/menu">
          <Button variant="secondary">
            Lihat Semua Menu
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    </Section>
  )
}
