const API_KEY = 'wsVSxhmaN2A4tLRM3gj2yXgDrsBLWhlq';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

// Add rate limiting and retry logic
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Search for a venue by name with retry logic for rate limiting
 */
export async function searchVenueByName(name: string, retries = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/venues.json?keyword=${encodeURIComponent(name)}&apikey=${API_KEY}`
    );
    
    // Handle rate limiting with just one retry
    if (response.status === 429 && retries > 0) {
      console.log(`Rate limited for venue ${name}, retrying once...`);
      await delay(1000);  // Wait just 1 second before retrying
      return searchVenueByName(name, 0);
    }
    
    if (!response.ok) {
      // For non-rate-limit errors, just log and return empty
      console.log(`Ticketmaster API error for venue ${name}: ${response.status}`);
      return [];
    }
    
    const data = await response.json();
    
    // Handle case where venues property doesn't exist
    if (!data._embedded?.venues) {
      console.log(`No venues found for: ${name}`);
      return [];
    }
    
    return data._embedded.venues;
  } catch (error) {
    console.log(`Error searching for venue ${name}:`, error);
    return [];
  }
}

/**
 * Get upcoming events for a venue by Ticketmaster venue ID with retry logic
 */
export async function getVenueEvents(venueId: string, retries = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/events.json?venueId=${venueId}&sort=date,asc&apikey=${API_KEY}`
    );
    
    // Handle rate limiting with just one retry
    if (response.status === 429 && retries > 0) {
      console.log(`Rate limited for venue ID ${venueId}, retrying once...`);
      await delay(1000);  // Wait just 1 second before retrying
      return getVenueEvents(venueId, 0);
    }
    
    if (!response.ok) {
      // For non-rate-limit errors, just log and return empty
      console.log(`Ticketmaster API error for venue ID ${venueId}: ${response.status}`);
      return [];
    }
    
    const data = await response.json();
    
    // Handle case where events property doesn't exist
    if (!data._embedded?.events) {
      console.log(`No events found for venue ID: ${venueId}`);
      return [];
    }
    
    return data._embedded.events;
  } catch (error) {
    console.log(`Error getting events for venue ID ${venueId}:`, error);
    return [];
  }
} 