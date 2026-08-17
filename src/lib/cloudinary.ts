import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadProductImage(file: File, folder: string) {
  const bytes = Buffer.from(await file.arrayBuffer())
  const dataUri = `data:${file.type || "image/jpeg"};base64,${bytes.toString("base64")}`

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: `tinygems/${folder}`,
    resource_type: "image",
  })

  return result.secure_url
}
