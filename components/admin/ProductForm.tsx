'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import { useFirestore } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { doc } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Trash2, PlusCircle, Star, Eye, X, Save, UploadCloud } from 'lucide-react';
import Image from 'next/image';
import ProductCard from '@/components/shared/ProductCard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

const initialProductState: Product = {
  id: '',
  title: 'Your Product Title',
  description: 'A great description that sells.',
  price: 9999.00,
  category: 'Electronics',
  marketplace: 'Amazon',
  affiliateLink: 'https://example.com/product',
  images: [{ id: '1', url: 'https://placehold.co/600x400/E2E8F0/AAAAAA?text=Product+Image', alt: 'Placeholder', hint: '' }],
  isDealOfTheDay: false,
  status: 'Draft',
};

interface ProductFormProps {
  product: Product | null;
  onFormClose: () => void;
}

export default function ProductForm({ product: selectedProduct, onFormClose }: ProductFormProps) {
  const [product, setProduct] = useState<Product>(initialProductState);
  const firestore = useFirestore();
  const { toast } = useToast();

  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct);
    } else {
      setProduct({ ...initialProductState, id: uuidv4() });
    }
  }, [selectedProduct]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numberValue = value === '' ? undefined : parseFloat(value);
    setProduct(prev => ({ ...prev, [name]: numberValue }));
  };

  const handleSlideChange = (index: number, field: 'url' | 'alt', value: string) => {
    const newSlides = [...product.images];
    if (field === 'url') newSlides[index].url = value;
    if (field === 'alt') newSlides[index].alt = value;
    setProduct(prev => ({ ...prev, images: newSlides }));
  };

  const addSlide = () => {
    if (product.images.length < 4) {
      setProduct(prev => ({
        ...prev,
        images: [...prev.images, { id: `${Date.now()}`, url: '', alt: '', hint: '' }]
      }));
    }
  };

  const removeSlide = (index: number) => {
    setProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSave = (status: 'Draft' | 'Published') => {
    if (!firestore || !product.id) {
        toast({ title: "Error", description: "Product ID is missing.", variant: "destructive" });
        return;
    }

    const productToSave = { ...product, status };
    const docRef = doc(firestore, 'products', product.id);
    
    setDocumentNonBlocking(docRef, productToSave, { merge: true });

    toast({
      title: "Success!",
      description: `Product has been saved as ${status}.`,
    });

    onFormClose();
  };

  return (
    <div className="space-y-6">
        {/* Title */}
        <div>
            <Label htmlFor="title">Title <span className="text-destructive">*</span></Label>
            <Input id="title" name="title" value={product.title} onChange={handleInputChange} required />
        </div>

        {/* Description */}
        <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={product.description} onChange={handleInputChange} rows={5} />
        </div>

        {/* Price & Discount */}
        <div className="grid grid-cols-2 gap-4">
            <div>
            <Label htmlFor="price">Price (INR) <span className="text-destructive">*</span></Label>
            <Input id="price" name="price" type="number" value={product.price} onChange={handlePriceChange} required />
            </div>
            <div>
            <Label htmlFor="originalPrice">Original Price (Optional)</Label>
            <Input id="originalPrice" name="originalPrice" type="number" value={product.originalPrice || ''} onChange={handlePriceChange} placeholder="e.g., 12999.00" />
            </div>
        </div>

        {/* Marketplace & Affiliate URL */}
            <div className="grid grid-cols-2 gap-4">
            <div>
                <Label htmlFor="marketplace">Marketplace</Label>
                <Select name="marketplace" value={product.marketplace} onValueChange={(value) => setProduct(p => ({...p, marketplace: value as any}))}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a marketplace" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Amazon">Amazon</SelectItem>
                        <SelectItem value="Flipkart">Flipkart</SelectItem>
                        <SelectItem value="Meesho">Meesho</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
            <Label htmlFor="affiliateLink">Affiliate URL <span className="text-destructive">*</span></Label>
            <Input id="affiliateLink" name="affiliateLink" value={product.affiliateLink} onChange={handleInputChange} required />
            </div>
        </div>

        {/* Slides */}
        <div>
            <Label>Slides (up to 4)</Label>
            <div className="space-y-4">
            {product.images.map((slide, index) => (
                <div key={slide.id || index} className="flex items-center gap-2 p-2 border rounded-lg">
                <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                    <Image src={slide.url || 'https://placehold.co/60x60'} alt="preview" width={60} height={60} className="rounded-md object-cover"/>
                </div>
                <div className="flex-grow space-y-2">
                    <Input placeholder="Image URL" value={slide.url} onChange={(e) => handleSlideChange(index, 'url', e.target.value)} />
                    <Input placeholder="Alt Text" value={slide.alt} onChange={(e) => handleSlideChange(index, 'alt', e.target.value)} />
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeSlide(index)} disabled={product.images.length === 1}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
                </div>
            ))}
            {product.images.length < 4 && (
                <Button variant="outline" onClick={addSlide} className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Slide
                </Button>
            )}
            </div>
        </div>
        
        {/* Category */}
        <div>
            <Label htmlFor="category">Category / Tags</Label>
            <Input id="category" name="category" value={product.category} onChange={handleInputChange} placeholder="e.g., Electronics, Gadgets" />
        </div>

            {/* Deal of the Day */}
        <div className="flex items-center space-x-2 pt-4 border-t mt-4">
            <Switch 
                id="dealOfTheDay" 
                checked={product.isDealOfTheDay} 
                onCheckedChange={(checked) => setProduct(p => ({...p, isDealOfTheDay: checked}))}
                />
            <Label htmlFor="dealOfTheDay" className="flex items-center gap-2 text-lg font-semibold text-amber-500">
                <Star className="h-5 w-5" />
                Set as Deal of the Day
            </Label>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center gap-4 pt-4 border-t sticky bottom-0 bg-background py-4">
            <div>
                <Dialog>
                    <DialogTrigger asChild>
                    <Button variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        Live Preview
                    </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Live Preview</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 max-w-sm mx-auto">
                        <ProductCard product={product} />
                    </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex gap-4">
            <Button variant="secondary" onClick={() => handleSave('Draft')}>
                <Save className="mr-2 h-4 w-4" />
                Save as Draft
            </Button>
            <Button onClick={() => handleSave('Published')}>
                <UploadCloud className="mr-2 h-4 w-4" />
                Publish Now
            </Button>
            </div>
        </div>
    </div>
  );
}
