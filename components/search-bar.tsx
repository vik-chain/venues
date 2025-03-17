"use client"

import { useState, useTransition } from 'react'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (query.trim()) {
      // Navigate to search results page
      startTransition(() => {
        router.push(`/search?q=${encodeURIComponent(query)}`)
      })
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search venues..."
          className="w-full bg-white/10 text-white border border-white/20 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
      </div>
      
      <button 
        type="submit"
        disabled={isPending}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-600 text-white text-sm px-3 py-1 rounded-full hover:bg-amber-500 transition-colors disabled:opacity-50"
      >
        {isPending ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
} 