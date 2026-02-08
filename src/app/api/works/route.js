import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import dbConnect from "@/lib/db";
import Work from "@/models/Work";
import { getUserFromRequest } from "@/lib/auth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function formatDateKey(date) {
  return date.toISOString().slice(0, 10);
}

export async function GET(request) {
  const userId = getUserFromRequest(request);

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  await dbConnect();
  const entries = await Work.find({ userId })
    .sort({ date: -1, createdAt: -1 })
    .lean();
  return NextResponse.json({ data: entries });
}

export async function POST(request) {
  const userId = getUserFromRequest(request);

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const formData = await request.formData();
  const text = (formData.get("text") || "").toString().trim();
  const file = formData.get("media");

  if (!text) {
    return NextResponse.json(
      { error: "Text is required." },
      { status: 400 }
    );
  }

  if (!file) {
    return NextResponse.json(
      { error: "A media file is required." },
      { status: 400 }
    );
  }

  if (
    typeof file.type !== "string" ||
    (!file.type.startsWith("image/") && !file.type.startsWith("video/"))
  ) {
    return NextResponse.json(
      { error: "Only image or video files are allowed." },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const now = new Date();
    const dateKey = formatDateKey(now);

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "daily-work-log",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      );
      stream.end(buffer);
    });

    const mediaType =
      uploadResult.resource_type === "video" ? "video" : "image";

    const entry = await Work.create({
      userId,
      date: now,
      dateKey,
      text,
      mediaUrl: uploadResult.secure_url,
      mediaType,
    });

    return NextResponse.json({ data: entry }, { status: 201 });
  } catch (error) {
    console.error("Error creating work entry:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create work entry." },
      { status: 500 }
    );
  }
}
