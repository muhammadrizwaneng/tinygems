export const metadata = { title: "Shipping details" }

export default function ShippingPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold">Shipping details</h1>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-muted-foreground">
        <li>Nationwide delivery across Pakistan.</li>
        <li>Orders are usually dispatched within 1–2 working days.</li>
        <li>Delivery typically takes 2–5 working days depending on your city.</li>
        <li>You will receive tracking or rider details on WhatsApp.</li>
      </ul>
    </article>
  )
}
