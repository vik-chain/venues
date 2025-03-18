import { notFound } from "next/navigation"
import { getVenue } from "@/lib/api"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import VenueMap from "@/components/venue-map"
import FavoriteButton from "@/components/favorite-button"
import Image from "next/image"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id
    const venue = await getVenue(id)
    
    return {
      title: `${venue.name} - NYC Venues`,
      description: venue.description
    }
  } catch (error) {
    return {
      title: 'Venue Not Found'
    }
  }
}

export default async function VenuePage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id
    const venue = await getVenue(id)
    
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#52414C] to-black text-[#FFE9CE] p-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center text-[#989FCE] hover:text-[#FFE9CE] mb-6 transition-colors font-light tracking-wide"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          
          <div className="relative mb-8 h-64 md:h-80 rounded-xl overflow-hidden">
            <Image 
              src={venue.imageUrl} 
              alt={venue.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#52414C]/90 via-[#52414C]/30 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
              <h1 className="text-3xl md:text-4xl font-light tracking-tight text-[#FFE9CE] drop-shadow-lg">
                {venue.name}
              </h1>
              <FavoriteButton venueId={venue.id} venueName={venue.name} />
            </div>
          </div>
          
          <p className="text-xl text-[#FFE9CE]/80 mb-8 font-light leading-relaxed">{venue.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-light mb-4 text-[#989FCE]">Upcoming Shows</h2>
              <ul className="space-y-4">
                {venue.upcomingShows.map((show, index) => (
                  <li key={index} className="bg-[#52414C]/20 border border-[#989FCE]/20 p-4 rounded-lg">
                    <h3 className="font-medium text-base text-[#FFE9CE]">{show.name}</h3>
                    <p className="text-[#FFE9CE]/70 font-light">{show.date}</p>
                    
                    <div className="mt-2 flex justify-between items-center">
                      {show.priceRange && (
                        <span className="text-[#989FCE] text-sm">
                          {show.priceRange}
                        </span>
                      )}
                      
                      {show.ticketUrl && (
                        <a 
                          href={show.ticketUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-[#989FCE]/20 hover:bg-[#989FCE]/40 text-[#FFE9CE] text-sm px-3 py-1 rounded-full transition-colors"
                        >
                          Buy Tickets
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-light mb-4 text-[#989FCE]">Venue Info</h2>
              <div className="bg-[#52414C]/20 border border-[#989FCE]/20 p-4 rounded-lg mb-6">
                <p className="mb-2 font-light"><span className="text-[#989FCE]">Capacity:</span> {venue.capacity}</p>
                <p className="mb-2 font-light"><span className="text-[#989FCE]">Address:</span> {venue.address}</p>
                <p className="font-light"><span className="text-[#989FCE]">Vibe:</span> {venue.vibe}</p>
              </div>
              
              <h2 className="text-2xl font-light mb-4 text-[#989FCE]">Location</h2>
              <VenueMap address={venue.address} venueName={venue.name} />
            </div>
          </div>
        </div>
      </main>
    )
  } catch (error) {
    notFound()
  }
} 