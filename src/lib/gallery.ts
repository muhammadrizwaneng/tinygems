export type GalleryImage = {
  src: string
  label: string
}

export function galleryFromProduct(product: {
  image: string
  studioImage?: string | null
  wornImage?: string | null
}): GalleryImage[] {
  const images: GalleryImage[] = [{ src: product.image, label: "Main" }]
  if (product.studioImage) {
    images.push({ src: product.studioImage, label: "Studio" })
  }
  if (product.wornImage) {
    images.push({ src: product.wornImage, label: "Worn / set" })
  }
  return images
}
