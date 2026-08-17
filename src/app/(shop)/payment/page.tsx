export const metadata = { title: "Payment details" }

export default function PaymentPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold">Payment details</h1>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-muted-foreground">
        <li>Cash on delivery (COD) available on most orders.</li>
        <li>Bank transfer / JazzCash / EasyPaisa on request via WhatsApp.</li>
        <li>Please confirm your order total before the rider arrives.</li>
      </ul>
    </article>
  )
}
