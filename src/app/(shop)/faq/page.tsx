export const metadata = { title: "FAQs" }

const faqs = [
  {
    q: "Do you deliver all over Pakistan?",
    a: "Yes. TinyGems ships nationwide. Delivery time depends on your city.",
  },
  {
    q: "Can I order on WhatsApp?",
    a: "Yes. Add items to cart and tap Order on WhatsApp, or message 0300 0795296 directly.",
  },
  {
    q: "Are the pieces gold?",
    a: "These are artificial / fashion jewelry pieces — gold-tone, zircon, kundan and stainless steel styles.",
  },
  {
    q: "How do I know my ring or bangle size?",
    a: "Message us a photo of a similar fitting piece or your finger measurement and we will help you choose.",
  },
]

export default function FaqPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold">FAQs</h1>
      <dl className="mt-8 space-y-6">
        {faqs.map((item) => (
          <div key={item.q}>
            <dt className="font-medium">{item.q}</dt>
            <dd className="mt-1 text-muted-foreground">{item.a}</dd>
          </div>
        ))}
      </dl>
    </article>
  )
}
