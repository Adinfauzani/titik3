"use client"

import Link from "next/link"
import { motion } from "framer-motion"
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
    <motion.footer
      initial={{ opacity: 1 }}
      className="border-t border-dark-600/30"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex gap-0.5">
                <span className="h-2 w-2 rounded-full bg-coffee-400" />
                <span className="h-2 w-2 rounded-full bg-coffee-400" />
                <span className="h-2 w-2 rounded-full bg-coffee-400" />
              </div>
              <span className="ml-1.5 text-base font-semibold tracking-tight text-text-primary">
                Warkop Titik 3
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary max-w-xs">
              Ruang untuk rasa, cerita, dan pertemuan yang bermakna. Tiga titik, satu cerita.
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Music2, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-dark-700 text-text-secondary transition-all hover:bg-coffee-600/20 hover:text-coffee-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-text-primary">
              Links
            </h4>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-text-secondary transition-colors hover:text-coffee-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-text-primary">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                Jl. Kopi Nikmat No. 123
              </li>
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                hello@warkoptitik3.com
              </li>
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <MessageCircle className="h-3.5 w-3.5 shrink-0" />
                +62 812 3456 7890
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-text-primary">
              Operating Hours
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-text-secondary">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                <div>
                  <p>Sen-Jum: 08:00-22:00</p>
                  <p>Sab-Min: 09:00-23:00</p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-xs font-medium text-coffee-400">Kolaborasi</p>
              <a href="mailto:collab@warkoptitik3.com" className="text-sm text-text-secondary transition-colors hover:text-coffee-400">
                collab@warkoptitik3.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-dark-600/30 pt-6 text-center text-xs text-text-secondary">
          <p>&copy; 2026 Warkop Titik 3. Tiga Titik, Satu Cerita.</p>
          <p className="mt-2 flex items-center justify-center gap-1">
            Made with <span className="text-coffee-400">● ● ●</span>
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
