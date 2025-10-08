'use client';

import { Product } from '@/lib/types';
import { FilePenLine, Star, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

interface ProductListProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
  isLoading: boolean;
}

export default function ProductList({ products, onSelectProduct, onDeleteProduct, isLoading }: ProductListProps) {
    
  return (
    <div className="h-full overflow-y-auto">
        {isLoading ? (
          <div className='p-4 space-y-2'>
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-2">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[100px]" />
                </div>
                </div>
            ))}
          </div>
        ) : (
          products.map((product, index) => (
            <div
              key={product.id}
              className={`flex items-center justify-between p-4 group transition-colors hover:bg-muted/50 ${index < products.length - 1 ? 'border-b' : ''}`}
            >
              <div className="flex items-center gap-4 overflow-hidden flex-1">
                 <img 
                    src={product.images?.[0]?.url || 'https://placehold.co/60x60'}
                    alt={product.title}
                    className="w-12 h-12 rounded-md object-cover bg-gray-200"
                 />
                <div className="overflow-hidden">
                  <p className="font-semibold truncate">{product.title}</p>
                  <p className="text-sm text-muted-foreground">{product.status}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                  {product.isDealOfTheDay && <Star className="h-5 w-5 text-amber-400 fill-amber-400 flex-shrink-0" />}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onSelectProduct(product)}
                  >
                    <FilePenLine className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => onDeleteProduct(product)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
              </div>
            </div>
          ))
        )}
    </div>
  );
}
