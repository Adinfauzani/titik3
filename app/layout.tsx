import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { TRPCProvider } from "@/lib/trpc-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Warkop Titik 3",
  description: "Pesan kopi dan makanan favorit kamu di Warkop Titik 3",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  )
}
