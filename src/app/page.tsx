"use client";

import { useEffect, useState } from 'react';
import { ResumeHeader } from "@/components/resume-header";
import { ResumeEditor } from "@/components/resume-editor";
import { ResumePreview } from "@/components/resume-preview";
import { useResumeStore } from '@/lib/store';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const { resume, setResume } = useResumeStore();

  useEffect(() => {
    setIsClient(true);
    const savedResume = localStorage.getItem('resume-data');
    if (savedResume) {
      setResume(JSON.parse(savedResume));
    }
  }, [setResume]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('resume-data', JSON.stringify(resume));
    }
  }, [resume, isClient]);

  if (!isClient) {
    return null; 
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ResumeHeader />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 sm:p-6 md:p-8">
        <div className="no-print">
          <ResumeEditor />
        </div>
        <div className="print-container">
          <ResumePreview />
        </div>
      </main>
    </div>
  );
}
