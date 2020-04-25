import { firestore } from '../firebase/firebase.utils';

// export const fetchData =  (onFetchedData, obj) => {
//   //   obj.toggleLoader(true);
//   let unsubscribeFromQuestions = null;
//   let questions = {};
//   unsubscribeFromQuestions = firestore
//     .collection('questions')
//     .orderBy('timestamp', 'desc')
//     .onSnapshot(value => {
//       questions = {};
//       value.forEach(doc => {
//         questions[doc.id] = doc.data();
//       });

//       onFetchedData(questions);
//       //   obj.toggleLoader(false);
//     });
//   return unsubscribeFromQuestions;
// };

export const fetchData = async (collectionName) => {
  //   obj.toggleLoader(true);
  let fetchedData = null;
  let questions = {};
  fetchedData = await firestore
    .collection(collectionName)
    .orderBy('timestamp', 'desc')
    .get();

  fetchedData.forEach((doc) => {
    questions[doc.id] = doc.data();
  });
  return questions;
};

// if (this.props.location.pathname === '/') {
//   this.props.toggleLoader(true);
//   const fetchedData = await fetchData(this.onFetchedData, {
//     toggleLoader: this.props.toggleLoader,
//   });
//   this.props.setQuestionData(fetchedData);
//   this.props.toggleLoader(false);
// document.addEventListener('keydown', this.handleKeyPress, false);
// }

// onFetchedData = fetchedData => {
//   this.props.setQuestionData(fetchedData);
//   if (this.props.location.pathname === '/') {
//     this.props.toggleLoader(false);
//   }
// };
// async fetchData() {
//   this.props.toggleLoader();
//   // const userRef = firestore.doc(`questions/b41rFEKQw3OOzuzImSci`);
//   // const { questions } = await (await userRef.get()).data();
//   let questions = {};
//   const value = await firestore
//     .collection('questions')
//     .orderBy('timestamp', 'desc')
//     .get();
//   value.forEach(doc => {
//     // console.log(`${doc.id} => ${doc.data()}`);
//     questions[doc.id] = doc.data();
//   });

//   this.props.setQuestionData(questions);

//   this.props.toggleLoader();
// }
// handleKeyPress = event => {
//   event.preventDefault();
//   if (event.keyCode === 32 && !!event.shiftKey) {
//     this.props.history.push('/approve');
//   }
// };
