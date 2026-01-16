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

  const doneLoading = !userLoading && !profileLoading;
  const isDefinitelyAdmin = doneLoading && userProfile?.isAdmin === true;

  useEffect(() => {
    // Once all data is loaded, if the user is NOT an admin, redirect them away.
    if (doneLoading && !isDefinitelyAdmin) {
      router.replace('/dashboard');
    }
  }, [doneLoading, isDefinitelyAdmin, router]);


  // If the user is confirmed as an admin, show the dashboard content.
  if (isDefinitelyAdmin) {
    return <>{children}</>;
  }

  // In all other cases (still loading, not an admin, etc.), show the verification
  // screen. The useEffect above will handle the redirection if necessary.
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <Logo className="h-24 w-24 animate-pulse text-primary" />
      <p className="mt-4 text-lg text-muted-foreground">
        Verifying permissions...
      </p>
    </div>
  );
}
