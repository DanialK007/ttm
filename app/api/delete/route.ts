import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

export async function POST(req: Request) {
  try {
    const { public_id } = await req.json();

    if (!public_id) {
      return NextResponse.json({ error: "Missing public_id" }, { status: 400 });
    }
    console.log("DELETE REQUEST PUBLIC ID =", public_id);
    // Delete image from Cloudinary
    const result = await cloudinary.uploader.destroy(public_id);
    console.log("DELETE RESPONSE:", result);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
