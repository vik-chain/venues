import { Venue } from './venues-data'

export async function getVenues(searchQuery?: string): Promise<Venue[]> {
  // Build the URL with search params if provided
  const url = searchQuery 
    ? `http://localhost:3000/api/venues?q=${encodeURIComponent(searchQuery)}`
    : 'http://localhost:3000/api/venues'
  
  const res = await fetch(url, {
    next: { revalidate: 3600 } // Revalidate every hour
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch venues')
  }
  
  return res.json()
}

export async function getVenue(id: string): Promise<Venue> {
  const res = await fetch(`http://localhost:3000/api/venues/${id}`, {
    next: { revalidate: 3600 }
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch venue')
  }
  
  return res.json()
} 