"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Home, Info, MoreHorizontal, ShoppingCart, Coffee, Music, Handshake, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/shared/button"
import { useCartStore } from "@/lib/zustand"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Tentang", href: "#tentang" },
  { label: "Kolaborasi", href: "#kolaborasi" },
  { label: "Event", href: "#event" },
]

const mobileItems = [
  { label: "Beranda", href: "/", icon: Home },
  { label: "Tentang", href: "#tentang", icon: Info },
  { label: "Mores", icon: MoreHorizontal, isMores: true },
  { label: "Pesan", href: "/menu", icon: ShoppingCart },
  { label: "Menu", href: "/menu", icon: Coffee },
]

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moresOpen, setMoresOpen] = useState(false)
  const [navVisible, setNavVisible] = useState(true)
  const itemCount = useCartStore((s) => s.itemCount())
  const lastScrollY = useRef(0)
  const idleTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)

      clearTimeout(idleTimer.current)

      if (y > lastScrollY.current && y > 100) {
        setNavVisible(false)
      } else if (y < lastScrollY.current) {
        setNavVisible(true)
      }

      idleTimer.current = setTimeout(() => setNavVisible(true), 3000)

      lastScrollY.current = y
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      clearTimeout(idleTimer.current)
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-dark-600/20 bg-dark-900/80 shadow-lg shadow-black/10 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-coffee-400" />
              <span className="h-1.5 w-1.5 rounded-full bg-coffee-400" />
              <span className="h-1.5 w-1.5 rounded-full bg-coffee-400" />
            </div>
            <span className="ml-1 text-sm font-semibold tracking-tight">
              Warkop Titik 3
            </span>
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center rounded-lg p-1.5 text-text-secondary transition-colors hover:bg-dark-700 hover:text-text-primary md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-text-secondary transition-colors hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className="relative flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-dark-700 hover:text-text-primary"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-coffee-500 text-[9px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Link>

            <Link href="/menu" className="hidden md:inline-block">
              <Button size="sm" className="h-8 px-3 text-xs">Pesan Sekarang</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-14 lg:pt-16 pb-24 md:pb-0">{children}</main>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-12 z-40 border-b border-dark-600/50 bg-dark-900/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2 text-xs text-text-secondary transition-colors hover:bg-dark-700 hover:text-text-primary"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/menu" onClick={() => setMobileOpen(false)} className="mt-1">
                <Button className="w-full h-8 text-xs">Pesan Sekarang</Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: navVisible ? 0 : 160, opacity: navVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed inset-x-0 bottom-0 z-50 flex justify-center md:hidden"
      >
        <div         className="relative mb-4 flex items-center gap-2 rounded-full border border-dark-600/20 bg-dark-800/90 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-2xl shadow-coffee-500/5">
          {mobileItems.map((item) => {
            if (item.isMores) {
              return (
                <div key="mores" className="relative">
                  <button
                    onClick={() => setMoresOpen(!moresOpen)}
                    className="flex items-center justify-center rounded-full p-3 text-text-secondary transition-colors hover:bg-dark-700 hover:text-coffee-400"
                  >
                    <item.icon className="h-5 w-5" />
                  </button>

                  <AnimatePresence>
                    {moresOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.9 }}
                        className="absolute bottom-full left-1/2 mb-3 -translate-x-1/2 rounded-2xl border border-dark-600/20 bg-dark-800/95 p-2 shadow-xl shadow-black/30 backdrop-blur-2xl"
                      >
                        <div className="flex gap-2">
                          <Link
                            href="#event"
                            onClick={() => setMoresOpen(false)}
                            className="flex flex-col items-center gap-1 rounded-xl px-5 py-4 text-text-secondary transition-colors hover:bg-dark-700 hover:text-coffee-400"
                          >
                            <Music className="h-5 w-5" />
                            <span className="text-[10px] font-medium">Events</span>
                          </Link>
                          <Link
                            href="#kolaborasi"
                            onClick={() => setMoresOpen(false)}
                            className="flex flex-col items-center gap-1 rounded-xl px-5 py-4 text-text-secondary transition-colors hover:bg-dark-700 hover:text-coffee-400"
                          >
                            <Handshake className="h-5 w-5" />
                            <span className="text-[10px] font-medium">Kolab</span>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            }

            return (
              <Link
                key={item.label}
                href={item.href!}
                className="flex items-center justify-center rounded-full p-3 text-text-secondary transition-colors hover:bg-dark-700 hover:text-coffee-400"
              >
                <item.icon className="h-5 w-5" />
              </Link>
            )
          })}
        </div>
      </motion.nav>
    </div>
  )
}
