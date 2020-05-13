// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

// let _db;
// let _client;
// const mongoConnect = async (cb) => {
//   try {
//     const client = await MongoClient.connect(`${process.env.MONGO_URI}`, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     _client = client;
//     _db = client.db();
//     cb();
//   } catch (error) {
//     console.log('error: ', error);
//     throw new Error(error);
//   }
// };

// const getDb = () => {
//   if (_db) {
//     return _db;
//   } else {
//     throw new Error('No database');
//   }
// };

// const getClient = () => {
//   if (_client) {
//     return _client;
//   }
//   throw new Error('Arre maa chudi padi hai!');
// };
// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;
// exports.getClient = getClient;
