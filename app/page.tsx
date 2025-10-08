'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import type { Product } from '@/lib/types';
import DealOfTheDay from '@/components/shared/DealOfTheDay';
import CategoryFilter from '@/components/shared/CategoryFilter';
import ProductGrid from '@/components/shared/ProductGrid';
import { Skeleton } from '@/components/ui/skeleton';

function HomePageContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  
  const firestore = useFirestore();

  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    let q = query(collection(firestore, 'products'), where('status', '==', 'Published'));
    
    // The filtering logic will be handled client-side for simplicity with real-time updates.
    // For larger datasets, this filtering should be done on the Firestore query itself.
    // if (category && category !== 'All') {
    //   q = query(q, where('category', '==', category));
    // }
    // Search would require a more complex setup like a third-party search service (e.g., Algolia)
    // or different data structuring in Firestore. We will filter client-side.

    return q;
  }, [firestore]);

  const { data: serverProducts, isLoading: isLoadingProducts } = useCollection<Product>(productsQuery);

  const [products, setProducts] = useState<Product[]>([]);
  const [dealOfTheDay, setDealOfTheDay] = useState<Product | undefined>(undefined);
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    if (serverProducts) {
      let filteredProducts = serverProducts.filter(p => p.images?.length > 0 && p.images.some(img => img.url));

      // Client-side filtering
      if (category && category !== 'All') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
      }
      
      if (search) {
        const searchTerm = search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
          p.title.toLowerCase().includes(searchTerm) || 
          (p.description && p.description.toLowerCase().includes(searchTerm)) ||
          p.category.toLowerCase().includes(searchTerm)
        );
      }
      
      // Find the deal of the day from the original server products list *before* filtering
      const dealProduct = serverProducts.find(p => p.isDealOfTheDay && p.status === 'Published');
      // Ensure the deal of the day is not also in the regular product list
      const regularProducts = filteredProducts.filter(p => !p.isDealOfTheDay);

      setDealOfTheDay(dealProduct);
      setProducts(regularProducts);
      
      const allCategories = serverProducts.map(p => p.category);
      setCategories(['All', ...Array.from(new Set(allCategories))]);
    }
  }, [serverProducts, category, search]);


  return (
    <div className="container mx-auto px-4 py-8">
      {isLoadingProducts ? (
        <Skeleton className="w-full h-[450px] rounded-lg" />
      ) : (
         dealOfTheDay && <DealOfTheDay product={dealOfTheDay} />
      )}

      <div className="mt-12">
        <h2 className="text-3xl font-bold text-center text-primary mb-4 font-headline">
          Explore Deals
        </h2>
        <CategoryFilter categories={categories} />
      </div>

      {isLoadingProducts ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {[...Array(8)].map((_, i) => <Skeleton key={i} className="w-full h-[400px] rounded-lg" />)}
         </div>
      ) : products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-xl">No products found.</p>
          <p>Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}


export default function Home() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><p>Loading...</p></div>}>
      <HomePageContent />
    </Suspense>
  )
}
