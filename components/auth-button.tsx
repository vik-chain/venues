"use client"

import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import AuthModal from './auth-modal'
import { LogIn, LogOut, User as UserIcon } from 'lucide-react'

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
      setLoading(false)
      
      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user || null)
        }
      )
      
      return () => subscription.unsubscribe()
    }
    
    getInitialSession()
  }, [])
  
  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }
  
  if (loading) {
    return (
      <button className="flex items-center gap-2 bg-[#52414C]/40 border border-[#989FCE]/30 rounded-full px-4 py-2 text-[#FFE9CE]/90 transition-colors">
        <div className="h-5 w-5 rounded-full animate-pulse bg-[#989FCE]/30" />
        <span className="font-light">Loading...</span>
      </button>
    )
  }
  
  if (user) {
    // Get display name (username if available, otherwise email)
    const displayName = user.user_metadata?.username || user.email?.split('@')[0] || 'User'
    
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-[#52414C]/40 border border-[#989FCE]/30 rounded-full px-4 py-2 text-[#FFE9CE]/90">
          <UserIcon className="h-4 w-4 text-[#989FCE]" />
          <span className="font-light truncate max-w-[120px]">
            {displayName}
          </span>
        </div>
        
        <button 
          onClick={handleSignOut}
          className="flex items-center gap-2 bg-[#52414C]/40 hover:bg-[#52414C]/60 border border-[#989FCE]/30 rounded-full px-4 py-2 text-[#FFE9CE]/90 transition-colors"
        >
          <LogOut className="h-4 w-4 text-[#989FCE]" />
          <span className="font-light">Sign Out</span>
        </button>
      </div>
    )
  }
  
  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 bg-[#52414C]/40 hover:bg-[#52414C]/60 border border-[#989FCE]/30 rounded-full px-4 py-2 text-[#FFE9CE]/90 transition-colors"
      >
        <LogIn className="h-4 w-4 text-[#989FCE]" />
        <span className="font-light">Sign In</span>
      </button>
      
      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
} 