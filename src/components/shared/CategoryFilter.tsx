'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type CategoryFilterProps = {
  categories: string[];
};

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') ?? 'All';

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div id="categories" className="flex justify-center flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <Button
          key={category}
          variant={currentCategory === category ? 'default' : 'outline'}
          className={cn(
            'capitalize rounded-full transition-all',
            currentCategory === category && 'font-bold'
          )}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
