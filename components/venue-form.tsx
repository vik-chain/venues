"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { submitVenue } from "@/app/actions/venue-actions"

// Define the venue type
type VenueFormData = {
  name: string;
  location: string;
  capacity: number;
}

export default function VenueForm() {
  // State for each form field
  const [venue, setVenue] = useState<VenueFormData>({
    name: "",
    location: "",
    capacity: 0
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Venue</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={submitVenue} className="space-y-4">
          <div>
            <label htmlFor="name">Venue Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={venue.name}
              onChange={(e) => setVenue({...venue, name: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label htmlFor="location">Location</label>
            <input
              id="location"
              name="location"
              type="text"
              value={venue.location}
              onChange={(e) => setVenue({...venue, location: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="capacity">Capacity</label>
            <input
              id="capacity"
              name="capacity"
              type="number"
              value={venue.capacity}
              onChange={(e) => setVenue({...venue, capacity: Number(e.target.value)})}
              className="w-full p-2 border rounded"
            />
          </div>

          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Venue
          </button>
        </form>
      </CardContent>
    </Card>
  )
} 