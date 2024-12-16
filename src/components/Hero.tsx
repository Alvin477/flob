"use client"

import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useRef } from 'react'

// Perlin noise function for smooth random movement
function noise(x: number) {
  const X = Math.floor(x) & 255
  x -= Math.floor(x)
  const u = x * x * (3 - 2 * x)
  return Math.sin(X) * u
}

export function Hero() {
  const controls = useAnimation()
  const isMoving = useRef(false)
  const time = useRef(0)
  const velocity = useRef({ x: 0, y: 0, rotation: 0 })
  const position = useRef({ x: 0, y: 0, rotation: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Add drag constraints
  const dragConstraints = {
    left: -300,
    right: 300,
    top: -200,
    bottom: 200
  }

  useEffect(() => {
    let animationFrame: number
    let bounds = { width: 0, height: 0 }

    const updateBounds = () => {
      if (containerRef.current) {
        bounds = {
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        }
      }
    }

    updateBounds()
    window.addEventListener('resize', updateBounds)

    const updatePosition = () => {
      // Slower time increment
      time.current += 0.0004

      if (!isMoving.current) {
        // Reduced movement range
        const noiseX = noise(time.current) * 0.006
        const noiseY = noise(time.current + 100) * 0.006
        const noiseRotation = noise(time.current + 200) * 0.004

        // Gentler force application
        velocity.current.x += noiseX * (1 - Math.abs(velocity.current.x) * 0.08)
        velocity.current.y += noiseY * (1 - Math.abs(velocity.current.y) * 0.08)
        velocity.current.rotation += noiseRotation * (1 - Math.abs(velocity.current.rotation) * 0.1)
      }

      // Stronger damping for slower movement
      velocity.current.x *= 0.995
      velocity.current.y *= 0.995
      velocity.current.rotation *= 0.997

      position.current.x += velocity.current.x
      position.current.y += velocity.current.y
      position.current.rotation += velocity.current.rotation

      // Keep within screen bounds with gentle pushback
      const margin = 90 // Margin from screen edges
      const maxX = (bounds.width / 2) - margin
      const maxY = (bounds.height / 2) - margin

      if (Math.abs(position.current.x) > maxX) {
        // Gentle pushback when near edges
        const excess = Math.abs(position.current.x) - maxX
        position.current.x = Math.sign(position.current.x) * maxX
        velocity.current.x = -velocity.current.x * 0.3 // Soft bounce
        velocity.current.x -= Math.sign(position.current.x) * excess * 0.01
      }

      if (Math.abs(position.current.y) > maxY) {
        const excess = Math.abs(position.current.y) - maxY
        position.current.y = Math.sign(position.current.y) * maxY
        velocity.current.y = -velocity.current.y * 0.3 // Soft bounce
        velocity.current.y -= Math.sign(position.current.y) * excess * 0.01
      }

      controls.set({
        x: position.current.x,
        y: position.current.y,
        rotate: position.current.rotation
      })

      animationFrame = requestAnimationFrame(updatePosition)
    }

    const addRandomImpulse = () => {
      if (!isMoving.current) {
        const angle = Math.random() * Math.PI * 2
        // Gentler random movements
        const force = Math.random() * 0.15
        const currentSpeed = Math.sqrt(
          velocity.current.x * velocity.current.x + 
          velocity.current.y * velocity.current.y
        )
        const scaleFactor = Math.max(0.15, 1 - currentSpeed * 0.4)
        
        velocity.current.x += Math.cos(angle) * force * scaleFactor
        velocity.current.y += Math.sin(angle) * force * scaleFactor
        velocity.current.rotation += (Math.random() - 0.5) * 0.1 * scaleFactor
      }
      // Longer intervals between impulses
      setTimeout(addRandomImpulse, Math.random() * 12000 + 10000)
    }

    updatePosition()
    addRandomImpulse()

    return () => {
      window.removeEventListener('resize', updateBounds)
      cancelAnimationFrame(animationFrame)
    }
  }, [controls])

  return (
    <div className="relative w-full h-screen overflow-hidden" ref={containerRef}>
      <Image
        src="/img/background.png"
        alt="Hero background"
        fill
        className="object-cover opacity-60 z-0"
        priority
      />

      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Rocket */}
          <div className="absolute w-[300px] h-[300px] left-1/4 -translate-x-1/2">
            <motion.div 
              className="w-full h-full"
              animate={{
                y: [-20, 20],
                x: [-10, 10],
                rotate: [-1, 1],
              }}
              transition={{
                y: {
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                },
                x: {
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
            >
              <Image
                src="/img/rocket.png"
                alt="Rocket"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </div>

          {/* Flog */}
          <motion.div 
            className="absolute w-[180px] h-[180px]"
            animate={controls}
            onDragStart={() => isMoving.current = true}
            onDragEnd={() => isMoving.current = false}
            drag
            dragConstraints={dragConstraints}
            dragTransition={{
              power: 0.01,
              timeConstant: 1200
            }}
            dragElastic={0.005}
          >
            <Image
              src="/img/flog.png"
              alt="Stranded Flog"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
} 