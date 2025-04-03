"use client"

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null)
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')

  // Clear form and errors when switching modes
  useEffect(() => {
    setMessage(null)
    setEmail('')
    setPassword('')
    setUsername('')
  }, [mode])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      
      // Success - close modal
      setMessage({ text: 'Signed in successfully!', type: 'success' })
      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (error: any) {
      setMessage({ text: error.message || 'Error signing in', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
          }
        }
      })
      
      if (error) throw error
      
      setMessage({ 
        text: 'Check your email for the confirmation link!', 
        type: 'success' 
      })
    } catch (error: any) {
      setMessage({ text: error.message || 'Error signing up', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-md p-6 rounded-2xl bg-gradient-to-b from-[#52414C] to-[#3A2E36] border border-[#FFE9CE]/20 shadow-xl z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#FFE9CE]">
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </h2>
          <button 
            onClick={onClose}
            className="text-[#FFE9CE]/60 hover:text-[#FFE9CE] transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        {message && (
          <div className={`p-3 mb-4 rounded-lg ${
            message.type === 'error' 
              ? 'bg-red-500/20 text-red-200' 
              : 'bg-green-500/20 text-green-200'
          }`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={mode === 'signin' ? handleSignIn : handleSignUp}>
          <div className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-[#FFE9CE]/80 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required={mode === 'signup'}
                  className="w-full px-4 py-3 bg-[#52414C]/40 border border-[#FFE9CE]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#989FCE]/50 text-[#FFE9CE]"
                  placeholder="username"
                />
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#FFE9CE]/80 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#52414C]/40 border border-[#FFE9CE]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#989FCE]/50 text-[#FFE9CE]"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#FFE9CE]/80 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#52414C]/40 border border-[#FFE9CE]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#989FCE]/50 text-[#FFE9CE]"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#989FCE] hover:bg-[#989FCE]/90 text-[#3A2E36] font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center text-[#FFE9CE]/60">
          {mode === 'signin' ? (
            <p>
              Don't have an account?{' '}
              <button 
                onClick={() => setMode('signup')}
                className="text-[#989FCE] hover:underline"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button 
                onClick={() => setMode('signin')}
                className="text-[#989FCE] hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
} 