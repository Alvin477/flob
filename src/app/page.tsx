import { SpaceBackground } from '@/components/SpaceBackground'
import { Hero } from '@/components/Hero'
import { SocialLinks } from '@/components/SocialLinks'
import { BackgroundMusic } from '@/components/BackgroundMusic'
import { Gallery } from '@/components/Gallery'

export default function Home() {
  return (
    <main className="relative">
      <BackgroundMusic />
      <SpaceBackground />
      <section className="h-screen relative">
        <Hero />
        <SocialLinks />
      </section>
      <section className="relative">
        <Gallery />
      </section>
    </main>
  )
}
