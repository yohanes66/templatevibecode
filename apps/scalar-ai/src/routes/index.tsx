import { createFileRoute } from '@tanstack/react-router'
import { useReveal } from '../lib/motion'
import { Header } from '../components/Header'
import { Hero } from '../sections/Hero'
import { Features } from '../sections/Features'
import { CaseStudy } from '../sections/CaseStudy'
import { Pricing } from '../sections/Pricing'
import { Reviews } from '../sections/Reviews'
import { Cta } from '../sections/Cta'
import { Footer } from '../sections/Footer'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  useReveal()

  return (
    <main id="top">
      <Header />
      <Hero />
      <Features />
      <CaseStudy />
      <Pricing />
      <Reviews />
      <Cta />
      <Footer />
    </main>
  )
}
