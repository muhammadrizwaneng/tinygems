"use client"

import { useState } from "react"
import { Maximize2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export type GalleryImage = {
  src: string
  label: string
}

export function ProductGallery({
  images,
  alt,
  sku,
  discount,
}: {
  images: GalleryImage[]
  alt: string
  sku?: string | null
  discount?: number
}) {
  const [active, setActive] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const current = images[active] ?? images[0]

  if (!current) return null

  return (
    <>
      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto sm:w-20 sm:flex-col sm:overflow-visible">
            {images.map((image, index) => (
              <button
                key={`${image.src}-${image.label}`}
                type="button"
                onClick={() => setActive(index)}
                className={cn(
                  "size-16 shrink-0 overflow-hidden rounded-lg ring-1 ring-foreground/15 sm:size-20",
                  index === active && "ring-2 ring-primary"
                )}
                aria-label={`Show ${image.label} image`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt=""
                  className="size-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        <div className="relative min-w-0 flex-1 overflow-hidden rounded-2xl bg-stone-950 ring-1 ring-foreground/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.src}
            alt={alt}
            className="aspect-square w-full object-contain"
          />
          {discount && discount > 0 ? (
            <Badge className="absolute top-3 left-3 bg-rose-500 text-white">
              -{discount}%
            </Badge>
          ) : null}
          {sku ? (
            <p className="absolute bottom-3 left-3 text-xs font-medium tracking-wide text-white drop-shadow">
              {sku}
            </p>
          ) : null}
          <Button
            variant="secondary"
            size="icon-sm"
            className="absolute right-3 bottom-3"
            onClick={() => setZoomed(true)}
            aria-label="Zoom image"
          >
            <Maximize2 />
          </Button>
        </div>
      </div>

      <Dialog open={zoomed} onOpenChange={setZoomed}>
        <DialogContent
          className="max-h-[90vh] overflow-auto sm:max-w-3xl"
          showCloseButton
        >
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={current.src} alt={alt} className="w-full rounded-lg object-contain" />
        </DialogContent>
      </Dialog>
    </>
  )
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
