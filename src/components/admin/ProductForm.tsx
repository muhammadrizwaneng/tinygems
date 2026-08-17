import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type CategoryOption = { id: string; name: string }

type ProductValues = {
  name: string
  slug: string
  sku: string | null
  description: string
  price: number
  compareAtPrice: number | null
  collection: string | null
  categoryId: string
  stock: number
  featured: boolean
  onSale: boolean
  isNew: boolean
  image: string
  studioImage: string | null
  wornImage: string | null
}

export function ProductForm({
  categories,
  product,
  action,
}: {
  categories: CategoryOption[]
  product?: ProductValues
  action: (formData: FormData) => void | Promise<void>
}) {
  return (
    <form action={action} className="grid max-w-4xl gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" defaultValue={product?.name} required />
        <Field label="Slug" name="slug" defaultValue={product?.slug} />
        <Field label="SKU" name="sku" defaultValue={product?.sku ?? ""} />
        <div className="space-y-2">
          <Label htmlFor="categoryId">Category</Label>
          <select
            id="categoryId"
            name="categoryId"
            required
            defaultValue={product?.categoryId}
            className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <Field
          label="Price (PKR)"
          name="price"
          type="number"
          defaultValue={product?.price ?? 0}
          required
        />
        <Field
          label="Compare at price"
          name="compareAtPrice"
          type="number"
          defaultValue={product?.compareAtPrice ?? 0}
        />
        <Field label="Stock" name="stock" type="number" defaultValue={product?.stock ?? 25} />
        <Field
          label="Collection tag"
          name="collection"
          defaultValue={product?.collection ?? ""}
          placeholder="kundan, floral, zircon..."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={product?.description}
          required
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <ImageField
          id="image"
          name="image"
          label="Main image"
          hint="Hero shot used on listings and as the first gallery photo."
          preview={product?.image}
          required={!product}
        />
        <ImageField
          id="studioImage"
          name="studioImage"
          label="Studio image"
          hint="Product-only shot on the opposite background (black or white)."
          preview={product?.studioImage}
        />
        <ImageField
          id="wornImage"
          name="wornImage"
          label="Worn / set image"
          hint="How it looks on a person, or the full matching set."
          preview={product?.wornImage}
        />
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="featured" defaultChecked={product?.featured} />
          Featured
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="onSale" defaultChecked={product?.onSale} />
          On sale
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="isNew" defaultChecked={product?.isNew} />
          New arrival
        </label>
      </div>
      <Button type="submit">{product ? "Save product" : "Add product"}</Button>
    </form>
  )
}

function ImageField({
  id,
  name,
  label,
  hint,
  preview,
  required,
}: {
  id: string
  name: string
  label: string
  hint: string
  preview?: string | null
  required?: boolean
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <p className="text-muted-foreground text-xs">{hint}</p>
      <Input id={id} name={name} type="file" accept="image/*" required={required} />
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt="" className="aspect-square w-full rounded-lg object-cover" />
      ) : null}
    </div>
  )
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
  placeholder,
}: {
  label: string
  name: string
  type?: string
  defaultValue?: string | number
  required?: boolean
  placeholder?: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
      />
    </div>
  )
}
