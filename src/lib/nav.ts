export const categoryNav = [
  {
    label: "Rings",
    href: "/category/rings",
    children: [
      { label: "All Rings", href: "/category/rings" },
      { label: "Zircon Rings", href: "/shop?collection=zircon&category=rings" },
      { label: "Casual Rings", href: "/shop?collection=casual&category=rings" },
      { label: "Kundan Rings", href: "/shop?collection=kundan&category=rings" },
      { label: "Ethnic Rings", href: "/shop?collection=ethnic&category=rings" },
    ],
  },
  {
    label: "Earrings",
    href: "/category/earrings",
    children: [
      { label: "All Earrings", href: "/category/earrings" },
      { label: "Tops & Studs", href: "/shop?collection=studs&category=earrings" },
      { label: "Drop Earrings", href: "/shop?collection=drops&category=earrings" },
      { label: "Jhumki Earrings", href: "/shop?collection=jhumki&category=earrings" },
      { label: "Ear Hoops", href: "/shop?collection=hoops&category=earrings" },
    ],
  },
  {
    label: "Bangles & Bracelets",
    href: "/category/bangles-bracelets",
    children: [
      { label: "All Bangles & Bracelets", href: "/category/bangles-bracelets" },
      { label: "Ethnic Bangles", href: "/shop?collection=ethnic&category=bangles-bracelets" },
      { label: "Kundan Bangles", href: "/shop?collection=kundan&category=bangles-bracelets" },
      { label: "Chain Bracelets", href: "/shop?collection=casual&category=bangles-bracelets" },
    ],
  },
  {
    label: "Pendants",
    href: "/category/pendants",
    children: [
      { label: "All Pendants", href: "/category/pendants" },
      { label: "Calligraphy", href: "/shop?collection=calligraphy" },
      { label: "Kundan Pendant Set", href: "/shop?collection=kundan&category=pendants" },
      { label: "Ethnic Pendant Set", href: "/shop?collection=ethnic&category=pendants" },
    ],
  },
  {
    label: "Jewelry Sets",
    href: "/category/jewelry-sets",
    children: [
      { label: "All Necklace Sets", href: "/category/jewelry-sets" },
      { label: "Bridal Sets", href: "/shop?collection=bridal" },
      { label: "Choker Sets", href: "/shop?collection=choker" },
      { label: "Kundan Sets", href: "/shop?collection=kundan&category=jewelry-sets" },
    ],
  },
  {
    label: "Mala",
    href: "/category/mala",
  },
  {
    label: "Stainless Steel",
    href: "/category/stainless-steel",
  },
] as const

export const mainNav = [
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Sale", href: "/sale" },
  { label: "Rings", href: "/category/rings" },
  { label: "Earrings", href: "/category/earrings" },
  { label: "Pendants", href: "/category/pendants" },
  { label: "Bracelets", href: "/category/bangles-bracelets" },
  { label: "Sets", href: "/category/jewelry-sets" },
  { label: "Mala", href: "/category/mala" },
] as const
