import { firestore } from '../firebase/firebase.utils';

export const fetchData = (onFetchedData, obj) => {
  //   obj.toggleLoader(true);
  let unsubscribeFromQuestions = null;
  let questions = {};
  unsubscribeFromQuestions = firestore
    .collection('questions')
    .orderBy('timestamp', 'desc')
    .onSnapshot(value => {
      questions = {};
      value.forEach(doc => {
        questions[doc.id] = doc.data();
      });

      onFetchedData(questions);
      //   obj.toggleLoader(false);
    });
  return unsubscribeFromQuestions;
};
