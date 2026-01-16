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
  const { data: userProfile, loading: profileLoading } = useDoc<any>(
    userDocRef
  );

  // We are loading if the user is loading, OR if the user is loaded but their profile isn't yet.
  const loading = userLoading || (!!user && profileLoading);
  const isAdmin = userProfile?.isAdmin === true;

  useEffect(() => {
    // Once loading is complete, if the user is not an admin, redirect them.
    if (!loading && !isAdmin) {
      router.replace('/dashboard');
    }
  }, [loading, isAdmin, router]);

  // If we are still loading OR if the user is not an admin (and is about to be redirected),
  // show the loading screen. This prevents any flicker of admin content for non-admin users.
  if (loading || !isAdmin) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
        <Logo className="h-24 w-24 animate-pulse text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">
          Verifying permissions...
        </p>
      </div>
    );
  }

  // Only if loading is complete AND the user is an admin, render the children.
  return <>{children}</>;
}
