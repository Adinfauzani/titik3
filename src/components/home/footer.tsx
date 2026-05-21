import Link from "next/link"
import { Mail, MapPin, Clock, Instagram, Music2, MessageCircle } from "lucide-react"

const links = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "#tentang" },
  { label: "Menu", href: "/menu" },
  { label: "Kolaborasi", href: "#kolaborasi" },
  { label: "Event", href: "#event" },
]

export function Footer() {
  return (
    <footer className="border-t border-dark-600/30">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex gap-0.5">
                <span className="size-1.5 rounded-full bg-coffee-400 sm:size-2" />
                <span className="size-1.5 rounded-full bg-coffee-400 sm:size-2" />
                <span className="size-1.5 rounded-full bg-coffee-400 sm:size-2" />
              </div>
              <span className="ml-1 text-sm font-semibold tracking-tight text-text-primary sm:text-base">
                Warkop Titik 3
              </span>
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-text-secondary max-w-xs sm:text-sm">
              Ruang untuk rasa, cerita, dan pertemuan yang bermakna. Tiga titik, satu cerita.
            </p>
            <div className="mt-4 flex gap-2 sm:mt-5 sm:gap-3">
              {[Instagram, Music2, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex size-8 items-center justify-center rounded-xl bg-dark-700 text-text-secondary transition-all hover:bg-coffee-600/20 hover:text-coffee-400 sm:size-9"
                >
                  <Icon className="size-3.5 sm:size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-primary sm:mb-5 sm:text-xs">
              Links
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-xs text-text-secondary transition-colors hover:text-coffee-400 sm:text-sm"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-primary sm:mb-5 sm:text-xs">
              Contact
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-center gap-2 text-xs text-text-secondary sm:text-sm">
                <MapPin className="size-3 shrink-0 sm:size-3.5" />
                Jl. Kopi Nikmat No. 123
              </li>
              <li className="flex items-center gap-2 text-xs text-text-secondary sm:text-sm">
                <Mail className="size-3 shrink-0 sm:size-3.5" />
                hello@warkoptitik3.com
              </li>
              <li className="flex items-center gap-2 text-xs text-text-secondary sm:text-sm">
                <MessageCircle className="size-3 shrink-0 sm:size-3.5" />
                +62 812 3456 7890
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-primary sm:mb-5 sm:text-xs">
              Hours
            </h4>
            <div className="space-y-1 text-xs sm:space-y-2 sm:text-sm">
              <div className="flex items-center gap-2 text-text-secondary">
                <Clock className="size-3 shrink-0 sm:size-3.5" />
                <div>
                  <p>Sen-Jum: 08:00-22:00</p>
                  <p>Sab-Min: 09:00-23:00</p>
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-5">
              <p className="text-[10px] font-medium text-coffee-400 sm:text-xs">Kolaborasi</p>
              <a href="mailto:collab@warkoptitik3.com" className="text-xs text-text-secondary transition-colors hover:text-coffee-400 sm:text-sm">
                collab@warkoptitik3.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-dark-600/30 pt-5 text-center text-[10px] text-text-secondary sm:mt-14 sm:pt-6 sm:text-xs">
          <p>&copy; 2026 Warkop Titik 3. Tiga Titik, Satu Cerita.</p>
          <p className="mt-1 flex items-center justify-center gap-1 sm:mt-2">
            Made with <span className="text-coffee-400">● ● ●</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
