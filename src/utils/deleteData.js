import { firestore } from '../firebase/firebase.utils';

export const deleteData = async (id) => {
  await firestore.collection('pendingQuestions').doc(id).delete();
};
