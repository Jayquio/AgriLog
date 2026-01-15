'use client';

import { initializeFirebase, FirebaseProvider } from '@/firebase';
import { useMemo, type PropsWithChildren } from 'react';

export function FirebaseClientProvider(props: PropsWithChildren) {
  const { app, auth, firestore } = useMemo(initializeFirebase, []);

  return (
    <FirebaseProvider app={app} auth={auth} firestore={firestore}>
      {props.children}
    </FirebaseProvider>
  );
}
