export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto animate-pulse">
        <div className="h-12 bg-white/10 rounded mb-4" />
        <div className="h-24 bg-white/10 rounded mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-64 bg-white/10 rounded" />
          <div className="h-64 bg-white/10 rounded" />
        </div>
      </div>
    </main>
  )
} 