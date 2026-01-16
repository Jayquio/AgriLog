'use client';

import { useUser } from '@/firebase/auth/use-user';
import { useDoc, useFirestore } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { doc } from 'firebase/firestore';
import { Logo } from '@/components/icons';

type VerificationStatus = 'VERIFYING' | 'ALLOWED' | 'DENIED';

export function AdminWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const [status, setStatus] = useState<VerificationStatus>('VERIFYING');

  const userDocRef = useMemo(() => {
    // Memoize the doc ref so it's stable across re-renders until the user changes.
    if (!user || !firestore) return null;
    return doc(firestore, `users/${user.uid}`);
  }, [user, firestore]);
  
  const { data: userProfile, loading: profileLoading } = useDoc<any>(userDocRef);

  useEffect(() => {
    // This effect's only job is to determine the final status once all data is loaded.
    const doneLoading = !userLoading && !profileLoading;

    if (doneLoading) {
      if (userProfile?.isAdmin) {
        setStatus('ALLOWED');
      } else {
        // This covers cases where the user is not an admin, or has no profile doc.
        setStatus('DENIED');
      }
    }
  }, [userLoading, profileLoading, userProfile]);

  useEffect(() => {
    // This effect handles the side-effect of redirection when status is DENIED.
    if (status === 'DENIED') {
      router.replace('/dashboard');
    }
  }, [status, router]);

  // While we are verifying, or if the user has been denied (and is being redirected),
  // show the loading screen. This prevents any content flash.
  if (status !== 'ALLOWED') {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
        <Logo className="h-24 w-24 animate-pulse text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">
          Verifying permissions...
        </p>
      </div>
    );
  }

  // If status is definitively ALLOWED, render the protected content.
  return <>{children}</>;
}
