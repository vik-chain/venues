import { NextResponse } from 'next/server'
import { venues } from '@/lib/venues-data'

export async function GET(request: Request) {
  // Get the URL object to access search params
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase()
  
  // Filter venues if there's a search query
  let filteredVenues = venues
  if (query) {
    filteredVenues = venues.filter(venue => 
      venue.name.toLowerCase().includes(query) || 
      venue.description.toLowerCase().includes(query) ||
      venue.vibe.toLowerCase().includes(query)
    )
  }
  
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return NextResponse.json(filteredVenues)
}

export async function POST(request: Request) {
  const venue = await request.json()
  // Here we would normally save to a database
  // For now, we'll just return the venue
  return NextResponse.json(venue)
} 