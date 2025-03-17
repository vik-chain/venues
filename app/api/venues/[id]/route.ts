import { NextResponse } from 'next/server'
import { venues } from '@/lib/venues-data'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const venue = venues.find(v => v.id === parseInt(params.id))
  
  if (!venue) {
    return new NextResponse('Not Found', { status: 404 })
  }
  
  return NextResponse.json(venue)
} 