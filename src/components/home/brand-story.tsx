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

export function BrandStory() {
  return (
    <Section className="py-10 sm:py-24 md:py-32" id="tentang">
      <div className="mb-8 text-center sm:mb-14">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-coffee-400 sm:text-sm">
          Tentang Titik 3
        </p>
        <h2 className="mt-2 font-cursive text-2xl sm:text-5xl">
          Lebih dari Sekadar Kopi
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-xs text-text-secondary sm:text-sm sm:mt-4">
          Tiga titik bukan sekadar logo. Ini adalah filosofi tentang apa yang kami percaya.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-5">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="group rounded-2xl border border-dark-600/30 bg-dark-800/30 p-4 text-center transition-all duration-500 hover:-translate-y-0.5 hover:border-coffee-500/20 hover:shadow-xl hover:shadow-coffee-600/5 sm:p-8"
          >
            <div className="mb-3 flex justify-center gap-2 sm:mb-5 sm:gap-3">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className={`inline-block rounded-full transition-all duration-500 size-2 sm:size-2.5 ${
                    d === p.dot
                      ? "bg-coffee-400 shadow-lg shadow-coffee-500/20"
                      : "bg-dark-600"
                  }`}
                />
              ))}
            </div>
            <h3 className="mb-1 text-sm font-bold text-text-primary sm:text-xl">{p.title}</h3>
            <p className="text-xs leading-relaxed text-text-secondary sm:text-sm">{p.description}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
