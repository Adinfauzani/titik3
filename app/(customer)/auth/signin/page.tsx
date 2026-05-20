"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/shared/button"
import { Card } from "@/components/shared/card"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid email or password")
      setLoading(false)
    } else {
      router.push("/menu")
      router.refresh()
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="mb-2 flex items-center justify-center gap-2 text-xl font-semibold"
          >
            <span className="text-2xl text-coffee-400">●</span>
            Warkop Titik 3
          </Link>
          <p className="text-sm text-text-secondary">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm text-text-secondary">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-dark-600 bg-dark-700 px-3 py-2 text-sm text-text-primary focus:border-coffee-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-text-secondary">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-dark-600 bg-dark-700 px-3 py-2 text-sm text-text-primary focus:border-coffee-500 focus:outline-none"
              required
            />
          </div>

          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Card>
    </div>
  )
}
