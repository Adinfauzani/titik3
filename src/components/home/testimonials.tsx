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

function TestimonialCard({ t, i }: { t: typeof testimonials[number]; i: number }) {
  const colorIdx = i % avatarColors.length
  return (
    <div className="w-[280px] shrink-0 rounded-2xl border border-dark-600/30 bg-dark-800/40 p-5 md:w-[296px] md:p-6">
      <Quote className="mb-3 h-4 w-4 text-coffee-500/25 md:mb-4 md:h-5 md:w-5" />
      <p className="mb-4 text-xs leading-relaxed text-text-secondary line-clamp-4 md:text-sm">
        &ldquo;{t.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${avatarColors[colorIdx]} shadow-lg md:h-10 md:w-10`}
        >
          <span className="text-[10px] font-bold text-white">{getInitials(t.name)}</span>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-text-primary truncate md:text-sm">{t.name}</p>
          <div className="flex items-center gap-2">
            <p className="text-[10px] text-text-secondary truncate md:text-[11px]">{t.role}</p>
            <span className="text-[10px] text-cream-400 shrink-0">
              {"★".repeat(t.rating)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  return (
    <Section className="py-10 sm:py-20 md:py-28">
      <div className="mb-6 text-center sm:mb-10">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-coffee-400">
          Testimonials
        </p>
        <h2 className="mt-2 font-cursive text-2xl sm:text-5xl">
          Kata Mereka
        </h2>
      </div>

      {/* Mobile: auto-scroll marquee */}
      <div className="relative overflow-hidden md:hidden">
        <div
          className="flex gap-4"
          style={{
            animation: "marquee 40s linear infinite",
          }}
        >
          {duplicated.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} i={i} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-dark-900 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-dark-900 to-transparent" />
      </div>

      {/* Desktop: auto-scroll marquee */}
      <div className="relative hidden overflow-hidden md:block">
        <div
          className="flex gap-5"
          style={{
            animation: "marquee-desktop 60s linear infinite",
          }}
        >
          {duplicated.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} i={i} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-dark-900 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-dark-900 to-transparent" />
      </div>
    </Section>
  )
}
