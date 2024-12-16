import { SpaceBackground } from '@/components/SpaceBackground'
import { Hero } from '@/components/Hero'
import { SocialLinks } from '@/components/SocialLinks'
import { BackgroundMusic } from '@/components/BackgroundMusic'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <BackgroundMusic />
      <SpaceBackground />
      <Hero />
      <SocialLinks />
    </main>
  )
}
