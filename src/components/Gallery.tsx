"use client"

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  
  const leftImages = [1, 4, 5, 8, 9]
  const rightImages = [2, 3, 6, 7, 10]

  const handleDownload = (id: number, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent opening the modal
    const link = document.createElement('a')
    link.href = `/img/img${id}.jpg`
    link.download = `flob-image-${id}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const ImageCard = ({ id }: { id: number }) => (
    <motion.div
      key={id}
      className="relative w-full cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: id * 0.1
      }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5 }}
    >
      <div 
        className="relative w-full rounded-2xl overflow-hidden bg-black/20 shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        <Image
          src={`/img/img${id}.jpg`}
          alt={`Gallery image ${id}`}
          width={800}
          height={600}
          className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
          onClick={() => setSelectedImage(id)}
        />
        <motion.button
          className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FFB800] text-black opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-full group-hover:translate-y-0 border-2 border-white shadow-[0_4px_0_rgb(0,0,0,0.2)] active:shadow-none active:translate-y-[2px]"
          onClick={(e) => handleDownload(id, e)}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2.5} 
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
            />
          </svg>
          <span className="font-bold">Download</span>
        </motion.button>
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-black/90 to-black py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Staggered Gallery Layout */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-6 md:gap-8">
            {leftImages.map((id) => (
              <ImageCard key={id} id={id} />
            ))}
          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-6 md:gap-8 md:mt-16">
            {rightImages.map((id) => (
              <ImageCard key={id} id={id} />
            ))}
          </div>
        </div>

        {/* Modal for full-size view */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-7xl w-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-white z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  onClick={() => setSelectedImage(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <motion.button
                  className="absolute top-4 right-20 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FFB800] text-black transition-all duration-300 border-2 border-white shadow-[0_4px_0_rgb(0,0,0,0.2)] active:shadow-none active:translate-y-[2px] z-10"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDownload(selectedImage, e)
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="font-bold">Download</span>
                </motion.button>
                
                <div className="relative w-full">
                  <Image
                    src={`/img/img${selectedImage}.jpg`}
                    alt={`Full size image ${selectedImage}`}
                    width={1920}
                    height={1080}
                    className="w-full h-auto object-contain max-h-[90vh]"
                    priority
                  />
                </div>

                {/* Navigation buttons */}
                <button
                  className="absolute left-4 p-3 text-white bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage(selectedImage > 1 ? selectedImage - 1 : 10)
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  className="absolute right-4 p-3 text-white bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage(selectedImage < 10 ? selectedImage + 1 : 1)
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 