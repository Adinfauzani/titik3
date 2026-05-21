import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Coffee, Zap, Sparkles } from "lucide-react"
import { Button } from "@/components/shared/button"

const trustItems = [
  { icon: Coffee, label: "Tempat Nyaman" },
  { icon: Zap, label: "Pesan Cepat" },
  { icon: Sparkles, label: "Rasa Berkualitas" },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-coffee-950 via-dark-900 to-dark-900" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center px-4 pb-4 pt-4 md:min-h-0 md:flex-row md:gap-12 md:pb-12 md:pt-8 lg:min-h-screen lg:gap-20 lg:pb-20 lg:pt-10">
        <div className="flex-1 text-center md:text-left">
          {/* Animated dots */}
          <div className="mb-1 flex justify-center gap-1.5 md:mb-4 md:justify-start">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="inline-block size-2 animate-[popIn_0.5s_ease-out_forwards] rounded-full bg-coffee-400 opacity-0 shadow-lg shadow-coffee-500/30 md:size-2.5 lg:size-3"
                style={{ animationDelay: `${300 + i * 150}ms` }}
              />
            ))}
          </div>

          <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.25em] text-coffee-400 md:text-[11px] lg:mb-2 lg:text-xs">
            Warkop Titik 3
          </p>

          <h1 className="font-heading text-xl font-bold leading-[1.15] tracking-tight sm:text-3xl md:text-4xl lg:text-7xl">
            Titik Temu untuk{" "}
            <span className="bg-gradient-to-r from-coffee-300 via-cream-300 to-coffee-400 bg-clip-text text-transparent">
              Cerita, Rasa,
            </span>
            <br />
            dan Kebersamaan
          </h1>

          <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-text-secondary md:mx-0 md:mt-3 md:text-sm lg:mt-5">
            Bukan sekadar warkop biasa. Titik 3 adalah ruang hangat untuk bertemu, bercerita, dan menikmati kopi terbaik, tempat di mana setiap momen terasa berarti.
          </p>

          <div className="mt-3 flex flex-wrap justify-center gap-2 md:mt-6 md:justify-start lg:mt-8 lg:gap-3">
            <Link href="/menu">
              <Button size="sm" className="group text-xs md:text-sm md:h-10 md:px-4 lg:h-12 lg:px-6 lg:text-base">
                <span className="flex items-center gap-1.5">
                  Lihat Menu
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5 md:size-4" />
                </span>
              </Button>
            </Link>
            <Link href="#tentang">
              <Button size="sm" variant="secondary" className="text-xs md:text-sm md:h-10 md:px-4 lg:h-12 lg:px-6 lg:text-base">
                Tentang Kami
              </Button>
            </Link>
          </div>

          <div className="mt-2 flex justify-center gap-3 md:hidden">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="flex size-6 items-center justify-center rounded-lg bg-dark-700/60 backdrop-blur-sm">
                  <item.icon className="size-2.5 text-coffee-400" />
                </div>
                <span className="text-[10px] text-text-secondary">{item.label}</span>
              </div>
            ))}
          </div>


        </div>

        {/* Desktop trust items + image */}
        <div className="hidden md:block md:w-full md:max-w-xs lg:w-[480px]">
          <div className="mb-6 flex justify-start gap-5 lg:mt-10">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-dark-700/60 backdrop-blur-sm">
                  <item.icon className="size-3 text-coffee-400" />
                </div>
                <span className="text-[11px] text-text-secondary">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="absolute -inset-16 rounded-full bg-gradient-to-br from-coffee-400/15 via-coffee-500/8 to-coffee-600/5 blur-[120px]" />
            <div className="relative flex items-center justify-center">
              <Image
                src="/images/titik3.svg"
                alt="Warkop Titik 3"
                width={480}
                height={480}
                className="aspect-square w-full object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
