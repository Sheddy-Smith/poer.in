export type Marketplace = 'Amazon' | 'Flipkart' | 'Meesho' | 'Other';

export type ProductImage = {
  id: string;
  url: string;
  alt: string;
  hint: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  marketplace: Marketplace;
  affiliateLink: string;
  images: ProductImage[];
  isDealOfTheDay: boolean;
  status: 'Published' | 'Draft' | 'Archived';
};
