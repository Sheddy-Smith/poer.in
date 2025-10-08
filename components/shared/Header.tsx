'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ShoppingBag, User } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FormEvent } from 'react';

export default function Header() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultSearch = searchParams.get('search') ?? '';

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('search') as string;
    const params = new URLSearchParams(searchParams);
    
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    
    router.push(`/?${params.toString()}`);
  };

  return (
    <header className="bg-card border-b sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold text-foreground rgb-text">Poer.in</span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 justify-center px-8 lg:px-16">
            <form onSubmit={handleSearch} className="w-full max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  name="search"
                  placeholder="Search for deals..."
                  className="w-full pl-10 bg-background"
                  defaultValue={defaultSearch}
                />
              </div>
            </form>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/#deals">Deals</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/#categories">Categories</Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin">
                <User className="h-5 w-5" />
                <span className="sr-only">Admin</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
