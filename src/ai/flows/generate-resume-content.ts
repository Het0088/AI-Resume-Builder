'use server';

/**
 * @fileOverview A flow to generate resume content based on a job description.
 *
 * - generateResumeContent - A function that generates resume content based on a job description.
 * - GenerateResumeContentInput - The input type for the generateResumeContent function.
 * - GenerateResumeContentOutput - The return type for the generateResumeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResumeContentInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The job description to generate resume content for.'),
});
export type GenerateResumeContentInput = z.infer<typeof GenerateResumeContentInputSchema>;

const GenerateResumeContentOutputSchema = z.object({
  resumeContentSuggestions: z
    .string()
    .describe('The generated resume content suggestions.'),
});
export type GenerateResumeContentOutput = z.infer<typeof GenerateResumeContentOutputSchema>;

export async function generateResumeContent(
  input: GenerateResumeContentInput
): Promise<GenerateResumeContentOutput> {
  return generateResumeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResumeContentPrompt',
  input: {schema: GenerateResumeContentInputSchema},
  output: {schema: GenerateResumeContentOutputSchema},
  prompt: `You are an expert resume writer. Based on the following job description, generate resume content suggestions tailored to match the job requirements:

Job Description: {{{jobDescription}}}

Resume Content Suggestions:`,
});

const generateResumeContentFlow = ai.defineFlow(
  {
    name: 'generateResumeContentFlow',
    inputSchema: GenerateResumeContentInputSchema,
    outputSchema: GenerateResumeContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
