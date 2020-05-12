// import { firestore } from '../firebase/firebase.utils';
// import firebase from 'firebase/app';
// import { fetchData } from './fetchData';
// export const postData = async ({
//   title,
//   solution,
//   explanation,
//   description,
//   collectionName,
// }) => {
//   //   const userRef = firestore.doc(`questions/b41rFEKQw3OOzuzImSci`);

//   await firestore.collection(collectionName).add({
//     title,
//     solution,
//     explanation,
//     description,
//     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//   });

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
// };

// export const postAndDelete = async (dataObj, id) => {
//   const { title, solution, explanation, description, collectionName } = dataObj;
//   let batch = firestore.batch();
//   let newDocRef = firestore.collection(collectionName).doc();
//   batch.set(newDocRef, {
//     title,
//     solution,
//     explanation,
//     description,
//     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//   });

//   if (collectionName === 'questions') {
//     let toDel = firestore.collection('pendingQuestions').doc(id);
//     batch.delete(toDel);
//   }

//   batch.commit().then(function () {});
// };

// export const lauda = async (dataObj, id) => {
//   const { title, solution, explanation, description, collectionName } = dataObj;
//   let newDocRef = firestore.collection(collectionName).doc();
//   return firestore
//     .runTransaction(function (transaction) {
//       return transaction.get(newDocRef).then(function (sfDoc) {
//         if (!!sfDoc.exists) {
//           throw new Error('Document already exists');
//         }
//         transaction.set(newDocRef, {
//           title,
//           solution,
//           explanation,
//           description,
//           timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//         });
//         if (collectionName === 'questions') {
//           var toDel = firestore.collection('pendingQuestions').doc(id);
//           transaction.delete(toDel);
//         }
//         return {
//           title,
//           solution,
//           explanation,
//           description,
//           timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//           id: newDocRef.id,
//         };
//       });
//     })
//     .then(function (data) {
//       return data;
//     })
//     .catch(function (error) {
//       console.log('Transaction failed: ', error);
//     });
// };

export const postData = async (dataObj, id) => {
  const { collectionName, title, solution, explanation, description } = dataObj;
  try {
    let response = await fetch(`/${collectionName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        solution,
        description,
        explanation,
        id,
      }),
    });
    if (response.status !== 200 && response.status !== 201) {
      throw new Error('failed!');
    }
    const { result } = await response.json();
    return result;
    // console.warn('result: ', results);
    // return results.result.ops[0];
  } catch (err) {
    console.log(err);
  }
};
