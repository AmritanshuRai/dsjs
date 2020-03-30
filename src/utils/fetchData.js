import { firestore } from '../firebase/firebase.utils';

export const fetchData = async () => {
  let questions = {};
  const value = await firestore
    .collection('questions')
    .orderBy('timestamp', 'desc')
    .get();
  value.forEach(doc => {
    questions[doc.id] = doc.data();
  });
  return questions;
};
