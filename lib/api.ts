import { venues as originalVenues } from './venues-data'
import { enhanceVenueWithTicketmaster, enhanceAllVenuesWithTicketmaster } from './ticketmaster-integration'

export type Venue = {
  id: number
  name: string
  description: string
  capacity: string
  address: string
  upcomingShows: Array<{ 
    name: string
    date: string
    ticketUrl?: string
    priceRange?: string
  }>
  vibe: string
  imageUrl: string
  ticketmasterId?: string
  ticketmasterUrl?: string
}

// Cache for enhanced venues to avoid repeated API calls
let enhancedVenuesCache: Venue[] | null = null

export async function getVenues(query?: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Get enhanced venues (using cache if available)
  const enhancedVenues = enhancedVenuesCache || await enhanceAllVenuesWithTicketmaster()
  
  // Update cache
  if (!enhancedVenuesCache) {
    enhancedVenuesCache = enhancedVenues
  }
  
  if (!query) return enhancedVenues
  
  const lowercaseQuery = query.toLowerCase()
  return enhancedVenues.filter(venue => 
    venue.name.toLowerCase().includes(lowercaseQuery) ||
    venue.description.toLowerCase().includes(lowercaseQuery) ||
    venue.vibe.toLowerCase().includes(lowercaseQuery) ||
    venue.capacity.toLowerCase().includes(lowercaseQuery)
  )
}

export async function getVenue(id: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  // Find the original venue
  const venue = originalVenues.find(v => v.id === parseInt(id))
  
  if (!venue) {
    throw new Error(`Venue with ID ${id} not found`)
  }
  
  // Enhance with Ticketmaster data
  return enhanceVenueWithTicketmaster(venue)
} 