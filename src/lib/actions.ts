"use server";

import { generateResumeContent } from "@/ai/flows/generate-resume-content";

export async function generateSuggestionsAction(jobDescription: string) {
  try {
    if (!jobDescription) {
      return { success: false, error: "Job description is required." };
    }
    const result = await generateResumeContent({ jobDescription });
    return { success: true, data: result.resumeContentSuggestions };
  } catch (error) {
    console.error("Error generating resume content:", error);
    return { success: false, error: "Failed to generate AI suggestions. Please try again." };
  }
}
