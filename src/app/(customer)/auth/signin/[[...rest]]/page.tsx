import { SignIn } from "@clerk/nextjs"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
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
        <SignIn />
      </div>
    </div>
  )
}
