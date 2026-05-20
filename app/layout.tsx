import type { Metadata } from "next"
import { Inter, Dancing_Script, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { TRPCProvider } from "@/lib/trpc-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
})
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Warkop Titik 3",
  description: "Titik temu untuk cerita, rasa, dan kebersamaan",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${dancingScript.variable} ${plusJakarta.variable}`}
    >
      <body className="font-sans antialiased">
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  )
}
