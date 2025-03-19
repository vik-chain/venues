import { enhanceVenueWithTicketmaster } from './ticketmaster-integration';
import type { Venue } from './api';
// Import other API integrations as they're developed
// import { enhanceVenueWithYelp } from './yelp-integration';
// import { enhanceVenueWithGooglePlaces } from './google-places-integration';

export async function enhanceVenue(venue: Venue): Promise<Venue> {
  // Start with the original venue
  let enhancedVenue = { ...venue };
  
  // Try Ticketmaster first
  try {
    enhancedVenue = await enhanceVenueWithTicketmaster(enhancedVenue);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log(`Ticketmaster enhancement failed for ${venue.name}: ${errorMessage}`);
  }
  
  // Try other APIs if needed
  // if (!enhancedVenue.upcomingShows || enhancedVenue.upcomingShows.length === 0) {
  //   try {
  //     enhancedVenue = await enhanceVenueWithSomeOtherAPI(enhancedVenue);
  //   } catch (error) {
  //     const errorMessage = error instanceof Error ? error.message : String(error);
  //     console.log(`Other API enhancement failed for ${venue.name}: ${errorMessage}`);
  //   }
  // }
  
  return enhancedVenue;
} 