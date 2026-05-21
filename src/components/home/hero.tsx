"use client"

import { motion, type Variants } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Coffee, Zap, Sparkles } from "lucide-react"
import { Button } from "@/components/shared/button"

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
}

const trustItems = [
  { icon: Coffee, label: "Tempat Nyaman" },
  { icon: Zap, label: "Pesan Cepat" },
  { icon: Sparkles, label: "Rasa Berkualitas" },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden lg:min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-coffee-950 via-dark-900 to-dark-900" />
      <div className="absolute left-0 top-1/4 h-[800px] w-[800px] -translate-x-1/4 rounded-full bg-coffee-600/8 blur-[200px]" />
      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] translate-x-1/3 translate-y-1/3 rounded-full bg-coffee-800/8 blur-[180px]" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative mx-auto flex max-w-6xl flex-col items-center justify-center px-4 pb-8 pt-5 lg:min-h-screen lg:flex-row lg:gap-20 lg:pb-20 lg:pt-10"
      >
        <div className="flex-1 text-center lg:text-left">
          <motion.div variants={fadeUp} className="mb-3 flex justify-center gap-2 lg:mb-5 lg:justify-start">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.5, ease: "easeOut" }}
                className="inline-block h-2.5 w-2.5 rounded-full bg-coffee-400 shadow-lg shadow-coffee-500/30 lg:h-3 lg:w-3"
              />
            ))}
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mb-2 text-[11px] font-medium uppercase tracking-[0.3em] text-coffee-400 lg:mb-3 lg:text-xs"
          >
            Warkop Titik 3
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-heading text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-7xl"
          >
            Titik Temu untuk{" "}
            <span className="bg-gradient-to-r from-coffee-300 via-cream-300 to-coffee-400 bg-clip-text text-transparent">
              Cerita, Rasa,
            </span>
            <br />
            dan Kebersamaan
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-text-secondary lg:mx-0 lg:mt-5"
          >
            Bukan sekadar warkop biasa. Titik 3 adalah ruang hangat untuk bertemu, bercerita, dan menikmati kopi terbaik, tempat di mana setiap momen terasa berarti.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-5 flex flex-wrap justify-center gap-3 lg:mt-8 lg:justify-start">
            <Link href="/menu">
              <Button size="lg" className="group relative overflow-hidden shadow-xl shadow-coffee-600/20 transition-shadow hover:shadow-coffee-500/30">
                <span className="relative z-10 flex items-center gap-2">
                  Lihat Menu
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>
            <Link href="#tentang">
              <Button size="lg" variant="secondary">
                Tentang Kami
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex justify-center lg:hidden"
          >
            <div className="relative">
              <div className="absolute inset-0 mx-auto h-56 w-56 rounded-full bg-coffee-400/15 blur-[80px]" />
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <Image
                  src="/images/titik3Hero.png"
                  alt="Warkop Titik 3"
                  width={280}
                  height={280}
                  className="aspect-square w-60 object-contain drop-shadow-2xl"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 flex justify-center gap-5 lg:mt-10 lg:justify-start">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-dark-700/60 backdrop-blur-sm">
                  <item.icon className="h-3 w-3 text-coffee-400" />
                </div>
                <span className="text-[11px] text-text-secondary">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          className="relative mt-16 hidden w-full max-w-xs shrink-0 lg:mt-0 lg:block lg:w-[480px]"
        >
          <div className="relative">
            <div className="absolute -inset-16 rounded-full bg-gradient-to-br from-coffee-400/15 via-coffee-500/8 to-coffee-600/5 blur-[120px]" />
            <div className="absolute -inset-10 rounded-full bg-gradient-to-br from-coffee-300/10 via-coffee-400/5 to-transparent blur-3xl" />
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-cream-300/5 via-coffee-400/5 to-transparent blur-2xl" />
            <div className="relative flex items-center justify-center">
              <Image
                src="/images/titik3.svg"
                alt="Warkop Titik 3"
                width={480}
                height={480}
                className="aspect-square w-full object-contain drop-shadow-2xl"
                priority
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-dark-900/20 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
