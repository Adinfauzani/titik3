"use client"

import { useEffect, useRef, useState } from "react"
import { Quote } from "lucide-react"
import { Section } from "@/components/shared/section"
import { testimonials } from "@/lib/menu-data"

const avatarColors = [
  "from-coffee-500 to-coffee-700",
  "from-coffee-400 to-coffee-600",
  "from-cream-500 to-coffee-600",
  "from-coffee-600 to-coffee-800",
  "from-coffee-300 to-coffee-500",
]

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

const duplicated = [...testimonials, ...testimonials, ...testimonials]

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const posRef = useRef(0)
  const pausedRef = useRef(false)
  const speed = 0.6

  useEffect(() => {
    pausedRef.current = isPaused
  }, [isPaused])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let animationId: number

    const animate = () => {
      if (!pausedRef.current) {
          posRef.current += speed * 0.8
        const itemWidth = 312
        const totalItems = testimonials.length
        const resetPoint = itemWidth * totalItems

        if (posRef.current >= resetPoint) {
          posRef.current = 0
        }

        track.style.transform = `translateX(-${posRef.current}px)`
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <Section className="py-14 sm:py-20 md:py-28">
      <div className="mb-8 text-center sm:mb-10">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-coffee-400">
          Testimonials
        </p>
        <h2 className="mt-2 font-cursive text-3xl sm:text-5xl">
          Kata Mereka
        </h2>
      </div>

      <div
        className="relative mx-auto max-w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          ref={trackRef}
          className="flex gap-5 will-change-transform"
          style={{ width: `${duplicated.length * 312}px` }}
        >
          {duplicated.map((t, i) => {
            const colorIdx = i % avatarColors.length
            return (
              <div
                key={`${t.name}-${i}`}
                className="w-[296px] shrink-0 rounded-2xl border border-dark-600/30 bg-dark-800/40 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-coffee-500/15 hover:shadow-lg hover:shadow-coffee-600/5"
              >
                <Quote className="mb-4 h-5 w-5 text-coffee-500/25" />

                <p className="mb-5 text-sm leading-relaxed text-text-secondary line-clamp-4">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${avatarColors[colorIdx]} shadow-lg`}
                  >
                    <span className="text-[10px] font-bold text-white">{getInitials(t.name)}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{t.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-[11px] text-text-secondary truncate">{t.role}</p>
                      <span className="text-[10px] text-cream-400 shrink-0">
                        {"★".repeat(t.rating)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-dark-900 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-dark-900 to-transparent" />
      </div>
    </Section>
  )
}
