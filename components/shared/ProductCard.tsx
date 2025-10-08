import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowRight } from 'lucide-react';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;
  
  const validImages = product.images?.filter(image => image.url) || [];

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full">
      <Carousel className="w-full">
        <CarouselContent>
          {validImages.length > 0 ? (
            validImages.map((image, index) => (
              <CarouselItem key={image.id || index}>
                <div className="aspect-video relative">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    data-ai-hint={image.hint}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </CarouselItem>
            ))
          ) : (
            <CarouselItem>
              <div className="aspect-video relative bg-muted flex items-center justify-center">
                 <Image src="https://placehold.co/600x400/E2E8F0/AAAAAA?text=No+Image" alt="No image available" fill className="object-cover" />
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
        {validImages.length > 1 && (
          <>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
          </>
        )}
      </Carousel>

      <CardContent className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <Badge variant="secondary" className="capitalize">{product.category}</Badge>
            {hasDiscount && (
              <Badge variant="destructive">-{discountPercentage}%</Badge>
            )}
          </div>
          <h3 className="font-semibold text-lg leading-tight truncate font-headline" title={product.title}>
            {product.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
        </div>
        
        <div className="mt-4">
           <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-2xl font-bold text-primary">₹{product.price.toFixed(2)}</p>
              {hasDiscount && (
                <p className="text-sm text-muted-foreground line-through">₹{product.originalPrice?.toFixed(2)}</p>
              )}
            </div>
             <Badge variant="outline" className="flex items-center gap-1.5">
                <ShoppingCart className="h-3.5 w-3.5"/>
                {product.marketplace}
            </Badge>
          </div>
          <Button
            asChild
            className="w-full font-bold text-accent-foreground"
            style={{ backgroundColor: 'hsl(var(--accent))' }}
          >
            <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
              Buy Now <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
