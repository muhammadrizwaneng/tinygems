import { siteConfig } from "@/lib/site"
import { WhatsAppIcon } from "@/components/WhatsAppIcon"
import { Button } from "@/components/ui/button"

export const metadata = { title: "Contact us" }

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold">Contact us</h1>
      <p className="mt-4 text-muted-foreground">
        Questions about an order, size, or wholesale? Message TinyGems on WhatsApp.
      </p>
      <div className="mt-6 space-y-2 text-sm">
        <p>WhatsApp / Phone: {siteConfig.phoneDisplay}</p>
        <p>Email: {siteConfig.email}</p>
      </div>
      <Button
        className="mt-6 bg-[#25D366] text-white hover:bg-[#1ebe5d]"
        nativeButton={false}
        render={
          <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" />
        }
      >
        <WhatsAppIcon />
        WhatsApp Us
      </Button>
    </article>
  )
}
