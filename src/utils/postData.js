import { firestore } from '../firebase/firebase.utils';
import firebase from 'firebase/app';
export const postData = async ({
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
