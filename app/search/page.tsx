import { venues } from "@/lib/venues-data"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: 'Search Venues - NYC Venues',
  description: 'Find the perfect venue for your next event in NYC',
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#52414C] to-black text-[#FFE9CE] p-8">
      <div className="max-w-6xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center text-[#989FCE] hover:text-[#FFE9CE] mb-8 transition-colors font-light"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-light tracking-tight mb-2 text-[#FFE9CE]">
          <span className="font-bold">Search</span> Venues
        </h1>
        <p className="text-[#FFE9CE]/70 mb-8 font-light tracking-wide">Find the perfect venue for your next event in NYC</p>
        
        <div className="relative mb-12">
          <input 
            type="text" 
            placeholder="Search by name, capacity, or vibe..." 
            className="w-full bg-[#52414C]/20 border border-[#989FCE]/30 rounded-lg px-4 py-3 text-[#FFE9CE] placeholder-[#FFE9CE]/50 focus:outline-none focus:ring-2 focus:ring-[#989FCE]/50 font-light tracking-wide"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {venues.map((venue) => (
            <Link 
              key={venue.id} 
              href={`/venues/${venue.id}`}
              className="bg-[#52414C]/20 hover:bg-[#52414C]/30 border border-[#989FCE]/20 rounded-xl overflow-hidden transition-all hover:shadow-lg hover:shadow-[#989FCE]/10 group"
            >
              <div className="relative h-48">
                <Image 
                  src={venue.imageUrl} 
                  alt={venue.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#52414C]/80 via-[#52414C]/20 to-transparent"></div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-medium mb-2 group-hover:text-[#989FCE] transition-colors">{venue.name}</h2>
                <p className="text-[#FFE9CE]/70 text-sm mb-4 line-clamp-2 font-light">{venue.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#FFE9CE]/60 font-light">Capacity: {venue.capacity}</span>
                  <span className="text-[#989FCE] font-light">{venue.vibe.split(', ')[0]}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
} 