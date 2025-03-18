"use client"

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'

interface FavoriteButtonProps {
  venueId: number
  venueName: string
}

export default function FavoriteButton({ venueId, venueName }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  
  // Check if venue is in favorites on component mount
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteVenues') || '[]')
    setIsFavorite(favorites.includes(venueId))
  }, [venueId])
  
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteVenues') || '[]')
    
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((id: number) => id !== venueId)
      localStorage.setItem('favoriteVenues', JSON.stringify(updatedFavorites))
    } else {
      // Add to favorites
      favorites.push(venueId)
      localStorage.setItem('favoriteVenues', JSON.stringify(favorites))
    }
    
    setIsFavorite(!isFavorite)
  }
  
  return (
    <button
      onClick={toggleFavorite}
      className={`p-2 rounded-full transition-all ${
        isFavorite 
          ? 'bg-[#989FCE] text-[#52414C]' 
          : 'bg-[#52414C]/50 text-[#FFE9CE] hover:bg-[#52414C]/70'
      }`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart className={`h-6 w-6 ${isFavorite ? 'fill-current' : ''}`} />
    </button>
  )
} 