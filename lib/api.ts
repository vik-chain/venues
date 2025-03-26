import { venues as originalVenues } from './venues-data'
import { enhanceVenueWithTicketmaster, enhanceAllVenuesWithTicketmaster } from './ticketmaster-integration'
import type { VenueData } from './venues-data'

// Define the Venue type only once
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

// We'll keep a smaller cache for individual venues
const venueCache: Record<number, Venue> = {};
const venueCacheTimestamp: Record<number, number> = {};

export async function getVenues(query?: string, filters?: {
  neighborhood?: string,
  vibe?: string,
  capacity?: string
}) {
  // First filter the original venues based on query and filters
  let filteredVenues: VenueData[] = [...originalVenues];
  
  if (query) {
    const lowercaseQuery = query.toLowerCase();
    filteredVenues = filteredVenues.filter(venue => 
      venue.name.toLowerCase().includes(lowercaseQuery) ||
      venue.description.toLowerCase().includes(lowercaseQuery) ||
      venue.vibe.toLowerCase().includes(lowercaseQuery) ||
      venue.neighborhood?.toLowerCase().includes(lowercaseQuery)
    );
  }
  
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
  
  // For search results, we don't need to enhance with Ticketmaster data
  // We'll only enhance when viewing details
  return filteredVenues;
}

export async function getVenue(id: string) {
  const venueId = parseInt(id);
  const now = Date.now();
  
  // Check if we have a valid cached version
  if (
    venueCache[venueId] && 
    venueCacheTimestamp[venueId] && 
    (now - venueCacheTimestamp[venueId] < CACHE_EXPIRATION)
  ) {
    return venueCache[venueId];
  }
  
  // Find the original venue
  const venue = originalVenues.find(v => v.id === venueId);
  
  if (!venue) {
    throw new Error(`Venue with ID ${id} not found`);
  }
  
  // Enhance with Ticketmaster data
  const enhancedVenue = await enhanceVenueWithTicketmaster(venue);
  
  // Cache the result
  venueCache[venueId] = enhancedVenue;
  venueCacheTimestamp[venueId] = now;
  
  return enhancedVenue;
}

// Helper function to get random venues
export function getRandomVenues(venues: any[], count: number = 5): any[] {
  const shuffled = [...venues].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Re-export the enhanceVenueWithTicketmaster function from ticketmaster-integration
export { enhanceVenueWithTicketmaster } from './ticketmaster-integration';

// Remove the duplicate Venue type definition
// export type Venue = {
//   id: number;
//   name: string;
//   description: string;
//   capacity: string;
//   address: string;
//   upcomingShows: Array<{ name: string; date: string; priceRange?: string; ticketUrl?: string }>;
//   vibe: string;
//   imageUrl: string;
//   // Add any other properties that might be in your Venue type
// }; 