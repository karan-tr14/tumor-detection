"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ImageUpload } from "@/components/ui/image-upload";
import { AnalysisResult } from "@/components/global/analysis-result";

interface AnalysisResult {
  detected: boolean;
  confidence: number;
  explanation?: string;
}

export function TumourDetection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <ImageUpload
            selectedImage={selectedImage}
            onRemoveImage={() => {
              setSelectedImage(null);
              setResult(null);
            }}
          />

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
