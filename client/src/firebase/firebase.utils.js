import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDC-ynUqcD8Vtwutf_-Tdmxelp7BHnZpkE',
  authDomain: 'dsjs-7bf10.firebaseapp.com',
  databaseURL: 'https://dsjs-7bf10.firebaseio.com',
  projectId: 'dsjs-7bf10',
  storageBucket: 'dsjs-7bf10.appspot.com',
  messagingSenderId: '185845221249',
  appId: '1:185845221249:web:97f1804966694b39544a80',
  measurementId: 'G-F2WE6JMEE5',
};
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const createData = async ({
  title,
  solution,
  explanation,
  collectionName,
}) => {
  //   const userRef = firestore.doc(`questions/b41rFEKQw3OOzuzImSci`);

  await firestore.collection(collectionName).add({
    title,
    solution,
    explanation,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  });

  //   const snapShot = await userRef.get();

  //   const createdAt = new Date();

  //   try {
  //     userRef.update({
  //       title,
  //       solution,
  //       explanation,
  //       createdAt,
  //     });
  //   } catch (error) {
  //     console.log('error creating user', error.message);
  //   }

  //   return userRef;
  //   const value = await firestore
  //     .collection('questions')
  //     .orderBy('timestamp', 'desc')
  //     .get();
  //   value.forEach(doc => {
  //     console.log(`${doc.id} => ${doc.data()}`);
  //   });
};

export const deleteData = async (id) => {
  await firestore.collection('pendingQuestions').doc(id).delete();
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};
// getQuestions();
firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
