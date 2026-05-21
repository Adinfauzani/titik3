import { Hero } from "@/components/home/hero"
import { BrandStory } from "@/components/home/brand-story"
import { ExperienceShowcase } from "@/components/home/experience-showcase"
import { SignatureMenu } from "@/components/home/signature-menu"
import { CommunityCollaboration } from "@/components/home/community-collaboration"
import { EventHighlights } from "@/components/home/event-highlights"
import { Testimonials } from "@/components/home/testimonials"
import { DigitalOrdering } from "@/components/home/digital-ordering"
import { CTAFooter } from "@/components/home/cta-footer"
import { Footer } from "@/components/home/footer"

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStory />
      <ExperienceShowcase />
      <SignatureMenu />
      <CommunityCollaboration />
      <EventHighlights />
      <Testimonials />
      <DigitalOrdering />
      <CTAFooter />
      <Footer />
    </>
  )
}
