/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import Link from "next/link"
import { getVenues } from "@/lib/api"
import VenueCard from "@/components/venue-card"
import { useSearchParams, useRouter } from "next/navigation"
import type { Venue } from "@/lib/api.ts"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get("q") || ""
  
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [venues, setVenues] = useState<Venue[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Load venues based on the URL query parameter on initial load
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery)
    }
  }, [initialQuery])

  const performSearch = async (query: string) => {
    setIsLoading(true)
    try {
      const results = await getVenues(query)
      setVenues(results)
      setSubmitted(true)
    } catch (error) {
      console.error("Error searching venues:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Update the URL with the search query
    const params = new URLSearchParams()
    if (searchQuery) {
      params.set("q", searchQuery)
    }
    
    // Update the URL without refreshing the page
    router.push(`/search?${params.toString()}`)
    
    // Perform the search
    performSearch(searchQuery)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#52414C] via-[#3A2E36] to-black text-[#FFE9CE]">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <Link href="/" className="text-4xl md:text-5xl font-light tracking-tight mb-6 block text-[#FFE9CE] hover:text-[#FFE9CE]/80 transition-colors">
            <span className="font-bold">NYC</span> Venues
          </Link>
          
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search venues by name, description, or vibe..."
                className="w-full bg-[#52414C]/30 border border-[#989FCE]/30 rounded-full px-6 py-4 pl-12 text-[#FFE9CE] placeholder-[#FFE9CE]/50 focus:outline-none focus:ring-2 focus:ring-[#989FCE]/50"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#989FCE]" />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#989FCE]/20 hover:bg-[#989FCE]/30 text-[#FFE9CE] px-4 py-2 rounded-full transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </header>
        
        <section>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#989FCE]"></div>
            </div>
          ) : submitted ? (
            venues.length > 0 ? (
              <div>
                <h2 className="text-2xl font-light mb-6">
                  Found {venues.length} {venues.length === 1 ? 'venue' : 'venues'}
                  {searchQuery && ` for '${searchQuery}'`}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {venues.map((venue) => (
                    <div key={venue.id} className="flex justify-center">
                      <VenueCard venue={venue} isCurrent={true} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-light mb-4">No venues found{searchQuery && ` for '${searchQuery}'`}</h2>
                <p className="text-[#FFE9CE]/70">Try a different search term or browse all venues.</p>
              </div>
            )
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-light mb-4">Search for your perfect venue</h2>
              <p className="text-[#FFE9CE]/70">Enter keywords like &quot;intimate&quot;, &quot;Brooklyn&quot;, or &quot;jazz&quot; to find venues.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
} 