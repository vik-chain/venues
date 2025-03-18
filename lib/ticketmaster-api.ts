const API_KEY = 'wsVSxhmaN2A4tLRM3gj2yXgDrsBLWhlq';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

/**
 * Search for a venue by name
 */
export async function searchVenueByName(name: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/venues.json?keyword=${encodeURIComponent(name)}&apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Ticketmaster API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data._embedded?.venues || [];
  } catch (error) {
    console.error('Error searching for venue:', error);
    return [];
  }
}

/**
 * Get upcoming events for a venue by Ticketmaster venue ID
 */
export async function getVenueEvents(venueId: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/events.json?venueId=${venueId}&sort=date,asc&apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Ticketmaster API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data._embedded?.events || [];
  } catch (error) {
    console.error('Error getting venue events:', error);
    return [];
  }
} 