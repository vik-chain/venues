"use client"

import { useEffect, useRef, useState } from 'react'
import { Loader } from 'lucide-react'

type VenueMapProps = {
  address: string
  venueName: string
}

export default function VenueMap({ address, venueName }: VenueMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // This is a placeholder for actual map implementation
    // In a real app, you would use Google Maps, Mapbox, etc.
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [address])
  
  return (
    <div className="bg-[#52414C]/20 border border-[#989FCE]/20 rounded-lg overflow-hidden h-64 relative">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader className="h-8 w-8 text-[#989FCE] animate-spin" />
        </div>
      ) : (
        <div className="p-4 absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[#FFE9CE]/70 font-light mb-2">Map view for:</p>
            <p className="font-medium text-[#FFE9CE]">{venueName}</p>
            <p className="text-[#FFE9CE]/80 font-light mt-1">{address}</p>
          </div>
        </div>
      )}
    </div>
  )
} 