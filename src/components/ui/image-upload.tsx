"use client";

import { Button } from "@/components/ui/button";
import { UploadButton } from "@/lib/uploadthing";
import { ImagePlus, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ImageUploadProps {
  selectedImage: string | null;
  onRemoveImage: () => void;
}

export function ImageUpload({
  selectedImage,
  onRemoveImage,
}: ImageUploadProps) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [fileid, setFileid] = useState("");
  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 transition-all ${
        selectedImage ? "border-primary" : "border-muted-foreground"
      }`}
    >
      <div className="text-center space-y-4">
        <ImagePlus className="mx-auto h-12 w-12 text-muted-foreground" />
        <div className="space-y-2">
          <h3 className="font-semibold">Upload Scan Image</h3>
          <p className="text-sm text-muted-foreground">
            Supported formats: JPG, PNG (max 10MB)
          </p>
        </div>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={async (res) => {
            setReady(true);
            // Do something with the response
            // await uploadToDb(res[0])
            console.log("Files: ", res[0]);
            toast.success("Image uploaded successfully");
          }}
          className="ut-allowed-content:hidden ut-button:bg-black ut-button:hover:bg-gray-800 ut-button:text-white ut-button:hover:text-white ut-button:rounded-md ut-button:py-2 ut-button:px-4 ut-button:mt-2"
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
      <Button
        className="mx-auto flex items-center mt-4"
        size={"lg"}
        onClick={() => {
          router.push("/analysis");
        }}
        disabled={!ready}
      >
        Run Analysis
      </Button>
    </div>
  );
}
