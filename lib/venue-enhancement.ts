import { enhanceVenueWithTicketmaster } from './ticketmaster-integration';
// Import other API integrations as they're developed
// import { enhanceVenueWithYelp } from './yelp-integration';
// import { enhanceVenueWithGooglePlaces } from './google-places-integration';

export async function enhanceVenue(venue) {
  // Start with the original venue
  let enhancedVenue = { ...venue };
  
  // Try Ticketmaster first
  try {
    enhancedVenue = await enhanceVenueWithTicketmaster(enhancedVenue);
  } catch (error) {
    console.log(`Ticketmaster enhancement failed for ${venue.name}: ${error.message}`);
  }
  
  // Try other APIs if needed
  // if (!enhancedVenue.upcomingShows || enhancedVenue.upcomingShows.length === 0) {
  //   try {
  //     enhancedVenue = await enhanceVenueWithSomeOtherAPI(enhancedVenue);
  //   } catch (error) {
  //     console.log(`Other API enhancement failed for ${venue.name}: ${error.message}`);
  //   }
  // }
  
  return enhancedVenue;
} 