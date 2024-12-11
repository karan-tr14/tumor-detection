"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface AnalysisResultProps {
  detected: boolean;
  confidence: number;
}

export function AnalysisResult({ detected, confidence }: AnalysisResultProps) {
  return (
    <Alert variant={detected ? "destructive" : "default"}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>
        {detected ? "Tumor Detected" : "No Tumor Detected"}
      </AlertTitle>
      <AlertDescription>
        Confidence: {confidence.toFixed(2)}%
        {detected && (
          <div className="mt-2">
            Please consult with a healthcare professional for proper diagnosis.
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
}
