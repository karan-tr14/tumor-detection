import { Hero } from "@/components/global/hero";
import { TumourDetection } from "@/components/global/tumour-detection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <TumourDetection />
        </div>
      </div>
    </main>
  );
}
