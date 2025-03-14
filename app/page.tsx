import VenueCarousel from "@/components/venue-carousel"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-900 to-black text-white">
      <div className="w-full max-w-full mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">NYC Venues</h1>
          <p className="text-lg md:text-xl text-slate-300">Discover the hottest live event venues in New York City</p>
        </div>

        <div className="h-[500px] md:h-[650px] lg:h-[700px] w-full">
          <VenueCarousel />
        </div>
      </div>
    </main>
  )
}

