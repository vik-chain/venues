import Link from "next/link"
import { Search } from "lucide-react"
import VenueCarousel from "@/components/venue-carousel"
import SmokeBackground from "@/components/smoke-background"
import { enhanceVenueWithTicketmaster } from "@/lib/ticketmaster-integration"
import { venues } from "@/lib/venues-data"
import type { Venue } from "@/lib/api"

function getRandomVenues(venuesList: any[], count: number = 5): any[] {
  const shuffled = [...venuesList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default async function Home() {
  // Select 5 random venues from the original data
  const randomVenues = getRandomVenues(venues, 5);
  
  // Enhance only these 5 venues with Ticketmaster data
  const enhancedVenues = await Promise.all(
    randomVenues.map(venue => enhanceVenueWithTicketmaster(venue as unknown as Venue))
  );
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#52414C] via-[#3A2E36] to-black text-[#FFE9CE] overflow-hidden">
      {/* Smoke effect background */}
      <SmokeBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="mb-8 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6 md:mb-0 text-[#FFE9CE]">
            <span className="font-bold">NYC</span> Venues
          </h1>
          
          <div className="w-full md:w-auto">
            <Link 
              href="/search" 
              className="flex items-center gap-2 bg-[#52414C]/40 hover:bg-[#52414C]/60 border border-[#989FCE]/30 rounded-full px-6 py-3 text-[#FFE9CE]/90 transition-colors w-full md:w-auto"
            >
              <Search className="h-5 w-5 text-[#989FCE]" />
              <span className="font-light tracking-wide">Search venues...</span>
            </Link>
          </div>
        </header>
        
        <section className="h-[650px] md:h-[750px] lg:h-[800px] mb-12 relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mb-12 text-[#FFE9CE]/80 font-light">
            <p className="text-xl">Discover the perfect venue for your next event</p>
            <p className="text-sm mt-2">Move your mouse over the cards to interact</p>
          </div>
          <VenueCarousel venues={enhancedVenues} />
        </section>
        
        <footer className="text-center text-[#FFE9CE]/60 py-8 font-light tracking-wide">
          <p>© {new Date().getFullYear()} NYC Venues. All rights reserved.</p>
        </footer>
      </div>
    </main>
  )
}

