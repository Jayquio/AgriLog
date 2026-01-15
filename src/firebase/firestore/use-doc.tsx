'use client';

import { useEffect, useState } from 'react';
import {
  onSnapshot,
  doc,
  type DocumentReference,
  type DocumentData,
} from 'firebase/firestore';

import { useFirestore } from '@/firebase';

export function useDoc<T = DocumentData>(
  docPath: string | DocumentReference
) {
  const db = useFirestore();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let ref: DocumentReference;
    if (typeof docPath === 'string') {
      ref = doc(db, docPath);
    } else {
      ref = docPath;
    }

    const unsubscribe = onSnapshot(
      ref,
      (doc) => {
        if (doc.exists()) {
          setData({ id: doc.id, ...doc.data() } as T);
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [docPath, db]);

  return { data, loading, error };
}
