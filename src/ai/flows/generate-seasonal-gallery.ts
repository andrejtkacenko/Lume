'use server';

/**
 * @fileOverview A flow to generate a seasonal photo gallery for the restaurant.
 *
 * - generateSeasonalGallery - A function that generates a list of image URLs appropriate for the current season.
 * - GenerateSeasonalGalleryInput - The input type for the generateSeasonalGallery function.
 * - GenerateSeasonalGalleryOutput - The return type for the generateSeasonalGallery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSeasonalGalleryInputSchema = z.object({
  season: z
    .string()
    .describe('The current season (e.g., Spring, Summer, Autumn, Winter).'),
  restaurantName: z
    .string()
    .describe('The name of the restaurant.'),
  cuisine: z.string().describe('The type of cuisine the restaurant offers.'),
  decorStyle: z
    .string()
    .describe('The decor style of the restaurant (e.g., rustic, modern).'),
});
export type GenerateSeasonalGalleryInput = z.infer<
  typeof GenerateSeasonalGalleryInputSchema
>;

const GenerateSeasonalGalleryOutputSchema = z.object({
  imageUrls: z
    .array(z.string())
    .describe(
      'An array of image URLs appropriate for the current season, showcasing the restaurant\'s ambiance and dishes.'
    ),
});
export type GenerateSeasonalGalleryOutput = z.infer<
  typeof GenerateSeasonalGalleryOutputSchema
>;

export async function generateSeasonalGallery(
  input: GenerateSeasonalGalleryInput
): Promise<GenerateSeasonalGalleryOutput> {
  return generateSeasonalGalleryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSeasonalGalleryPrompt',
  input: {schema: GenerateSeasonalGalleryInputSchema},
  output: {schema: GenerateSeasonalGalleryOutputSchema},
  prompt: `You are a creative content specialist for restaurant websites.

You will generate a list of image URLs for the restaurant's photo gallery that are appropriate for the current season.
The images should showcase the restaurant's ambiance and dishes.  DO NOT generate URLs that are not S3 URLs.

Here are details about the restaurant:
- Name: {{restaurantName}}
- Cuisine: {{cuisine}}
- Decor Style: {{decorStyle}}
- Season: {{season}}

Respond with only valid S3 image URLs for the specified season. Do not include any text in the response other than the URLs.
Ensure the images are high-quality and relevant to the restaurant's theme and the current season.
Return a JSON array of strings.  The string should be an AWS S3 URL.
If the request is for spring, generate pictures of flowers and garden imagery. For Summer generate outdoor patio imagery.
Autumn requests pictures of fall foliage. Winter requests should have images with fireplaces.
Example S3 URL: https://terratable.s3.amazonaws.com/image1.jpg
`,
});

const generateSeasonalGalleryFlow = ai.defineFlow(
  {
    name: 'generateSeasonalGalleryFlow',
    inputSchema: GenerateSeasonalGalleryInputSchema,
    outputSchema: GenerateSeasonalGalleryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
