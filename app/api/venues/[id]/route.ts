import { NextRequest, NextResponse } from 'next/server'
import { getVenue } from '@/lib/api'

type RouteParams = {
  params: {
    id: string
  }
}

export async function GET(
  request: NextRequest,
  context: RouteParams
) {
  try {
    const venue = await getVenue(context.params.id)
    return NextResponse.json(venue)
  } catch (error) {
    return NextResponse.json(
      { error: 'Venue not found' },
      { status: 404 }
    )
  }
} 