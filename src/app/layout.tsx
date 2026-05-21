import type { Metadata } from "next"
import { Inter, Dancing_Script, Plus_Jakarta_Sans } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"
import { TRPCProvider } from "@/lib/trpc-provider"
import { ThemeProvider } from "@/components/themes/theme-provider"

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
  description: "Titik temu buat ngopi, ngobrol, dan makan enak — warkop tongkrongan modern Indonesia",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      signInUrl="/auth/signin"
      signUpUrl="/auth/signup"
    >
      <html
        lang="id"
        className={`${inter.variable} ${dancingScript.variable} ${plusJakarta.variable}`}
        suppressHydrationWarning
      >
        <body className="font-sans antialiased">
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <TRPCProvider>{children}</TRPCProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
