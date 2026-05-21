"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-6xl font-bold text-red-400">500</h1>
          <h2 className="text-2xl font-semibold">Something went wrong</h2>
          <p className="max-w-md text-muted-foreground">
            {error.message || "An unexpected error occurred. Please try again."}
          </p>
          <button
            onClick={reset}
            className="rounded-lg bg-coffee-600 px-4 py-2 text-sm font-medium text-white hover:bg-coffee-500"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
