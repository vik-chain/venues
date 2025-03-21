import { searchVenueByName, getVenueEvents } from './ticketmaster-api';
import { venues } from './venues-data';
import type { Venue } from './api';

// Format a date from Ticketmaster to our format
function formatDate(dateStr: string, timeStr?: string): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  };
  
  let formattedDate = date.toLocaleDateString('en-US', options);
  
  if (timeStr) {
    // Convert 24h time to 12h format
    const timeParts = timeStr.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = timeParts[1];
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    formattedDate += ` • ${hour12}:${minutes} ${period}`;
  }
  
  return formattedDate;
}

// Format price range from Ticketmaster data
function formatPriceRange(priceRanges?: any[]): string | undefined {
  if (!priceRanges || priceRanges.length === 0) {
    return undefined;
  }
  
  const priceRange = priceRanges[0];
  const currency = priceRange.currency === 'USD' ? '$' : priceRange.currency;
  
  if (priceRange.min === priceRange.max) {
    return `${currency}${priceRange.min.toFixed(0)}`;
  }
  
  return `${currency}${priceRange.min.toFixed(0)} - ${currency}${priceRange.max.toFixed(0)}`;
}

// Enhance a single venue with Ticketmaster data
export async function enhanceVenueWithTicketmaster(venue: Venue): Promise<Venue> {
  try {
    // Skip if we already know Ticketmaster isn't available for this venue
    if (venue.ticketmasterAvailable === false) {
      return venue;
    }
    
    // Skip if we already have a Ticketmaster ID
    if (venue.ticketmasterId) {
      return venue;
    }
    
    // Search for the venue on Ticketmaster
    const tmVenues = await searchVenueByName(venue.name);
    
    if (tmVenues.length === 0) {
      console.log(`No Ticketmaster venue found for: ${venue.name}`);
      // Mark this venue as not available on Ticketmaster to avoid future lookups
      return {
        ...venue,
        ticketmasterAvailable: false
      };
    }
    
    // Get the first matching venue
    const tmVenue = tmVenues[0];
    
    // Get events for this venue
    const events = await getVenueEvents(tmVenue.id);
    
    // Create an enhanced venue with Ticketmaster data
    const enhancedVenue: Venue = {
      ...venue,
      ticketmasterId: tmVenue.id,
      ticketmasterUrl: tmVenue.url,
      ticketmasterAvailable: true,
      // Update upcomingShows with real data if available
      upcomingShows: events.length > 0 
        ? events.slice(0, 5).map((event: any) => ({
            name: event.name,
            date: formatDate(event.dates?.start?.localDate, event.dates?.start?.localTime),
            ticketUrl: event.url,
            priceRange: formatPriceRange(event.priceRanges)
          }))
        : venue.upcomingShows
    };
    
    return enhancedVenue;
  } catch (error) {
    console.error(`Error enhancing venue ${venue.name}:`, error);
    // Mark as not available on Ticketmaster due to error
    return {
      ...venue,
      ticketmasterAvailable: false
    };
  }
}

// Enhance all venues with Ticketmaster data
export async function enhanceAllVenuesWithTicketmaster(): Promise<Venue[]> {
  const enhancedVenues: Venue[] = [];
  
  for (const venue of venues) {
    const enhancedVenue = await enhanceVenueWithTicketmaster(venue);
    enhancedVenues.push(enhancedVenue);
  }
  
  return enhancedVenues;
} 