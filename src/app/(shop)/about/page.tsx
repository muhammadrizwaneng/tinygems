import { siteConfig } from "@/lib/site"

export const metadata = { title: "About TinyGems" }

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold">About TinyGems</h1>
      <p className="mt-4 text-muted-foreground leading-7">
        TinyGems is an online artificial jewelry store for Pakistan. We offer
        casual, party, and ethnic pieces — earrings, rings, bangles, pendants,
        jewelry sets, malas, stainless steel, and hair accessories — at prices
        that feel wholesale-friendly.
      </p>
      <p className="mt-4 text-muted-foreground leading-7">
        Order on the website or WhatsApp us at {siteConfig.phoneDisplay}. We
        deliver nationwide and accept cash on delivery.
      </p>
    </article>
  )
}
