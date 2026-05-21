"use client"

import { motion, type Variants } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/shared/button"
import { Section } from "@/components/shared/section"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export function CTAFooter() {
  return (
    <Section className="py-14 sm:py-24 md:py-32">
      <motion.div
        initial="visible"
        variants={fadeUp}
        className="relative overflow-hidden rounded-2xl border border-dark-600/40 bg-gradient-to-b from-dark-800 to-dark-900 p-8 text-center sm:p-16"
      >
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-coffee-600/5 blur-[120px]" />

        <div className="relative">
          <div className="mb-6 flex justify-center gap-3">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                initial={{ opacity: 1, scale: 1 }}
                className="inline-block h-4 w-4 rounded-full bg-coffee-400 shadow-lg shadow-coffee-500/20"
              />
            ))}
          </div>

          <h2 className="font-cursive text-3xl sm:text-5xl">
            Setiap Cerita Punya
            <br />
            <span className="bg-gradient-to-r from-coffee-300 to-cream-300 bg-clip-text text-transparent">
              Titiknya
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm text-text-secondary sm:mt-4">
            Baik untuk ngopi sendiri, kerja, atau kumpul bareng teman, Titik 3 selalu jadi tempat yang tepat.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 sm:mt-10">
            <Link href="/menu">
              <Button className="group">
                Pesan Sekarang
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Button variant="secondary">
              Kolaborasi Bersama
            </Button>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
