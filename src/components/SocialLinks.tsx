"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'

export function SocialLinks() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 pb-12 pt-24 bg-gradient-to-t from-black/80 to-transparent">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* Logo Image */}
        <motion.div
          className="relative w-[280px] h-[100px] float"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1.2,
            ease: [0.2, 0.8, 0.2, 1]
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
        >
          <Image
            src="/img/text.png"
            alt="FLOB"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Social Icons */}
        <motion.div 
          className="flex gap-12 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.a
            href="https://t.me/flobentry"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative w-12 h-12">
              <Image
                src="/img/telegram.png"
                alt="Join us on Telegram"
                fill
                className="object-contain"
              />
            </div>
          </motion.a>

          <motion.a
            href="https://x.com/flobsol?s=21&t=E_s0R05aW5V8nq5zhHnZAQ"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
            whileHover={{ scale: 1.2, rotate: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative w-12 h-12">
              <Image
                src="/img/x.png"
                alt="Follow us on X (Twitter)"
                fill
                className="object-contain"
              />
            </div>
          </motion.a>
        </motion.div>
      </div>
    </div>
  )
} 