import Link from 'next/link';
import { ShoppingBag, Twitter, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <Link href="/" className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <ShoppingBag className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold text-foreground rgb-text">Poer.in</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your portal to the best deals on the web. Curated with care, just for you.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/disclosure" className="text-sm text-muted-foreground hover:text-primary font-medium">Affiliate Disclosure</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram /></Link>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Poer.in. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
