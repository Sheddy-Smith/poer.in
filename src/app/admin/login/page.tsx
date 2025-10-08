'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuth, useUser } from '@/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, LogIn } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  // Hardcoded admin user credentials
  const ADMIN_USERNAME = 'SheddySmith';
  const ADMIN_PASSWORD = 'S#eddy_822';
  const ADMIN_EMAIL_DOMAIN = 'poer.in.admin';

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/admin');
    }
  }, [user, isUserLoading, router]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        setError('Invalid username or password.');
        return;
    }
    
    const email = `${ADMIN_USERNAME}@${ADMIN_EMAIL_DOMAIN}`;

    try {
      // First, just try to sign in.
      await signInWithEmailAndPassword(auth, email, password);
      // If successful, the useEffect will handle the redirect.
    } catch (signInError: any) {
      // If sign-in fails, check the specific error code.
      if (signInError.code === 'auth/user-not-found' || signInError.code === 'auth/invalid-credential') {
        // ONLY if the user does not exist, try to create it.
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          // After creation, the onAuthStateChanged listener in the provider
          // will update the user state, and the useEffect will redirect.
        } catch (creationError: any) {
          // This might happen if creation fails for some other reason (e.g. weak password)
          setError(`Failed to create admin user: ${creationError.message}`);
        }
      } else if (signInError.code === 'auth/too-many-requests') {
        // Handle the specific error you were seeing
        setError('Access temporarily disabled due to too many failed login attempts. Please try again later.');
      } else {
        // Handle other sign-in errors (e.g., wrong password, network issue)
        setError(signInError.message || 'An error occurred during login.');
      }
    }
  };
  
  if (isUserLoading || user) {
    return (
        <div className="flex h-screen items-center justify-center">
            <p>Loading...</p>
        </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary font-headline">
            <span className="rgb-text">Poer.in</span> Admin Login
          </CardTitle>
          <CardDescription>Enter your administrator credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="login-username">Username</Label>
              <Input
                id="login-username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full font-bold text-lg" size="lg">
              <LogIn className="mr-2 h-5 w-5" />
              Sign In
            </Button>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Authentication Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
