// const mongodb = require('mongodb');
// const getDb = require('../utils/database').getDb;
// const getClient = require('../utils/database').getClient;

// class Question {
//   constructor(title, description, solution, explanation) {
//     this.title = title;
//     this.description = description;
//     this.solution = solution;
//     this.explanation = explanation;
//   }

//   async save(collectionName, questionId) {
//     try {
//       const db = getDb();
//       if (collectionName === 'pendingQuestions') {
//         let result = await db.collection(collectionName).insertOne(this);
//         return result;
//       }
//       const session = getClient().startSession();
//       try {
//         await session.withTransaction(async () => {
//           await db.collection(collectionName).insertOne(this, { session });
//           await db
//             .collection('pendingQuestions')
//             .deleteOne({ _id: new mongodb.ObjectId(questionId) }, { session });
//         });
//         return 'postedAndDeleted';
//       } catch (err) {
//         console.log(err);
//       } finally {
//         await session.endSession();
//         // await client.close();
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   static async fetchAll(collectionName) {
//     const db = getDb();
//     try {
//       let questionObj = await db
//         .collection(collectionName)
//         .find()
//         .sort({ _id: -1 })
//         .toArray();
//       return questionObj;
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   static async deleteById(questionId) {
//     try {
//       const db = getDb();
//       let result = await db
//         .collection('pendingQuestions')
//         .deleteOne({ _id: new mongodb.ObjectId(questionId) });
//       return result;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }

// module.exports = Question;
