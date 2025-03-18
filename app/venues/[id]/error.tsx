"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <button
          onClick={() => reset()}
          className="bg-white text-black px-4 py-2 rounded"
        >
          Try again
        </button>
      </div>
    </main>
  )
} 