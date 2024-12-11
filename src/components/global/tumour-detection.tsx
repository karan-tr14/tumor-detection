"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ImageUpload } from "@/components/ui/image-upload";
import { AnalysisResult } from "@/components/global/analysis-result";
import { convertImageToBase64, validateImage } from "@/lib/image-utils";
import { toast } from "sonner";

interface AnalysisResult {
  detected: boolean;
  confidence: number;
  explanation?: string;
}

export function TumourDetection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const handleImageSelect = async (file: File) => {
    try {
      validateImage(file);
      const base64 = await convertImageToBase64(file);
      setSelectedImage(base64);
      setCurrentFile(file);
      setResult(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to load image"
      );
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: selectedImage,
        }),
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      toast.error("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <ImageUpload
            onImageSelect={handleImageSelect}
            selectedImage={selectedImage}
            onRemoveImage={() => {
              setSelectedImage(null);
              setCurrentFile(null);
              setResult(null);
            }}
          />

          {selectedImage && !isAnalyzing && !result && (
            <Button className="w-full" size="lg" onClick={analyzeImage}>
              Analyze Image
            </Button>
          )}

          {isAnalyzing && (
            <div className="space-y-2">
              <Progress value={45} />
              <p className="text-center text-sm text-muted-foreground">
                Analyzing image...
              </p>
            </div>
          )}

          {result && <AnalysisResult {...result} />}
        </div>
      </Card>

      <div className="text-sm text-muted-foreground text-center">
        <p>
          This is a demonstration system and should not be used for actual
          medical diagnosis. Always consult with qualified healthcare
          professionals for medical advice.
        </p>
      </div>
    </div>
  );
}
