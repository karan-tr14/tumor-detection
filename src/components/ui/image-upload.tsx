"use client";

import { Button } from "@/components/ui/button";
import { ImagePlus, Upload } from "lucide-react";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage: string | null;
  onRemoveImage: () => void;
}

export function ImageUpload({
  onImageSelect,
  selectedImage,
  onRemoveImage,
}: ImageUploadProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 transition-all ${
        selectedImage ? "border-primary" : "border-muted-foreground"
      }`}
    >
      {selectedImage ? (
        <div className="space-y-4">
          <img
            src={selectedImage}
            alt="Uploaded scan"
            className="max-h-[400px] mx-auto rounded-lg"
          />
          <div className="flex justify-center">
            <Button variant="outline" onClick={onRemoveImage}>
              Remove Image
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <ImagePlus className="mx-auto h-12 w-12 text-muted-foreground" />
          <div className="space-y-2">
            <h3 className="font-semibold">Upload Scan Image</h3>
            <p className="text-sm text-muted-foreground">
              Supported formats: JPG, PNG (max 10MB)
            </p>
          </div>
          <Button asChild>
            <label className="cursor-pointer">
              <Upload className="mr-2 h-4 w-4" />
              Select Image
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </Button>
        </div>
      )}
    </div>
  );
}
