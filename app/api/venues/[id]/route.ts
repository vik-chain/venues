import { NextResponse } from 'next/server'
import { venues } from '@/lib/venues-data'
import { type NextRequest } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
){
  const id = (await params).id
  const venue = venues.find(v => v.id === parseInt(id))
  
  if (!venue) {
    return NextResponse.json({ error: 'Venue not found' }, { status: 404 })
  }
  
  return NextResponse.json(venue)
} 