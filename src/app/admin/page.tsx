'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useAuth, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusCircle, LogOut } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { collection, doc } from 'firebase/firestore';
import { deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';
import ProductList from '@/components/admin/ProductList';
import ProductForm from '@/components/admin/ProductForm';

export default function AdminPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const productsCollection = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'products');
  }, [firestore]);

  const { data: products, isLoading: isLoadingProducts } = useCollection<Product>(productsCollection);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/admin/login');
    }
  }, [user, isUserLoading, router]);

  const handleCreateNew = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };
  
  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };
  
  const handleDeleteRequest = (product: Product) => {
    setProductToDelete(product);
  };
  
  const handleFormClose = () => {
      setIsFormOpen(false);
      setSelectedProduct(null);
  }

  const confirmDelete = () => {
    if (!firestore || !productToDelete) return;
    
    const docRef = doc(firestore, 'products', productToDelete.id);
    deleteDocumentNonBlocking(docRef);
    
    toast({
        title: "Product Deleted",
        description: `${productToDelete.title} has been removed.`,
        variant: "destructive"
    });
    setProductToDelete(null);
  };

  const handleLogout = () => {
    auth.signOut();
    router.replace('/admin/login');
  };

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary font-headline">Product Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button onClick={handleCreateNew}>
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Product
            </Button>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>
        
        <div className="border rounded-lg bg-card overflow-hidden">
          <ProductList 
              products={products || []} 
              onSelectProduct={handleEdit}
              onDeleteProduct={handleDeleteRequest} 
              isLoading={isLoadingProducts}
          />
        </div>
      </div>
      
      {/* Product Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
              <DialogHeader>
                  <DialogTitle>{selectedProduct ? 'Edit Product' : 'Create New Product'}</DialogTitle>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto pr-6 pl-2 -mr-6">
                <ProductForm 
                    product={selectedProduct} 
                    onFormClose={handleFormClose}
                />
              </div>
          </DialogContent>
      </Dialog>


      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!productToDelete} onOpenChange={(open) => !open && setProductToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product "{productToDelete?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setProductToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
