'use server';
/**
 * @fileOverview A flow for generating a QR code for a reservation.
 *
 * - generateReservationQrCode - A function that handles the QR code generation process.
 * - GenerateReservationQrCodeInput - The input type for the generateReservationQrCode function.
 * - GenerateReservationQrCodeOutput - The return type for the generateReservationQrCode function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateReservationQrCodeInputSchema = z.object({
  details: z.string().describe('The reservation details to be encoded in the QR code.'),
});
export type GenerateReservationQrCodeInput = z.infer<typeof GenerateReservationQrCodeInputSchema>;

const GenerateReservationQrCodeOutputSchema = z.object({
  qrCode: z.string().describe("A QR code image as a data URI. Expected format: 'data:image/png;base64,<encoded_data>'."),
});
export type GenerateReservationQrCodeOutput = z.infer<typeof GenerateReservationQrCodeOutputSchema>;


export async function generateReservationQrCode(input: GenerateReservationQrCodeInput): Promise<GenerateReservationQrCodeOutput> {
    return generateReservationQrCodeFlow(input);
}

const generateQrCodeTool = ai.defineTool(
    {
      name: 'generateQrCode',
      description: 'Generates a QR code from the given text.',
      inputSchema: z.object({
        text: z.string().describe('The text to encode in the QR code.'),
      }),
      outputSchema: z.object({
        qrCode: z
          .string()
          .describe(
            "A QR code image as a data URI. Expected format: 'data:image/png;base64,<encoded_data>'."
          ),
      }),
    },
    async (input) => {
        const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(input.text)}`);
        const buffer = await response.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        return {
          qrCode: `data:image/png;base64,${base64}`,
        };
    }
  );


const prompt = ai.definePrompt({
    name: 'generateReservationQrCodePrompt',
    input: { schema: GenerateReservationQrCodeInputSchema },
    output: { schema: GenerateReservationQrCodeOutputSchema },
    tools: [generateQrCodeTool],
    prompt: `Generate a QR code for the following reservation details: {{{details}}}`,
  });


const generateReservationQrCodeFlow = ai.defineFlow(
    {
      name: 'generateReservationQrCodeFlow',
      inputSchema: GenerateReservationQrCodeInputSchema,
      outputSchema: GenerateReservationQrCodeOutputSchema,
    },
    async (input) => {
      const {output} = await prompt(input);
      return output!;
    }
  );
