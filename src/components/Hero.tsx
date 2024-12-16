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

  // Flog's movement (keeping exactly the same)
  useEffect(() => {
    let animationFrame: number

    const updatePosition = () => {
      time.current += 0.001

      if (!isMoving.current) {
        const noiseX = noise(time.current) * 0.01
        const noiseY = noise(time.current + 100) * 0.01
        const noiseRotation = noise(time.current + 200) * 0.02

        velocity.current.x += noiseX
        velocity.current.y += noiseY
        velocity.current.rotation += noiseRotation
      }

      velocity.current.x *= 0.999
      velocity.current.y *= 0.999
      velocity.current.rotation *= 0.998

      position.current.x += velocity.current.x
      position.current.y += velocity.current.y
      position.current.rotation += velocity.current.rotation

      if (Math.abs(position.current.x) > 150) {
        velocity.current.x *= -0.2
      }
      if (Math.abs(position.current.y) > 100) {
        velocity.current.y *= -0.2
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
        const force = Math.random() * 0.2
        velocity.current.x += Math.cos(angle) * force
        velocity.current.y += Math.sin(angle) * force
        velocity.current.rotation += (Math.random() - 0.5) * 0.5
      }
      setTimeout(addRandomImpulse, Math.random() * 10000 + 8000)
    }

    updatePosition()
    addRandomImpulse()

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [controls])

  return (
    <div className="relative w-full h-screen overflow-hidden">
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

          {/* Flog - keeping exactly the same physics */}
          <motion.div 
            className="absolute w-[180px] h-[180px] left-[60%]"
            animate={controls}
            onDragStart={() => isMoving.current = true}
            onDragEnd={() => isMoving.current = false}
            drag
            dragTransition={{
              power: 0.02,
              timeConstant: 800,
              modifyTarget: target => Math.max(-150, Math.min(150, target))
            }}
            dragElastic={0.02}
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