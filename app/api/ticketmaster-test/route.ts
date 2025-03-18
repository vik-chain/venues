import { NextResponse } from 'next/server';
import { searchVenueByName, getVenueEvents } from '@/lib/ticketmaster-api';

export async function GET() {
  try {
    // Test with one of our existing venues
    const venueName = "Madison Square Garden";
    
    // Search for the venue
    const venues = await searchVenueByName(venueName);
    
    if (venues.length === 0) {
      return NextResponse.json({ message: 'No venues found' });
    }
    
    // Get the first venue
    const venue = venues[0];
    
    // Get events for this venue
    const events = await getVenueEvents(venue.id);
    
    // Return the results
    return NextResponse.json({
      venue: {
        name: venue.name,
        id: venue.id,
        city: venue.city?.name,
        address: venue.address?.line1,
        url: venue.url
      },
      events: events.slice(0, 5).map((event: any) => ({
        name: event.name,
        date: event.dates?.start?.localDate,
        time: event.dates?.start?.localTime,
        url: event.url
      }))
    });
  } catch (error) {
    console.error('API test error:', error);
    return NextResponse.json({ error: 'Failed to test Ticketmaster API' }, { status: 500 });
  }
} 