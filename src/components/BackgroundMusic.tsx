"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isAudioLoaded, setIsAudioLoaded] = useState(false)

  // Initialize audio outside of useEffect to maintain reference
  useEffect(() => {
    const audio = new Audio('/img/sound.mp3')
    audio.loop = true
    audio.volume = 0.5
    audioRef.current = audio

    const handleCanPlayThrough = () => {
      setIsAudioLoaded(true)
    }

    audio.addEventListener('canplaythrough', handleCanPlayThrough)

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlayThrough)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
        audioRef.current = null
      }
    }
  }, [])

  // Handle user interactions
  useEffect(() => {
    if (!audioRef.current || !isAudioLoaded || hasInteracted) return

    const startAudio = async () => {
      try {
        if (audioRef.current) {
          const playPromise = audioRef.current.play()
          if (playPromise !== undefined) {
            await playPromise
            setIsPlaying(true)
            setHasInteracted(true)
          }
        }
      } catch (err) {
        // Silently handle expected audio interaction errors
        if (err instanceof Error && err.name !== 'AbortError') {
          console.warn('Audio playback issue:', err.name)
        }
      }
    }

    const handleInteraction = () => {
      startAudio()
    }

    // Add listeners for all interactions
    const interactions = ['click', 'touchstart', 'mousemove', 'keydown']
    interactions.forEach(event => {
      document.addEventListener(event, handleInteraction, { once: true })
    })

    return () => {
      interactions.forEach(event => {
        document.removeEventListener(event, handleInteraction)
      })
    }
  }, [isAudioLoaded, hasInteracted])

  const togglePlay = async () => {
    if (!audioRef.current || !isAudioLoaded) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          await playPromise
          setIsPlaying(true)
        }
      }
    } catch (err) {
      // Silently handle expected audio interaction errors
      if (err instanceof Error && err.name !== 'AbortError') {
        console.warn('Audio toggle issue:', err.name)
      }
    }
  }

  if (!isAudioLoaded) return null

  return (
    <motion.button
      className="fixed top-6 right-6 z-30 p-4 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 hover:bg-black/50"
      onClick={togglePlay}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      aria-label={isPlaying ? 'Mute sound' : 'Play sound'}
    >
      {isPlaying ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )}
    </motion.button>
  )
} 