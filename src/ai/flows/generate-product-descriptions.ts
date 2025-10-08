'use server';

/**
 * @fileOverview A product description and ad copy generation AI agent.
 *
 * - generateProductDescriptions - A function that handles the product description generation process.
 * - GenerateProductDescriptionsInput - The input type for the generateProductDescriptions function.
 * - GenerateProductDescriptionsOutput - The return type for the generateProductDescriptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionsInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  productDetails: z.string().describe('Detailed information about the product, including features and specifications.'),
  targetAudience: z.string().describe('The target audience for the product.'),
});
export type GenerateProductDescriptionsInput = z.infer<typeof GenerateProductDescriptionsInputSchema>;

const GenerateProductDescriptionsOutputSchema = z.object({
  productDescription: z.string().describe('A compelling and engaging description of the product.'),
  adCopy: z.string().describe('Advertising copy designed to attract the target audience.'),
});
export type GenerateProductDescriptionsOutput = z.infer<typeof GenerateProductDescriptionsOutputSchema>;

export async function generateProductDescriptions(
  input: GenerateProductDescriptionsInput
): Promise<GenerateProductDescriptionsOutput> {
  return generateProductDescriptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDescriptionsPrompt',
  input: {schema: GenerateProductDescriptionsInputSchema},
  output: {schema: GenerateProductDescriptionsOutputSchema},
  prompt: `You are an expert marketing copywriter. Your task is to create engaging product descriptions and advertising copy.

  Product Name: {{productName}}
  Product Details: {{productDetails}}
  Target Audience: {{targetAudience}}

  Write a compelling product description that highlights the key features and benefits of the product.  Then, craft advertising copy that is designed to appeal to the specified target audience.
  `,
});

const generateProductDescriptionsFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionsFlow',
    inputSchema: GenerateProductDescriptionsInputSchema,
    outputSchema: GenerateProductDescriptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
