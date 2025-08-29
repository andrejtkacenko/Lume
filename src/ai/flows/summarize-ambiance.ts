'use server';

/**
 * @fileOverview Generates a summary of the restaurant's ambiance.
 *
 * - summarizeAmbiance - A function that generates the ambiance summary.
 * - SummarizeAmbianceInput - The input type for the summarizeAmbiance function.
 * - SummarizeAmbianceOutput - The return type for the summarizeAmbiance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAmbianceInputSchema = z.object({
  decorDescription: z
    .string()
    .describe('A detailed description of the restaurant\'s decor and style.'),
});
export type SummarizeAmbianceInput = z.infer<typeof SummarizeAmbianceInputSchema>;

const SummarizeAmbianceOutputSchema = z.object({
  ambianceSummary: z
    .string()
    .describe('A concise summary of the restaurant\'s ambiance.'),
});
export type SummarizeAmbianceOutput = z.infer<typeof SummarizeAmbianceOutputSchema>;

export async function summarizeAmbiance(input: SummarizeAmbianceInput): Promise<SummarizeAmbianceOutput> {
  return summarizeAmbianceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeAmbiancePrompt',
  input: {schema: SummarizeAmbianceInputSchema},
  output: {schema: SummarizeAmbianceOutputSchema},
  prompt: `You are a restaurant ambiance expert. Generate a short, inviting summary of the restaurant\'s ambiance based on the following description of its decor and style:\n\n{{{decorDescription}}}`,
});

const summarizeAmbianceFlow = ai.defineFlow(
  {
    name: 'summarizeAmbianceFlow',
    inputSchema: SummarizeAmbianceInputSchema,
    outputSchema: SummarizeAmbianceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
