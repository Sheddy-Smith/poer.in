import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export const metadata: Metadata = {
  title: 'Poer.in',
  description: 'Your one-stop portal for the best affiliate deals.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased h-full flex flex-col')}>
        <FirebaseClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
