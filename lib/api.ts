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
  neighborhood?: string
  ticketmasterAvailable?: boolean
}

// Cache for enhanced venues to avoid repeated API calls
let enhancedVenuesCache: Venue[] | null = null

// Cache expiration time (24 hours in milliseconds)
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000;
let cacheTimestamp: number | null = null;

export async function getVenues(query?: string, filters?: {
  neighborhood?: string,
  vibe?: string,
  capacity?: string
}) {
  // Check if cache is valid
  const now = Date.now();
  const isCacheValid = enhancedVenuesCache && cacheTimestamp && 
                      (now - cacheTimestamp < CACHE_EXPIRATION);
  
  // Get enhanced venues (using cache if available and valid)
  let enhancedVenues;
  if (isCacheValid) {
    enhancedVenues = enhancedVenuesCache;
  } else {
    enhancedVenues = await enhanceAllVenuesWithTicketmaster();
    // Update cache
    enhancedVenuesCache = enhancedVenues;
    cacheTimestamp = now;
  }
  
  // Filter by query if provided
  let filteredVenues = enhancedVenues;
  
  if (query) {
    const lowercaseQuery = query.toLowerCase();
    filteredVenues = filteredVenues.filter(venue => 
      venue.name.toLowerCase().includes(lowercaseQuery) ||
      venue.description.toLowerCase().includes(lowercaseQuery) ||
      venue.vibe.toLowerCase().includes(lowercaseQuery) ||
      venue.neighborhood?.toLowerCase().includes(lowercaseQuery)
    );
  }
  
  // Apply additional filters
  if (filters) {
    if (filters.neighborhood) {
      filteredVenues = filteredVenues.filter(venue => 
        venue.neighborhood?.toLowerCase().includes(filters.neighborhood!.toLowerCase())
      );
    }
    
    if (filters.vibe) {
      filteredVenues = filteredVenues.filter(venue => 
        venue.vibe.toLowerCase().includes(filters.vibe!.toLowerCase())
      );
    }
    
    // More filters as needed
  }
  
  return filteredVenues;
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