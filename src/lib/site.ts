export const siteConfig = {
  name: "TinyGems",
  url: "https://tinygems.pk",
  title: "TinyGems | Artificial Jewelry in Pakistan",
  description:
    "Shop artificial jewelry in Pakistan at TinyGems. Earrings, rings, bangles, pendants, jewelry sets and more at wholesale-friendly prices with nationwide delivery and WhatsApp ordering.",
  phone: "03000795296",
  phoneDisplay: "0300 0795296",
  whatsappUrl: "https://wa.me/923000795296",
  email: "hello@tinygems.pk",
  keywords: [
    "TinyGems",
    "artificial jewelry Pakistan",
    "imitation jewelry",
    "fashion jewelry Pakistan",
    "earrings",
    "rings",
    "bangles",
    "necklace set",
    "tinygems.pk",
  ],
} as const

export const priceFilters = [199, 299, 399, 499, 999] as const

export const testimonials = [
  {
    name: "Shazia Jan",
    text: "Pearl drop jhumka — lovely, liked it so much. Fast delivery and neat packing.",
  },
  {
    name: "Asra Khan",
    text: "Too perfect. I have ordered many times and everything always comes really good.",
  },
  {
    name: "Iftkhar Choudry",
    text: "Everything I ordered was very nice quality, including the bracelet. I will order more.",
  },
  {
    name: "Majid Hussain",
    text: "Good quality, affordable price. Jazakallah.",
  },
] as const

export function whatsappOrderUrl(message: string) {
  return `${siteConfig.whatsappUrl}?text=${encodeURIComponent(message)}`
}
