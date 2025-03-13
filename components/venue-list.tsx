"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Example venue type
type Venue = {
  id: string;
  name: string;
  location: string;
  capacity: number;
  upcomingEvents: number;
}

// Mock data for initial development
const mockVenues: Venue[] = [
  {
    id: "1",
    name: "The Grand Hall",
    location: "Downtown",
    capacity: 500,
    upcomingEvents: 3
  }
]

export default function VenueList() {
  const [venues] = useState(mockVenues)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Venues</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Upcoming Events</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {venues.map((venue) => (
              <TableRow key={venue.id}>
                <TableCell>{venue.name}</TableCell>
                <TableCell>{venue.location}</TableCell>
                <TableCell>{venue.capacity}</TableCell>
                <TableCell>{venue.upcomingEvents}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 