import { NextResponse } from 'next/server'
import { venues } from '@/lib/venues-data'

export function GET(_: Request, { params }: { params: { id: string } }) {
  const venue = venues.find(v => v.id === parseInt(params.id))
  
  if (!venue) {
    return NextResponse.json({ error: 'Venue not found' }, { status: 404 })
  }
  
  return NextResponse.json(venue)
} 