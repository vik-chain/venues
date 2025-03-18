import { searchVenueByName, getVenueEvents } from './ticketmaster-api';

// Test function to search for venues and their events
export async function testTicketmasterAPI() {
  // Test with one of our existing venues
  const venueName = "Madison Square Garden";
  
  console.log(`Searching for venue: ${venueName}`);
  const venues = await searchVenueByName(venueName);
  
  if (venues.length === 0) {
    console.log('No venues found');
    return;
  }
  
  // Log the first venue found
  const venue = venues[0];
  console.log('Found venue:', {
    name: venue.name,
    id: venue.id,
    city: venue.city?.name,
    address: venue.address?.line1,
    url: venue.url
  });
  
  // Get events for this venue
  console.log(`Getting events for venue ID: ${venue.id}`);
  const events = await getVenueEvents(venue.id);
  
  if (events.length === 0) {
    console.log('No events found');
    return;
  }
  
  // Log the first 3 events
  console.log(`Found ${events.length} events. First 3:`);
  events.slice(0, 3).forEach((event, index) => {
    console.log(`Event ${index + 1}:`, {
      name: event.name,
      date: event.dates?.start?.localDate,
      time: event.dates?.start?.localTime,
      url: event.url
    });
  });
}

// Run the test if this file is executed directly
if (require.main === module) {
  testTicketmasterAPI()
    .then(() => console.log('Test completed'))
    .catch(error => console.error('Test failed:', error));
} 