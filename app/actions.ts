'use server';

import {
  generateProductDescriptions,
  GenerateProductDescriptionsInput,
  GenerateProductDescriptionsOutput,
} from '@/ai/flows/generate-product-descriptions';
import { z } from 'zod';

const GenerateFormSchema = z.object({
  productName: z.string().min(3, 'Product name must be at least 3 characters'),
  productDetails: z.string().min(10, 'Product details must be at least 10 characters'),
  targetAudience: z.string().min(3, 'Target audience must be at least 3 characters'),
});

type FormState = {
  productDescription: string | null;
  adCopy: string | null;
  error: string | null;
};

export async function generateDescriptionAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = GenerateFormSchema.safeParse({
    productName: formData.get('productName'),
    productDetails: formData.get('productDetails'),
    targetAudience: formData.get('targetAudience'),
  });

  if (!validatedFields.success) {
    return {
      productDescription: null,
      adCopy: null,
      error: validatedFields.error.flatten().fieldErrors[Object.keys(validatedFields.error.flatten().fieldErrors)[0]][0] || 'Invalid input.',
    };
  }

  try {
    const input: GenerateProductDescriptionsInput = validatedFields.data;
    const result: GenerateProductDescriptionsOutput = await generateProductDescriptions(input);

    return {
      productDescription: result.productDescription,
      adCopy: result.adCopy,
      error: null,
    };
  } catch (e: any) {
    return {
      productDescription: null,
      adCopy: null,
      error: e.message || 'Failed to generate content. Please try again.',
    };
  }
}
