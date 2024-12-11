import { TumourDetection } from "@/components/global/tumour-detection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Ovarian Tumor Detection System
            </h1>
            <p className="text-muted-foreground text-lg">
              Upload an ultrasound image to detect potential ovarian tumors
              using AI analysis
            </p>
          </div>
          <TumourDetection />
        </div>
      </div>
    </main>
  );
}
