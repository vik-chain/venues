import { NextRequest, NextResponse } from 'next/server'
import { getVenue } from '@/lib/api'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const venue = await getVenue(params.id)
    return NextResponse.json(venue)
  } catch (error) {
    return NextResponse.json(
      { error: 'Venue not found' },
      { status: 404 }
    )
  }
} 