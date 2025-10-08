import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

type DealOfTheDayProps = {
  product: Product;
};

export default function DealOfTheDay({ product }: DealOfTheDayProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const validImages = (product.images || []).filter(image => image.url);

  return (
    <Card className="overflow-hidden shadow-2xl bg-card border-2 border-primary/50">
      <div className="grid md:grid-cols-2">
        <div className="p-6 md:p-8 flex flex-col justify-center order-2 md:order-1">
          <Badge variant="outline" className="flex gap-1.5 items-center w-fit mb-4 text-primary border-primary">
            <Star className="h-4 w-4 fill-primary" />
            <span className="font-bold">DEAL OF THE DAY</span>
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-3 font-headline">{product.title}</h2>
          <p className="text-muted-foreground mb-6 text-lg">{product.description}</p>
          
          <div className="flex items-baseline gap-4 mb-6">
            <p className="text-5xl font-bold text-primary">₹{product.price.toFixed(2)}</p>
            {hasDiscount && (
              <div className='flex items-center gap-2'>
                <p className="text-2xl text-muted-foreground line-through">₹{product.originalPrice?.toFixed(2)}</p>
                <Badge variant="destructive">Save {discountPercentage}%</Badge>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <Button size="lg" asChild className="font-bold text-accent-foreground" style={{ backgroundColor: 'hsl(var(--accent))' }}>
               <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
                Grab Deal <ArrowRight className="ml-2 h-5 w-5" />
               </a>
            </Button>
            <Badge variant="secondary" className="text-base py-1 px-3">{product.marketplace}</Badge>
          </div>
        </div>
        <div className="relative min-h-[300px] md:min-h-0 order-1 md:order-2">
           <Carousel className="w-full h-full">
            <CarouselContent>
              {validImages.length > 0 ? (
                validImages.map((image, index) => (
                  <CarouselItem key={image.id || index}>
                    <div className="relative w-full h-full aspect-video md:aspect-auto">
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        data-ai-hint={image.hint}
                        priority={index === 0} // Prioritize loading the first image
                      />
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <div className="relative w-full h-full aspect-video md:aspect-auto flex items-center justify-center bg-muted">
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
        </div>
      </div>
    </Card>
  );
}
