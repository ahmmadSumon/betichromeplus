import { NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Max size is 5MB." }, { status: 400 })
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { 
            folder: "products",
            resource_type: "image",
            transformation: [
              { quality: "auto", fetch_format: "auto" }
            ]
          }, 
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        )
        .end(buffer)
    })

    return NextResponse.json({
      url: uploadResult.secure_url,
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error.message || "Upload failed" }, 
      { status: 500 }
    )
  }
}
