import { venues } from './venues-data'

export type Venue = {
  id: number
  name: string
  description: string
  capacity: string
  address: string
  upcomingShows: Array<{ name: string; date: string }>
  vibe: string
  imageUrl: string
}

export async function getVenues(query?: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  if (!query) return venues
  
  const lowercaseQuery = query.toLowerCase()
  return venues.filter(venue => 
    venue.name.toLowerCase().includes(lowercaseQuery) ||
    venue.description.toLowerCase().includes(lowercaseQuery) ||
    venue.vibe.toLowerCase().includes(lowercaseQuery) ||
    venue.capacity.toLowerCase().includes(lowercaseQuery)
  )
}

export async function getVenue(id: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const venue = venues.find(v => v.id === parseInt(id))
  
  if (!venue) {
    throw new Error(`Venue with ID ${id} not found`)
  }
  
  return venue
} 