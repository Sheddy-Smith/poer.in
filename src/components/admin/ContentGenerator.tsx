'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { generateDescriptionAction } from '@/app/actions';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2 } from 'lucide-react';

const initialState = {
  productDescription: null,
  adCopy: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full font-bold text-accent-foreground" style={{ backgroundColor: 'hsl(var(--accent))' }}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Generate Content
        </>
      )}
    </Button>
  );
}

export default function ContentGenerator() {
  const [state, formAction] = useFormState(generateDescriptionAction, initialState);

  return (
    <div>
      <form action={formAction}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="productName">Product Name</Label>
            <Input id="productName" name="productName" placeholder="e.g., Premium Wireless Headphones" required />
          </div>
          <div>
            <Label htmlFor="productDetails">Product Details</Label>
            <Textarea
              id="productDetails"
              name="productDetails"
              placeholder="e.g., Noise-cancelling, 20-hour battery, Bluetooth 5.0, lightweight design"
              required
            />
          </div>
          <div>
            <Label htmlFor="targetAudience">Target Audience</Label>
            <Input id="targetAudience" name="targetAudience" placeholder="e.g., Tech-savvy commuters, students" required />
          </div>
        </div>
        <div className="mt-6">
          <SubmitButton />
        </div>
      </form>

      {state.error && <p className="mt-4 text-sm text-destructive">{state.error}</p>}

      {(state.productDescription || state.adCopy) && (
        <div className="mt-8 grid gap-6">
          {state.productDescription && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Product Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{state.productDescription}</p>
              </CardContent>
            </Card>
          )}
          {state.adCopy && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Ad Copy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{state.adCopy}</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
