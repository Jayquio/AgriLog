'use client';

import { useUser } from '@/firebase/auth/use-user';
import { useDoc } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Logo } from '../icons';
import { doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';

export function AdminWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  const userDocRef = user ? doc(firestore, `users/${user.uid}`) : null;
  const { data: userProfile, loading: profileLoading } = useDoc<any>(userDocRef);

  const isLoading = userLoading || (user && profileLoading);

  useEffect(() => {
    if (!isLoading) {
      if (!userProfile?.isAdmin) {
        // If loading is complete and the user is not an admin, redirect.
        router.replace('/dashboard');
      }
    }
  }, [isLoading, userProfile, router]);

  // While we are verifying auth and admin status, show the loading screen.
  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
        <Logo className="h-24 w-24 animate-pulse text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">
          Verifying permissions...
        </p>
      </div>
    );
  }

  // If loading is complete, and we have a confirmed admin, show the dashboard.
  if (userProfile?.isAdmin) {
    return <>{children}</>;
  }

  // Otherwise, the user is not an admin and is being redirected.
  // We continue to show the loading screen to prevent any content from flashing.
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <Logo className="h-24 w-24 animate-pulse text-primary" />
      <p className="mt-4 text-lg text-muted-foreground">
        Verifying permissions...
      </p>
    </div>
  );
}
