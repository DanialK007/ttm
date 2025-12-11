"use client";
import { useEffect, useState } from "react";
import RecentUploads from "@/components/RecentUploads";

function Main() {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  // Fetch previous images from Cloudinary folder on mount
  useEffect(() => {
    async function fetchPhotos() {
      try {
        const res = await fetch("/api/get-photos");
        const data = await res.json();
        if (data.urls) setUploadedUrls(data.urls);
      } catch (err) {
        console.error("Failed to fetch previous photos", err);
      }
    }
    fetchPhotos();
  }, []);

  return (
    <div className="min-h-screen">
      <RecentUploads urls={uploadedUrls} />
    </div>
  );
}

export default Main;
