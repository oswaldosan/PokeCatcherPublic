import firebase from 'firebase/app'

const FIREBASE_CONFIG = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  databaseURL: process.env.databaseURL,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};

export default function firebaseClient() {
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }
  }