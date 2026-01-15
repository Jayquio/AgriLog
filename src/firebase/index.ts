
import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

import { FirebaseProvider } from './provider';
import { FirebaseClientProvider } from './client-provider';
import { useUser } from './auth/use-user';
import { useDoc } from './firestore/use-doc';
import { useCollection } from './firestore/use-collection';
import {
  useFirebase,
  useFirebaseApp,
  useFirestore,
  useAuth,
} from './provider';

let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

function initializeFirebase() {
  if (app) {
    return { app, auth, firestore };
  }

  const apps = getApps();
  if (apps.length) {
    app = apps[0];
  } else {
    app = initializeApp(firebaseConfig);
  }

  auth = getAuth(app);
  firestore = getFirestore(app);

  return { app, auth, firestore };
}

export {
  initializeFirebase,
  FirebaseProvider,
  FirebaseClientProvider,
  useUser,
  useDoc,
  useCollection,
  useFirebase,
  useFirebaseApp,
  useFirestore,
  useAuth,
};
