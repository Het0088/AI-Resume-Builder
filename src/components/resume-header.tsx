"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons";
import { Download, Linkedin } from "lucide-react";
import { useResumeStore } from "@/lib/store";

export function ResumeHeader() {
  const { loadSampleData } = useResumeStore();

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="no-print sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            ResuMaster AI
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={loadSampleData}>
            <Linkedin />
            Import from LinkedIn
          </Button>
          <Button size="sm" onClick={handlePrint}>
            <Download />
            Export to PDF
          </Button>
        </div>
      </div>
    </header>
  );
}
