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

  const loading = userLoading || profileLoading;
  const isAdmin = userProfile?.isAdmin === true;

  useEffect(() => {
    // If loading is finished and the user is not an admin, redirect them.
    if (!loading && !isAdmin) {
      router.push('/dashboard');
    }
  }, [loading, isAdmin, router]);

  // If we are done loading and the user is an admin, show the admin content.
  if (!loading && isAdmin) {
    return <>{children}</>;
  }

  // In all other cases (still loading, or a non-admin about to be redirected),
  // show the verification screen. This prevents any flicker.
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <Logo className="h-24 w-24 animate-pulse text-primary" />
      <p className="mt-4 text-lg text-muted-foreground">
        Verifying permissions...
      </p>
    </div>
  );
}
